import { Request, Response, NextFunction } from 'express'
import { Prisma } from '@prisma/client'
import { logger } from '@/utils/logger'

export interface AppError extends Error {
  statusCode?: number
  isOperational?: boolean
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = { ...err }
  error.message = err.message

  // Log error
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  })

  // Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        const message = 'Duplicate field value entered'
        error = { message, statusCode: 400 } as AppError
        break
      case 'P2014':
        const message2 = 'Invalid ID provided'
        error = { message: message2, statusCode: 400 } as AppError
        break
      case 'P2003':
        const message3 = 'Invalid input data'
        error = { message: message3, statusCode: 400 } as AppError
        break
      case 'P2025':
        const message4 = 'Record not found'
        error = { message: message4, statusCode: 404 } as AppError
        break
      default:
        const message5 = 'Database error'
        error = { message: message5, statusCode: 500 } as AppError
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    const message = 'Invalid data provided'
    error = { message, statusCode: 400 } as AppError
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token'
    error = { message, statusCode: 401 } as AppError
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired'
    error = { message, statusCode: 401 } as AppError
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    const message = 'Validation error'
    error = { message, statusCode: 400 } as AppError
  }

  // Database connection errors
  if (err.name === 'ECONNREFUSED') {
    const message = 'Database connection failed'
    error = { message, statusCode: 500 } as AppError
  }

  // Default to 500 server error
  const statusCode = error.statusCode || 500
  const message = error.message || 'Internal Server Error'

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

export const createError = (message: string, statusCode: number = 500): AppError => {
  const error: AppError = new Error(message)
  error.statusCode = statusCode
  error.isOperational = true
  return error
}

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}