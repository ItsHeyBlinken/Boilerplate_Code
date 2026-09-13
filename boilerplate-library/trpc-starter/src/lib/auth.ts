import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const COOKIE = 'trpc_starter_token'

export type SessionUser = {
  id: string
  email: string
  name: string
}

function secretKey() {
  return new TextEncoder().encode(process.env.JWT_SECRET || 'change-me')
}

export async function signSession(user: SessionUser) {
  return new SignJWT({
    email: user.email,
    name: user.name,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secretKey())
}

export async function verifyToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey())
    if (!payload.sub || typeof payload.email !== 'string') return null
    return {
      id: payload.sub,
      email: payload.email,
      name: typeof payload.name === 'string' ? payload.name : '',
    }
  } catch {
    return null
  }
}

export async function getSessionFromCookieHeader(cookieHeader: string | null) {
  if (!cookieHeader) return null
  const match = cookieHeader.match(new RegExp(`${COOKIE}=([^;]+)`))
  if (!match?.[1]) return null
  return verifyToken(decodeURIComponent(match[1]))
}

export async function getSession() {
  const token = cookies().get(COOKIE)?.value
  if (!token) return null
  return verifyToken(token)
}

export { COOKIE }
