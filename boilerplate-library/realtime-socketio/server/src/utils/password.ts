import bcrypt from 'bcryptjs'

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12)
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export function sanitizeUser<T extends { password?: string }>(user: T) {
  const { password: _password, ...safe } = user
  return safe
}
