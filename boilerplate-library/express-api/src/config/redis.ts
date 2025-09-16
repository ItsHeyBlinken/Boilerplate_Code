import { createClient } from 'redis'
import { logger } from '@/utils/logger'

let redisClient: ReturnType<typeof createClient> | null = null

export const connectRedis = async (): Promise<void> => {
  try {
    redisClient = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      password: process.env.REDIS_PASSWORD || undefined,
    })

    redisClient.on('error', (err) => {
      logger.error('Redis Client Error:', err)
    })

    redisClient.on('connect', () => {
      logger.info('Redis Client Connected')
    })

    redisClient.on('ready', () => {
      logger.info('Redis Client Ready')
    })

    redisClient.on('end', () => {
      logger.info('Redis Client Disconnected')
    })

    await redisClient.connect()
  } catch (error) {
    logger.error('Redis connection failed:', error)
    throw error
  }
}

export const getRedisClient = () => {
  if (!redisClient) {
    throw new Error('Redis client not initialized')
  }
  return redisClient
}

export const disconnectRedis = async (): Promise<void> => {
  if (redisClient) {
    try {
      await redisClient.quit()
      logger.info('Redis connection closed')
    } catch (error) {
      logger.error('Error closing Redis connection:', error)
      throw error
    }
  }
}