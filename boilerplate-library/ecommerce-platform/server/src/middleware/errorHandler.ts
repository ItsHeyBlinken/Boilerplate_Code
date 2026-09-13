import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

export interface AppError extends Error {
  statusCode?: number
}

export const errorHandler = (err: AppError, req: Request, res: Response, _next: NextFunction): void => {
  logger.error(err.message, { stack: err.stack, url: req.url })
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  })
}

export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
