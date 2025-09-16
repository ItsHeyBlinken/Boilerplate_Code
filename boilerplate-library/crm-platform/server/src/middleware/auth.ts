/**
 * Authentication and Authorization Middleware
 * 
 * This module provides JWT-based authentication and role-based authorization
 * middleware for protecting routes and managing user access control.
 * 
 * Features:
 * - JWT token verification from headers and cookies
 * - User authentication with database lookup
 * - Role-based access control (ADMIN, MANAGER, SALES_REP, USER)
 * - Optional authentication for public routes
 * - User account status validation
 * - Token expiration handling
 * - Security error responses
 * 
 * @author CRM Platform Team
 * @version 1.0.0
 */

import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { logger } from '../utils/logger'

export interface AuthRequest extends Request {
  user?: any
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    // Check for token in cookies
    if (!token && req.cookies.token) {
      token = req.cookies.token
    }

    if (!token) {
      res.status(401).json({
        success: false,
        error: 'Not authorized to access this route',
      })
      return
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

      // Get user from token
      const user = await User.findById(decoded.id).select('-password')

      if (!user) {
        res.status(401).json({
          success: false,
          error: 'No user found with this token',
        })
        return
      }

      if (!user.isActive) {
        res.status(401).json({
          success: false,
          error: 'User account is deactivated',
        })
        return
      }

      req.user = user
      next()
    } catch (error) {
      logger.error('Token verification error:', error)
      res.status(401).json({
        success: false,
        error: 'Not authorized to access this route',
      })
    }
  } catch (error) {
    logger.error('Auth middleware error:', error)
    res.status(500).json({
      success: false,
      error: 'Server error',
    })
  }
}

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Not authorized to access this route',
      })
      return
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: `User role ${req.user.role} is not authorized to access this route`,
      })
      return
    }

    next()
  }
}

export const optionalAuth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string | undefined

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }

    // Check for token in cookies
    if (!token && req.cookies.token) {
      token = req.cookies.token
    }

    if (token) {
      try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

        // Get user from token
        const user = await User.findById(decoded.id).select('-password')

        if (user && user.isActive) {
          req.user = user
        }
      } catch (error) {
        // Token is invalid, but we don't want to throw an error
        // Just continue without setting req.user
        logger.warn('Invalid token in optional auth:', error)
      }
    }

    next()
  } catch (error) {
    logger.error('Optional auth middleware error:', error)
    next()
  }
}