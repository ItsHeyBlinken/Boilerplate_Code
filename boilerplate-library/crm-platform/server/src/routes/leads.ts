import { Router } from 'express'
import { LeadStatus } from '@prisma/client'
import { prisma } from '../lib/prisma'
import { asyncHandler } from '../middleware/errorHandler'
import { AuthRequest, protect } from '../middleware/auth'

const router = Router()

router.use(protect)

function parseLeadStatus(value: unknown): LeadStatus | undefined {
  if (value === undefined || value === null || value === '') return undefined
  const allowed = Object.values(LeadStatus) as string[]
  if (allowed.includes(String(value))) {
    return value as LeadStatus
  }
  return undefined
}

router.get(
  '/',
  asyncHandler(async (req: AuthRequest, res) => {
    const leads = await prisma.lead.findMany({
      where: { ownerId: req.user!.id },
      include: { contact: true },
      orderBy: { createdAt: 'desc' },
      take: 100,
    })
    res.json({ success: true, data: leads })
  }),
)

router.post(
  '/',
  asyncHandler(async (req: AuthRequest, res) => {
    const { firstName, lastName, email, phone, company, source, status, score, notes, contactId } = req.body
    if (!firstName || !lastName || !email) {
      res.status(400).json({ success: false, error: 'firstName, lastName, and email are required' })
      return
    }
    const leadStatus = parseLeadStatus(status) ?? LeadStatus.NEW
    const lead = await prisma.lead.create({
      data: {
        firstName,
        lastName,
        email: String(email).toLowerCase(),
        phone,
        company,
        source: source || 'other',
        status: leadStatus,
        score: typeof score === 'number' ? score : 0,
        notes,
        contactId: contactId || null,
        ownerId: req.user!.id,
      },
    })
    res.status(201).json({ success: true, data: lead })
  }),
)

router.get(
  '/:id',
  asyncHandler(async (req: AuthRequest, res) => {
    const lead = await prisma.lead.findFirst({
      where: { id: req.params.id, ownerId: req.user!.id },
      include: { contact: true, deals: true },
    })
    if (!lead) {
      res.status(404).json({ success: false, error: 'Lead not found' })
      return
    }
    res.json({ success: true, data: lead })
  }),
)

router.put(
  '/:id',
  asyncHandler(async (req: AuthRequest, res) => {
    const existing = await prisma.lead.findFirst({
      where: { id: req.params.id, ownerId: req.user!.id },
    })
    if (!existing) {
      res.status(404).json({ success: false, error: 'Lead not found' })
      return
    }
    const { firstName, lastName, email, phone, company, source, status, score, notes, contactId } = req.body
    const leadStatus = parseLeadStatus(status)
    const lead = await prisma.lead.update({
      where: { id: existing.id },
      data: {
        ...(firstName !== undefined ? { firstName } : {}),
        ...(lastName !== undefined ? { lastName } : {}),
        ...(email !== undefined ? { email: String(email).toLowerCase() } : {}),
        ...(phone !== undefined ? { phone } : {}),
        ...(company !== undefined ? { company } : {}),
        ...(source !== undefined ? { source } : {}),
        ...(leadStatus !== undefined ? { status: leadStatus } : {}),
        ...(score !== undefined ? { score: Number(score) } : {}),
        ...(notes !== undefined ? { notes } : {}),
        ...(contactId !== undefined ? { contactId: contactId || null } : {}),
      },
    })
    res.json({ success: true, data: lead })
  }),
)

router.delete(
  '/:id',
  asyncHandler(async (req: AuthRequest, res) => {
    const existing = await prisma.lead.findFirst({
      where: { id: req.params.id, ownerId: req.user!.id },
    })
    if (!existing) {
      res.status(404).json({ success: false, error: 'Lead not found' })
      return
    }
    await prisma.lead.delete({ where: { id: existing.id } })
    res.json({ success: true, data: { message: 'Deleted' } })
  }),
)

export default router
