import jwt, { type SignOptions } from 'jsonwebtoken'

export function signToken(payload: { sub: string; email: string; name: string }) {
  const secret = process.env.JWT_SECRET || 'change-me'
  const expiresIn = (process.env.JWT_EXPIRES_IN || '7d') as SignOptions['expiresIn']
  return jwt.sign(payload, secret, { expiresIn })
}

export function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET || 'change-me'
  return jwt.verify(token, secret) as { sub: string; email: string; name: string }
}
