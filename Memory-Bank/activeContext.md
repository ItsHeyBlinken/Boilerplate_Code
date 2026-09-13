# Active Context: Current Work Focus

## Current Session Focus
**Date**: 2026-09-13  
**Primary Tasks**:
1. ✅ Repo checkup after long absence
2. ✅ Flesh out stub boilerplates (Phase A)
3. ✅ Phase B thicken partials — Postgres-first
4. ✅ CRM + ecommerce lean migrate to Postgres/Prisma
5. ✅ Pass 1 new templates: Blog/CMS + Realtime Socket.io
6. ⏳ Pass 2: SaaS multi-tenant + tRPC (next)

## Recent Changes
- ✅ `blog-cms`: Next.js App Router + Prisma User/Post, public list/detail, admin CRUD, cookie JWT
- ✅ `realtime-socketio`: Express + Socket.io + Prisma User/Room/Message, Vite React client, join/leave/chat
- ✅ Root README, simple-test.sh, test-boilerplates.sh updated for both
- ✅ CRM/ecommerce lean Postgres migrations (prior)

## Active Decisions
1. **Node/TS web focus** — no mobile templates for now
2. **PostgreSQL + Prisma preferred** — Mongo removed from lean starters
3. **Two-pass new templates** — Pass 1 done (Blog + Realtime); Pass 2 = SaaS + tRPC
4. **Lean starters** — runnable core + honest README + ready-to-use section; no in-library smoke installs

## Next Steps
1. **Pass 2**: SaaS multi-tenant + Stripe subscriptions starter; tRPC starter
2. Optional local smoke tests when adopting a template
3. Later deepen CRM/ecommerce (tasks, reviews, admin UI) if needed

## Known Gaps
- Full runtime smoke tests not executed in-library (by design: starting points)
- `vue-tsc` bump re-verify after install still pending
- Pass 2 templates not started
