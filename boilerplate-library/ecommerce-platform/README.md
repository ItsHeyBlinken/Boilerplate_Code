# Ecommerce Platform (Lean Starter)

PostgreSQL + Prisma + Express + React shop starter: products, cart, orders, and a thin Stripe PaymentIntent endpoint.

## When you're ready to use this template

This folder is a **starting point** only. You do **not** need to install packages, create databases, or run servers while it sits in the boilerplate library.

When you are ready to build a real project from it:

1. Copy this folder to your new project directory
2. Run `npm run install-all`
3. Copy `server/.env.example` → `server/.env` and `client/.env.example` → `client/.env`
4. Set `DATABASE_URL` and optional Stripe keys
5. From `server/`, apply Prisma (`npx prisma migrate dev` or `db push`)
6. Run `npm run dev` from the project root
7. Register (first user becomes ADMIN), create products, exercise cart/checkout

Do not commit real API keys or passwords. Treat `.env` as local-only.

## Features

- JWT auth (first registered user is ADMIN)
- Categories + products
- Cart (add / update / clear)
- Orders from cart
- Optional `POST /api/payments/create-payment-intent`

## Out of scope (lean v1)

- Reviews, uploads, Redis
- Full admin dashboards / shipping / tax engines

## License

MIT
