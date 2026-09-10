import { app } from './app.js';
import { pool } from './config/database.js';
import { env } from './config/env.js';

const server = app.listen(env.port, '0.0.0.0', () => {
  console.log(`API is running at http://localhost:${env.port}`);
});

async function shutdown(signal: string) {
  console.log(`${signal} received. Closing the server.`);
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));
