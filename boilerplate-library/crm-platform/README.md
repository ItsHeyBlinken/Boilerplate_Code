# CRM Platform (Lean Starter)

PostgreSQL + Prisma + Express + React CRM starter: auth, contacts, leads, and deals.

## When you're ready to use this template

This folder is a **starting point** only. You do **not** need to install packages, create databases, or run servers while it sits in the boilerplate library.

When you are ready to build a real project from it:

1. Copy this folder to your new project directory
2. Run `npm run install-all`
3. Copy `server/.env.example` → `server/.env` and `client/.env.example` → `client/.env`
4. Set `DATABASE_URL` to your PostgreSQL instance
5. From `server/`, apply Prisma (`npx prisma migrate dev` or `db push`)
6. Run `npm run dev` from the project root
7. Customize contacts/leads/deals for your sales process

Do not commit real API keys or passwords. Treat `.env` as local-only.

## Features

- JWT register / login / me
- Contacts CRUD
- Leads CRUD + status updates
- Deals create + status (OPEN / WON / LOST)
- Dashboard summary counts
- React + Vite + Tailwind + Zustand

## Out of scope (lean v1)

- Tasks / activities
- Socket.io realtime
- File uploads / reports / analytics

## License

MIT
