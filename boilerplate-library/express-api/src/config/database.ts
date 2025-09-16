import knex from 'knex'
import { logger } from '@/utils/logger'

const config = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'express_api_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/database/migrations',
  },
  seeds: {
    directory: './src/database/seeds',
  },
}

export const db = knex(config)

export const connectDB = async (): Promise<void> => {
  try {
    await db.raw('SELECT 1')
    logger.info('Database connection established')
  } catch (error) {
    logger.error('Database connection failed:', error)
    throw error
  }
}

export const disconnectDB = async (): Promise<void> => {
  try {
    await db.destroy()
    logger.info('Database connection closed')
  } catch (error) {
    logger.error('Error closing database connection:', error)
    throw error
  }
}