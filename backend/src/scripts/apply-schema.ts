import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { pool } from '../config/database.js';

const schemaPath = resolve(process.cwd(), '..', 'database', 'schema.sql');

async function main() {
  const schema = await readFile(schemaPath, 'utf8');

  try {
    await pool.query(schema);
    console.log('Database schema applied successfully.');
  } finally {
    await pool.end();
  }
}

void main();
