import { Router } from 'express'
import { Post } from '@/models/Post'
import { asyncHandler } from '@/middleware/errorHandler'
import { authenticate, AuthRequest } from '@/middleware/auth'

const router = Router()

router.get('/', asyncHandler(async (_req, res) => {
  const posts = await Post.find({ isPublished: true })
    .populate('author', 'firstName lastName email')
    .sort({ createdAt: -1 })
    .limit(50)
  res.json({ success: true, data: posts })
}))

router.get('/:id', asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author', 'firstName lastName email')
  if (!post) {
    res.status(404).json({ success: false, error: 'Post not found' })
    return
  }
  post.viewCount += 1
  await post.save()
  res.json({ success: true, data: post })
}))

router.post('/', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const { title, content, excerpt, status } = req.body
  const slugBase = String(title || 'post')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
  const post = await Post.create({
    title,
    content,
    excerpt,
    status: status || 'PUBLISHED',
    isPublished: status !== 'DRAFT',
    slug: `${slugBase}-${Date.now()}`,
    author: req.user!.id,
  })
  res.status(201).json({ success: true, data: post })
}))

router.put('/:id', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) {
    res.status(404).json({ success: false, error: 'Post not found' })
    return
  }
  if (String(post.author) !== req.user!.id) {
    res.status(403).json({ success: false, error: 'Not allowed' })
    return
  }
  Object.assign(post, req.body)
  await post.save()
  res.json({ success: true, data: post })
}))

router.delete('/:id', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) {
    res.status(404).json({ success: false, error: 'Post not found' })
    return
  }
  if (String(post.author) !== req.user!.id) {
    res.status(403).json({ success: false, error: 'Not allowed' })
    return
  }
  await post.deleteOne()
  res.json({ success: true, data: { message: 'Deleted' } })
}))

export default router
