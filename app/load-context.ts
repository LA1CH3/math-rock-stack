import { DrizzleD1Database, drizzle } from 'drizzle-orm/d1';
import {
  AppLoadContext,
  createCookieSessionStorage,
} from '@remix-run/cloudflare';
import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { PlatformProxy } from 'wrangler';
import * as schema from '../db/schema';
import { login } from './services/auth/login';

export type Cloudflare = Omit<PlatformProxy<Env>, 'dispose'>;

export type AppDB = DrizzleD1Database<typeof schema>;

declare module '@remix-run/cloudflare' {
  interface AppLoadContext {
    cloudflare: Cloudflare;
    db: AppDB;
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
