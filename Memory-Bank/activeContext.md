# Active Context: Current Work Focus

## Current Session Focus
**Date**: 2026-09-13  
**Primary Tasks**:
1. ✅ Repo checkup after long absence
2. ✅ Flesh out stub boilerplates (Phase A)
3. ⏳ Phase B thicken partials (mern, stripe, docker) — deferred to next pass
4. ⏳ New templates (SaaS, realtime, etc.) — deferred until library is solid

## Recent Changes
- ✅ `vue-vite` expanded to runnable Vue 3 + Vite + Pinia + Router + Tailwind starter
- ✅ `remix-starter` expanded with routes, Tailwind, Prisma posts + demo fallback
- ✅ `serverless-functions` expanded with Vercel/Netlify/AWS handlers + shared helpers
- ✅ `monorepo-turborepo` expanded with `apps/web`, `apps/api`, `packages/shared`
- ✅ `nestjs-starter` expanded with Prisma, auth, users, health, Swagger
- ✅ Added `.env.example` for vue-vite, remix, nestjs, serverless, monorepo, react-vite, graphql-api
- ✅ Updated `simple-test.sh` to include the 6 newer boilerplates

## Active Decisions
1. **Node/TS web focus** — no mobile templates for now
2. **Finish current library before new templates**
3. **Defaults**: Remix keeps lean Prisma; monorepo = web+api+shared; NestJS = JWT+users+health+Swagger

## Next Steps
1. Phase B: thicken `mern-starter`, `stripe-integration`, `docker-node` if needed
2. Optionally add new templates (realtime/Socket.io, SaaS, tRPC)
3. User-run installs/smoke tests with local Postgres where required

## Known Gaps
- Full runtime smoke tests (install + DB migrate + boot) not fully executed in this session
- `vue-tsc` bumped to v2 for Node compatibility; re-verify after install
- Phase B partials not yet revisited
