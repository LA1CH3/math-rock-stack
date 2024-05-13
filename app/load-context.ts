import { getDB } from './services/db/utilities';
import {
  AppLoadContext,
  createCookieSessionStorage,
} from '@remix-run/cloudflare';
import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { login } from './services/auth/session';
import { Cloudflare } from './types/cloudflare';

export interface WorkerEnv extends Env {
  SESSION_SECRET: string;
}

declare module '@remix-run/cloudflare' {
  interface AppLoadContext {
    cloudflare: Cloudflare;
    db: ReturnType<typeof getDB>;
    authenticator: Authenticator;
  }
}

type GetLoadContext = (args: {
  request: Request;
  context: { cloudflare: Cloudflare }; // load context _before_ augmentation
}) => AppLoadContext;

export const getLoadContext: GetLoadContext = ({ context }) => {
  const db = getDB(context);

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
