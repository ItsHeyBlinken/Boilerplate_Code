import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { db } from '@/config/database'
import { logger } from '@/utils/logger'

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    role: string
  }
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

    if (!token) {
      res.status(401).json({ error: 'Access token required' })
      return
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    // Check if user still exists
    const user = await db('users')
      .select('id', 'email', 'role', 'is_active')
      .where('id', decoded.userId)
      .first()

    if (!user || !user.is_active) {
      res.status(401).json({ error: 'User not found or inactive' })
      return
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    }

    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid token' })
      return
    }
    logger.error('Authentication error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' })
      return
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: 'Insufficient permissions' })
      return
    }

    next()
  }
}

export const requireAdmin = requireRole(['admin'])
export const requireModerator = requireRole(['admin', 'moderator'])