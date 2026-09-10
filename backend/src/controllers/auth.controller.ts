import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import { z } from 'zod';

import { pool } from '../config/database.js';
import { HttpError } from '../utils/http-error.js';

const loginSchema = z.object({
  username: z.string().trim().min(1, 'Enter your username.').max(50),
  password: z.string().min(1, 'Enter your password.').max(128),
});

type AdminRow = {
  id: number;
  username: string;
  password_hash: string;
};

export async function login(request: Request, response: Response) {
  const input = loginSchema.parse(request.body);
  const result = await pool.query<AdminRow>(
    'SELECT id, username, password_hash FROM admins WHERE username = $1',
    [input.username],
  );
  const admin = result.rows[0];

  if (!admin || !(await bcrypt.compare(input.password, admin.password_hash))) {
    throw new HttpError(401, 'Incorrect username or password.');
  }

  await new Promise<void>((resolve, reject) => {
    request.session.regenerate((error) => {
      if (error) reject(error);
      else resolve();
    });
  });

  request.session.adminId = admin.id;
  request.session.adminUsername = admin.username;

  response.json({
    admin: { id: admin.id, username: admin.username },
  });
}

export function getSession(request: Request, response: Response) {
  if (!request.session.adminId) {
    response.json({ authenticated: false });
    return;
  }

  response.json({
    authenticated: true,
    admin: {
      id: request.session.adminId,
      username: request.session.adminUsername,
    },
  });
}

export async function logout(request: Request, response: Response) {
  await new Promise<void>((resolve, reject) => {
    request.session.destroy((error) => {
      if (error) reject(error);
      else resolve();
    });
  });

  response.clearCookie('blog.sid');
  response.status(204).send();
}
