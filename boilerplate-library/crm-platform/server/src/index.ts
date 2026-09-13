import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'

import { connectDB } from './config/database'
import { errorHandler } from './middleware/errorHandler'
import { notFound } from './middleware/notFound'
import { logger } from './utils/logger'

import authRoutes from './routes/auth'
import contactRoutes from './routes/contacts'
import leadRoutes from './routes/leads'
import dealRoutes from './routes/deals'
import dashboardRoutes from './routes/dashboard'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT) || 3000

app.use(helmet())
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(
  rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  }),
)
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compression())
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'))

app.get('/health', (_req, res) => {
  res.json({
    success: true,
    status: 'OK',
    service: 'crm-platform',
    timestamp: new Date().toISOString(),
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/contacts', contactRoutes)
app.use('/api/leads', leadRoutes)
app.use('/api/deals', dealRoutes)
app.use('/api/dashboard', dashboardRoutes)

app.use(notFound)
app.use(errorHandler)

async function start() {
  try {
    await connectDB()
    app.listen(PORT, () => {
      logger.info(`CRM server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    logger.error('Failed to start CRM server', error)
    process.exit(1)
  }
}

start()

export default app
