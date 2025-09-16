import { PrismaClient } from '@prisma/client'
import { logger } from '@/utils/logger'

declare global {
  var __prisma: PrismaClient | undefined
}

// Prevent multiple instances of Prisma Client in development
export const prisma = globalThis.__prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
})

if (process.env.NODE_ENV === 'development') {
  globalThis.__prisma = prisma
}

export const connectDatabase = async (): Promise<void> => {
  try {
    await prisma.$connect()
    logger.info('✅ Database connected successfully')
  } catch (error) {
    logger.error('❌ Database connection failed:', error)
    throw error
  }
}

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await prisma.$disconnect()
    logger.info('🔌 Database connection closed')
  } catch (error) {
    logger.error('❌ Error closing database connection:', error)
    throw error
  }
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await disconnectDatabase()
})

process.on('SIGINT', async () => {
  await disconnectDatabase()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  await disconnectDatabase()
  process.exit(0)
})