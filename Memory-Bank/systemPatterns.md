# System Patterns: Architecture & Design Decisions

## Overall Architecture
The boilerplate library is organized as a collection of independent boilerplate projects, each in its own directory under `boilerplate-library/`. Each boilerplate is self-contained and can be copied independently.

## Directory Structure Pattern
```
boilerplate-library/
├── [boilerplate-name]/
│   ├── README.md              # Comprehensive documentation
│   ├── package.json           # Dependencies and scripts
│   ├── .env.example          # Environment variable template
│   ├── .gitignore            # Git ignore rules
│   ├── [config files]        # TypeScript, Vite, Tailwind, etc.
│   └── [source code]         # Application code
```

## Common Patterns Across Boilerplates

### Frontend Boilerplates (React, Next.js, Vite)
- **Structure**: 
  - `src/` for source code
  - `components/` for reusable UI components
  - `pages/` for page components
  - `utils/` for utility functions
  - `store/` for state management (Zustand)
  - `styles/` for global styles
- **Configuration**: TypeScript, Tailwind CSS, ESLint
- **State Management**: Zustand (lightweight, TypeScript-friendly)
- **Routing**: React Router for SPA, Next.js App Router for Next.js

### Backend Boilerplates (Express, Node.js)
- **Structure**:
  - `src/` for source code
  - `controllers/` for route handlers
  - `middleware/` for Express middleware
  - `models/` for data models
  - `routes/` for route definitions
  - `utils/` for utility functions
  - `config/` for configuration files
- **Authentication**: JWT-based with refresh tokens
- **Validation**: Joi or Zod for input validation
- **Error Handling**: Centralized error handling middleware
- **Logging**: Winston for structured logging

### Full-Stack Boilerplates (CRM, E-commerce, MERN)
- **Structure**:
  - `client/` for frontend React application
  - `server/` for backend Express application
  - Root `package.json` with scripts to run both
- **Communication**: RESTful API between client and server
- **State Management**: Zustand on client, Context API for auth
- **Database**: MongoDB with Mongoose or PostgreSQL with Prisma

## Key Technical Decisions

### TypeScript First
- All modern boilerplates use TypeScript
- Provides type safety and better developer experience
- Consistent `tsconfig.json` patterns across projects

### Tailwind CSS
- Utility-first CSS framework used in all frontend projects
- Consistent configuration and custom utilities
- Responsive design patterns

### Authentication Pattern
- JWT tokens for stateless authentication
- Refresh token pattern for security
- Role-based access control (RBAC) where applicable
- Password hashing with bcrypt

### Database Patterns
- **PostgreSQL**: Used with Prisma ORM for type-safe queries
- **MongoDB**: Used with Mongoose ODM for flexible schemas
- Migrations: Knex.js for PostgreSQL, Prisma migrations for Prisma
- Seed data: Included for development and testing

### Error Handling Pattern
```typescript
// Consistent error handling middleware
app.use(errorHandler);

// Standardized error response format
{
  success: false,
  error: "Error message",
  details?: any
}
```

### API Response Pattern
```typescript
// Success response
{
  success: true,
  data: {...}
}

// Error response
{
  success: false,
  error: "Error message"
}
```

## Testing Patterns
- **Unit Tests**: Jest for backend, Vitest for frontend
- **API Tests**: Supertest for Express APIs
- **Component Tests**: React Testing Library
- **Test Structure**: Tests mirror source structure

## Configuration Patterns

### Environment Variables
- All projects use `.env.example` as template
- Consistent naming conventions (UPPER_SNAKE_CASE)
- Separate files for client and server in full-stack projects

### Build Configuration
- **Vite**: Fast build tool for React projects
- **Next.js**: Built-in build system
- **TypeScript**: Compile-time type checking
- **ESLint**: Code quality and consistency

## Deployment Patterns
- **Docker**: Containerization for consistent deployments
- **Docker Compose**: Multi-container orchestration
- **Nginx**: Reverse proxy for production
- **PM2**: Process management for Node.js apps

## Security Patterns
- Helmet.js for security headers
- CORS configuration for API access
- Rate limiting for API protection
- Input validation on all user inputs
- SQL injection prevention (parameterized queries)
- XSS protection (sanitization)

## Component Relationships

### Frontend Component Hierarchy
```
App
├── Layout
│   ├── Header
│   ├── Sidebar
│   └── Main Content
│       └── Pages
│           └── Components
└── Providers (Auth, Theme, etc.)
```

### Backend Request Flow
```
Request
├── Middleware (Auth, Validation, CORS)
├── Route Handler
├── Controller
├── Service (Business Logic)
├── Model (Database)
└── Response
```

## Design Principles
1. **Separation of Concerns**: Clear boundaries between layers
2. **DRY (Don't Repeat Yourself)**: Reusable utilities and components
3. **Single Responsibility**: Each module has one clear purpose
4. **Type Safety**: Leverage TypeScript for compile-time safety
5. **Consistency**: Similar patterns across all boilerplates
6. **Documentation**: Code is self-documenting with clear naming

