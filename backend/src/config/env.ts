import 'dotenv/config';

const nodeEnv = process.env.NODE_ENV ?? 'development';

export const env = {
  nodeEnv,
  isProduction: nodeEnv === 'production',
  port: Number(process.env.PORT ?? 3000),
  databaseUrl:
    process.env.DATABASE_URL ??
    'postgresql://postgres:postgres@localhost:5432/blog_db',
  databaseSsl: process.env.DATABASE_SSL === 'true',
  sessionSecret:
    process.env.SESSION_SECRET ?? 'local-only-change-this-session-secret',
  clientUrl: process.env.CLIENT_URL ?? 'http://localhost:5173',
};
