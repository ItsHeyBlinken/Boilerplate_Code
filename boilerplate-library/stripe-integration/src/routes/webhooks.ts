import { Router, Request, Response } from 'express'
import Stripe from 'stripe'
import { PaymentStatus, SubscriptionStatus } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { verifyWebhookSignature } from '@/config/stripe'
import { logger } from '@/utils/logger'

const router = Router()

function mapPaymentStatus(status: string): PaymentStatus {
  switch (status) {
    case 'succeeded':
      return PaymentStatus.succeeded
    case 'failed':
    case 'requires_payment_method':
      return PaymentStatus.failed
    case 'canceled':
      return PaymentStatus.cancelled
    case 'refunded':
      return PaymentStatus.refunded
    case 'pending':
    case 'processing':
    case 'requires_action':
    case 'requires_confirmation':
    case 'requires_capture':
      return PaymentStatus.pending
    default:
      return PaymentStatus.pending
  }
}

function mapSubscriptionStatus(status: string): SubscriptionStatus {
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

async function upsertSubscriptionFromStripe(sub: Stripe.Subscription, userId?: string) {
  const priceId = sub.items.data[0]?.price?.id || 'unknown'
  const data = {
    stripeCustomerId: String(sub.customer),
    stripePriceId: priceId,
    status: mapSubscriptionStatus(sub.status),
    currentPeriodStart: new Date(sub.current_period_start * 1000),
    currentPeriodEnd: new Date(sub.current_period_end * 1000),
    cancelAtPeriodEnd: sub.cancel_at_period_end,
    canceledAt: sub.canceled_at ? new Date(sub.canceled_at * 1000) : null,
  }

  const existing = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: sub.id },
  })

  if (existing) {
    await prisma.subscription.update({
      where: { id: existing.id },
      data,
    })
    return
  }

  const resolvedUserId =
    userId ||
    sub.metadata?.userId ||
    (
      await prisma.user.findFirst({
        where: { stripeCustomerId: String(sub.customer) },
      })
    )?.id

  if (!resolvedUserId) {
    logger.warn(`Subscription ${sub.id} received without matching user`)
    return
  }

  await prisma.subscription.create({
    data: {
      userId: resolvedUserId,
      stripeSubscriptionId: sub.id,
      ...data,
    },
  })
}

router.post('/stripe', async (req: Request, res: Response) => {
  const signature = req.headers['stripe-signature']
  if (!signature || Array.isArray(signature)) {
    res.status(400).json({ success: false, error: 'Missing stripe-signature header' })
    return
  }

  try {
    const event = verifyWebhookSignature(req.body, signature)

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const intent = event.data.object as Stripe.PaymentIntent
        await prisma.payment.updateMany({
          where: { stripePaymentIntentId: intent.id },
          data: { status: PaymentStatus.succeeded },
        })
        break
      }
      case 'payment_intent.payment_failed': {
        const intent = event.data.object as Stripe.PaymentIntent
        await prisma.payment.updateMany({
          where: { stripePaymentIntentId: intent.id },
          data: { status: PaymentStatus.failed },
        })
        break
      }
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const paymentIntentId =
          typeof session.payment_intent === 'string' ? session.payment_intent : undefined
        await prisma.payment.updateMany({
          where: { stripeCheckoutSessionId: session.id },
          data: {
            status: PaymentStatus.succeeded,
            ...(paymentIntentId ? { stripePaymentIntentId: paymentIntentId } : {}),
          },
        })
        break
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        await upsertSubscriptionFromStripe(sub)
        break
      }
      default:
        logger.info(`Unhandled Stripe event: ${event.type}`)
    }

    res.json({ received: true })
  } catch (error) {
    logger.error('Webhook error', error)
    res.status(400).json({ success: false, error: 'Webhook verification failed' })
  }
})

export default router
