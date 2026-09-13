# Active Context: Current Work Focus

## Current Session Focus
**Date**: 2026-09-13  
**Primary Tasks**:
1. ✅ Repo checkup after long absence
2. ✅ Flesh out stub boilerplates (Phase A)
3. ✅ Phase B thicken partials — Postgres-first
4. ⏳ New templates (SaaS, realtime, etc.) — deferred until library is solid

## Recent Changes
- ✅ Added **When you're ready to use this template** section to all 16 boilerplate READMEs (+ root README note)
- ✅ `mern-starter` converted → `pern-starter` (Prisma + PostgreSQL, Zustand auth, posts like/delete)
- ✅ `stripe-integration` migrated to Prisma/Postgres; Checkout Session + real subscriptions + expanded webhooks
- ✅ `docker-node` rebuilt on Postgres only (Redis/Mongo dropped); Notes API + Compose healthchecks
- ✅ Root README, simple-test.sh, test-boilerplates.sh, PROJECT_USE_CASES updated for PERN
- ✅ Decision: prefer PostgreSQL + Prisma; drop Redis from docker-node

## Active Decisions
1. **Node/TS web focus** — no mobile templates for now
2. **PostgreSQL + Prisma preferred** over MongoDB for new/updated templates
3. **CRM + ecommerce** remain on Mongo for now — noted for future migration
4. **Defaults**: Remix keeps lean Prisma; monorepo = web+api+shared; NestJS = JWT+users+health+Swagger

## Next Steps
1. Optional local smoke tests (install + Prisma migrate/push + boot) for PERN, Stripe, Docker
2. Future: migrate `crm-platform` and `ecommerce-platform` Mongo → Postgres/Prisma
3. Optionally add new templates (realtime/Socket.io, SaaS, tRPC) after library feels solid

## Known Gaps
- Full runtime smoke tests not fully executed this session
- CRM and ecommerce still Mongo/Mongoose
- `vue-tsc` bump re-verify after install still pending
