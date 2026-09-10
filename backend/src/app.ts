import ConnectPgSimple from 'connect-pg-simple';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';

import { pool } from './config/database.js';
import { env } from './config/env.js';
import { errorHandler } from './middleware/error.middleware.js';
import { adminRouter } from './routes/admin.routes.js';
import { authRouter } from './routes/auth.routes.js';
import { commentRouter } from './routes/comment.routes.js';
import { HttpError } from './utils/http-error.js';

const PostgreSqlStore = ConnectPgSimple(session);

export const app = express();

if (env.isProduction) {
  app.set('trust proxy', 1);
}

app.use(helmet());
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
);
app.use(express.json({ limit: '32kb' }));
app.use(
  session({
    name: 'blog.sid',
    store: new PostgreSqlStore({
      pool,
      tableName: 'user_sessions',
    }),
    secret: env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: env.isProduction,
      sameSite: 'lax',
      maxAge: 8 * 60 * 60 * 1000,
    },
  }),
);

app.get('/api/health', async (_request, response) => {
  await pool.query('SELECT 1');
  response.json({ status: 'ok' });
});

app.use('/api/comments', commentRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);

app.use((_request, _response, next) => {
  next(new HttpError(404, 'Route not found.'));
});

app.use(errorHandler);
