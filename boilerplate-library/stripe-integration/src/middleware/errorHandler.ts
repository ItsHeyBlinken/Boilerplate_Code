import { Request, Response, NextFunction } from 'express'
import { logger } from '@/utils/logger'

export interface AppError extends Error {
  statusCode?: number
  isOperational?: boolean
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  logger.error(err.message, { stack: err.stack, url: req.url, method: req.method })
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
  })
}

export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
