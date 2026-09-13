import { Router } from 'express'
import { User } from '@/models/User'
import { asyncHandler } from '@/middleware/errorHandler'
import { authenticate, AuthRequest } from '@/middleware/auth'

const router = Router()

router.get('/profile', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const user = await User.findById(req.user!.id)
  res.json({ success: true, data: user })
}))

router.put('/profile', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const user = await User.findByIdAndUpdate(req.user!.id, req.body, { new: true, runValidators: true })
  res.json({ success: true, data: user })
}))

router.get('/', authenticate, asyncHandler(async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).limit(50)
  res.json({ success: true, data: users })
}))

router.get('/:id', authenticate, asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    res.status(404).json({ success: false, error: 'User not found' })
    return
  }
  res.json({ success: true, data: user })
}))

export default router
