import { NextResponse } from 'next/server'
import { getSession, slugify } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not authorized' }, { status: 401 })
  }

  const memberships = await prisma.membership.findMany({
    where: { userId: session.id },
    include: { organization: true },
    orderBy: { createdAt: 'asc' },
  })

  return NextResponse.json({
    success: true,
    data: memberships.map((m) => ({
      role: m.role,
      organization: m.organization,
    })),
  })
}

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not authorized' }, { status: 401 })
  }

  const { name } = await req.json()
  if (!name) {
    return NextResponse.json({ success: false, error: 'name is required' }, { status: 400 })
  }

  const baseSlug = slugify(name) || 'org'
  const org = await prisma.organization.create({
    data: {
      name,
      slug: `${baseSlug}-${Date.now().toString(36)}`,
      memberships: {
        create: { userId: session.id, role: 'OWNER' },
      },
    },
  })

  return NextResponse.json({ success: true, data: org }, { status: 201 })
}
