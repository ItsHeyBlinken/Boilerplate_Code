import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { requireMembership } from '@/lib/tenant'

type Params = { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Params) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not authorized' }, { status: 401 })
  }

  const membership = await requireMembership(session.id, params.id)
  if (!membership) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  }

  const members = await prisma.membership.findMany({
    where: { organizationId: params.id },
    include: { user: { select: { id: true, email: true, name: true } } },
    orderBy: { createdAt: 'asc' },
  })

  return NextResponse.json({ success: true, data: members })
}

export async function POST(req: NextRequest, { params }: Params) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not authorized' }, { status: 401 })
  }

  const membership = await requireMembership(session.id, params.id, ['OWNER', 'ADMIN'])
  if (!membership) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  }

  const { email, role } = await req.json()
  if (!email) {
    return NextResponse.json({ success: false, error: 'email is required' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { email: String(email).toLowerCase() },
  })
  if (!user) {
    return NextResponse.json(
      { success: false, error: 'User must already be registered' },
      { status: 404 },
    )
  }

  const memberRole = role === 'ADMIN' || role === 'MEMBER' ? role : 'MEMBER'
  const created = await prisma.membership.upsert({
    where: {
      userId_organizationId: { userId: user.id, organizationId: params.id },
    },
    create: { userId: user.id, organizationId: params.id, role: memberRole },
    update: { role: memberRole },
    include: { user: { select: { id: true, email: true, name: true } } },
  })

  return NextResponse.json({ success: true, data: created }, { status: 201 })
}
