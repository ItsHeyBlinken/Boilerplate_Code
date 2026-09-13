import { Router } from 'express'
import { User } from '@/models/User'
import { asyncHandler } from '@/middleware/errorHandler'
import { authenticate, AuthRequest } from '@/middleware/auth'

const router = Router()
router.get('/profile', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  res.json({ success: true, data: await User.findById(req.user!.id) })
}))
router.get('/', authenticate, asyncHandler(async (_req, res) => {
  res.json({ success: true, data: await User.find().limit(50) })
}))
export default router
