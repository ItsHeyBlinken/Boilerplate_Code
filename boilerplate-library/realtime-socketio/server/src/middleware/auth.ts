import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'

export interface AuthRequest extends Request {
  user?: { id: string; email: string; name: string }
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'Not authorized' })
    return
  }
  try {
    const payload = verifyToken(header.slice(7))
    req.user = { id: payload.sub, email: payload.email, name: payload.name }
    next()
  } catch {
    res.status(401).json({ success: false, error: 'Not authorized' })
  }
}
