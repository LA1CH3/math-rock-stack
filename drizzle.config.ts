import { defineConfig } from 'drizzle-kit';

const { WRANGLER_CONFIG, DB_NAME = 'math-rock-stack' } = process.env;

export default defineConfig({
  dialect: 'sqlite',
  schema: './db/schema.ts',
  out: './migrations',
  driver: 'd1',
  dbCredentials: {
    wranglerConfigPath:
      new URL('wrangler.toml', import.meta.url).pathname +
      // This is a hack to inject additional cli flags to wrangler
      // since drizzle-kit doesn't support specifying environments
      WRANGLER_CONFIG
        ? ` ${WRANGLER_CONFIG}`
        : '',
    dbName: DB_NAME,
  },
});
