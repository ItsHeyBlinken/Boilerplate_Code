# 🚀 Boilerplate Library

A comprehensive collection of production-ready boilerplate code for different project types. Save time when starting new projects with these GitHub-ready starting points.

**Library vs project:** Templates in this repo are starting points only. You do not need to install dependencies or provision databases inside the library. Each boilerplate README has a **When you're ready to use this template** section with the copy → configure → run steps for that stack.

## Use Cases Showcase (web UI)

Browse ranked project ideas and download template ZIPs.

**Recommended (VPS):** pull your deploy branch, then:

```bash
docker compose up -d --build
```

Serves on port **8080** by default (`SHOWCASE_PORT` to override). See [showcase/README.md](./showcase/README.md).

**Local UI:** `npm run showcase:install` then `npm run showcase:dev`.

## 📂 Available Boilerplates

### Frontend Boilerplates
| Boilerplate | Description | Use Cases |
|-------------|-------------|-----------|
| [**Static HTML/CSS/JS**](./boilerplate-library/html-css-js/) | Modern landing page template with responsive design | Landing pages, portfolios, marketing sites |
| [**React (Vite)**](./boilerplate-library/react-vite/) | Client-side app with routing + state management | Dashboards, admin panels, single-page apps |
| [**Vue.js (Vite)**](./boilerplate-library/vue-vite/) | Vue 3 app with Composition API, Pinia, and Tailwind | Vue-based SPAs, progressive web apps, component libraries |
| [**Next.js Starter**](./boilerplate-library/nextjs-starter/) | Full-stack React with API routes + auth placeholder | Full-stack web apps, e-commerce sites, blogs |
| [**Remix Starter**](./boilerplate-library/remix-starter/) | Full-stack React framework with web standards | Progressive web apps, SEO-critical sites, data-heavy apps |

### Backend Boilerplates
| Boilerplate | Description | Use Cases |
|-------------|-------------|-----------|
| [**Express.js API**](./boilerplate-library/express-api/) | REST API with JWT auth, error handling, PostgreSQL | REST APIs, microservices, backend services |
| [**GraphQL API**](./boilerplate-library/graphql-api/) | GraphQL API with Apollo Server and Prisma | Modern APIs, mobile backends, flexible querying |
| [**NestJS Starter**](./boilerplate-library/nestjs-starter/) | Enterprise Node.js framework with TypeScript | Enterprise apps, microservices, scalable backends |
| [**Node.js + PostgreSQL (Prisma)**](./boilerplate-library/node-postgres/) | Database starter with migrations and seed data | Database-driven applications, user management systems |
| [**Serverless Functions**](./boilerplate-library/serverless-functions/) | Serverless function templates for AWS, Vercel, Netlify | Cost-effective APIs, event processing, microservices |

### Full-Stack Boilerplates
| Boilerplate | Description | Use Cases |
|-------------|-------------|-----------|
| [**PERN Starter**](./boilerplate-library/pern-starter/) | PostgreSQL + Express + React + Node (Prisma) CRUD app | Full-stack applications, content management systems |
| [**CRM Platform**](./boilerplate-library/crm-platform/) | Lean CRM (contacts, leads, deals) on PostgreSQL + Prisma | Customer relationship management, sales tracking |
| [**E-commerce Platform**](./boilerplate-library/ecommerce-platform/) | Lean shop (products, cart, orders) on PostgreSQL + Prisma | Online stores, marketplaces, retail platforms |
| [**Blog / CMS**](./boilerplate-library/blog-cms/) | Next.js App Router blog + admin CMS on PostgreSQL + Prisma | Blogs, content sites, editorial workflows |
| [**Realtime Socket.io**](./boilerplate-library/realtime-socketio/) | Express + Socket.io + React rooms/chat on PostgreSQL + Prisma | Chat apps, presence, collaborative tools |
| [**SaaS Starter**](./boilerplate-library/saas-starter/) | Multi-tenant orgs + Stripe Checkout on Next.js + Prisma | B2B SaaS, workspace billing, vertical SaaS |
| [**tRPC Starter**](./boilerplate-library/trpc-starter/) | Next.js + tRPC + Prisma end-to-end typesafe CRUD | Typesafe full-stack apps, internal tools |

### Infrastructure & Tools
| Boilerplate | Description | Use Cases |
|-------------|-------------|-----------|
| [**Stripe Integration**](./boilerplate-library/stripe-integration/) | Payment flow with checkout + webhook handler | E-commerce, subscription services, payment processing |
| [**Dockerized Node App**](./boilerplate-library/docker-node/) | Deployment-ready template with Docker | Production deployments, scalable applications |
| [**Monorepo (Turborepo)**](./boilerplate-library/monorepo-turborepo/) | Monorepo setup with Turborepo for multiple packages | Multi-app projects, shared packages, team collaboration |

## 🔧 Usage Workflow

When starting a new project:

1. **Clone this repository**
   ```bash
   git clone <your-repo-url>
   cd Boilerplate_Code   # or your clone directory
   ```

2. **Copy the boilerplate you need**
   ```bash
   cp -r ./boilerplate-library/html-css-js ../my-new-project
   cd ../my-new-project
   ```

3. **Follow the setup instructions**
   - Read the `README.md` in your chosen boilerplate
   - Install dependencies
   - Set up environment variables
   - Run the project

4. **Start coding unique features**
   - Customize the boilerplate for your specific needs
   - Add your business logic
   - Deploy to your VPS

## 🎯 Quick Start Examples

### Landing Page Project
```bash
cp -r ./boilerplate-library/html-css-js ../my-landing-page
cd ../my-landing-page
# Follow html-css-js/README.md instructions
```

### Dashboard App
```bash
cp -r ./boilerplate-library/react-vite ../my-dashboard
cd ../my-dashboard
npm install
npm run dev
```

### Full-Stack App
```bash
cp -r ./boilerplate-library/nextjs-starter ../my-fullstack-app
cd ../my-fullstack-app
npm install
npm run dev
```

### Backend API
```bash
cp -r ./boilerplate-library/express-api ../my-api
cd ../my-api
npm install
npm run dev
```

## 📋 Prerequisites

- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **Git**
- **PostgreSQL** (for database / PERN / Stripe / Docker / CRM / ecommerce / Blog / Realtime / SaaS / tRPC boilerplates)
- **Docker** (for Dockerized boilerplate)

## 🛠️ Technology Stack

Each boilerplate uses modern, production-ready technologies:

- **Frontend**: React, Next.js, Remix, Vue.js, Vite, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, NestJS, GraphQL (Apollo), TypeScript
- **Database**: PostgreSQL (Prisma) across modern templates
- **Authentication**: JWT, NextAuth.js, Passport
- **Validation**: Zod, class-validator
- **State Management**: Zustand, Pinia
- **Styling**: Tailwind CSS
- **Testing**: Jest, Vitest
- **Code Quality**: ESLint, Prettier
- **Deployment**: Docker, Docker Compose, Vercel, AWS Lambda, Netlify
- **Monorepo**: Turborepo, npm Workspaces

## 📚 Contributing

1. Fork this repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the individual boilerplate README files
2. Look at the troubleshooting sections
3. Open an issue on GitHub
4. Check the sample use cases for guidance

## 💡 Project Ideas

Looking for inspiration? Check out our [Creative Project Use Cases](./PROJECT_USE_CASES.md) document with 60+ unique, out-of-the-box project ideas for each boilerplate. From community-driven platforms to niche problem-solving applications, find the perfect project to build!

---

**Happy Coding! 🎉**

Start your next project faster with these battle-tested boilerplates.