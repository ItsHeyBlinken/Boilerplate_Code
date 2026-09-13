import { Router } from 'express'
import { prisma } from '@/lib/prisma'
import { asyncHandler } from '@/middleware/errorHandler'
import { authenticate, AuthRequest } from '@/middleware/auth'
import { sanitizeUser } from '@/utils/password'

const router = Router()

router.get(
  '/profile',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.user!.id } })
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' })
      return
    }
    res.json({ success: true, data: sanitizeUser(user) })
  }),
)

router.put(
  '/profile',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const { firstName, lastName } = req.body
    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        ...(firstName !== undefined ? { firstName } : {}),
        ...(lastName !== undefined ? { lastName } : {}),
      },
    })
    res.json({ success: true, data: sanitizeUser(user) })
  }),
)

router.get(
  '/',
  authenticate,
  asyncHandler(async (_req, res) => {
    const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 50 })
    res.json({ success: true, data: users.map(sanitizeUser) })
  }),
)

router.get(
  '/:id',
  authenticate,
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } })
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' })
      return
    }
    res.json({ success: true, data: sanitizeUser(user) })
  }),
)

export default router
