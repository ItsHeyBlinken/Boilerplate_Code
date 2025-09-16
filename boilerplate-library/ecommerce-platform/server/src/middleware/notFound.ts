/**
 * 404 Not Found Middleware
 * 
 * This middleware handles requests to routes that don't exist,
 * creating a standardized 404 error response.
 * 
 * Features:
 * - Catches all unmatched routes
 * - Creates descriptive error messages
 * - Integrates with global error handler
 * - Logs 404 requests for monitoring
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import { Request, Response, NextFunction } from 'express'

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}