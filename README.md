# 🚀 Boilerplate Library

A comprehensive collection of production-ready boilerplate code for different project types. Save time when starting new projects with these GitHub-ready starting points.

## 📂 Available Boilerplates

### Frontend Boilerplates
| Boilerplate | Description | Use Cases |
|-------------|-------------|-----------|
| [**Static HTML/CSS/JS**](./html-css-js/) | Modern landing page template with responsive design | Landing pages, portfolios, marketing sites |
| [**React (Vite)**](./react-vite/) | Client-side app with routing + state management | Dashboards, admin panels, single-page apps |
| [**Vue.js (Vite)**](./vue-vite/) | Vue 3 app with Composition API, Pinia, and Tailwind | Vue-based SPAs, progressive web apps, component libraries |
| [**Next.js Starter**](./nextjs-starter/) | Full-stack React with API routes + auth placeholder | Full-stack web apps, e-commerce sites, blogs |
| [**Remix Starter**](./remix-starter/) | Full-stack React framework with web standards | Progressive web apps, SEO-critical sites, data-heavy apps |

### Backend Boilerplates
| Boilerplate | Description | Use Cases |
|-------------|-------------|-----------|
| [**Express.js API**](./express-api/) | REST API with JWT auth, error handling, PostgreSQL | REST APIs, microservices, backend services |
| [**GraphQL API**](./graphql-api/) | GraphQL API with Apollo Server and Prisma | Modern APIs, mobile backends, flexible querying |
| [**NestJS Starter**](./nestjs-starter/) | Enterprise Node.js framework with TypeScript | Enterprise apps, microservices, scalable backends |
| [**Node.js + PostgreSQL (Prisma)**](./node-postgres/) | Database starter with migrations and seed data | Database-driven applications, user management systems |
| [**Serverless Functions**](./serverless-functions/) | Serverless function templates for AWS, Vercel, Netlify | Cost-effective APIs, event processing, microservices |

### Full-Stack Boilerplates
| Boilerplate | Description | Use Cases |
|-------------|-------------|-----------|
| [**MERN Starter**](./mern-starter/) | MongoDB + Express + React + Node CRUD app | Full-stack applications, content management systems |
| [**CRM Platform**](./crm-platform/) | Complete CRM with contact, lead, and deal management | Customer relationship management, sales tracking |
| [**E-commerce Platform**](./ecommerce-platform/) | Full e-commerce with products, cart, and payments | Online stores, marketplaces, retail platforms |

### Infrastructure & Tools
| Boilerplate | Description | Use Cases |
|-------------|-------------|-----------|
| [**Stripe Integration**](./stripe-integration/) | Payment flow with checkout + webhook handler | E-commerce, subscription services, payment processing |
| [**Dockerized Node App**](./docker-node/) | Deployment-ready template with Docker | Production deployments, scalable applications |
| [**Monorepo (Turborepo)**](./monorepo-turborepo/) | Monorepo setup with Turborepo for multiple packages | Multi-app projects, shared packages, team collaboration |

## 🔧 Usage Workflow

When starting a new project:

1. **Clone this repository**
   ```bash
   git clone <your-repo-url> boilerplate-library
   cd boilerplate-library
   ```

2. **Copy the boilerplate you need**
   ```bash
   cp -r ./html-css-js ../my-new-project
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
cp -r ./html-css-js ../my-landing-page
cd ../my-landing-page
# Follow html-css-js/README.md instructions
```

### Dashboard App
```bash
cp -r ./react-vite ../my-dashboard
cd ../my-dashboard
npm install
npm run dev
```

### Full-Stack App
```bash
cp -r ./nextjs-starter ../my-fullstack-app
cd ../my-fullstack-app
npm install
npm run dev
```

### Backend API
```bash
cp -r ./express-api ../my-api
cd ../my-api
npm install
npm run dev
```

## 📋 Prerequisites

- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **Git**
- **PostgreSQL** (for database boilerplates)
- **MongoDB** (for MERN boilerplate)
- **Docker** (for Dockerized boilerplate)

## 🛠️ Technology Stack

Each boilerplate uses modern, production-ready technologies:

- **Frontend**: React, Next.js, Remix, Vue.js, Vite, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, NestJS, GraphQL (Apollo), TypeScript
- **Database**: PostgreSQL (Prisma), MongoDB (Mongoose)
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