import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, slugify } from '@/lib/auth'

type Ctx = { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Ctx) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { author: { select: { id: true, name: true, email: true } } },
  })
  if (!post) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({ success: true, data: post })
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const session = await getSessionFromRequest(req)
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  }

  const existing = await prisma.post.findUnique({ where: { id: params.id } })
  if (!existing) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  }

  const body = await req.json()
  const { title, content, excerpt, status } = body
  const published = status === 'PUBLISHED'
  const post = await prisma.post.update({
    where: { id: existing.id },
    data: {
      ...(title !== undefined ? { title, slug: `${slugify(title)}-${existing.id.slice(-6)}` } : {}),
      ...(content !== undefined ? { content } : {}),
      ...(excerpt !== undefined ? { excerpt } : {}),
      ...(status !== undefined
        ? {
            status: published ? 'PUBLISHED' : 'DRAFT',
            publishedAt: published ? existing.publishedAt ?? new Date() : null,
          }
        : {}),
    },
  })
  return NextResponse.json({ success: true, data: post })
}

export async function DELETE(req: NextRequest, { params }: Ctx) {
  const session = await getSessionFromRequest(req)
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  }
  await prisma.post.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true, data: { message: 'Deleted' } })
}
