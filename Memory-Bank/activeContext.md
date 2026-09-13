# Active Context: Current Work Focus

## Current Session Focus
**Date**: 2026-09-13  
**Primary Tasks**:
1. ✅ Repo checkup after long absence
2. ✅ Flesh out stub boilerplates (Phase A)
3. ✅ Phase B thicken partials — Postgres-first
4. ✅ CRM + ecommerce lean migrate to Postgres/Prisma
5. ⏳ New templates (SaaS, realtime, etc.) — deferred until library is solid

## Recent Changes
- ✅ CRM rebuilt lean: Prisma User/Contact/Lead/Deal + React dashboard/pages
- ✅ Ecommerce rebuilt lean: Prisma catalog/cart/orders + thin Stripe PaymentIntent + React shop UI
- ✅ First ecommerce registrant becomes ADMIN (for product create demos)
- ✅ Added **When you're ready to use this template** section to all 16 boilerplate READMEs
- ✅ Phase B: PERN, Stripe, Docker on Postgres

## Active Decisions
1. **Node/TS web focus** — no mobile templates for now
2. **PostgreSQL + Prisma preferred** — Mongo removed from CRM/ecommerce lean starters
3. **Lean domain only** for CRM/ecommerce (no Socket.io, reviews, uploads in v1)
4. **Defaults**: Remix keeps lean Prisma; monorepo = web+api+shared; NestJS = JWT+users+health+Swagger

## Next Steps
1. Optional local smoke tests when adopting a template
2. Optionally add new templates (realtime/Socket.io, SaaS, tRPC)
3. Later deepen CRM/ecommerce (tasks, reviews, admin UI) if needed

## Known Gaps
- Full runtime smoke tests not executed in-library (by design: starting points)
- `vue-tsc` bump re-verify after install still pending
