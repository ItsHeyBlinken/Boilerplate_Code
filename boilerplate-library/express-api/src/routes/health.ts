import { Router } from 'express'
import { Request, Response } from 'express'
import { db } from '@/config/database'
import { getRedisClient } from '@/config/redis'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const healthCheck = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || '1.0.0',
      services: {
        database: 'OK',
        redis: 'OK',
      },
    }

    // Check database connection
    try {
      await db.raw('SELECT 1')
    } catch (error) {
      healthCheck.services.database = 'ERROR'
      healthCheck.status = 'DEGRADED'
    }

    // Check Redis connection
    try {
      const redisClient = getRedisClient()
      await redisClient.ping()
    } catch (error) {
      healthCheck.services.redis = 'ERROR'
      healthCheck.status = 'DEGRADED'
    }

    const statusCode = healthCheck.status === 'OK' ? 200 : 503
    res.status(statusCode).json(healthCheck)
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
    })
  }
})

export default router