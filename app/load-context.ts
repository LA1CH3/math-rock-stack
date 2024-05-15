import { DrizzleD1Database, drizzle } from 'drizzle-orm/d1';
import {
  AppLoadContext,
  SessionStorage,
  createCookieSessionStorage,
} from '@remix-run/cloudflare';

import { PlatformProxy } from 'wrangler';
import * as schema from '../db/schema';
import { User } from './services/auth/login';

export type Cloudflare = Omit<PlatformProxy<Env>, 'dispose'>;

export type AppDB = DrizzleD1Database<typeof schema>;

declare module '@remix-run/cloudflare' {
  interface AppLoadContext {
    cloudflare: Cloudflare;
    db: AppDB;
    session: SessionStorage<User>;
  }
}

type GetLoadContext = (args: {
  request: Request;
  context: { cloudflare: Cloudflare }; // load context _before_ augmentation
}) => AppLoadContext;

export const getLoadContext: GetLoadContext = ({ context }) => {
  const db = drizzle(context.cloudflare.env.DB, { schema });

  const session = createCookieSessionStorage({
    cookie: {
      name: '_session',
      sameSite: 'lax',
      path: '/',
      httpOnly: true,
      secrets: [context.cloudflare.env.SESSION_SECRET],
      secure: true,
    },
  });

  return {
    ...context,
    db,
    session,
  };
};
