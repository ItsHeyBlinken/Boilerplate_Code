import Stripe from 'stripe'
import { logger } from '@/utils/logger'

const secretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_replace_me'

export const stripe = new Stripe(secretKey, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export const stripeConfig = {
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_replace_me',
  currency: 'usd',
  successUrl: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
  cancelUrl: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/cancel`,
}

export async function createPaymentIntent(
  amount: number,
  currency: string = 'usd',
  customerId?: string,
  metadata?: Record<string, string>,
) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    customer: customerId,
    metadata,
    automatic_payment_methods: { enabled: true },
  })
  logger.info(`Payment intent created: ${paymentIntent.id}`)
  return paymentIntent
}

export async function createCheckoutSession(params: {
  mode: 'payment' | 'subscription'
  customerId?: string
  customerEmail?: string
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[]
  metadata?: Record<string, string>
  clientReferenceId?: string
}) {
  const session = await stripe.checkout.sessions.create({
    mode: params.mode,
    customer: params.customerId,
    customer_email: params.customerId ? undefined : params.customerEmail,
    line_items: params.lineItems,
    success_url: stripeConfig.successUrl,
    cancel_url: stripeConfig.cancelUrl,
    metadata: params.metadata,
    client_reference_id: params.clientReferenceId,
  })
  logger.info(`Checkout session created: ${session.id}`)
  return session
}

export function verifyWebhookSignature(payload: string | Buffer, signature: string) {
  return stripe.webhooks.constructEvent(payload, signature, stripeConfig.webhookSecret)
}

logger.info('Stripe configuration loaded')
