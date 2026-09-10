import bcrypt from 'bcrypt';

import { pool } from '../config/database.js';

const username = process.env.ADMIN_USERNAME?.trim();
const password = process.env.ADMIN_PASSWORD;

if (!username || !password) {
  throw new Error('Set ADMIN_USERNAME and ADMIN_PASSWORD before seeding.');
}

if (password.length < 10) {
  throw new Error('ADMIN_PASSWORD must contain at least 10 characters.');
}

const adminUsername = username;
const adminPassword = password;

async function main() {
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  try {
    await pool.query(
      `INSERT INTO admins (username, password_hash)
       VALUES ($1, $2)
       ON CONFLICT (username)
       DO UPDATE SET password_hash = EXCLUDED.password_hash`,
      [adminUsername, passwordHash],
    );
    console.log(`Administrator "${adminUsername}" is ready.`);
  } finally {
    await pool.end();
  }
}

void main();
