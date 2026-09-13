# File Directory: Project Structure Breakdown

## Root Level Files
- `README.md` - Main project overview and usage guide
- `package.json` - Root scripts for showcase sync/pack/build/docker
- `.gitignore` - Ignores node_modules, showcase dist, generated ZIPs
- `Dockerfile` / `docker-compose.yml` / `.dockerignore` - Showcase VPS container (nginx + packed ZIPs)
- `PROJECT_USE_CASES.md` - Ranked collapsible project ideas (source of truth)
- `scripts/pack-templates.mjs` - Zip each boilerplate into showcase downloads
- `scripts/sync-use-cases.mjs` - Parse use-cases MD → showcase JSON
- `showcase/` - Vite React UI + `nginx.conf` for container
- `TESTING_GUIDE.md` - Comprehensive testing documentation
- `TEST_RESULTS.md` - Test results and status for all boilerplates
- `test-boilerplates.sh` - Docker-based comprehensive testing script
- `simple-test.sh` - Simple structure validation script (no dependencies)

## Boilerplate Library Structure

### 1. html-css-js/
**Purpose**: Static HTML/CSS/JavaScript landing page template
- `index.html` - Main HTML file
- `styles.css` - CSS styles
- `script.js` - JavaScript functionality
- `README.md` - Documentation

### 2. react-vite/
**Purpose**: Modern React application with Vite
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `index.html` - HTML entry point
- `src/` - Source code directory
  - `App.tsx` - Main app component
  - `main.tsx` - Application entry point
  - `components/` - Reusable UI components
  - `pages/` - Page components
  - `store/` - Zustand state management
  - `utils/` - Utility functions
  - `index.css` - Global styles
- `README.md` - Documentation
- `.gitignore` - Git ignore rules

### 3. nextjs-starter/
**Purpose**: Full-stack Next.js application
- `package.json` - Dependencies and scripts
- `next.config.js` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `prisma/` - Prisma ORM files
  - `schema.prisma` - Database schema
  - `seed.ts` - Database seed script
- `src/` - Source code directory
  - `app/` - Next.js App Router pages
  - `components/` - React components
  - `lib/` - Utility libraries
- `README.md` - Documentation

### 4. express-api/
**Purpose**: Express.js REST API backend
- `package.json` - Dependencies and scripts
- `knexfile.js` - Knex.js database configuration
- `tsconfig.json` - TypeScript configuration
- `src/` - Source code directory
  - `index.ts` - Application entry point
  - `config/` - Configuration files
  - `controllers/` - Route controllers
  - `middleware/` - Express middleware
  - `routes/` - API route definitions
  - `database/` - Database files
    - `migrations/` - Database migrations
  - `utils/` - Utility functions
- `README.md` - Documentation

### 5. node-postgres/
**Purpose**: Node.js with PostgreSQL and Prisma
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `prisma/` - Prisma ORM files
  - `schema.prisma` - Database schema
  - `seed.ts` - Database seed script
- `src/` - Source code directory
  - `index.ts` - Application entry point
  - `config/` - Configuration files
  - `controllers/` - Route controllers
  - `middleware/` - Express middleware
  - `routes/` - API route definitions
  - `utils/` - Utility functions
- `README.md` - Documentation

### 6. pern-starter/
**Purpose**: Full-stack PERN (PostgreSQL, Express, React, Node) application with Prisma
- `package.json` - Root package.json with scripts
- `README.md` - Documentation
- `client/` - React frontend (Zustand auth, posts UI)
- `server/` - Express + Prisma backend
  - `prisma/schema.prisma` - User, Post, Like
  - `src/routes/` - auth, users, posts, health
  - `src/lib/prisma.ts` - Prisma client

### 7. stripe-integration/
**Purpose**: Payment processing with Stripe (Prisma + PostgreSQL)
- `prisma/schema.prisma` - User, Product, Payment, Subscription
- `src/routes/` - auth, products, payments (PaymentIntent + Checkout), subscriptions, webhooks
- `src/config/stripe.ts` - Stripe helpers
- `README.md` - Documentation

### 8. docker-node/
**Purpose**: Dockerized Node.js + Prisma + PostgreSQL application
- `Dockerfile` / `Dockerfile.dev`
- `docker-compose.dev.yml` / `docker-compose.prod.yml` (Postgres + optional Nginx; no Redis/Mongo)
- `prisma/schema.prisma` - Note model
- `src/` - Express app with `/health` and `/api/notes`
- `nginx/` - Reverse proxy configs
- `README.md` - Documentation

### 9. crm-platform/
**Purpose**: Lean CRM (contacts, leads, deals) on PostgreSQL + Prisma
- `client/` - React + Zustand auth, Dashboard/Contacts/Leads/Deals
- `server/`
  - `prisma/schema.prisma` - User, Contact, Lead, Deal
  - `src/routes/` - auth, contacts, leads, deals, dashboard
  - `src/lib/prisma.ts`

### 10. ecommerce-platform/
**Purpose**: Lean shop (products, cart, orders) on PostgreSQL + Prisma
- `client/` - React shop UI (Home/Products/Cart/Orders)
- `server/`
  - `prisma/schema.prisma` - User, Category, Product, CartItem, Order, OrderItem
  - `src/routes/` - auth, users, products, categories, cart, orders, payments
  - Thin Stripe PaymentIntent endpoint

### 11. blog-cms/
**Purpose**: Lean Next.js App Router blog + minimal CMS on PostgreSQL + Prisma
- `prisma/schema.prisma` - User, Post (DRAFT|PUBLISHED)
- `src/app/` - public list/detail, login/register, admin CRUD, API auth/posts
- `src/lib/` - prisma, auth (jose cookie JWT), password
- `src/components/SiteHeader.tsx`
- `.env.example`, README with ready-to-use steps

### 12. realtime-socketio/
**Purpose**: Lean realtime chat/presence on Express + Socket.io + Prisma
- `server/prisma/schema.prisma` - User, Room, Message
- `server/src/` - auth/rooms HTTP routes; socket handlers (join/leave/chat + presence)
- `client/` - Vite React + Zustand + socket.io-client (rooms list, chat page)
- Root `npm run dev` runs client + server concurrently

### 13. saas-starter/
**Purpose**: Lean multi-tenant SaaS with Stripe org billing on Next.js + Prisma
- `prisma/schema.prisma` - User, Organization, Membership
- `src/app/` - auth, dashboard, org members/billing, API auth/orgs/billing/webhooks
- `src/lib/` - prisma, auth, stripe, tenant helpers
- README with ready-to-use + Use Cases

### 14. trpc-starter/
**Purpose**: Lean end-to-end typesafe API on Next.js + tRPC + Prisma
- `prisma/schema.prisma` - User, Post
- `src/server/` - trpc init, auth + posts routers
- `src/app/api/trpc/[trpc]/route.ts` - fetch adapter
- `src/trpc/` - React Query provider + createTRPCReact client
- README with ready-to-use + Use Cases

## Common File Patterns

### Configuration Files (Common Across Projects)
- `package.json` - Node.js dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `.env.example` - Environment variable template (should exist)
- `.gitignore` - Git ignore rules (should exist)

### Frontend-Specific Files
- `vite.config.ts` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `tsconfig.node.json` - TypeScript config for Node scripts (Vite projects)

### Backend-Specific Files
- `knexfile.js` - Knex.js database configuration (Express projects)
- `prisma/schema.prisma` - Prisma database schema (Prisma projects)

### Documentation Files
- `README.md` - Comprehensive documentation for each boilerplate

## Missing Files (To Be Added)
- `.env.example` files in several boilerplates
- `.gitignore` files in most boilerplates

