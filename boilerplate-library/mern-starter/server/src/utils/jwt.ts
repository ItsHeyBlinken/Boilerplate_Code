import jwt from 'jsonwebtoken'

export function signToken(payload: { sub: string; email: string; role?: string }) {
  const secret = process.env.JWT_SECRET || 'change-me'
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d'
  return jwt.sign(payload, secret, { expiresIn })
}
