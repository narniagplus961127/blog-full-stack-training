import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import { env } from '../config/env.js';
import { HttpError } from '../utils/http-error.js';

export const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next,
) => {
  if (error instanceof ZodError) {
    response.status(400).json({
      message: error.issues[0]?.message ?? 'The submitted data is invalid.',
    });
    return;
  }

  if (error instanceof HttpError) {
    response.status(error.status).json({ message: error.message });
    return;
  }

  console.error(error);
  response.status(500).json({
    message: 'Something went wrong. Please try again.',
    ...(env.isProduction ? {} : { detail: String(error) }),
  });
};
