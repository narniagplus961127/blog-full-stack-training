# Field Notes Blog

A one-page editorial blog built with React, TypeScript, Tailwind CSS, Express, and PostgreSQL. Public visitors can read the article and publish comments. An authenticated administrator can add, edit, and delete comments.

The project is currently configured for local development only. Deployment has not been performed.

## Features

- Responsive one-page article and public comment form
- Public comment listing and submission
- Password-protected administrator dashboard
- Administrator comment creation, editing, and deletion
- PostgreSQL-backed data and login sessions
- Request validation, rate limiting, secure headers, and password hashing
- Shared Prettier formatting for TypeScript, React, Tailwind classes, SQL, JSON, CSS, and Markdown

## Project structure

```text
blog-project/
├── frontend/       React, TypeScript, Vite, and Tailwind CSS
├── backend/        Express and TypeScript API
├── database/       PostgreSQL schema
├── package.json    Shared development commands
└── README.md
```

## Prerequisites

- Node.js 22 or newer
- npm 10 or newer
- PostgreSQL 15 or newer

On Windows PowerShell, use `npm.cmd` if the system execution policy blocks `npm.ps1`.

## 1. Install dependencies

From the project root:

```powershell
npm.cmd install
npm.cmd install --prefix frontend
npm.cmd install --prefix backend
```

## 2. Create the PostgreSQL database

```powershell
createdb -U postgres blog_db
```

If the database already exists, continue to the next step.

## 3. Configure the backend

Copy the example file:

```powershell
Copy-Item backend/.env.example backend/.env
```

Edit `backend/.env`:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:your-password@localhost:5432/blog_db
DATABASE_SSL=false
SESSION_SECRET=replace-with-a-long-random-string
CLIENT_URL=http://localhost:5173
ADMIN_USERNAME=admin
ADMIN_PASSWORD=replace-with-at-least-10-characters
```

Use your actual PostgreSQL password. The `.env` file is ignored by Git.

## 4. Apply the schema and create the administrator

```powershell
npm.cmd run db:schema
npm.cmd run db:seed
```

The seed command creates the configured administrator or safely updates that administrator's password.

## 5. Start the project

```powershell
npm.cmd run dev
```

Open:

- Public blog: <http://localhost:5173>
- Admin login: <http://localhost:5173/admin/login>
- API health check: <http://localhost:3000/api/health>

The Vite development server forwards `/api` requests to the local Express API.

## Available commands

| Command                    | Purpose                                   |
| -------------------------- | ----------------------------------------- |
| `npm.cmd run dev`          | Start the frontend and backend together   |
| `npm.cmd run build`        | Build both applications                   |
| `npm.cmd run lint`         | Check the React application with ESLint   |
| `npm.cmd run format`       | Format the complete project with Prettier |
| `npm.cmd run format:check` | Verify formatting without changing files  |
| `npm.cmd run db:schema`    | Apply `database/schema.sql`               |
| `npm.cmd run db:seed`      | Create or update the administrator        |

## API summary

### Public

| Method | Endpoint        | Purpose                             |
| ------ | --------------- | ----------------------------------- |
| `GET`  | `/api/health`   | Check API and database availability |
| `GET`  | `/api/comments` | List comments                       |
| `POST` | `/api/comments` | Publish a comment                   |

### Authentication

| Method | Endpoint            | Purpose                        |
| ------ | ------------------- | ------------------------------ |
| `POST` | `/api/auth/login`   | Start an administrator session |
| `GET`  | `/api/auth/session` | Check the current session      |
| `POST` | `/api/auth/logout`  | End the current session        |

### Administrator

| Method   | Endpoint                  | Purpose          |
| -------- | ------------------------- | ---------------- |
| `POST`   | `/api/admin/comments`     | Add a comment    |
| `PUT`    | `/api/admin/comments/:id` | Edit a comment   |
| `DELETE` | `/api/admin/comments/:id` | Delete a comment |

Administrator endpoints return HTTP `401` without a valid session.

## Security notes

- Passwords are hashed with bcrypt and never returned by the API.
- SQL values use parameterized PostgreSQL queries.
- Sessions are stored in PostgreSQL rather than application memory.
- React renders comment text as text, preventing submitted HTML from executing.
- Public comments and login attempts are rate-limited.
- Production secrets must be configured in the hosting dashboards, never committed.

## Future deployment

The intended production layout is:

- React frontend on Vercel
- Express API on Render
- PostgreSQL on Render in the same region as the API

`frontend/vercel.json` contains a placeholder Render API URL. Replace `YOUR-API` only when local testing is complete. The backend must receive its production environment variables through Render. No deployment is required for local testing.

## Submission archive

After local testing is complete, create one ZIP containing the source code, SQL file, lock files, and README. Exclude `node_modules`, `.env`, `.git`, `dist`, logs, and real credentials.
