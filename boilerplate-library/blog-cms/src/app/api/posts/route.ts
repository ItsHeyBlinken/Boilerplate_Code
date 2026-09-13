import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionFromRequest, slugify } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  const admin = req.nextUrl.searchParams.get('all') === '1'
  if (admin) {
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }
    const posts = await prisma.post.findMany({
      include: { author: { select: { id: true, name: true, email: true } } },
      orderBy: { updatedAt: 'desc' },
    })
    return NextResponse.json({ success: true, data: posts })
  }

  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    include: { author: { select: { id: true, name: true } } },
    orderBy: { publishedAt: 'desc' },
  })
  return NextResponse.json({ success: true, data: posts })
}

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const { title, content, excerpt, status } = body
  if (!title || !content) {
    return NextResponse.json({ success: false, error: 'title and content are required' }, { status: 400 })
  }

  const published = status === 'PUBLISHED'
  const post = await prisma.post.create({
    data: {
      title,
      content,
      excerpt: excerpt || null,
      status: published ? 'PUBLISHED' : 'DRAFT',
      publishedAt: published ? new Date() : null,
      slug: `${slugify(title)}-${Date.now()}`,
      authorId: session.id,
    },
  })
  return NextResponse.json({ success: true, data: post }, { status: 201 })
}
