import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { asyncHandler } from '../middleware/errorHandler'
import { AuthRequest, protect } from '../middleware/auth'

const router = Router()

router.get(
  '/summary',
  protect,
  asyncHandler(async (req: AuthRequest, res) => {
    const ownerId = req.user!.id
    const [contacts, leads, openDeals, wonDeals] = await Promise.all([
      prisma.contact.count({ where: { ownerId } }),
      prisma.lead.count({ where: { ownerId } }),
      prisma.deal.count({ where: { ownerId, status: 'OPEN' } }),
      prisma.deal.count({ where: { ownerId, status: 'WON' } }),
    ])
    res.json({
      success: true,
      data: { contacts, leads, openDeals, wonDeals },
    })
  }),
)

export default router
