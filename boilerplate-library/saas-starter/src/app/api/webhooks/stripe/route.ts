import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Plan } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

export const runtime = 'nodejs'

async function applySubscription(sub: Stripe.Subscription) {
  const organizationId =
    sub.metadata?.organizationId ||
    (
      await prisma.organization.findFirst({
        where: { stripeCustomerId: String(sub.customer) },
      })
    )?.id

  if (!organizationId) return

  const active = sub.status === 'active' || sub.status === 'trialing'
  await prisma.organization.update({
    where: { id: organizationId },
    data: {
      stripeSubscriptionId: sub.id,
      subscriptionStatus: sub.status,
      plan: active ? Plan.PRO : Plan.FREE,
    },
  })
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 400 })
  }

  const rawBody = await req.text()
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (error) {
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${(error as Error).message}` },
      { status: 400 },
    )
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      if (session.mode === 'subscription' && session.subscription) {
        const sub = await stripe.subscriptions.retrieve(String(session.subscription))
        if (session.metadata?.organizationId && !sub.metadata?.organizationId) {
          await stripe.subscriptions.update(sub.id, {
            metadata: { organizationId: session.metadata.organizationId },
          })
        }
        await applySubscription(sub)
      }
      break
    }
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      await applySubscription(event.data.object as Stripe.Subscription)
      break
    }
    default:
      break
  }

  return NextResponse.json({ received: true })
}
