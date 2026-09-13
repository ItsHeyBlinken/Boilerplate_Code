import { Router } from 'express'
import { DealStatus } from '@prisma/client'
import { prisma } from '../lib/prisma'
import { asyncHandler } from '../middleware/errorHandler'
import { AuthRequest, protect } from '../middleware/auth'

const router = Router()

router.use(protect)

function parseDealStatus(value: unknown): DealStatus | undefined {
  if (value === undefined || value === null || value === '') return undefined
  const allowed = Object.values(DealStatus) as string[]
  if (allowed.includes(String(value))) {
    return value as DealStatus
  }
  return undefined
}

router.get(
  '/',
  asyncHandler(async (req: AuthRequest, res) => {
    const deals = await prisma.deal.findMany({
      where: { ownerId: req.user!.id },
      include: { contact: true, lead: true },
      orderBy: { createdAt: 'desc' },
      take: 100,
    })
    res.json({ success: true, data: deals })
  }),
)

router.post(
  '/',
  asyncHandler(async (req: AuthRequest, res) => {
    const { title, amount, currency, status, stage, notes, contactId, leadId } = req.body
    if (!title) {
      res.status(400).json({ success: false, error: 'title is required' })
      return
    }
    const dealStatus = parseDealStatus(status) ?? DealStatus.OPEN
    const deal = await prisma.deal.create({
      data: {
        title,
        amount: typeof amount === 'number' ? amount : Number(amount) || 0,
        currency: currency || 'usd',
        status: dealStatus,
        stage: stage || 'qualification',
        notes,
        contactId: contactId || null,
        leadId: leadId || null,
        ownerId: req.user!.id,
        closedAt: dealStatus === DealStatus.OPEN ? null : new Date(),
      },
    })
    res.status(201).json({ success: true, data: deal })
  }),
)

router.patch(
  '/:id/status',
  asyncHandler(async (req: AuthRequest, res) => {
    const existing = await prisma.deal.findFirst({
      where: { id: req.params.id, ownerId: req.user!.id },
    })
    if (!existing) {
      res.status(404).json({ success: false, error: 'Deal not found' })
      return
    }
    const dealStatus = parseDealStatus(req.body.status)
    if (!dealStatus) {
      res.status(400).json({ success: false, error: 'Valid status is required (OPEN, WON, LOST)' })
      return
    }
    const deal = await prisma.deal.update({
      where: { id: existing.id },
      data: {
        status: dealStatus,
        closedAt: dealStatus === DealStatus.OPEN ? null : new Date(),
      },
    })
    res.json({ success: true, data: deal })
  }),
)

router.put(
  '/:id',
  asyncHandler(async (req: AuthRequest, res) => {
    const existing = await prisma.deal.findFirst({
      where: { id: req.params.id, ownerId: req.user!.id },
    })
    if (!existing) {
      res.status(404).json({ success: false, error: 'Deal not found' })
      return
    }
    const { title, amount, currency, status, stage, notes, contactId, leadId } = req.body
    const dealStatus = parseDealStatus(status)
    const deal = await prisma.deal.update({
      where: { id: existing.id },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(amount !== undefined ? { amount: Number(amount) } : {}),
        ...(currency !== undefined ? { currency } : {}),
        ...(dealStatus !== undefined
          ? {
              status: dealStatus,
              closedAt: dealStatus === DealStatus.OPEN ? null : existing.closedAt ?? new Date(),
            }
          : {}),
        ...(stage !== undefined ? { stage } : {}),
        ...(notes !== undefined ? { notes } : {}),
        ...(contactId !== undefined ? { contactId: contactId || null } : {}),
        ...(leadId !== undefined ? { leadId: leadId || null } : {}),
      },
    })
    res.json({ success: true, data: deal })
  }),
)

export default router
