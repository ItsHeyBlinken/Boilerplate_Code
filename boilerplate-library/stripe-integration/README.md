# Stripe Integration Boilerplate

Express + TypeScript API for **Stripe Checkout**, **PaymentIntents**, **subscriptions**, and **webhooks**, backed by **PostgreSQL + Prisma**.


## When you're ready to use this template

This folder is a **starting point** only. You do **not** need to install packages, create databases, or run servers while it sits in the boilerplate library.

When you are ready to build a real project from it:

1. Copy this folder to your new project directory
2. Run `npm install`
3. Copy `.env.example` → `.env` and set `DATABASE_URL`, Stripe keys, and `FRONTEND_URL`
4. Apply the Prisma schema (`npx prisma migrate dev` or `db push`) against your PostgreSQL database
5. Create real Stripe Price IDs in the Dashboard and use those IDs in API calls
6. Optionally run Stripe CLI: `npm run stripe:listen` and set `STRIPE_WEBHOOK_SECRET`
7. Run `npm run dev`
8. Wire your frontend to Checkout / PaymentIntent client secrets

Do not commit real API keys or passwords. Treat `.env` as local-only.

## Features

- JWT auth (register / login / me)
- Products CRUD (store Stripe Price IDs on products)
- `POST /payments/create-payment-intent`
- `POST /payments/create-checkout-session`
- Real Stripe subscription create / cancel-at-period-end / resume
- Webhooks: payment_intent.*, checkout.session.completed, customer.subscription.*

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Stripe test keys ([Dashboard](https://dashboard.stripe.com/test/apikeys))
- Optional: Stripe CLI for local webhooks

## Quick Start

```bash
cp -r ./stripe-integration ../my-stripe-api
cd ../my-stripe-api
cp .env.example .env
# Set DATABASE_URL + Stripe keys

npm install
npx prisma migrate dev --name init
# or: npx prisma db push

npm run dev
```

API: `http://localhost:3001`  
Docs: `http://localhost:3001/api-docs`

### Local webhooks

```bash
npm run stripe:listen
# Copy the whsec_... value into STRIPE_WEBHOOK_SECRET
```

## Key endpoints (`/api/v1`)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/register` | Register |
| POST | `/auth/login` | Login |
| POST | `/payments/create-payment-intent` | Card PaymentIntent |
| POST | `/payments/create-checkout-session` | Hosted Checkout (`priceId` or `productId`) |
| POST | `/subscriptions/create` | Create Stripe subscription (`priceId`) |
| PUT | `/subscriptions/:id/cancel` | Cancel at period end |
| POST | `/webhooks/stripe` | Stripe webhooks (raw body) |

## Notes

- Create Prices in the Stripe Dashboard and use those IDs (not the placeholder `price_basic` labels from `/subscriptions/plans`).
- Apply Prisma schema yourself (`migrate` or `db push`); this repo does not auto-run migrations.
- Webhook route is mounted with `express.raw` **before** JSON parsing so signature verification works.

## License

MIT
