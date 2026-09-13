import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { signToken } from '../utils/jwt'
import { comparePassword, hashPassword, sanitizeUser } from '../utils/password'
import { asyncHandler } from '../middleware/errorHandler'
import { AuthRequest, protect } from '../middleware/auth'

const router = Router()

router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName } = req.body
    if (!email || !password || !firstName || !lastName) {
      res.status(400).json({ success: false, error: 'Missing required fields' })
      return
    }
    const normalized = String(email).toLowerCase()
    if (await prisma.user.findUnique({ where: { email: normalized } })) {
      res.status(400).json({ success: false, error: 'User already exists' })
      return
    }
    const userCount = await prisma.user.count()
    const user = await prisma.user.create({
      data: {
        email: normalized,
        password: await hashPassword(password),
        firstName,
        lastName,
        role: userCount === 0 ? 'ADMIN' : 'CUSTOMER',
      },
    })
    const token = signToken({ id: user.id, email: user.email, role: user.role })
    res.status(201).json({
      success: true,
      token,
      user: sanitizeUser(user),
    })
  }),
)

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({ where: { email: String(email || '').toLowerCase() } })
    if (!user || !user.isActive || !(await comparePassword(password, user.password))) {
      res.status(401).json({ success: false, error: 'Invalid credentials' })
      return
    }
    const token = signToken({ id: user.id, email: user.email, role: user.role })
    res.json({ success: true, token, user: sanitizeUser(user) })
  }),
)

router.get('/logout', (_req, res) => {
  res.json({ success: true, message: 'Logged out' })
})

router.get(
  '/me',
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

export default router
