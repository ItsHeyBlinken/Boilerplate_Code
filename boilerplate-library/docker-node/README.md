# Docker Node Boilerplate

Node.js + Express + TypeScript + **Prisma/PostgreSQL**, packaged with Docker Compose (Postgres + optional Nginx). Redis and MongoDB are not used.


## When you're ready to use this template

This folder is a **starting point** only. You do **not** need to install packages, create databases, or run servers while it sits in the boilerplate library.

When you are ready to build a real project from it:

1. Copy this folder to your new project directory
2. Copy `.env.example` → `.env` if you will run the app outside Compose
3. Start the stack with `docker compose -f docker-compose.dev.yml up --build` (or `npm run docker:dev`)
4. Confirm `/health` and `/api/notes` respond
5. Customize the Express app / Prisma models, then rebuild containers as needed
6. For production-style runs, use `docker-compose.prod.yml` and prefer checked-in migrations over ad-hoc `db push`

Do not commit real API keys or passwords. Treat `.env` as local-only.

## What you get

- Multi-stage production Dockerfile + development Dockerfile
- `docker-compose.dev.yml` / `docker-compose.prod.yml` with healthy Postgres
- Small Notes API so Compose boots a real app, not just `/health`
- Health check that verifies the database connection

## Quick start (Compose)

```bash
cp .env.example .env
docker compose -f docker-compose.dev.yml up --build
```

Then:

- App: `http://localhost:3000`
- Health: `http://localhost:3000/health`
- Notes API: `http://localhost:3000/api/notes`
- Nginx proxy (dev): `http://localhost:8080`

Compose runs `prisma db push` before starting the app so the schema is applied inside the stack. For production workflows, prefer `prisma migrate deploy` with checked-in migrations.

## Local (without Docker for the app)

```bash
cp .env.example .env
# Start Postgres yourself, then:
npm install
npx prisma db push
npm run dev
```

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | App + DB health |
| GET | `/api/notes` | List notes |
| POST | `/api/notes` | Create note `{ title, body }` |
| GET | `/api/notes/:id` | Get note |
| DELETE | `/api/notes/:id` | Delete note |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run docker:dev` | Build and run Compose (dev) |
| `npm run docker:prod` | Build and run Compose (prod) |
| `npm run docker:down` | Stop Compose |
| `npm run db:push` | Apply Prisma schema |

## License

MIT
