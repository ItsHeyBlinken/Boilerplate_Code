import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/password'
import { setSessionCookie, signSession, slugify } from '@/lib/auth'

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password, name, organizationName } = body
  if (!email || !password || !name) {
    return NextResponse.json(
      { success: false, error: 'name, email, and password are required' },
      { status: 400 },
    )
  }

  const normalized = String(email).toLowerCase()
  if (await prisma.user.findUnique({ where: { email: normalized } })) {
    return NextResponse.json({ success: false, error: 'Email already registered' }, { status: 409 })
  }

  const orgName = organizationName || `${name}'s Workspace`
  const baseSlug = slugify(orgName) || 'workspace'
  const slug = `${baseSlug}-${Date.now().toString(36)}`

  const user = await prisma.user.create({
    data: {
      email: normalized,
      name,
      password: await hashPassword(password),
      memberships: {
        create: {
          role: 'OWNER',
          organization: {
            create: { name: orgName, slug },
          },
        },
      },
    },
  })

  const token = await signSession({ id: user.id, email: user.email, name: user.name })
  const res = NextResponse.json({
    success: true,
    user: { id: user.id, email: user.email, name: user.name },
  })
  setSessionCookie(res, token)
  return res
}
