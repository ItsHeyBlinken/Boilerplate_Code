import 'reflect-metadata'
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
import { connectDatabase } from '@/config/database'

// Import routes
import authRoutes from '@/routes/auth'
import userRoutes from '@/routes/users'
import productRoutes from '@/routes/products'
import paymentRoutes from '@/routes/payments'
import subscriptionRoutes from '@/routes/subscriptions'
import webhookRoutes from '@/routes/webhooks'
import healthRoutes from '@/routes/health'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const HOST = process.env.HOST || 'localhost'
const API_PREFIX = process.env.API_PREFIX || '/api/v1'

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "https://js.stripe.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.stripe.com"],
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
    success: false,
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
})

app.use(`${API_PREFIX}/`, limiter)

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
    success: true,
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.API_VERSION || '1.0.0',
  })
})

// API routes
app.use(`${API_PREFIX}/auth`, authRoutes)
app.use(`${API_PREFIX}/users`, userRoutes)
app.use(`${API_PREFIX}/products`, productRoutes)
app.use(`${API_PREFIX}/payments`, paymentRoutes)
app.use(`${API_PREFIX}/subscriptions`, subscriptionRoutes)
app.use(`${API_PREFIX}/webhooks`, webhookRoutes)
app.use(`${API_PREFIX}/health`, healthRoutes)

// API documentation route
app.get('/api-docs', (req, res) => {
  res.json({
    success: true,
    message: 'Stripe Integration API Documentation',
    version: process.env.API_VERSION || '1.0.0',
    baseUrl: `${req.protocol}://${req.get('host')}${API_PREFIX}`,
    endpoints: {
      auth: {
        'POST /auth/register': 'Register a new user',
        'POST /auth/login': 'Login user',
        'POST /auth/logout': 'Logout user',
        'GET /auth/me': 'Get current user profile',
      },
      users: {
        'GET /users': 'Get all users (admin only)',
        'GET /users/:id': 'Get user by ID',
        'PUT /users/:id': 'Update user (admin only)',
        'DELETE /users/:id': 'Delete user (admin only)',
        'GET /users/profile': 'Get current user profile',
        'PUT /users/profile': 'Update current user profile',
      },
      products: {
        'GET /products': 'Get all products',
        'GET /products/:id': 'Get product by ID',
        'POST /products': 'Create new product (admin only)',
        'PUT /products/:id': 'Update product (admin only)',
        'DELETE /products/:id': 'Delete product (admin only)',
      },
      payments: {
        'POST /payments/create-payment-intent': 'Create payment intent',
        'POST /payments/confirm-payment': 'Confirm payment',
        'GET /payments/history': 'Get payment history',
        'POST /payments/refund': 'Create refund (admin only)',
      },
      subscriptions: {
        'POST /subscriptions/create': 'Create subscription',
        'GET /subscriptions': 'Get user subscriptions',
        'PUT /subscriptions/:id/cancel': 'Cancel subscription',
        'POST /subscriptions/:id/resume': 'Resume subscription',
        'GET /subscriptions/plans': 'Get subscription plans',
      },
      webhooks: {
        'POST /webhooks/stripe': 'Stripe webhook endpoint',
      },
      health: {
        'GET /health': 'Health check endpoint',
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
    await connectDatabase()
    logger.info('Database connected successfully')

    // Start the server
    app.listen(PORT, HOST, () => {
      logger.info(`🚀 Server running on http://${HOST}:${PORT}`)
      logger.info(`📚 API Documentation: http://${HOST}:${PORT}/api-docs`)
      logger.info(`🔗 API Base URL: http://${HOST}:${PORT}${API_PREFIX}`)
      logger.info(`🌍 Environment: ${process.env.NODE_ENV}`)
      logger.info(`💳 Stripe Integration Ready`)
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