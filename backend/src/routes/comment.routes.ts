import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';

import {
  createComment,
  listComments,
} from '../controllers/comment.controller.js';

export const commentRouter = Router();

const commentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 12,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Too many comments. Please wait before trying again.' },
});

commentRouter.get('/', listComments);
commentRouter.post('/', commentLimiter, createComment);
