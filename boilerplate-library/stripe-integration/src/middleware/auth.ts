import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { asyncHandler } from './errorHandler'

export interface AuthRequest extends Request {
  user?: { id: string; email: string; role?: string }
}

export const authenticate = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'Missing auth token' })
    return
  }

  const token = header.slice(7)
  const secret = process.env.JWT_SECRET || 'change-me'
  const payload = jwt.verify(token, secret) as { sub: string; email: string; role?: string }
  req.user = { id: payload.sub, email: payload.email, role: payload.role }
  next()
})
