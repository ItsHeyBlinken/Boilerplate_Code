import { Router } from 'express'
import Stripe from 'stripe'
import { asyncHandler } from '../middleware/errorHandler'
import { AuthRequest, protect } from '../middleware/auth'

const router = Router()

const stripeSecret = process.env.STRIPE_SECRET_KEY || 'sk_test_replace_me'
const stripe = new Stripe(stripeSecret, { apiVersion: '2023-10-16' })

router.post(
  '/create-payment-intent',
  protect,
  asyncHandler(async (req: AuthRequest, res) => {
    const { amount, currency = 'usd' } = req.body
    if (!amount || amount <= 0) {
      res.status(400).json({ success: false, error: 'Valid amount is required' })
      return
    }
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100),
      currency,
      metadata: { userId: req.user!.id },
      automatic_payment_methods: { enabled: true },
    })
    res.json({
      success: true,
      data: { clientSecret: intent.client_secret, id: intent.id },
    })
  }),
)

export default router
