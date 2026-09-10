import { Router } from 'express';

import {
  createComment,
  deleteComment,
  updateComment,
} from '../controllers/comment.controller.js';
import { requireAdmin } from '../middleware/auth.middleware.js';

export const adminRouter = Router();

adminRouter.use(requireAdmin);
adminRouter.post('/comments', createComment);
adminRouter.put('/comments/:id', updateComment);
adminRouter.delete('/comments/:id', deleteComment);
