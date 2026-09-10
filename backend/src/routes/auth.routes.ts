import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';

import { getSession, login, logout } from '../controllers/auth.controller.js';

export const authRouter = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: 'Too many login attempts. Please try again later.' },
});

authRouter.post('/login', loginLimiter, login);
authRouter.post('/logout', logout);
authRouter.get('/session', getSession);
