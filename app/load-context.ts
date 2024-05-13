import { DrizzleD1Database, drizzle } from 'drizzle-orm/d1';
import * as schema from '../db/schema';

import {
  AppLoadContext,
  createCookieSessionStorage,
} from '@remix-run/cloudflare';
import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { login } from './services/auth/login';
import { PlatformProxy } from 'wrangler';

export type Cloudflare = Omit<PlatformProxy<Env>, 'dispose'>;

export interface WorkerEnv extends Env {
  SESSION_SECRET: string;
}

declare module '@remix-run/cloudflare' {
  interface AppLoadContext {
    cloudflare: Cloudflare;
    db: DrizzleD1Database<typeof schema>;
    authenticator: Authenticator;
  }
}

type GetLoadContext = (args: {
  request: Request;
  context: { cloudflare: Cloudflare }; // load context _before_ augmentation
}) => AppLoadContext;

export const getLoadContext: GetLoadContext = ({ context }) => {
  const db = drizzle(context.cloudflare.env.DB, { schema });

  const sessionStorage = createCookieSessionStorage({
    cookie: {
      name: '_session',
      sameSite: 'lax',
      path: '/',
      httpOnly: true,
      secrets: [context.cloudflare.env.SESSION_SECRET],
      secure: true,
    },
  });

  const authenticator = new Authenticator(sessionStorage).use(
    new FormStrategy(async ({ form, context }) => {
      if (context) {
        const username = form.get('username')?.toString();
        const password = form.get('password')?.toString();

        if (username && password) {
          const user = await login(username, password, db);

          return user;
        }
      }
    }),
    'user-pass',
  );

  return {
    ...context,
    db,
    authenticator,
  };
};
