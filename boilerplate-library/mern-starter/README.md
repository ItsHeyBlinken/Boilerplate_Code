# 🚀 MERN Starter Boilerplate

A full-stack MERN application with MongoDB, Express.js, React, and Node.js. Features complete CRUD operations, JWT authentication, and modern development practices. Perfect for building scalable web applications with a robust backend and responsive frontend.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Database Models](#database-models)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Frontend Features](#frontend-features)
- [Environment Variables](#environment-variables)
- [Development Workflow](#development-workflow)
- [Customization](#customization)
- [Sample Use Cases](#sample-use-cases)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## ✨ Features

### Backend (Express.js + MongoDB)
- **⚡ Express.js**: Fast, unopinionated web framework
- **📘 TypeScript**: Full type safety and better DX
- **🗄️ MongoDB**: NoSQL database with Mongoose ODM
- **🔐 JWT Authentication**: Secure token-based authentication
- **📝 Input Validation**: Joi schema validation
- **🛡️ Security**: Helmet, CORS, rate limiting
- **📊 Logging**: Winston logging system
- **🔄 CRUD Operations**: Complete Create, Read, Update, Delete
- **📚 API Documentation**: Built-in endpoint documentation

### Frontend (React + Vite)
- **⚛️ React 18**: Latest React with modern features
- **⚡ Vite**: Lightning-fast build tool and dev server
- **📘 TypeScript**: Type safety throughout
- **🎨 Tailwind CSS**: Utility-first CSS framework
- **🗃️ Zustand**: Lightweight state management
- **🧭 React Router**: Declarative routing
- **📡 Axios**: HTTP client for API calls
- **📝 React Hook Form**: Form handling
- **🔍 React Query**: Data fetching and caching
- **🔔 React Hot Toast**: Toast notifications

### Full-Stack Features
- **🔐 Complete Authentication**: Login, register, logout, profile management
- **📝 Post Management**: Create, edit, delete, like posts
- **💬 Comment System**: Nested comments with approval system
- **👥 User Management**: User profiles, roles, and permissions
- **📱 Responsive Design**: Mobile-first approach
- **🌙 Dark Mode**: Theme switching support
- **♿ Accessibility**: WCAG compliant components

## 🛠️ Prerequisites

- **Node.js** (v18+ recommended)
- **MongoDB** (v6+ recommended)
- **npm** or **yarn** or **pnpm**
- **Git**

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Copy the boilerplate to your project directory
cp -r ./mern-starter ../my-mern-app
cd ../my-mern-app

# Install all dependencies (server + client)
npm run install-all
# or
npm run install-server
npm run install-client
```

### 2. Environment Setup

```bash
# Set up server environment
cd server
cp .env.example .env
# Edit .env with your configuration

# Set up MongoDB
# Make sure MongoDB is running on your system
# Default connection: mongodb://localhost:27017/mern_starter_db
```

### 3. Start Development Servers

```bash
# Start both server and client concurrently
npm run dev

# Or start them separately:
# Terminal 1 - Server
npm run server

# Terminal 2 - Client
npm run client
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api-docs

## 📁 Project Structure

```
mern-starter/
├── server/                    # Backend Express.js application
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   │   └── database.ts   # MongoDB connection
│   │   ├── controllers/      # Route controllers
│   │   │   ├── AuthController.ts
│   │   │   ├── UserController.ts
│   │   │   └── PostController.ts
│   │   ├── middleware/       # Express middleware
│   │   │   ├── auth.ts       # Authentication middleware
│   │   │   ├── errorHandler.ts
│   │   │   ├── notFoundHandler.ts
│   │   │   └── validation.ts # Input validation
│   │   ├── models/           # MongoDB models
│   │   │   ├── User.ts
│   │   │   ├── Post.ts
│   │   │   ├── Comment.ts
│   │   │   └── Like.ts
│   │   ├── routes/           # API routes
│   │   │   ├── auth.ts
│   │   │   ├── users.ts
│   │   │   ├── posts.ts
│   │   │   └── health.ts
│   │   ├── utils/            # Utility functions
│   │   │   ├── logger.ts
│   │   │   ├── jwt.ts
│   │   │   └── password.ts
│   │   └── index.ts          # Server entry point
│   ├── .env.example          # Environment variables template
│   ├── tsconfig.json         # TypeScript configuration
│   └── package.json          # Server dependencies
├── client/                   # Frontend React application
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── ui/           # Base UI components
│   │   │   ├── auth/         # Authentication components
│   │   │   ├── posts/        # Post-related components
│   │   │   └── layout/       # Layout components
│   │   ├── pages/            # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── Profile.tsx
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API services
│   │   ├── store/            # Zustand stores
│   │   ├── utils/            # Utility functions
│   │   ├── types/            # TypeScript types
│   │   ├── App.tsx           # Main app component
│   │   └── main.tsx          # App entry point
│   ├── index.html            # HTML template
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   ├── vite.config.ts        # Vite configuration
│   └── package.json          # Client dependencies
├── package.json              # Root package.json
└── README.md                 # This file
```

## 🛠️ Technologies Used

### Backend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | - | JavaScript runtime |
| **Express.js** | ^4.18.2 | Web framework |
| **TypeScript** | ^5.3.2 | Type safety |
| **MongoDB** | - | NoSQL database |
| **Mongoose** | ^8.0.3 | MongoDB ODM |
| **JWT** | ^9.0.2 | Authentication |
| **Joi** | ^17.11.0 | Validation |
| **Winston** | ^3.11.0 | Logging |
| **bcryptjs** | ^2.4.3 | Password hashing |

### Frontend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | ^18.2.0 | UI library |
| **Vite** | ^4.5.0 | Build tool |
| **TypeScript** | ^5.2.2 | Type safety |
| **Tailwind CSS** | ^3.3.5 | Styling |
| **Zustand** | ^4.4.7 | State management |
| **React Router** | ^6.20.1 | Routing |
| **Axios** | ^1.6.2 | HTTP client |
| **React Hook Form** | ^7.48.2 | Form handling |
| **React Query** | ^3.39.3 | Data fetching |

## 🗄️ Database Models

### User Model
```typescript
interface IUser {
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'USER' | 'MODERATOR' | 'ADMIN'
  isActive: boolean
  emailVerified: boolean
  avatarUrl?: string
  phone?: string
  dateOfBirth?: Date
  bio?: string
  website?: string
  location?: string
  lastLogin?: Date
  emailVerifiedAt?: Date
}
```

### Post Model
```typescript
interface IPost {
  title: string
  content: string
  slug: string
  excerpt?: string
  featuredImage?: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  isPublished: boolean
  publishedAt?: Date
  viewCount: number
  likeCount: number
  commentCount: number
  metadata?: Record<string, any>
  author: ObjectId
}
```

### Comment Model
```typescript
interface IComment {
  content: string
  isApproved: boolean
  author: ObjectId
  post: ObjectId
  parent?: ObjectId
  replies: ObjectId[]
}
```

### Like Model
```typescript
interface ILike {
  user: ObjectId
  post: ObjectId
}
```

## 🔐 Authentication

### JWT Token System
- **Access Token**: Short-lived (7 days default)
- **Refresh Token**: Long-lived (30 days default)
- **Token Storage**: HTTP-only cookies (optional)
- **Security**: Password hashing with bcrypt

### User Roles
- **USER**: Regular user access
- **MODERATOR**: Content moderation access
- **ADMIN**: Full administrative access

### Authentication Flow
1. **Register**: Create account with email/password
2. **Login**: Receive access token
3. **Protected Routes**: Include Bearer token in Authorization header
4. **Logout**: Clear tokens

## 🛣️ API Endpoints

### Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/login` | Login user | No |
| POST | `/api/v1/auth/logout` | Logout user | Yes |
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

## 🎨 Frontend Features

### Pages
- **Home**: Landing page with featured posts
- **Login/Register**: Authentication forms
- **Dashboard**: User dashboard with posts
- **Profile**: User profile management
- **Posts**: Post listing and detail views

### Components
- **UI Components**: Reusable button, input, card components
- **Auth Components**: Login, register, protected route components
- **Post Components**: Post list, post detail, post form components
- **Layout Components**: Header, sidebar, footer components

### State Management
- **Zustand Stores**: User store, post store, UI store
- **React Query**: Server state management and caching
- **Local State**: Component-level state with React hooks

## 🔧 Environment Variables

### Server (.env)
```bash
# Server Configuration
NODE_ENV=development
PORT=5000
HOST=localhost

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/mern_starter_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_REFRESH_EXPIRES_IN=30d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
CORS_CREDENTIALS=true

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log
```

### Client (Vite automatically loads from .env)
```bash
# API Configuration
VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME=MERN Starter
```

## 🔄 Development Workflow

### Concurrent Development
```bash
# Start both server and client
npm run dev

# This runs:
# - Server on http://localhost:5000
# - Client on http://localhost:3000
# - Hot reload for both
```

### Individual Development
```bash
# Server only
npm run server

# Client only
npm run client
```

### Building for Production
```bash
# Build client
npm run build

# Start production server
npm start
```

## 🎨 Customization

### Adding New Models

1. **Create model** in `server/src/models/`:

```typescript
// server/src/models/Category.ts
import mongoose, { Document, Schema } from 'mongoose'

export interface ICategory extends Document {
  name: string
  slug: string
  description?: string
  color?: string
  isActive: boolean
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  color: { type: String, default: '#3B82F6' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

export const Category = mongoose.model<ICategory>('Category', categorySchema)
```

2. **Create controller**:

```typescript
// server/src/controllers/CategoryController.ts
import { Request, Response } from 'express'
import { Category } from '@/models/Category'

export class CategoryController {
  async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await Category.find({ isActive: true })
      res.json({ success: true, data: categories })
    } catch (error) {
      res.status(500).json({ success: false, error: 'Internal server error' })
    }
  }
}
```

3. **Create routes**:

```typescript
// server/src/routes/categories.ts
import { Router } from 'express'
import { CategoryController } from '@/controllers/CategoryController'

const router = Router()
const categoryController = new CategoryController()

router.get('/', categoryController.getAllCategories)
export default router
```

### Adding New Frontend Pages

1. **Create page component**:

```typescript
// client/src/pages/Categories.tsx
import React from 'react'

export function Categories() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      {/* Your content */}
    </div>
  )
}
```

2. **Add route**:

```typescript
// client/src/App.tsx
import { Categories } from './pages/Categories'

<Routes>
  <Route path="/categories" element={<Categories />} />
</Routes>
```

## 🎯 Sample Use Cases

### 1. **Blog Platform**
- Add post management with categories and tags
- Implement comment system with nested replies
- Add user following and post liking
- Create RSS feeds and sitemaps

### 2. **Social Media Platform**
- Add user profiles with avatars
- Implement following system
- Add content creation tools
- Create notification system

### 3. **E-commerce Platform**
- Add product management
- Implement shopping cart
- Add order processing
- Integrate payment systems

### 4. **Learning Management System**
- Add course management
- Implement user enrollment
- Add progress tracking
- Create assessment tools

### 5. **Project Management Tool**
- Add project and task management
- Implement team collaboration
- Add time tracking
- Create reporting dashboards

### 6. **Content Management System**
- Add rich text editor integration
- Implement media management
- Add content scheduling
- Create SEO management tools

## 📜 Available Scripts

### Root Level Scripts
| Script | Command | Description |
|--------|---------|-------------|
| **Dev** | `npm run dev` | Start both server and client |
| **Build** | `npm run build` | Build client for production |
| **Start** | `npm start` | Start production server |
| **Install All** | `npm run install-all` | Install all dependencies |
| **Lint** | `npm run lint` | Run linting on both projects |
| **Test** | `npm test` | Run tests on both projects |

### Server Scripts
| Script | Command | Description |
|--------|---------|-------------|
| **Server Dev** | `npm run server` | Start server in development |
| **Server Build** | `cd server && npm run build` | Build server |
| **Server Start** | `cd server && npm start` | Start production server |
| **Server Lint** | `cd server && npm run lint` | Lint server code |
| **Server Test** | `cd server && npm test` | Test server code |

### Client Scripts
| Script | Command | Description |
|--------|---------|-------------|
| **Client Dev** | `npm run client` | Start client in development |
| **Client Build** | `cd client && npm run build` | Build client |
| **Client Preview** | `cd client && npm run preview` | Preview production build |
| **Client Lint** | `cd client && npm run lint` | Lint client code |
| **Client Test** | `cd client && npm test` | Test client code |

## 🧪 Testing

### Backend Testing
```bash
cd server
npm test
npm run test:watch
npm run test:coverage
```

### Frontend Testing
```bash
cd client
npm test
npm run test:watch
```

### Writing Tests

#### Backend Test Example
```typescript
// server/tests/auth.test.ts
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

#### Frontend Test Example
```typescript
// client/src/components/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from '../Button'

test('renders button with text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByText('Click me')).toBeInTheDocument()
})
```

## 🚀 Deployment

### Build for Production
```bash
# Build client
npm run build

# Build server
cd server && npm run build
```

### Deploy to VPS

1. **Set up your server**:
   ```bash
   # Install Node.js and MongoDB
   sudo apt update
   sudo apt install nodejs npm mongodb
   ```

2. **Deploy your application**:
   ```bash
   # Upload your code
   scp -r . user@your-server:/var/www/your-mern-app
   
   # Install dependencies
   cd /var/www/your-mern-app
   npm run install-all
   
   # Set up environment variables
   cd server
   cp .env.example .env
   # Edit .env with production values
   
   # Build and start
   npm run build
   npm start
   ```

3. **Configure PM2** (Process Manager):
   ```bash
   npm install -g pm2
   pm2 start server/dist/index.js --name "mern-server"
   pm2 startup
   pm2 save
   ```

4. **Configure Nginx**:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       # Serve React app
       location / {
           root /var/www/your-mern-app/client/dist;
           try_files $uri $uri/ /index.html;
       }
       
       # Proxy API requests
       location /api {
           proxy_pass http://localhost:5000;
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
# Production server .env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/production_db
JWT_SECRET=your-production-secret
CORS_ORIGIN=https://your-domain.com
```

## 🔧 Troubleshooting

### Common Issues

**Q: MongoDB connection failed**
```bash
# Check MongoDB is running
sudo systemctl status mongodb

# Check connection
mongo --host localhost --port 27017
```

**Q: Port already in use**
```bash
# Kill process on port 5000
npx kill-port 5000

# Or use different ports
# Server: PORT=5001 npm run server
# Client: npm run client -- --port 3001
```

**Q: CORS errors**
- Verify `CORS_ORIGIN` in server .env matches client URL
- Check that client is making requests to correct API URL

**Q: Build fails**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
rm -rf server/node_modules server/package-lock.json
rm -rf client/node_modules client/package-lock.json
npm run install-all
```

**Q: TypeScript errors**
```bash
# Run type checking
npm run type-check

# Check tsconfig.json files
```

### Performance Tips

1. **Database Optimization**:
   - Add MongoDB indexes
   - Use connection pooling
   - Optimize queries

2. **Frontend Optimization**:
   - Implement code splitting
   - Use React.memo for components
   - Optimize images

3. **Security**:
   - Use HTTPS in production
   - Implement rate limiting
   - Validate all inputs

## 📱 Browser Support

- ✅ Chrome 88+
- ✅ Firefox 78+
- ✅ Safari 14+
- ✅ Edge 88+

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

This MERN starter provides a solid foundation for building full-stack web applications. Customize it to match your project requirements and start building amazing web experiences!