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
import userRoutes from './routes/users'
import productRoutes from './routes/products'
import categoryRoutes from './routes/categories'
import orderRoutes from './routes/orders'
import cartRoutes from './routes/cart'
import paymentRoutes from './routes/payments'

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
app.use(cookieParser())
app.use(compression())
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'))

app.get('/health', (_req, res) => {
  res.json({ success: true, status: 'OK', service: 'ecommerce-platform' })
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/payments', paymentRoutes)

app.use(notFound)
app.use(errorHandler)

async function start() {
  try {
    await connectDB()
    app.listen(PORT, () => {
      logger.info(`Ecommerce server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    logger.error('Failed to start ecommerce server', error)
    process.exit(1)
  }
}

start()

export default app
