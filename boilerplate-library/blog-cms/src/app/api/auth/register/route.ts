import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/password'
import { setSessionCookie, signSession } from '@/lib/auth'

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password, name } = body
  if (!email || !password || !name) {
    return NextResponse.json({ success: false, error: 'name, email, and password are required' }, { status: 400 })
  }

  const normalized = String(email).toLowerCase()
  const existing = await prisma.user.findUnique({ where: { email: normalized } })
  if (existing) {
    return NextResponse.json({ success: false, error: 'Email already registered' }, { status: 409 })
  }

  const userCount = await prisma.user.count()
  const user = await prisma.user.create({
    data: {
      email: normalized,
      name,
      password: await hashPassword(password),
      role: userCount === 0 ? 'ADMIN' : 'USER',
    },
  })

  const token = await signSession({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
  const res = NextResponse.json({
    success: true,
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  })
  setSessionCookie(res, token)
  return res
}
