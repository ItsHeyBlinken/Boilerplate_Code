/**
 * Database Configuration and Connection Management
 * 
 * This module handles MongoDB database connection, disconnection,
 * and connection event management for the CRM platform.
 * 
 * Features:
 * - MongoDB connection with Mongoose ODM
 * - Connection pooling configuration
 * - Connection event handlers (connected, error, disconnected)
 * - Graceful shutdown handling
 * - Environment-based connection string
 * - Error handling and logging
 * 
 * @author CRM Platform Team
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import { logger } from '../utils/logger'

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crm-platform'
    
    const conn = await mongoose.connect(mongoURI, {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // Disable mongoose buffering
    })

    logger.info(`📦 MongoDB Connected: ${conn.connection.host}`)

    // Handle connection events
    mongoose.connection.on('connected', () => {
      logger.info('MongoDB connected successfully')
    })

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err)
    })

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected')
    })

    // Handle application termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close()
      logger.info('MongoDB connection closed through app termination')
      process.exit(0)
    })

  } catch (error) {
    logger.error('Database connection failed:', error)
    process.exit(1)
  }
}

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close()
    logger.info('MongoDB disconnected successfully')
  } catch (error) {
    logger.error('Error disconnecting from MongoDB:', error)
  }
}