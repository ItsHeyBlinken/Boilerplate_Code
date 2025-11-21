# Environment Variable Templates

This document contains the .env.example file contents for each boilerplate that requires environment variables. These files should be created in each boilerplate directory.

## express-api/.env.example
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

## nextjs-starter/.env.example
```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/nextjs_starter"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Email (Optional)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="your-email@gmail.com"

# App Configuration
NEXT_PUBLIC_APP_NAME="Next.js Starter"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## node-postgres/.env.example
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

## stripe-integration/.env.example
```bash
# Server Configuration
NODE_ENV=development
PORT=3001
HOST=localhost

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/stripe_integration_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
CORS_CREDENTIALS=true

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log
```

## mern-starter/.env.example

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

### Client (.env)
```bash
# API Configuration
VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME=MERN Starter
```

## crm-platform/.env.example

### Server (.env)
```bash
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/crm-platform
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:5173
```

### Client (.env)
```bash
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=CRM Platform
```

## ecommerce-platform/.env.example

### Server (.env)
```bash
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecommerce-platform
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
REDIS_URL=redis://localhost:6379
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:5173
```

### Client (.env)
```bash
VITE_API_URL=http://localhost:3000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

## docker-node/.env.example
```bash
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://mongodb:27017/docker_node_db
REDIS_URL=redis://redis:6379
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
```

## react-vite/.env.example
```bash
# API Configuration
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=React Vite App
```

## html-css-js/.env.example
*No environment variables needed - static HTML project*

---

**Note**: These .env.example files should be created in each boilerplate directory. They are currently blocked from automatic creation but should be added manually or via terminal commands.

