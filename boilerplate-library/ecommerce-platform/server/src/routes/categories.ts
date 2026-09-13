import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { asyncHandler } from '../middleware/errorHandler'
import { AuthRequest, protect, authorize } from '../middleware/auth'

const router = Router()

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
}

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })
    res.json({ success: true, data: categories })
  }),
)

router.post(
  '/',
  protect,
  authorize('ADMIN'),
  asyncHandler(async (req: AuthRequest, res) => {
    const { name, description } = req.body
    if (!name) {
      res.status(400).json({ success: false, error: 'name is required' })
      return
    }
    const category = await prisma.category.create({
      data: {
        name,
        description,
        slug: `${slugify(name)}-${Date.now()}`,
      },
    })
    res.status(201).json({ success: true, data: category })
  }),
)

export default router
