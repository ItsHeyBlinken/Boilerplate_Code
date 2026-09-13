import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { AuthRequest, protect } from '../middleware/auth'

const router = Router()

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
}

router.get('/', protect, async (_req, res) => {
  const rooms = await prisma.room.findMany({
    include: { owner: { select: { id: true, name: true } }, _count: { select: { messages: true } } },
    orderBy: { createdAt: 'desc' },
  })
  res.json({ success: true, data: rooms })
})

router.post('/', protect, async (req: AuthRequest, res) => {
  const { name } = req.body
  if (!name) {
    res.status(400).json({ success: false, error: 'name is required' })
    return
  }
  const room = await prisma.room.create({
    data: {
      name,
      slug: `${slugify(name)}-${Date.now()}`,
      ownerId: req.user!.id,
    },
  })
  res.status(201).json({ success: true, data: room })
})

router.get('/:id/messages', protect, async (req, res) => {
  const messages = await prisma.message.findMany({
    where: { roomId: req.params.id },
    include: { user: { select: { id: true, name: true } } },
    orderBy: { createdAt: 'asc' },
    take: 100,
  })
  res.json({ success: true, data: messages })
})

export default router
