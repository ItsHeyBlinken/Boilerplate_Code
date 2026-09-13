import { Router } from 'express'
import { PostStatus } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { asyncHandler } from '@/middleware/errorHandler'
import { authenticate, AuthRequest } from '@/middleware/auth'

const router = Router()

function slugify(title: string): string {
  return String(title || 'post')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
}

const authorSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
}

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const posts = await prisma.post.findMany({
      where: { isPublished: true },
      include: { author: { select: authorSelect } },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    res.json({ success: true, data: posts })
  }),
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const post = await prisma.post.update({
      where: { id: req.params.id },
      data: { viewCount: { increment: 1 } },
      include: { author: { select: authorSelect } },
    }).catch(() => null)

    if (!post) {
      res.status(404).json({ success: false, error: 'Post not found' })
      return
    }
    res.json({ success: true, data: post })
  }),
)

router.post(
  '/',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const { title, content, excerpt, status } = req.body
    if (!title || !content) {
      res.status(400).json({ success: false, error: 'title and content are required' })
      return
    }

    const postStatus: PostStatus =
      status === 'DRAFT' ? PostStatus.DRAFT : status === 'ARCHIVED' ? PostStatus.ARCHIVED : PostStatus.PUBLISHED
    const isPublished = postStatus === PostStatus.PUBLISHED

    const post = await prisma.post.create({
      data: {
        title,
        content,
        excerpt,
        status: postStatus,
        isPublished,
        publishedAt: isPublished ? new Date() : null,
        slug: `${slugify(title)}-${Date.now()}`,
        authorId: req.user!.id,
      },
      include: { author: { select: authorSelect } },
    })
    res.status(201).json({ success: true, data: post })
  }),
)

router.put(
  '/:id',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const existing = await prisma.post.findUnique({ where: { id: req.params.id } })
    if (!existing) {
      res.status(404).json({ success: false, error: 'Post not found' })
      return
    }
    if (existing.authorId !== req.user!.id) {
      res.status(403).json({ success: false, error: 'Not allowed' })
      return
    }

    const { title, content, excerpt, status } = req.body
    const postStatus: PostStatus | undefined =
      status === undefined
        ? undefined
        : status === 'DRAFT'
          ? PostStatus.DRAFT
          : status === 'ARCHIVED'
            ? PostStatus.ARCHIVED
            : PostStatus.PUBLISHED

    const post = await prisma.post.update({
      where: { id: existing.id },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(content !== undefined ? { content } : {}),
        ...(excerpt !== undefined ? { excerpt } : {}),
        ...(postStatus !== undefined
          ? {
              status: postStatus,
              isPublished: postStatus === PostStatus.PUBLISHED,
              publishedAt:
                postStatus === PostStatus.PUBLISHED ? existing.publishedAt ?? new Date() : existing.publishedAt,
            }
          : {}),
      },
      include: { author: { select: authorSelect } },
    })
    res.json({ success: true, data: post })
  }),
)

router.delete(
  '/:id',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const existing = await prisma.post.findUnique({ where: { id: req.params.id } })
    if (!existing) {
      res.status(404).json({ success: false, error: 'Post not found' })
      return
    }
    if (existing.authorId !== req.user!.id) {
      res.status(403).json({ success: false, error: 'Not allowed' })
      return
    }
    await prisma.post.delete({ where: { id: existing.id } })
    res.json({ success: true, data: { message: 'Deleted' } })
  }),
)

router.post(
  '/:id/like',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const post = await prisma.post.findUnique({ where: { id: req.params.id } })
    if (!post) {
      res.status(404).json({ success: false, error: 'Post not found' })
      return
    }

    try {
      await prisma.like.create({
        data: { userId: req.user!.id, postId: post.id },
      })
      const updated = await prisma.post.update({
        where: { id: post.id },
        data: { likeCount: { increment: 1 } },
      })
      res.json({ success: true, data: updated })
    } catch {
      res.status(409).json({ success: false, error: 'Already liked' })
    }
  }),
)

router.delete(
  '/:id/like',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const existing = await prisma.like.findUnique({
      where: {
        userId_postId: { userId: req.user!.id, postId: req.params.id },
      },
    })
    if (!existing) {
      res.status(404).json({ success: false, error: 'Like not found' })
      return
    }

    await prisma.like.delete({ where: { id: existing.id } })
    const updated = await prisma.post.update({
      where: { id: req.params.id },
      data: { likeCount: { decrement: 1 } },
    })
    res.json({ success: true, data: updated })
  }),
)

export default router
