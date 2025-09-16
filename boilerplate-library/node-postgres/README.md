# 🚀 Node.js + PostgreSQL Boilerplate

A modern, production-ready Node.js application with Prisma ORM, PostgreSQL database, TypeScript, and comprehensive authentication. Perfect for building robust backend services with type-safe database access and modern development practices.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Prisma Commands](#prisma-commands)
- [Customization](#customization)
- [Sample Use Cases](#sample-use-cases)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## ✨ Features

- **⚡ Node.js**: Fast, scalable JavaScript runtime
- **📘 TypeScript**: Full type safety and better DX
- **🗄️ Prisma ORM**: Type-safe database access
- **🐘 PostgreSQL**: Robust relational database
- **🔐 JWT Authentication**: Secure token-based authentication
- **📝 Input Validation**: Joi schema validation
- **🛡️ Security**: Helmet, CORS, rate limiting
- **📊 Logging**: Winston logging system
- **🔄 Database Migrations**: Version-controlled schema changes
- **🌱 Database Seeding**: Sample data for development
- **📚 API Documentation**: Built-in endpoint documentation
- **🧪 Testing Ready**: Jest testing framework setup

## 🛠️ Prerequisites

- **Node.js** (v18+ recommended)
- **PostgreSQL** (v14+ recommended)
- **npm** or **yarn** or **pnpm**
- **Git**

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Copy the boilerplate to your project directory
cp -r ./node-postgres ../my-node-app
cd ../my-node-app

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### 2. Environment Setup

```bash
# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 3. Database Setup

```bash
# Set up your PostgreSQL database
createdb node_postgres_db

# Generate Prisma client
npm run db:generate

# Push the schema to your database
npm run db:push

# Seed the database with sample data
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 5. Test the API

```bash
# Health check
curl http://localhost:3001/health

# API documentation
curl http://localhost:3001/api-docs
```

## 📁 Project Structure

```
node-postgres/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding
├── src/
│   ├── config/                # Configuration files
│   │   └── database.ts        # Database configuration
│   ├── controllers/           # Route controllers
│   │   ├── AuthController.ts
│   │   ├── UserController.ts
│   │   ├── PostController.ts
│   │   ├── CategoryController.ts
│   │   ├── TagController.ts
│   │   └── CommentController.ts
│   ├── middleware/            # Express middleware
│   │   ├── auth.ts            # Authentication middleware
│   │   ├── errorHandler.ts    # Error handling
│   │   ├── notFoundHandler.ts
│   │   └── validation.ts      # Input validation
│   ├── routes/                # API routes
│   │   ├── auth.ts            # Authentication routes
│   │   ├── users.ts           # User routes
│   │   ├── posts.ts           # Post routes
│   │   ├── categories.ts      # Category routes
│   │   ├── tags.ts            # Tag routes
│   │   ├── comments.ts        # Comment routes
│   │   └── health.ts          # Health check routes
│   ├── utils/                 # Utility functions
│   │   ├── logger.ts          # Logging utility
│   │   ├── jwt.ts             # JWT utilities
│   │   ├── password.ts        # Password utilities
│   │   └── slug.ts            # Slug generation
│   └── index.ts               # Application entry point
├── logs/                      # Log files
├── .env.example               # Environment variables template
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | - | JavaScript runtime |
| **TypeScript** | ^5.3.2 | Type safety |
| **Express.js** | ^4.18.2 | Web framework |
| **Prisma** | ^5.7.0 | Database ORM |
| **PostgreSQL** | - | Database |
| **JWT** | ^9.0.2 | Authentication |
| **Joi** | ^17.11.0 | Validation |
| **Winston** | ^3.11.0 | Logging |
| **bcryptjs** | ^2.4.3 | Password hashing |
| **Helmet** | ^7.1.0 | Security |
| **CORS** | ^2.8.5 | Cross-origin requests |

## 🗄️ Database Schema

The application includes a comprehensive database schema with the following models:

### Core Models

- **User**: User accounts and profiles
- **Post**: Blog posts/content
- **Category**: Content categories
- **Tag**: Content tags
- **Comment**: Post comments
- **Like**: Post likes
- **Follow**: User follows
- **RefreshToken**: JWT refresh tokens

### Relationships

- Users can create multiple posts
- Posts belong to categories and have tags
- Users can like posts and follow other users
- Comments can be nested (replies)

### Key Features

- **UUID Primary Keys**: Secure, non-sequential IDs
- **Soft Relationships**: Proper foreign key constraints
- **Timestamps**: Automatic created/updated tracking
- **Enums**: Type-safe status and role fields
- **JSON Fields**: Flexible metadata storage

## 🔐 Authentication

### JWT Token System

- **Access Token**: Short-lived (7 days default)
- **Refresh Token**: Long-lived (30 days default)
- **Token Storage**: Database with device tracking
- **Security**: Token revocation on logout/password change

### User Roles

- **USER**: Regular user access
- **MODERATOR**: Content moderation access
- **ADMIN**: Full administrative access

### Authentication Flow

1. **Register**: Create account with email/password
2. **Login**: Receive access and refresh tokens
3. **Protected Routes**: Include Bearer token in Authorization header
4. **Token Refresh**: Use refresh token to get new access token
5. **Logout**: Revoke refresh token

## 🛣️ API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/login` | Login user | No |
| POST | `/api/v1/auth/logout` | Logout user | Yes |
| POST | `/api/v1/auth/refresh` | Refresh access token | No |
| POST | `/api/v1/auth/forgot-password` | Request password reset | No |
| POST | `/api/v1/auth/reset-password` | Reset password | No |
| POST | `/api/v1/auth/change-password` | Change password | Yes |
| GET | `/api/v1/auth/me` | Get current user profile | Yes |

### User Endpoints

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---------------|---------------|
| GET | `/api/v1/users` | Get all users | Yes | Admin |
| GET | `/api/v1/users/:id` | Get user by ID | Yes | - |
| PUT | `/api/v1/users/:id` | Update user | Yes | Admin |
| DELETE | `/api/v1/users/:id` | Delete user | Yes | Admin |
| GET | `/api/v1/users/profile` | Get current user profile | Yes | - |
| PUT | `/api/v1/users/profile` | Update current user profile | Yes | - |

### Post Endpoints

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---------------|---------------|
| GET | `/api/v1/posts` | Get all posts | No | - |
| GET | `/api/v1/posts/:id` | Get post by ID | No | - |
| POST | `/api/v1/posts` | Create new post | Yes | - |
| PUT | `/api/v1/posts/:id` | Update post | Yes | - |
| DELETE | `/api/v1/posts/:id` | Delete post | Yes | Moderator |
| POST | `/api/v1/posts/:id/like` | Like post | Yes | - |
| DELETE | `/api/v1/posts/:id/like` | Unlike post | Yes | - |

### Category Endpoints

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---------------|---------------|
| GET | `/api/v1/categories` | Get all categories | No | - |
| GET | `/api/v1/categories/:id` | Get category by ID | No | - |
| POST | `/api/v1/categories` | Create new category | Yes | Admin |
| PUT | `/api/v1/categories/:id` | Update category | Yes | Admin |
| DELETE | `/api/v1/categories/:id` | Delete category | Yes | Admin |

### Tag Endpoints

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---------------|---------------|
| GET | `/api/v1/tags` | Get all tags | No | - |
| GET | `/api/v1/tags/:id` | Get tag by ID | No | - |
| POST | `/api/v1/tags` | Create new tag | Yes | Admin |
| PUT | `/api/v1/tags/:id` | Update tag | Yes | Admin |
| DELETE | `/api/v1/tags/:id` | Delete tag | Yes | Admin |

### Comment Endpoints

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---------------|---------------|
| GET | `/api/v1/comments` | Get all comments | No | - |
| GET | `/api/v1/comments/:id` | Get comment by ID | No | - |
| POST | `/api/v1/comments` | Create new comment | Yes | - |
| PUT | `/api/v1/comments/:id` | Update comment | Yes | - |
| DELETE | `/api/v1/comments/:id` | Delete comment | Yes | Moderator |

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```bash
# Server Configuration
NODE_ENV=development
PORT=3001
HOST=localhost

# Database Configuration
DATABASE_URL="postgresql://postgres:password@localhost:5432/node_postgres_db"

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_REFRESH_EXPIRES_IN=30d

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com

# File Upload Configuration
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,application/pdf

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
CORS_CREDENTIALS=true

# Session Configuration
SESSION_SECRET=your-session-secret-change-this-in-production
SESSION_COOKIE_MAX_AGE=86400000

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log

# API Configuration
API_PREFIX=/api/v1
API_VERSION=1.0.0
```

## 🗃️ Prisma Commands

### Database Management

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Create and run migrations
npm run db:migrate

# Deploy migrations (production)
npm run db:migrate:deploy

# Reset database and run migrations
npm run db:migrate:reset

# Seed database with sample data
npm run db:seed

# Open Prisma Studio (database GUI)
npm run db:studio

# Format Prisma schema
npm run db:format
```

### Adding New Models

1. **Update schema** in `prisma/schema.prisma`:

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Decimal  @db.Decimal(10, 2)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("products")
}
```

2. **Create migration**:

```bash
npm run db:migrate
```

3. **Generate client**:

```bash
npm run db:generate
```

## 🎨 Customization

### Adding New Routes

1. Create a new route file:

```typescript
// src/routes/products.ts
import { Router } from 'express'
import { ProductController } from '@/controllers/ProductController'

const router = Router()
const productController = new ProductController()

router.get('/', productController.getAllProducts)
router.post('/', authenticateToken, productController.createProduct)

export default router
```

2. Register the route in `src/index.ts`:

```typescript
import productRoutes from '@/routes/products'
app.use(`${API_PREFIX}/products`, productRoutes)
```

### Adding New Controllers

```typescript
// src/controllers/ProductController.ts
import { Request, Response } from 'express'
import { prisma } from '@/config/database'

export class ProductController {
  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await prisma.product.findMany({
        include: {
          category: true,
        },
      })
      
      res.json({
        success: true,
        data: products,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }
}
```

### Adding New Middleware

```typescript
// src/middleware/customMiddleware.ts
import { Request, Response, NextFunction } from 'express'

export const customMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Your middleware logic here
  next()
}
```

## 🎯 Sample Use Cases

### 1. **Blog Platform**
- Add post management with categories and tags
- Implement comment system with nested replies
- Add user following and post liking
- Create RSS feeds and sitemaps

### 2. **E-commerce API**
- Add product management with categories
- Implement shopping cart functionality
- Add order processing and inventory tracking
- Integrate payment processing

### 3. **Social Media Platform**
- Add user profiles with avatars
- Implement following system
- Add content creation tools
- Create notification system

### 4. **Content Management System**
- Add rich text editor integration
- Implement media management
- Add content scheduling
- Create SEO management tools

### 5. **Learning Management System**
- Add course management
- Implement user enrollment
- Add progress tracking
- Create assessment tools

### 6. **Project Management Tool**
- Add project and task management
- Implement team collaboration
- Add time tracking
- Create reporting dashboards

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `npm run dev` | Start development server with nodemon |
| **Build** | `npm run build` | Compile TypeScript to JavaScript |
| **Start** | `npm start` | Start production server |
| **Lint** | `npm run lint` | Run ESLint |
| **Lint Fix** | `npm run lint:fix` | Fix ESLint errors |
| **Test** | `npm test` | Run tests |
| **Test Watch** | `npm run test:watch` | Run tests in watch mode |
| **Test Coverage** | `npm run test:coverage` | Run tests with coverage |
| **Type Check** | `npm run type-check` | Run TypeScript compiler |
| **DB Generate** | `npm run db:generate` | Generate Prisma client |
| **DB Push** | `npm run db:push` | Push schema to database |
| **DB Migrate** | `npm run db:migrate` | Create and run migrations |
| **DB Migrate Deploy** | `npm run db:migrate:deploy` | Deploy migrations (production) |
| **DB Migrate Reset** | `npm run db:migrate:reset` | Reset database and run migrations |
| **DB Seed** | `npm run db:seed` | Seed database with sample data |
| **DB Studio** | `npm run db:studio` | Open Prisma Studio |
| **DB Format** | `npm run db:format` | Format Prisma schema |

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

```typescript
// tests/auth.test.ts
import request from 'supertest'
import app from '../src/index'

describe('Auth Endpoints', () => {
  test('POST /api/v1/auth/register should create a new user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
      })

    expect(response.status).toBe(201)
    expect(response.body.success).toBe(true)
  })
})
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to VPS

1. **Set up your server**:
   ```bash
   # Install Node.js and PostgreSQL
   sudo apt update
   sudo apt install nodejs npm postgresql
   ```

2. **Configure PostgreSQL**:
   ```bash
   sudo -u postgres createdb your_database_name
   sudo -u postgres createuser your_username
   ```

3. **Deploy your application**:
   ```bash
   # Upload your code
   scp -r . user@your-server:/var/www/your-app
   
   # Install dependencies
   cd /var/www/your-app
   npm install
   
   # Set up environment variables
   cp .env.example .env
   # Edit .env with production values
   
   # Generate Prisma client
   npm run db:generate
   
   # Run migrations
   npm run db:migrate:deploy
   
   # Build and start
   npm run build
   npm start
   ```

4. **Configure PM2** (Process Manager):
   ```bash
   npm install -g pm2
   pm2 start dist/index.js --name "node-postgres-api"
   pm2 startup
   pm2 save
   ```

5. **Configure Nginx**:
   ```nginx
   server {
       listen 80;
       server_name your-api-domain.com;
       
       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Environment Variables for Production

```bash
# Production .env
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://username:password@localhost:5432/production_db
JWT_SECRET=your-production-secret
JWT_REFRESH_SECRET=your-production-refresh-secret
CORS_ORIGIN=https://your-frontend-domain.com
```

## 🔧 Troubleshooting

### Common Issues

**Q: Database connection failed**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check connection
psql -h localhost -U username -d database_name
```

**Q: Prisma client not found**
```bash
# Generate Prisma client
npm run db:generate

# Or regenerate
npx prisma generate
```

**Q: Migration errors**
```bash
# Check migration status
npx prisma migrate status

# Reset and re-run
npm run db:migrate:reset
```

**Q: JWT token errors**
- Verify `JWT_SECRET` is set
- Check token expiration
- Ensure proper token format

**Q: Build fails**
```bash
# Clear TypeScript cache
rm -rf dist

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Performance Tips

1. **Database Optimization**:
   - Add database indexes
   - Use connection pooling
   - Optimize Prisma queries

2. **Caching**:
   - Implement Redis caching
   - Use response caching
   - Cache database queries

3. **Security**:
   - Use HTTPS in production
   - Implement rate limiting
   - Validate all inputs

## 📱 API Documentation

The API includes built-in documentation at `/api-docs` endpoint that lists all available endpoints with descriptions.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you need help:

1. Check the troubleshooting section above
2. Look at the sample use cases for inspiration
3. Open an issue on GitHub
4. Check the code comments for guidance

---

**Happy Coding! 🎉**

This boilerplate provides a solid foundation for building modern Node.js applications with Prisma ORM and PostgreSQL. Customize it to match your project requirements and start building amazing backend services!