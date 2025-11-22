# 🚀 GraphQL API Boilerplate

A production-ready GraphQL API built with Apollo Server, TypeScript, Prisma, and PostgreSQL. Perfect for modern APIs that need flexible querying, type safety, and real-time capabilities.

## 📋 Table of Contents

- [Features](#features)
- [Why GraphQL?](#why-graphql)
- [Use Cases](#use-cases)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [GraphQL Basics](#graphql-basics)
- [Authentication](#authentication)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **🔷 GraphQL API**: Flexible querying with Apollo Server
- **📘 TypeScript**: Full type safety throughout
- **🗄️ PostgreSQL**: Robust database with Prisma ORM
- **🔐 JWT Authentication**: Secure token-based auth
- **📝 Type-Safe Schema**: TypeGraphQL for schema definition
- **🔄 DataLoaders**: N+1 query optimization (ready to implement)
- **📊 Subscriptions**: Real-time updates (ready to implement)
- **✅ Input Validation**: Automatic validation with class-validator
- **🛡️ Authorization**: Role-based access control
- **📚 Code Generation**: GraphQL Code Generator support

## 🎯 Why GraphQL?

### Perfect For:
- **Mobile Apps**: Fetch only needed data, reduce payload size
- **Multiple Clients**: Web, mobile, desktop with different data needs
- **Complex Relationships**: Nested queries in single request
- **Real-time Apps**: Subscriptions for live updates
- **Microservices**: GraphQL gateway pattern
- **Over-fetching Issues**: Clients request exactly what they need

### Example Query:
```graphql
# Single query fetches user with posts and comments
{
  user(id: "1") {
    name
    email
    posts {
      title
      content
      comments {
        content
        author {
          name
        }
      }
    }
  }
}
```

## 🎯 Use Cases

### 1. **Mobile App Backends**
- Reduce data transfer with flexible queries
- Fetch only needed fields
- Optimize for slow connections

### 2. **Multi-Client Applications**
- Web app needs full user profile
- Mobile app needs minimal data
- Desktop app needs different fields
- All from same API endpoint

### 3. **Real-time Applications**
- Live chat applications
- Real-time dashboards
- Collaborative tools
- Live notifications

### 4. **Microservices Architecture**
- GraphQL gateway pattern
- Aggregate multiple services
- Single endpoint for clients

### 5. **Complex Data Relationships**
- Blog with authors, posts, comments
- E-commerce with products, reviews, categories
- Social media with users, posts, likes, shares

### 6. **API for Multiple Teams**
- Frontend team requests specific fields
- Mobile team requests different fields
- Backend team maintains single API

## 🛠️ Prerequisites

- **Node.js** (v18+ recommended)
- **PostgreSQL** (v14+ recommended)
- **npm** or **yarn** or **pnpm**
- **Git**

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd boilerplate-library/graphql-api
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Set Up Database

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# (Optional) Seed database
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

The GraphQL API will be available at `http://localhost:4000/graphql`

### 5. Test the API

Open GraphQL Playground (in development) or use a GraphQL client:

```graphql
# Example Query
query {
  users {
    id
    email
    name
    posts {
      title
    }
  }
}

# Example Mutation
mutation {
  register(input: {
    email: "user@example.com"
    name: "John Doe"
    password: "secure123"
  }) {
    token
    user {
      id
      email
    }
  }
}
```

## 📁 Project Structure

```
graphql-api/
├── src/
│   ├── resolvers/          # GraphQL resolvers (queries, mutations)
│   │   ├── UserResolver.ts
│   │   ├── PostResolver.ts
│   │   └── AuthResolver.ts
│   ├── types/              # GraphQL type definitions
│   │   ├── User.ts
│   │   ├── Post.ts
│   │   └── AuthPayload.ts
│   ├── inputs/             # Input types for mutations
│   │   ├── CreateUserInput.ts
│   │   ├── UpdateUserInput.ts
│   │   ├── CreatePostInput.ts
│   │   ├── LoginInput.ts
│   │   └── RegisterInput.ts
│   ├── schema/             # Schema composition
│   │   └── index.ts
│   ├── config/             # Configuration files
│   │   └── database.ts
│   ├── utils/              # Utility functions
│   │   ├── jwt.ts
│   │   ├── password.ts
│   │   └── logger.ts
│   ├── context.ts           # GraphQL context
│   └── index.ts            # Server entry point
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seed script
├── .env.example            # Environment variables template
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| **Apollo Server** | ^4.9.5 | GraphQL server |
| **TypeGraphQL** | ^1.1.1 | Type-safe schema definition |
| **GraphQL** | ^16.8.1 | GraphQL core |
| **TypeScript** | ^5.3.2 | Type safety |
| **Prisma** | ^5.7.0 | Database ORM |
| **PostgreSQL** | - | Database |
| **Express** | ^4.18.2 | HTTP server |
| **JWT** | ^9.0.2 | Authentication |
| **class-validator** | ^0.14.0 | Input validation |
| **DataLoader** | ^2.2.0 | N+1 query optimization |

## 📚 GraphQL Basics

### Queries (Read Operations)

```graphql
# Get all users
query {
  users {
    id
    email
    name
  }
}

# Get user by ID with nested posts
query {
  user(id: "1") {
    id
    email
    posts {
      title
      content
    }
  }
}

# Get current authenticated user
query {
  me {
    id
    email
    name
  }
}
```

### Mutations (Write Operations)

```graphql
# Register new user
mutation {
  register(input: {
    email: "user@example.com"
    name: "John Doe"
    password: "secure123"
  }) {
    token
    user {
      id
      email
    }
  }
}

# Create post
mutation {
  createPost(input: {
    title: "My First Post"
    content: "This is the content"
  }) {
    id
    title
    author {
      name
    }
  }
}
```

### Benefits

- **Flexible Queries**: Request only needed fields
- **Nested Data**: Get related data in one query
- **Type Safety**: TypeScript types generated from schema
- **Single Endpoint**: One endpoint for all operations
- **Introspection**: Self-documenting API

## 🔐 Authentication

### How It Works

1. **Register/Login**: Get JWT token
2. **Include Token**: Add to Authorization header
3. **Context Extraction**: Server extracts user from token
4. **Authorization**: Resolvers check user permissions

### Example Request

```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "query": "{ me { id email name } }"
  }'
```

## 🗄️ Database Setup

### Prisma Schema

The schema defines your database structure:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  role      String   @default("USER")
  posts     Post[]
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
}
```

### Migrations

```bash
# Create migration
npm run db:migrate

# Apply migrations
npm run db:migrate

# Reset database
npx prisma migrate reset
```

## 🔧 Environment Variables

Create a `.env` file:

```bash
# Server Configuration
NODE_ENV=development
PORT=4000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/graphql_db"

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `npm run dev` | Start development server with hot reload |
| **Build** | `npm run build` | Compile TypeScript to JavaScript |
| **Start** | `npm start` | Start production server |
| **Lint** | `npm run lint` | Run ESLint |
| **Test** | `npm test` | Run tests |
| **Type Check** | `npm run type-check` | Run TypeScript compiler |
| **DB Generate** | `npm run db:generate` | Generate Prisma Client |
| **DB Migrate** | `npm run db:migrate` | Run database migrations |
| **DB Seed** | `npm run db:seed` | Seed database |

## 🧪 Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

Set production environment variables:
- `NODE_ENV=production`
- `DATABASE_URL` (production database)
- `JWT_SECRET` (strong secret key)
- `CORS_ORIGIN` (production frontend URL)

## 🔧 Troubleshooting

### Common Issues

**Q: GraphQL Playground not showing**
- Check if `NODE_ENV` is set to `development`
- Verify server is running on correct port

**Q: Database connection errors**
- Verify `DATABASE_URL` is correct
- Check PostgreSQL is running
- Run `npm run db:generate` after schema changes

**Q: Type errors**
- Run `npm run type-check`
- Ensure Prisma Client is generated: `npm run db:generate`

## 📚 Learning Resources

- [GraphQL Documentation](https://graphql.org/learn/)
- [Apollo Server Docs](https://www.apollographql.com/docs/apollo-server/)
- [TypeGraphQL Docs](https://typegraphql.com/)
- [Prisma Docs](https://www.prisma.io/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License

---

**Happy Coding with GraphQL! 🚀**

This boilerplate provides a solid foundation for building modern GraphQL APIs with type safety, authentication, and best practices.

