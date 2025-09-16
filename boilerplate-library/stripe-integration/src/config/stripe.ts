import Stripe from 'stripe'
import { logger } from '@/utils/logger'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables')
}

// Initialize Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
})

// Stripe configuration
export const stripeConfig = {
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  currency: 'usd',
  successUrl: `${process.env.FRONTEND_URL}/payment/success`,
  cancelUrl: `${process.env.FRONTEND_URL}/payment/cancel`,
}

// Stripe webhook events we handle
export const STRIPE_WEBHOOK_EVENTS = {
  PAYMENT_INTENT_SUCCEEDED: 'payment_intent.succeeded',
  PAYMENT_INTENT_PAYMENT_FAILED: 'payment_intent.payment_failed',
  CUSTOMER_SUBSCRIPTION_CREATED: 'customer.subscription.created',
  CUSTOMER_SUBSCRIPTION_UPDATED: 'customer.subscription.updated',
  CUSTOMER_SUBSCRIPTION_DELETED: 'customer.subscription.deleted',
  INVOICE_PAYMENT_SUCCEEDED: 'invoice.payment_succeeded',
  INVOICE_PAYMENT_FAILED: 'invoice.payment_failed',
  CHARGE_DISPUTE_CREATED: 'charge.dispute.created',
  CUSTOMER_CREATED: 'customer.created',
  CUSTOMER_UPDATED: 'customer.updated',
  CUSTOMER_DELETED: 'customer.deleted',
} as const

// Helper function to create Stripe customer
export const createStripeCustomer = async (email: string, name?: string) => {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
    })
    
    logger.info(`Stripe customer created: ${customer.id}`)
    return customer
  } catch (error) {
    logger.error('Error creating Stripe customer:', error)
    throw error
  }
}

// Helper function to create payment intent
export const createPaymentIntent = async (
  amount: number,
  currency: string = 'usd',
  customerId?: string,
  metadata?: Record<string, string>
) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      customer: customerId,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    })
    
    logger.info(`Payment intent created: ${paymentIntent.id}`)
    return paymentIntent
  } catch (error) {
    logger.error('Error creating payment intent:', error)
    throw error
  }
}

// Helper function to create subscription
export const createSubscription = async (
  customerId: string,
  priceId: string,
  metadata?: Record<string, string>
) => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      metadata,
      expand: ['latest_invoice.payment_intent'],
    })
    
    logger.info(`Subscription created: ${subscription.id}`)
    return subscription
  } catch (error) {
    logger.error('Error creating subscription:', error)
    throw error
  }
}

// Helper function to cancel subscription
export const cancelSubscription = async (subscriptionId: string) => {
  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId)
    
    logger.info(`Subscription cancelled: ${subscription.id}`)
    return subscription
  } catch (error) {
    logger.error('Error cancelling subscription:', error)
    throw error
  }
}

// Helper function to create refund
export const createRefund = async (
  paymentIntentId: string,
  amount?: number,
  reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer'
) => {
  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined,
      reason,
    })
    
    logger.info(`Refund created: ${refund.id}`)
    return refund
  } catch (error) {
    logger.error('Error creating refund:', error)
    throw error
  }
}

// Helper function to verify webhook signature
export const verifyWebhookSignature = (payload: string, signature: string) => {
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      stripeConfig.webhookSecret!
    )
    
    return event
  } catch (error) {
    logger.error('Webhook signature verification failed:', error)
    throw error
  }
}

logger.info('✅ Stripe configuration loaded successfully')