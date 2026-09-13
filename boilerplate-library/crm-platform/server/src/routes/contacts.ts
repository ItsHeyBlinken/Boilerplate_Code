import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { asyncHandler } from '../middleware/errorHandler'
import { AuthRequest, protect } from '../middleware/auth'

const router = Router()

router.use(protect)

router.get(
  '/',
  asyncHandler(async (req: AuthRequest, res) => {
    const contacts = await prisma.contact.findMany({
      where: { ownerId: req.user!.id },
      orderBy: { createdAt: 'desc' },
      take: 100,
    })
    res.json({ success: true, data: contacts })
  }),
)

router.post(
  '/',
  asyncHandler(async (req: AuthRequest, res) => {
    const { firstName, lastName, email, phone, company, title, notes } = req.body
    if (!firstName || !lastName || !email) {
      res.status(400).json({ success: false, error: 'firstName, lastName, and email are required' })
      return
    }
    const contact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        email: String(email).toLowerCase(),
        phone,
        company,
        title,
        notes,
        ownerId: req.user!.id,
      },
    })
    res.status(201).json({ success: true, data: contact })
  }),
)

router.get(
  '/:id',
  asyncHandler(async (req: AuthRequest, res) => {
    const contact = await prisma.contact.findFirst({
      where: { id: req.params.id, ownerId: req.user!.id },
    })
    if (!contact) {
      res.status(404).json({ success: false, error: 'Contact not found' })
      return
    }
    res.json({ success: true, data: contact })
  }),
)

router.put(
  '/:id',
  asyncHandler(async (req: AuthRequest, res) => {
    const existing = await prisma.contact.findFirst({
      where: { id: req.params.id, ownerId: req.user!.id },
    })
    if (!existing) {
      res.status(404).json({ success: false, error: 'Contact not found' })
      return
    }
    const { firstName, lastName, email, phone, company, title, notes } = req.body
    const contact = await prisma.contact.update({
      where: { id: existing.id },
      data: {
        ...(firstName !== undefined ? { firstName } : {}),
        ...(lastName !== undefined ? { lastName } : {}),
        ...(email !== undefined ? { email: String(email).toLowerCase() } : {}),
        ...(phone !== undefined ? { phone } : {}),
        ...(company !== undefined ? { company } : {}),
        ...(title !== undefined ? { title } : {}),
        ...(notes !== undefined ? { notes } : {}),
      },
    })
    res.json({ success: true, data: contact })
  }),
)

router.delete(
  '/:id',
  asyncHandler(async (req: AuthRequest, res) => {
    const existing = await prisma.contact.findFirst({
      where: { id: req.params.id, ownerId: req.user!.id },
    })
    if (!existing) {
      res.status(404).json({ success: false, error: 'Contact not found' })
      return
    }
    await prisma.contact.delete({ where: { id: existing.id } })
    res.json({ success: true, data: { message: 'Deleted' } })
  }),
)

export default router
