import { DrizzleD1Database, drizzle } from 'drizzle-orm/d1';
import {
  AppLoadContext,
  SessionStorage,
  createCookie,
  createWorkersKVSessionStorage,
} from '@remix-run/cloudflare';

import { PlatformProxy } from 'wrangler';
import * as schema from '../db/schema';
import { SessionUser } from './services/auth/session';

export type Cloudflare = Omit<PlatformProxy<Env>, 'dispose'>;

export type AppDB = DrizzleD1Database<typeof schema>;

declare module '@remix-run/cloudflare' {
  interface AppLoadContext {
    cloudflare: Cloudflare;
    db: AppDB;
    session: SessionStorage<SessionUser>;
  }
}

type GetLoadContext = (args: {
  request: Request;
  context: { cloudflare: Cloudflare }; // load context _before_ augmentation
}) => AppLoadContext;

export const getLoadContext: GetLoadContext = ({ context }) => {
  const db = drizzle(context.cloudflare.env.DB, { schema });

  const sessionCookie = createCookie('__session', {
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [context.cloudflare.env.SESSION_SECRET],
    secure: true,
  });

  const session = createWorkersKVSessionStorage({
    kv: context.cloudflare.env.math_rock_stack_sessions,
    cookie: sessionCookie,
  });

  return {
    ...context,
    db,
    session,
  };
};
