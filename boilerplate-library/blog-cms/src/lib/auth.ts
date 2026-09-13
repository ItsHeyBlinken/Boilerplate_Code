import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const COOKIE = 'blog_cms_token'

export type SessionUser = {
  id: string
  email: string
  name: string
  role: string
}

function secretKey() {
  return new TextEncoder().encode(process.env.JWT_SECRET || 'change-me')
}

export async function signSession(user: SessionUser) {
  return new SignJWT({
    email: user.email,
    name: user.name,
    role: user.role,
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
      role: typeof payload.role === 'string' ? payload.role : 'USER',
    }
  } catch {
    return null
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const token = cookies().get(COOKIE)?.value
  if (!token) return null
  return verifyToken(token)
}

export function setSessionCookie(res: NextResponse, token: string) {
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set(COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 })
}

export async function getSessionFromRequest(req: NextRequest): Promise<SessionUser | null> {
  const token = req.cookies.get(COOKIE)?.value
  if (!token) return null
  return verifyToken(token)
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
