# SaaS Starter (Lean)

Next.js App Router + Prisma + PostgreSQL multi-tenant starter with **organization memberships** and **Stripe Checkout / Customer Portal** billing on the org.

## When you're ready to use this template

This folder is a **starting point** only. You do **not** need to install packages or provision databases while it sits in the boilerplate library.

When you are ready to build a real project from it:

1. Copy this folder to your new project directory
2. Run `npm install`
3. Copy `.env.example` → `.env` and set `DATABASE_URL`, `JWT_SECRET`, Stripe keys, and `STRIPE_PRICE_PRO`
4. Apply Prisma (`npx prisma migrate dev` or `db push`)
5. Run `npm run dev`
6. Optionally: `stripe listen --forward-to localhost:3000/api/webhooks/stripe` and set `STRIPE_WEBHOOK_SECRET`
7. Register (creates your first org), invite members, upgrade via Billing

Do not commit real secrets. Treat `.env` as local-only.

## Features

- Cookie JWT auth (register / login / logout)
- Organizations + memberships (`OWNER` / `ADMIN` / `MEMBER`)
- Dashboard: list / create orgs
- Add existing users by email (no outbound email)
- Stripe Checkout subscription for org PRO plan
- Stripe Customer Portal
- Webhook sync of plan + subscription status

## Use Cases

- **B2B project / workspace tools** — teams collaborate inside orgs with seat roles
- **Internal tools sold per company** — FREE workspace + PRO upgrade per tenant
- **Vertical SaaS** — agencies, clinics, freelancers billed at the organization
- **Multi-workspace products** — subscription sits on the tenant, not the individual user

## Out of scope (lean v1)

- Stripe Connect, seat metering, email invites
- Usage limits UI, SSO, audit logs

## License

MIT
