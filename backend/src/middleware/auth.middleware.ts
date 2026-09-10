import type { NextFunction, Request, Response } from 'express';

export function requireAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (!request.session.adminId) {
    response.status(401).json({ message: 'Administrator access is required.' });
    return;
  }

  next();
}
