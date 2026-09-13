import { Router } from 'express'
import { User } from '@/models/User'
import { signToken } from '@/utils/jwt'
import { asyncHandler } from '@/middleware/errorHandler'
import { authenticate, AuthRequest } from '@/middleware/auth'

const router = Router()

router.post('/register', asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body
  const existing = await User.findOne({ email })
  if (existing) {
    res.status(409).json({ success: false, error: 'Email already registered' })
    return
  }
  const user = await User.create({ email, password, firstName, lastName })
  const token = signToken({ sub: user.id, email: user.email, role: user.role })
  res.status(201).json({ success: true, data: { token, user } })
}))

router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await user.comparePassword(password))) {
    res.status(401).json({ success: false, error: 'Invalid credentials' })
    return
  }
  user.lastLogin = new Date()
  await user.save()
  const token = signToken({ sub: user.id, email: user.email, role: user.role })
  res.json({ success: true, data: { token, user } })
}))

router.get('/me', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const user = await User.findById(req.user!.id)
  res.json({ success: true, data: user })
}))

router.post('/logout', (_req, res) => {
  res.json({ success: true, data: { message: 'Logged out' } })
})

export default router
