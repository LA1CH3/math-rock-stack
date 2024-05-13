import { drizzle } from 'drizzle-orm/d1';
import * as schema from 'db/schema';
import { Cloudflare } from '~/types/cloudflare';

export const getDB = (context: { cloudflare: Cloudflare }) =>
  drizzle(context.cloudflare.env.DB, { schema });

export type AppDB = ReturnType<typeof getDB>;
