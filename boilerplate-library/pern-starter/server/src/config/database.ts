import { prisma } from '@/lib/prisma'
import { logger } from '@/utils/logger'

export async function connectDatabase(): Promise<void> {
  await prisma.$connect()
  logger.info('PostgreSQL connected via Prisma')
}

export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect()
}
