import { AppLoadContext } from '@remix-run/cloudflare';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from 'db/schema';

export const getDB = (context: AppLoadContext) =>
  drizzle(context.cloudflare.env.DB, { schema });

export type AppDB = ReturnType<typeof getDB>;
