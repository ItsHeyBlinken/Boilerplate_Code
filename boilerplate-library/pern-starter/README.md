# PERN Starter Boilerplate

Full-stack starter with **PostgreSQL**, **Express**, **React**, and **Node.js**, using **Prisma** and JWT auth.


## When you're ready to use this template

This folder is a **starting point** only. You do **not** need to install packages, create databases, or run servers while it sits in the boilerplate library.

When you are ready to build a real project from it:

1. Copy this folder to your new project directory
2. Run `npm run install-all`
3. Copy `server/.env.example` → `server/.env` and `client/.env.example` → `client/.env`
4. Set `DATABASE_URL` to your PostgreSQL instance
5. From `server/`, apply Prisma (`npx prisma migrate dev` or `db push`)
6. Run `npm run dev` from the project root
7. Customize auth, posts, and UI for your product

Do not commit real API keys or passwords. Treat `.env` as local-only.

## Features

### Server
- Express + TypeScript API
- Prisma ORM on PostgreSQL
- JWT register / login / me
- Posts CRUD + like / unlike
- Helmet, CORS, rate limiting, Winston logging

### Client
- React 18 + Vite + TypeScript + Tailwind
- React Router
- Zustand auth store (token + user in localStorage)
- Posts list with create / like / delete

## Prerequisites

- Node.js 18+
- PostgreSQL 14+

## Quick Start

```bash
cp -r ./pern-starter ../my-pern-app
cd ../my-pern-app

npm run install-all
cp server/.env.example server/.env
cp client/.env.example client/.env

# Edit server/.env DATABASE_URL for your Postgres instance
cd server && npx prisma migrate dev --name init && cd ..

npm run dev
```

- API: `http://localhost:5000`
- Client: Vite default (often `http://localhost:5173`)
- Docs JSON: `http://localhost:5000/api-docs`

## Project Structure

```
pern-starter/
├── client/                 # React + Vite app
│   └── src/
│       ├── pages/          # Home, Posts, Login
│       ├── store/          # Zustand auth
│       └── services/       # Axios API client
└── server/
    ├── prisma/schema.prisma
    └── src/
        ├── routes/         # auth, users, posts, health
        ├── lib/prisma.ts
        └── middleware/
```

## Environment

### `server/.env`
```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/pern_starter?schema=public
JWT_SECRET=change-me
CORS_ORIGIN=http://localhost:5173
PORT=5000
API_PREFIX=/api/v1
```

### `client/.env`
```bash
VITE_API_URL=http://localhost:5000/api/v1
```

## API (prefix `/api/v1`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/register` | No | Create user |
| POST | `/auth/login` | No | Login |
| GET | `/auth/me` | Yes | Current user |
| GET | `/posts` | No | Published posts |
| POST | `/posts` | Yes | Create post |
| PUT | `/posts/:id` | Yes | Update own post |
| DELETE | `/posts/:id` | Yes | Delete own post |
| POST | `/posts/:id/like` | Yes | Like |
| DELETE | `/posts/:id/like` | Yes | Unlike |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run install-all` | Install server + client |
| `npm run dev` | Run API + client |
| `npm run db:migrate` | Prisma migrate (server) |
| `npm run db:push` | Prisma db push |
| `npm run build` | Build client + server |

## pgAdmin / migrations

This boilerplate ships a Prisma schema. Apply schema yourself:

```bash
cd server
cp .env.example .env   # set DATABASE_URL
npx prisma migrate dev --name init
# or: npx prisma db push
```

## License

MIT
