# Blog / CMS Starter

Lean **Next.js App Router** blog + minimal CMS on **PostgreSQL + Prisma**.

## When you're ready to use this template

This folder is a **starting point** only. You do **not** need to install packages or provision databases while it sits in the boilerplate library.

When you are ready to build a real project from it:

1. Copy this folder to your new project directory
2. Run `npm install`
3. Copy `.env.example` → `.env` and set `DATABASE_URL` + `JWT_SECRET`
4. Apply Prisma (`npx prisma migrate dev` or `db push`)
5. Run `npm run dev`
6. Register (first user becomes ADMIN), create and publish posts

Do not commit real secrets. Treat `.env` as local-only.

## Features

- Public post list + detail by slug
- Cookie JWT auth (register / login / logout)
- Admin post create / edit / publish / delete
- Markdown/plain textarea content (no WYSIWYG)

## Out of scope (lean v1)

- Media library, comments, MDX, tags

## License

MIT
