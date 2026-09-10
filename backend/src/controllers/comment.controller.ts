import type { Request, Response } from 'express';

import { pool } from '../config/database.js';
import { commentIdSchema, commentSchema } from '../schemas/comment.schema.js';
import { HttpError } from '../utils/http-error.js';

const commentSelection = `
  id,
  author_name AS "authorName",
  content,
  created_at AS "createdAt",
  updated_at AS "updatedAt"
`;

export async function listComments(_request: Request, response: Response) {
  const result = await pool.query(
    `SELECT ${commentSelection} FROM comments ORDER BY created_at DESC`,
  );

  response.json({ comments: result.rows });
}

export async function createComment(request: Request, response: Response) {
  const input = commentSchema.parse(request.body);
  const result = await pool.query(
    `INSERT INTO comments (author_name, email, content)
     VALUES ($1, $2, $3)
     RETURNING ${commentSelection}`,
    [input.authorName, input.email, input.content],
  );

  response.status(201).json({ comment: result.rows[0] });
}

export async function updateComment(request: Request, response: Response) {
  const id = commentIdSchema.parse(request.params.id);
  const input = commentSchema.parse(request.body);
  const result = await pool.query(
    `UPDATE comments
     SET author_name = $1, email = $2, content = $3, updated_at = NOW()
     WHERE id = $4
     RETURNING ${commentSelection}`,
    [input.authorName, input.email, input.content, id],
  );

  if (!result.rows[0]) {
    throw new HttpError(404, 'Comment not found.');
  }

  response.json({ comment: result.rows[0] });
}

export async function deleteComment(request: Request, response: Response) {
  const id = commentIdSchema.parse(request.params.id);
  const result = await pool.query('DELETE FROM comments WHERE id = $1', [id]);

  if (result.rowCount === 0) {
    throw new HttpError(404, 'Comment not found.');
  }

  response.status(204).send();
}
