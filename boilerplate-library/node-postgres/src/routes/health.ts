import { Router } from 'express'
import { Request, Response } from 'express'
import { prisma } from '@/config/database'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const healthCheck = {
      success: true,
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.API_VERSION || '1.0.0',
      services: {
        database: 'OK',
      },
    }

    // Check database connection
    try {
      await prisma.$queryRaw`SELECT 1`
    } catch (error) {
      healthCheck.services.database = 'ERROR'
      healthCheck.status = 'DEGRADED'
    }

    const statusCode = healthCheck.status === 'OK' ? 200 : 503
    res.status(statusCode).json(healthCheck)
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
    })
  }
})

export default router