import jwt, { type SignOptions } from 'jsonwebtoken'

export function signToken(payload: { id: string; email: string; role?: string }) {
  const secret = process.env.JWT_SECRET || 'change-me'
  const expiresIn = (process.env.JWT_EXPIRES_IN || process.env.JWT_EXPIRE || '7d') as SignOptions['expiresIn']
  return jwt.sign(payload, secret, { expiresIn })
}
