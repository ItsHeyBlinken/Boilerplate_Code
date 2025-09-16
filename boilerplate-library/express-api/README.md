# 🚀 Express.js API Boilerplate

A modern, production-ready Express.js API with TypeScript, JWT authentication, PostgreSQL database, and comprehensive error handling. Perfect for building robust REST APIs with authentication and database management.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Authentication](#authentication)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Middleware](#middleware)
- [Customization](#customization)
- [Sample Use Cases](#sample-use-cases)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## ✨ Features

- **⚡ Express.js**: Fast, unopinionated web framework
- **📘 TypeScript**: Full type safety and better DX
- **🔐 JWT Authentication**: Secure token-based authentication
- **🗄️ PostgreSQL**: Robust relational database
- **🔧 Knex.js**: SQL query builder and migrations
- **📝 Input Validation**: Joi schema validation
- **🛡️ Security**: Helmet, CORS, rate limiting
- **📊 Logging**: Winston logging system
- **🔄 Redis**: Session storage and caching
- **📧 Email**: Nodemailer integration
- **📁 File Upload**: Multer file handling
- **🧪 Testing**: Jest testing framework
- **📚 API Documentation**: Built-in endpoint documentation

## 🛠️ Prerequisites

- **Node.js** (v18+ recommended)
- **PostgreSQL** (v14+ recommended)
- **Redis** (v6+ recommended, optional)
- **npm** or **yarn** or **pnpm**
- **Git**

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Copy the boilerplate to your project directory
cp -r ./express-api ../my-api
cd ../my-api

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
createdb express_api_db

# Run migrations
npm run db:migrate

# Seed the database (optional)
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
express-api/
├── src/
│   ├── config/              # Configuration files
│   │   ├── database.ts      # Database configuration
│   │   └── redis.ts         # Redis configuration
│   ├── controllers/         # Route controllers
│   │   ├── AuthController.ts
│   │   ├── UserController.ts
│   │   └── PostController.ts
│   ├── database/            # Database files
│   │   ├── migrations/      # Database migrations
│   │   └── seeds/           # Database seeds
│   ├── middleware/          # Express middleware
│   │   ├── auth.ts          # Authentication middleware
│   │   ├── errorHandler.ts  # Error handling
│   │   ├── notFoundHandler.ts
│   │   └── validation.ts    # Input validation
│   ├── routes/              # API routes
│   │   ├── auth.ts          # Authentication routes
│   │   ├── users.ts         # User routes
│   │   ├── posts.ts         # Post routes
│   │   └── health.ts        # Health check routes
│   ├── utils/               # Utility functions
│   │   ├── logger.ts        # Logging utility
│   │   ├── jwt.ts           # JWT utilities
│   │   └── password.ts      # Password utilities
│   └── index.ts             # Application entry point
├── logs/                    # Log files
├── uploads/                 # File uploads
├── .env.example             # Environment variables template
├── knexfile.js              # Knex configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| **Express.js** | ^4.18.2 | Web framework |
| **TypeScript** | ^5.3.2 | Type safety |
| **PostgreSQL** | - | Database |
| **Knex.js** | ^3.0.1 | Query builder |
| **JWT** | ^9.0.2 | Authentication |
| **Joi** | ^17.11.0 | Validation |
| **Winston** | ^3.11.0 | Logging |
| **Redis** | ^4.6.10 | Caching |
| **Helmet** | ^7.1.0 | Security |
| **CORS** | ^2.8.5 | Cross-origin requests |
| **bcryptjs** | ^2.4.3 | Password hashing |

## 🔐 Authentication

### JWT Token System

- **Access Token**: Short-lived (7 days default)
- **Refresh Token**: Long-lived (30 days default)
- **Token Storage**: Database with device tracking
- **Security**: Token revocation on logout/password change

### Authentication Flow

1. **Register**: Create account with email/password
2. **Login**: Receive access and refresh tokens
3. **Protected Routes**: Include Bearer token in Authorization header
4. **Token Refresh**: Use refresh token to get new access token
5. **Logout**: Revoke refresh token

### Example Usage

```bash
# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","firstName":"John","lastName":"Doe"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Access protected route
curl -X GET http://localhost:3001/api/users/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🗄️ Database Setup

### Database Schema

The API includes these main tables:

- **users**: User accounts and profiles
- **posts**: Blog posts/content
- **refresh_tokens**: JWT refresh token storage

### Migration Commands

```bash
# Create new migration
npx knex migrate:make migration_name

# Run migrations
npm run db:migrate

# Rollback last migration
npm run db:rollback

# Check migration status
npx knex migrate:status
```

### Adding New Tables

```typescript
// Create migration file
npx knex migrate:make create_categories_table

// In the migration file
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('categories', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('name').notNullable()
    table.string('slug').unique().notNullable()
    table.text('description').nullable()
    table.timestamps(true, true)
  })
}
```

## 🛣️ API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| POST | `/api/auth/refresh` | Refresh access token | No |
| POST | `/api/auth/forgot-password` | Request password reset | No |
| POST | `/api/auth/reset-password` | Reset password | No |
| POST | `/api/auth/change-password` | Change password | Yes |
| GET | `/api/auth/me` | Get current user profile | Yes |

### User Endpoints

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---------------|---------------|
| GET | `/api/users` | Get all users | Yes | Admin |
| GET | `/api/users/:id` | Get user by ID | Yes | - |
| PUT | `/api/users/:id` | Update user | Yes | Admin |
| DELETE | `/api/users/:id` | Delete user | Yes | Admin |
| GET | `/api/users/profile` | Get current user profile | Yes | - |
| PUT | `/api/users/profile` | Update current user profile | Yes | - |

### Post Endpoints

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---------------|---------------|
| GET | `/api/posts` | Get all posts | No | - |
| GET | `/api/posts/:id` | Get post by ID | No | - |
| POST | `/api/posts` | Create new post | Yes | - |
| PUT | `/api/posts/:id` | Update post | Yes | - |
| DELETE | `/api/posts/:id` | Delete post | Yes | Moderator |
| POST | `/api/posts/:id/like` | Like post | Yes | - |
| DELETE | `/api/posts/:id/like` | Unlike post | Yes | - |

### Health Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Basic health check |
| GET | `/api/health` | Detailed health check |

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```bash
# Server Configuration
NODE_ENV=development
PORT=3001
HOST=localhost

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=express_api_db
DB_USER=postgres
DB_PASSWORD=your_password
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/express_api_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_REFRESH_EXPIRES_IN=30d

# Redis Configuration (Optional)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_URL=redis://localhost:6379

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
```

## 🛡️ Middleware

### Authentication Middleware

```typescript
// Protect routes
app.use('/api/protected', authenticateToken)

// Require specific roles
app.use('/api/admin', authenticateToken, requireAdmin)
app.use('/api/moderator', authenticateToken, requireModerator)
```

### Validation Middleware

```typescript
// Validate request body
app.post('/api/users', validateRequest(userSchema), userController.createUser)

// Validate query parameters
app.get('/api/posts', validateQuery(querySchema), postController.getPosts)

// Validate URL parameters
app.get('/api/users/:id', validateParams(idSchema), userController.getUser)
```

### Error Handling

The API includes comprehensive error handling:

- **Validation Errors**: 400 Bad Request
- **Authentication Errors**: 401 Unauthorized
- **Authorization Errors**: 403 Forbidden
- **Not Found Errors**: 404 Not Found
- **Server Errors**: 500 Internal Server Error

## 🎨 Customization

### Adding New Routes

1. Create a new route file:

```typescript
// src/routes/categories.ts
import { Router } from 'express'
import { CategoryController } from '@/controllers/CategoryController'

const router = Router()
const categoryController = new CategoryController()

router.get('/', categoryController.getAllCategories)
router.post('/', authenticateToken, categoryController.createCategory)

export default router
```

2. Register the route in `src/index.ts`:

```typescript
import categoryRoutes from '@/routes/categories'
app.use('/api/categories', categoryRoutes)
```

### Adding New Controllers

```typescript
// src/controllers/CategoryController.ts
import { Request, Response } from 'express'
import { db } from '@/config/database'

export class CategoryController {
  async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await db('categories').select('*')
      res.json({
        success: true,
        data: categories,
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

### 1. **Blog API**
- Add post management endpoints
- Implement categories and tags
- Add comment system
- Create RSS feeds

### 2. **E-commerce API**
- Add product management
- Implement shopping cart
- Add order processing
- Integrate payment systems

### 3. **SaaS API**
- Add subscription management
- Implement feature toggles
- Add billing endpoints
- Create usage analytics

### 4. **Social Media API**
- Add user profiles
- Implement following system
- Add content creation
- Create notification system

### 5. **Analytics API**
- Add data collection endpoints
- Implement reporting
- Add real-time metrics
- Create data export

### 6. **File Management API**
- Add file upload endpoints
- Implement image processing
- Add file sharing
- Create storage management

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
| **DB Migrate** | `npm run db:migrate` | Run database migrations |
| **DB Rollback** | `npm run db:rollback` | Rollback last migration |
| **DB Seed** | `npm run db:seed` | Run database seeds |

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
  test('POST /api/auth/register should create a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
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
   sudo apt install nodejs npm postgresql redis-server
   ```

2. **Configure PostgreSQL**:
   ```bash
   sudo -u postgres createdb your_database_name
   sudo -u postgres createuser your_username
   ```

3. **Deploy your application**:
   ```bash
   # Upload your code
   scp -r . user@your-server:/var/www/your-api
   
   # Install dependencies
   cd /var/www/your-api
   npm install
   
   # Set up environment variables
   cp .env.example .env
   # Edit .env with production values
   
   # Run migrations
   npm run db:migrate
   
   # Build and start
   npm run build
   npm start
   ```

4. **Configure PM2** (Process Manager):
   ```bash
   npm install -g pm2
   pm2 start dist/index.js --name "express-api"
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
REDIS_URL=redis://localhost:6379
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

**Q: JWT token errors**
- Verify `JWT_SECRET` is set
- Check token expiration
- Ensure proper token format

**Q: Migration errors**
```bash
# Check migration status
npx knex migrate:status

# Rollback and re-run
npm run db:rollback
npm run db:migrate
```

**Q: Redis connection failed**
```bash
# Check Redis is running
sudo systemctl status redis

# Test connection
redis-cli ping
```

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
   - Optimize queries

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

This boilerplate provides a solid foundation for building modern Express.js APIs with authentication and database integration. Customize it to match your project requirements and start building amazing web services!