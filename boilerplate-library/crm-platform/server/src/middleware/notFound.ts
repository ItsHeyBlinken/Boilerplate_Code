import { Request, Response, NextFunction } from 'express'
import { AppError } from './errorHandler'

export const notFound = (req: Request, _res: Response, next: NextFunction): void => {
  const error: AppError = new Error(`Not Found - ${req.originalUrl}`)
  error.statusCode = 404
  next(error)
}
