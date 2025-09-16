import mongoose from 'mongoose'
import { logger } from '@/utils/logger'

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/stripe_integration_db'
    
    await mongoose.connect(mongoUri, {
      // Remove deprecated options
    })

    logger.info('✅ MongoDB connected successfully')
  } catch (error) {
    logger.error('❌ MongoDB connection failed:', error)
    throw error
  }
}

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect()
    logger.info('🔌 MongoDB connection closed')
  } catch (error) {
    logger.error('❌ Error closing MongoDB connection:', error)
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