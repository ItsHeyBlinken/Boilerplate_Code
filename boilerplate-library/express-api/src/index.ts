import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'

import { errorHandler } from '@/middleware/errorHandler'
import { notFoundHandler } from '@/middleware/notFoundHandler'
import { logger } from '@/utils/logger'
import { connectDB } from '@/config/database'
import { connectRedis } from '@/config/redis'

// Import routes
import authRoutes from '@/routes/auth'
import userRoutes from '@/routes/users'
import postRoutes from '@/routes/posts'
import healthRoutes from '@/routes/health'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const HOST = process.env.HOST || 'localhost'

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}))

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: process.env.CORS_CREDENTIALS === 'true',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api/', limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())

// Compression middleware
app.use(compression())

// Logging middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined', {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  }))
}

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
  })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/health', healthRoutes)

// API documentation route
app.get('/api-docs', (req, res) => {
  res.json({
    message: 'API Documentation',
    version: '1.0.0',
    endpoints: {
      auth: {
        'POST /api/auth/register': 'Register a new user',
        'POST /api/auth/login': 'Login user',
        'POST /api/auth/logout': 'Logout user',
        'POST /api/auth/refresh': 'Refresh access token',
        'POST /api/auth/forgot-password': 'Request password reset',
        'POST /api/auth/reset-password': 'Reset password',
      },
      users: {
        'GET /api/users': 'Get all users (admin only)',
        'GET /api/users/:id': 'Get user by ID',
        'PUT /api/users/:id': 'Update user',
        'DELETE /api/users/:id': 'Delete user (admin only)',
        'GET /api/users/profile': 'Get current user profile',
        'PUT /api/users/profile': 'Update current user profile',
      },
      posts: {
        'GET /api/posts': 'Get all posts',
        'GET /api/posts/:id': 'Get post by ID',
        'POST /api/posts': 'Create new post',
        'PUT /api/posts/:id': 'Update post',
        'DELETE /api/posts/:id': 'Delete post',
      },
      health: {
        'GET /api/health': 'Health check endpoint',
      },
    },
  })
})

// 404 handler
app.use(notFoundHandler)

// Error handling middleware
app.use(errorHandler)

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully')
  process.exit(0)
})

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully')
  process.exit(0)
})

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB()
    logger.info('Database connected successfully')

    // Connect to Redis (if configured)
    if (process.env.REDIS_URL) {
      await connectRedis()
      logger.info('Redis connected successfully')
    }

    // Start the server
    app.listen(PORT, HOST, () => {
      logger.info(`Server running on http://${HOST}:${PORT}`)
      logger.info(`Environment: ${process.env.NODE_ENV}`)
      logger.info(`API Documentation: http://${HOST}:${PORT}/api-docs`)
    })
  } catch (error) {
    logger.error('Failed to start server:', error)
    process.exit(1)
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('Unhandled Promise Rejection:', err)
  process.exit(1)
})

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  logger.error('Uncaught Exception:', err)
  process.exit(1)
})

// Start the server
if (require.main === module) {
  startServer()
}

export default app