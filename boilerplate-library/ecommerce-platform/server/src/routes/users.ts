import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { asyncHandler } from '../middleware/errorHandler'
import { AuthRequest, protect, authorize } from '../middleware/auth'
import { sanitizeUser } from '../utils/password'

const router = Router()

router.get(
  '/profile',
  protect,
  asyncHandler(async (req: AuthRequest, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.user!.id } })
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' })
      return
    }
    res.json({ success: true, user: sanitizeUser(user) })
  }),
)

router.put(
  '/profile',
  protect,
  asyncHandler(async (req: AuthRequest, res) => {
    const { firstName, lastName } = req.body
    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        ...(firstName !== undefined ? { firstName } : {}),
        ...(lastName !== undefined ? { lastName } : {}),
      },
    })
    res.json({ success: true, user: sanitizeUser(user) })
  }),
)

router.get(
  '/',
  protect,
  authorize('ADMIN'),
  asyncHandler(async (_req, res) => {
    const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 100 })
    res.json({ success: true, data: users.map(sanitizeUser) })
  }),
)

export default router
