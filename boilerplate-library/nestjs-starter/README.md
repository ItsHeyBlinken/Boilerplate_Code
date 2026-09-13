# 🚀 NestJS Starter Boilerplate

A production-ready NestJS application with TypeScript, PostgreSQL, authentication, and enterprise patterns. Perfect for building scalable, maintainable backend applications.


## When you're ready to use this template

This folder is a **starting point** only. You do **not** need to install packages, create databases, or run servers while it sits in the boilerplate library.

When you are ready to build a real project from it:

1. Copy this folder to your new project directory
2. Run `npm install`
3. Copy `.env.example` → `.env` and set `DATABASE_URL` + JWT secrets
4. Apply the Prisma schema (`npx prisma migrate dev` or `db push`) against your PostgreSQL database
5. Run `npm run start:dev` (or the README’s preferred start script)
6. Customize modules, auth, and domain services for your product

Do not commit real API keys or passwords. Treat `.env` as local-only.

## 📋 Table of Contents

- [Features](#features)
- [Why NestJS?](#why-nestjs)
- [Use Cases](#use-cases)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Authentication](#authentication)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **🏗️ NestJS Framework**: Enterprise-grade Node.js framework
- **📘 TypeScript**: Full type safety throughout
- **🗄️ PostgreSQL**: Robust database with Prisma ORM
- **🔐 JWT Authentication**: Secure token-based auth with Passport
- **📝 Validation**: Automatic validation with class-validator
- **📚 Swagger/OpenAPI**: Auto-generated API documentation
- **🔄 Dependency Injection**: Built-in IoC container
- **🛡️ Guards**: Role-based access control
- **📊 Interceptors**: Request/response transformation
- **🧪 Testing**: Unit and E2E testing setup
- **🔧 Configuration**: Environment-based configuration

## 🎯 Why NestJS?

### Perfect For:
- **Enterprise Applications**: Built for large-scale, maintainable codebases
- **Microservices**: Excellent support for distributed systems
- **Team Projects**: Clear structure and conventions
- **Type Safety**: Full TypeScript support with decorators
- **Modular Architecture**: Dependency injection and modules
- **Scalability**: Built for growth and complexity

### Key Advantages:
- **Dependency Injection**: Testable, maintainable code
- **Decorators**: Clean, declarative code
- **Modules**: Organized, reusable components
- **Guards**: Centralized authorization
- **Interceptors**: Cross-cutting concerns
- **Pipes**: Data transformation and validation

## 🎯 Use Cases

### 1. **Enterprise Backend Applications**
- Large-scale applications with complex business logic
- Multiple teams working on different modules
- Long-term maintainability requirements
- Strict architectural patterns needed

### 2. **Microservices Architecture**
- Distributed systems
- Service-to-service communication
- API gateways
- Service discovery

### 3. **Team-Based Development**
- Clear code organization
- Consistent patterns across team
- Easy onboarding for new developers
- Separation of concerns

### 4. **Complex Business Logic**
- Financial applications
- Healthcare systems
- E-commerce platforms
- SaaS applications

### 5. **API-First Development**
- RESTful APIs
- GraphQL APIs (with @nestjs/graphql)
- WebSocket applications
- gRPC services

### 6. **Scalable Applications**
- High-traffic applications
- Applications that need to grow
- Performance-critical systems
- Production-ready from day one

## 🛠️ Prerequisites

- **Node.js** (v18+ recommended)
- **PostgreSQL** (v14+ recommended)
- **npm** or **yarn** or **pnpm**
- **Git**

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd boilerplate-library/nestjs-starter
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
npm run start:dev
```

The API will be available at `http://localhost:3000`
Swagger documentation at `http://localhost:3000/api`

### 5. Test the API

```bash
# Health check
curl http://localhost:3000/health

# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secure123","name":"John Doe"}'
```

## 📁 Project Structure

```
nestjs-starter/
├── src/
│   ├── auth/                 # Authentication module
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── strategies/       # Passport strategies
│   │   │   ├── jwt.strategy.ts
│   │   │   └── local.strategy.ts
│   │   └── guards/           # Auth guards
│   │       └── jwt-auth.guard.ts
│   ├── users/                # Users module
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   └── dto/              # Data Transfer Objects
│   │       ├── create-user.dto.ts
│   │       └── update-user.dto.ts
│   ├── common/               # Shared utilities
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── pipes/
│   ├── config/               # Configuration
│   │   └── database.config.ts
│   ├── prisma/               # Prisma service
│   │   └── prisma.service.ts
│   ├── app.module.ts         # Root module
│   └── main.ts               # Application entry point
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Database seed script
├── test/                     # E2E tests
├── .env.example              # Environment variables template
├── nest-cli.json             # NestJS CLI configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| **NestJS** | ^10.2.10 | Enterprise Node.js framework |
| **TypeScript** | ^5.3.2 | Type safety |
| **Prisma** | ^5.7.0 | Database ORM |
| **PostgreSQL** | - | Database |
| **Passport** | ^0.7.0 | Authentication |
| **JWT** | ^10.2.0 | Token-based auth |
| **class-validator** | ^0.14.0 | Input validation |
| **Swagger** | ^7.1.16 | API documentation |
| **Jest** | ^29.7.0 | Testing framework |

## 🏗️ Architecture

### Modules

NestJS uses a modular architecture:

```typescript
// Each feature is a module
@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Export for use in other modules
})
export class UsersModule {}
```

### Dependency Injection

```typescript
// Services are injected via constructor
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  
  async findAll() {
    return this.prisma.user.findMany();
  }
}
```

### Controllers

```typescript
// Controllers handle HTTP requests
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
```

## 🔐 Authentication

### JWT Strategy

Uses Passport JWT strategy for token-based authentication:

```typescript
// JWT tokens are validated on each request
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Request() req) {
  return req.user;
}
```

### Registration Flow

1. User registers with email/password
2. Password is hashed with bcrypt
3. User is created in database
4. JWT token is generated
5. Token is returned to client

## 🗄️ Database Setup

### Prisma Schema

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  role      String   @default("USER")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Migrations

```bash
# Create and apply migration
npm run db:migrate

# Generate Prisma Client
npm run db:generate
```

## 🔧 Environment Variables

Create a `.env` file:

```bash
# Server Configuration
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nestjs_db"

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `npm run start:dev` | Start with hot reload |
| **Build** | `npm run build` | Compile TypeScript |
| **Start** | `npm run start:prod` | Start production server |
| **Lint** | `npm run lint` | Run ESLint |
| **Test** | `npm test` | Run unit tests |
| **Test E2E** | `npm run test:e2e` | Run E2E tests |
| **DB Generate** | `npm run db:generate` | Generate Prisma Client |
| **DB Migrate** | `npm run db:migrate` | Run migrations |

## 🧪 Testing

```bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start:prod
```

### Docker Support

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]
```

## 🔧 Troubleshooting

### Common Issues

**Q: Module not found errors**
- Run `npm run db:generate` after schema changes
- Check imports are correct

**Q: Validation errors**
- Ensure DTOs use class-validator decorators
- Check request body matches DTO structure

**Q: Authentication not working**
- Verify JWT_SECRET is set
- Check token is included in Authorization header
- Verify token format: "Bearer <token>"

## 📚 Learning Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [NestJS Best Practices](https://github.com/nestjs/awesome-nestjs)
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

**Happy Coding with NestJS! 🚀**

This boilerplate provides a solid foundation for building enterprise-grade backend applications with NestJS, following best practices and modern patterns.

