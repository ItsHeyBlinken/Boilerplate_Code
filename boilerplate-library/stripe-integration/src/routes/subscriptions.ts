import { Router } from 'express'
import { Subscription } from '@/models/Subscription'
import { asyncHandler } from '@/middleware/errorHandler'
import { authenticate, AuthRequest } from '@/middleware/auth'

const router = Router()

router.get('/plans', (_req, res) => {
  res.json({
    success: true,
    data: [
      { id: 'price_basic', name: 'Basic', amount: 9.99 },
      { id: 'price_pro', name: 'Pro', amount: 29.99 },
    ],
  })
})

router.get('/', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const subs = await Subscription.find({ user: req.user!.id })
  res.json({ success: true, data: subs })
}))

router.post('/create', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const now = new Date()
  const periodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
  const sub = await Subscription.create({
    user: req.user!.id,
    stripeSubscriptionId: `sub_placeholder_${Date.now()}`,
    stripeCustomerId: req.body.customerId || `cus_placeholder_${req.user!.id}`,
    stripePriceId: req.body.priceId || 'price_basic',
    status: 'incomplete',
    currentPeriodStart: now,
    currentPeriodEnd: periodEnd,
    cancelAtPeriodEnd: false,
  })
  res.status(201).json({
    success: true,
    data: sub,
    note: 'Replace placeholder IDs by creating a real Stripe Subscription in production.',
  })
}))

export default router
