# Technical Context: Technologies & Setup

## Technology Stack Overview

### Frontend Technologies
- **React 18**: Modern UI library with hooks and concurrent features
- **Next.js 14**: Full-stack React framework with App Router
- **Vite**: Fast build tool and dev server
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Zustand**: Lightweight state management
- **React Query**: Server state management (where used)
- **React Hook Form**: Form handling
- **Axios**: HTTP client
- **Lucide React**: Icon library

### Backend Technologies
- **Node.js**: JavaScript runtime (v18+)
- **Express.js**: Web framework
- **TypeScript**: Type-safe development
- **PostgreSQL**: Relational database
- **MongoDB**: Document database
- **Prisma**: Next-generation ORM for PostgreSQL
- **Mongoose**: ODM for MongoDB
- **Knex.js**: SQL query builder and migrations
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Password hashing
- **Joi/Zod**: Input validation
- **Winston**: Logging
- **Redis**: Caching and session storage (optional)
- **Socket.io**: Real-time communication (where used)

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting (where configured)
- **Jest**: Testing framework
- **Vitest**: Fast unit testing for Vite projects
- **Supertest**: API testing
- **React Testing Library**: Component testing
- **TypeScript Compiler**: Type checking

### Infrastructure & Deployment
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **Nginx**: Reverse proxy and static file serving
- **PM2**: Process manager for Node.js
- **Git**: Version control

### Payment & External Services
- **Stripe**: Payment processing
- **Nodemailer**: Email sending
- **Sharp**: Image processing

## Development Setup

### Prerequisites
- **Node.js**: v18 or higher
- **npm/yarn/pnpm**: Package manager
- **Git**: Version control
- **PostgreSQL**: v14+ (for PostgreSQL projects)
- **MongoDB**: Latest (for MongoDB projects)
- **Redis**: v6+ (optional, for caching)
- **Docker**: (optional, for containerized development)

### Common Development Workflow
1. Copy desired boilerplate
2. Install dependencies: `npm install`
3. Set up environment variables from `.env.example`
4. Configure database connection
5. Run migrations (if applicable): `npm run db:migrate`
6. Seed database (optional): `npm run db:seed`
7. Start development server: `npm run dev`

### Environment Variables Pattern
```bash
# Server Configuration
NODE_ENV=development
PORT=3000
HOST=localhost

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
MONGODB_URI=mongodb://localhost:27017/dbname

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=30d

# Frontend
VITE_API_URL=http://localhost:3000/api

# External Services
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## Build & Deployment

### Build Commands
- **Frontend**: `npm run build` (creates `dist/` folder)
- **Backend**: `npm run build` (compiles TypeScript to JavaScript)
- **Full-Stack**: Build both client and server separately

### Production Considerations
- Environment variables must be set
- Database migrations must be run
- SSL/TLS certificates for HTTPS
- Reverse proxy configuration (Nginx)
- Process management (PM2)
- Logging and monitoring
- Security headers and CORS configuration

## Technical Constraints
- **Node.js Version**: Minimum v18 for modern features
- **TypeScript**: Strict mode enabled for type safety
- **Browser Support**: Modern browsers (Chrome 88+, Firefox 78+, Safari 14+, Edge 88+)
- **Database**: PostgreSQL 14+ or MongoDB latest
- **Package Manager**: npm, yarn, or pnpm compatible

## Dependencies Management
- **Lock Files**: package-lock.json committed for consistency
- **Version Pinning**: Major versions pinned, minor/patch auto-updated
- **Security**: Regular dependency audits
- **Updates**: Dependencies updated regularly for security patches

## Code Quality Tools
- **ESLint**: Configured with TypeScript rules
- **TypeScript**: Strict type checking
- **Prettier**: Code formatting (where configured)
- **Git Hooks**: Pre-commit hooks for linting (where configured)

## Testing Infrastructure
- **Unit Tests**: Jest/Vitest for isolated function testing
- **Integration Tests**: Supertest for API endpoint testing
- **Component Tests**: React Testing Library for UI components
- **E2E Tests**: (Not included, but can be added)
- **Coverage**: Test coverage reporting available

## Performance Considerations
- **Code Splitting**: Route-based splitting in React apps
- **Lazy Loading**: Components and routes loaded on demand
- **Caching**: Redis for API response caching
- **Database Indexing**: Proper indexes for query performance
- **Image Optimization**: Sharp for image processing
- **Bundle Size**: Optimized builds with tree-shaking

## Security Best Practices
- **Authentication**: JWT with secure token storage
- **Password Hashing**: Bcrypt with salt rounds
- **Input Validation**: All user inputs validated
- **SQL Injection**: Parameterized queries
- **XSS Protection**: Input sanitization
- **CORS**: Properly configured for API access
- **Rate Limiting**: Protection against abuse
- **Security Headers**: Helmet.js for HTTP headers
- **Environment Variables**: Secrets never in code

