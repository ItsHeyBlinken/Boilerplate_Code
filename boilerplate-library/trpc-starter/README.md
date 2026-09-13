# tRPC Starter (Lean)

Next.js App Router + **tRPC** + Prisma + PostgreSQL starter with cookie JWT auth and a typed posts CRUD demo.

## When you're ready to use this template

This folder is a **starting point** only. You do **not** need to install packages or provision databases while it sits in the boilerplate library.

When you are ready to build a real project from it:

1. Copy this folder to your new project directory
2. Run `npm install`
3. Copy `.env.example` → `.env` and set `DATABASE_URL` + `JWT_SECRET`
4. Apply Prisma (`npx prisma migrate dev` or `db push`)
5. Run `npm run dev`
6. Register, then create posts via the typed `trpc.posts.*` hooks

Do not commit real secrets. Treat `.env` as local-only.

## Features

- tRPC App Router handler (`/api/trpc`)
- `publicProcedure` / `protectedProcedure` with cookie session context
- Auth router: register / login / logout / me
- Posts router: list / create / update / delete (own posts)
- React Query + `@trpc/react-query` client provider

## Use Cases

- **Typesafe full-stack apps** without hand-written REST clients or OpenAPI codegen
- **Internal admin / ops tools** where server and UI must share contracts
- **CRUD products** that stay in sync as schemas evolve
- **Learning base** before adding orgs, billing, or GraphQL

## Out of scope (lean v1)

- Multi-tenant orgs, Stripe, file uploads, websockets
- RSC prefetch / HydrateClient patterns (add when you need them)

## License

MIT
