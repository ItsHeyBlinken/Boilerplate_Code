import { prisma } from '../lib/prisma'
import { logger } from '../utils/logger'

export async function connectDB(): Promise<void> {
  await prisma.$connect()
  logger.info('PostgreSQL connected via Prisma')
}

export async function disconnectDB(): Promise<void> {
  await prisma.$disconnect()
}
