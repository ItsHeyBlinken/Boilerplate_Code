# Progress: What Works & What's Left

## What Works ✅

### Completed Boilerplates (16/16) — Phase A + Phase B (2026-09-13)
1. **HTML/CSS/JS** - Fully functional static landing page
2. **Express API** - Complete REST API with JWT auth and PostgreSQL
3. **React Vite** - Modern React app with routing and state management
4. **Next.js Starter** - Full-stack React with API routes and auth
5. **Node PostgreSQL** - Database starter with Prisma and migrations
6. **PERN Starter** - PostgreSQL + Express + React + Node (Prisma) ✅ Phase B
7. **Stripe Integration** - Checkout + subscriptions + webhooks on Prisma/Postgres ✅ Phase B
8. **Docker Node** - Compose + Postgres + Notes API ✅ Phase B
9. **CRM Platform** - Complete CRM with client and server (Mongo — migration pending)
10. **E-commerce Platform** - Full e-commerce solution (Mongo — migration pending)
11. **GraphQL API** - GraphQL API with Apollo Server and Prisma
12. **NestJS Starter** - NestJS + Prisma + JWT auth + users + health + Swagger
13. **Vue.js Vite** - Vue 3 + Pinia + Router + Tailwind
14. **Remix Starter** - Remix + Tailwind + Prisma posts
15. **Serverless Functions** - Vercel/Netlify/AWS handlers
16. **Monorepo Turborepo** - web + api + shared packages

### Infrastructure
- ✅ README files for all boilerplates
- ✅ Testing scripts (simple-test.sh includes all 16 roots; PERN paths updated)
- ✅ TESTING_GUIDE.md
- ⏳ TEST_RESULTS.md needs refresh after smoke tests

## What Needs Review ⚠️

### Future Postgres migrations
1. **CRM Platform** - Mongo/Mongoose → Prisma/PostgreSQL
2. **E-commerce Platform** - Mongo/Mongoose → Prisma/PostgreSQL

### Hygiene
- ✅ `.gitignore` / `.env.example` on high-priority templates
- ⏳ Full install/runtime smoke tests still manual

## What's Left to Build

### Immediate
1. ✅ Flesh Phase A stubs
2. ✅ Phase B thicken partials (PERN / Stripe / Docker)
3. ⏳ Refresh TEST_RESULTS.md after smoke tests

### Future Enhancements
1. Migrate CRM + ecommerce to Postgres
2. Real-time Socket.io boilerplate
3. SaaS starter (multi-tenant + Stripe)
4. tRPC starter
5. CI/CD GitHub Actions templates
6. Later: Expo mobile starter

## Current Priorities
1. **Smoke testing** PERN, Stripe, Docker locally
2. **Then** CRM/ecommerce Postgres migration or new templates

## Success Indicators
- ✅ Stub boilerplates expanded with runnable source
- ✅ Phase B partials converted to Postgres-first
- ⏳ All boilerplates pass local install + boot smoke tests
