import { Router } from 'express'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/utils/jwt'
import { comparePassword, hashPassword, sanitizeUser } from '@/utils/password'
import { asyncHandler } from '@/middleware/errorHandler'
import { authenticate, AuthRequest } from '@/middleware/auth'

const router = Router()

router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName } = req.body
    if (!email || !password || !firstName || !lastName) {
      res.status(400).json({ success: false, error: 'email, password, firstName, and lastName are required' })
      return
    }

    const normalized = String(email).toLowerCase()
    const existing = await prisma.user.findUnique({ where: { email: normalized } })
    if (existing) {
      res.status(409).json({ success: false, error: 'Email already registered' })
      return
    }

    const user = await prisma.user.create({
      data: {
        email: normalized,
        password: await hashPassword(password),
        firstName,
        lastName,
      },
    })

    const token = signToken({ sub: user.id, email: user.email, role: user.role })
    res.status(201).json({ success: true, data: { token, user: sanitizeUser(user) } })
  }),
)

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({ where: { email: String(email || '').toLowerCase() } })
    if (!user || !(await comparePassword(password, user.password))) {
      res.status(401).json({ success: false, error: 'Invalid credentials' })
      return
    }
    const token = signToken({ sub: user.id, email: user.email, role: user.role })
    res.json({ success: true, data: { token, user: sanitizeUser(user) } })
  }),
)

router.get(
  '/me',
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

router.post('/logout', (_req, res) => res.json({ success: true, data: { message: 'Logged out' } }))

export default router
