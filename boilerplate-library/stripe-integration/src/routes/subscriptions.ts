import { Router } from 'express'
import { SubscriptionStatus } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/config/stripe'
import { asyncHandler } from '@/middleware/errorHandler'
import { authenticate, AuthRequest } from '@/middleware/auth'

const router = Router()

async function ensureStripeCustomer(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    throw Object.assign(new Error('User not found'), { statusCode: 404 })
  }
  if (user.stripeCustomerId) {
    return user
  }
  const customer = await stripe.customers.create({
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
    metadata: { userId: user.id },
  })
  return prisma.user.update({
    where: { id: user.id },
    data: { stripeCustomerId: customer.id },
  })
}

function mapStripeStatus(status: string): SubscriptionStatus {
  switch (status) {
    case 'incomplete':
      return SubscriptionStatus.incomplete
    case 'incomplete_expired':
      return SubscriptionStatus.incomplete_expired
    case 'trialing':
      return SubscriptionStatus.trialing
    case 'active':
      return SubscriptionStatus.active
    case 'past_due':
      return SubscriptionStatus.past_due
    case 'canceled':
      return SubscriptionStatus.canceled
    case 'unpaid':
      return SubscriptionStatus.unpaid
    default:
      return SubscriptionStatus.incomplete
  }
}

router.get('/plans', (_req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 'price_basic',
        name: 'Basic',
        amount: 9.99,
        note: 'Replace with a real Stripe Price ID from your Dashboard',
      },
      {
        id: 'price_pro',
        name: 'Pro',
        amount: 29.99,
        note: 'Replace with a real Stripe Price ID from your Dashboard',
      },
    ],
  })
})

router.get(
  '/',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const subs = await prisma.subscription.findMany({ where: { userId: req.user!.id } })
    res.json({ success: true, data: subs })
  }),
)

router.post(
  '/create',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const { priceId } = req.body
    if (!priceId) {
      res.status(400).json({ success: false, error: 'priceId is required (Stripe Price ID)' })
      return
    }

    const user = await ensureStripeCustomer(req.user!.id)
    if (!user.stripeCustomerId) {
      res.status(500).json({ success: false, error: 'Failed to create Stripe customer' })
      return
    }

    const subscription = await stripe.subscriptions.create({
      customer: user.stripeCustomerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
      metadata: { userId: user.id },
    })

    const periodStart = new Date((subscription.current_period_start || 0) * 1000)
    const periodEnd = new Date((subscription.current_period_end || 0) * 1000)

    const record = await prisma.subscription.create({
      data: {
        userId: user.id,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: user.stripeCustomerId,
        stripePriceId: priceId,
        status: mapStripeStatus(subscription.status),
        currentPeriodStart: periodStart,
        currentPeriodEnd: periodEnd,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    })

    const latestInvoice = subscription.latest_invoice as
      | { payment_intent?: { client_secret?: string } | string }
      | string
      | null

    let clientSecret: string | undefined
    if (latestInvoice && typeof latestInvoice !== 'string') {
      const pi = latestInvoice.payment_intent
      if (pi && typeof pi !== 'string') {
        clientSecret = pi.client_secret
      }
    }

    res.status(201).json({
      success: true,
      data: {
        subscription: record,
        stripeSubscriptionId: subscription.id,
        clientSecret,
        status: subscription.status,
      },
    })
  }),
)

router.put(
  '/:id/cancel',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const existing = await prisma.subscription.findFirst({
      where: { id: req.params.id, userId: req.user!.id },
    })
    if (!existing) {
      res.status(404).json({ success: false, error: 'Subscription not found' })
      return
    }

    const stripeSub = await stripe.subscriptions.update(existing.stripeSubscriptionId, {
      cancel_at_period_end: true,
    })

    const updated = await prisma.subscription.update({
      where: { id: existing.id },
      data: {
        cancelAtPeriodEnd: true,
        status: mapStripeStatus(stripeSub.status),
      },
    })

    res.json({ success: true, data: updated })
  }),
)

router.post(
  '/:id/resume',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const existing = await prisma.subscription.findFirst({
      where: { id: req.params.id, userId: req.user!.id },
    })
    if (!existing) {
      res.status(404).json({ success: false, error: 'Subscription not found' })
      return
    }

    const stripeSub = await stripe.subscriptions.update(existing.stripeSubscriptionId, {
      cancel_at_period_end: false,
    })

    const updated = await prisma.subscription.update({
      where: { id: existing.id },
      data: {
        cancelAtPeriodEnd: false,
        status: mapStripeStatus(stripeSub.status),
      },
    })

    res.json({ success: true, data: updated })
  }),
)

export default router
