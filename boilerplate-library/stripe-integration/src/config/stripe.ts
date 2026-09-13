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
  successUrl: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/success`,
  cancelUrl: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/cancel`,
}

export const createPaymentIntent = async (
  amount: number,
  currency: string = 'usd',
  customerId?: string,
  metadata?: Record<string, string>,
) => {
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

export const verifyWebhookSignature = (payload: string | Buffer, signature: string) => {
  return stripe.webhooks.constructEvent(payload, signature, stripeConfig.webhookSecret)
}

logger.info('Stripe configuration loaded')
