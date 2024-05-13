import { PlatformProxy } from 'wrangler';

export interface WorkerEnv extends Env {
  SESSION_SECRET: string;
}

export type Cloudflare = Omit<PlatformProxy<Env>, 'dispose'>;
