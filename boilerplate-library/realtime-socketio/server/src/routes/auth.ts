import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { comparePassword, hashPassword, sanitizeUser } from '../utils/password'
import { signToken } from '../utils/jwt'
import { AuthRequest, protect } from '../middleware/auth'

const router = Router()

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body
    if (!email || !password || !name) {
      res.status(400).json({ success: false, error: 'name, email, and password are required' })
      return
    }
    const normalized = String(email).toLowerCase()
    if (await prisma.user.findUnique({ where: { email: normalized } })) {
      res.status(409).json({ success: false, error: 'Email already registered' })
      return
    }
    const user = await prisma.user.create({
      data: { email: normalized, name, password: await hashPassword(password) },
    })
    const token = signToken({ sub: user.id, email: user.email, name: user.name })
    res.status(201).json({ success: true, data: { token, user: sanitizeUser(user) } })
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({ where: { email: String(email || '').toLowerCase() } })
    if (!user || !(await comparePassword(password, user.password))) {
      res.status(401).json({ success: false, error: 'Invalid credentials' })
      return
    }
    const token = signToken({ sub: user.id, email: user.email, name: user.name })
    res.json({ success: true, data: { token, user: sanitizeUser(user) } })
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
})

router.get('/me', protect, async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.id } })
  if (!user) {
    res.status(404).json({ success: false, error: 'User not found' })
    return
  }
  res.json({ success: true, data: sanitizeUser(user) })
})

export default router
