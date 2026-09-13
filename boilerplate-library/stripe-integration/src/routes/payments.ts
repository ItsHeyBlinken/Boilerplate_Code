import { Router } from 'express'
import { prisma } from '@/lib/prisma'
import { createCheckoutSession, createPaymentIntent, stripe } from '@/config/stripe'
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

router.post(
  '/create-payment-intent',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const { amount, currency = 'usd', metadata, productId } = req.body
    if (!amount || amount <= 0) {
      res.status(400).json({ success: false, error: 'Valid amount is required' })
      return
    }

    const user = await ensureStripeCustomer(req.user!.id)
    const intent = await createPaymentIntent(amount, currency, user.stripeCustomerId || undefined, {
      userId: user.id,
      ...(metadata || {}),
    })

    await prisma.payment.create({
      data: {
        userId: user.id,
        productId: productId || null,
        amount: Number(amount),
        currency,
        stripePaymentIntentId: intent.id,
        status: 'pending',
        paymentMethod: 'card',
      },
    })

    res.json({ success: true, data: { clientSecret: intent.client_secret, id: intent.id } })
  }),
)

router.post(
  '/create-checkout-session',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const { priceId, productId, quantity = 1, mode = 'payment' } = req.body
    if (!priceId && !productId) {
      res.status(400).json({ success: false, error: 'priceId or productId is required' })
      return
    }

    const user = await ensureStripeCustomer(req.user!.id)
    let resolvedPriceId = priceId as string | undefined
    let amount = 0
    let currency = 'usd'

    if (productId) {
      const product = await prisma.product.findUnique({ where: { id: productId } })
      if (!product) {
        res.status(404).json({ success: false, error: 'Product not found' })
        return
      }
      resolvedPriceId = product.stripePriceId || undefined
      amount = product.price
      currency = product.currency
      if (!resolvedPriceId) {
        res.status(400).json({
          success: false,
          error: 'Product is missing stripePriceId. Create a Stripe Price and save it on the product.',
        })
        return
      }
    }

    if (!resolvedPriceId) {
      res.status(400).json({ success: false, error: 'priceId is required' })
      return
    }

    const session = await createCheckoutSession({
      mode: mode === 'subscription' ? 'subscription' : 'payment',
      customerId: user.stripeCustomerId || undefined,
      customerEmail: user.email,
      lineItems: [{ price: resolvedPriceId, quantity: Number(quantity) || 1 }],
      metadata: { userId: user.id, productId: productId || '' },
      clientReferenceId: user.id,
    })

    await prisma.payment.create({
      data: {
        userId: user.id,
        productId: productId || null,
        amount,
        currency,
        stripeCheckoutSessionId: session.id,
        status: 'pending',
        paymentMethod: 'checkout',
      },
    })

    res.status(201).json({ success: true, data: { id: session.id, url: session.url } })
  }),
)

router.get(
  '/history',
  authenticate,
  asyncHandler(async (req: AuthRequest, res) => {
    const payments = await prisma.payment.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
    })
    res.json({ success: true, data: payments })
  }),
)

export default router
