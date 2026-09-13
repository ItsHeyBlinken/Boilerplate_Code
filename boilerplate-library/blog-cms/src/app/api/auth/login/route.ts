import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { comparePassword } from '@/lib/password'
import { setSessionCookie, signSession } from '@/lib/auth'

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password } = body
  const user = await prisma.user.findUnique({ where: { email: String(email || '').toLowerCase() } })
  if (!user || !(await comparePassword(password, user.password))) {
    return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
  }

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
