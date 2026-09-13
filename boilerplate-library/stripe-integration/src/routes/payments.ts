import { Router } from 'express'
import { createPaymentIntent } from '@/config/stripe'
import { Payment } from '@/models/Payment'
import { asyncHandler } from '@/middleware/errorHandler'
import { authenticate, AuthRequest } from '@/middleware/auth'

const router = Router()

router.post('/create-payment-intent', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const { amount, currency = 'usd', metadata } = req.body
  if (!amount || amount <= 0) {
    res.status(400).json({ success: false, error: 'Valid amount is required' })
    return
  }
  const intent = await createPaymentIntent(amount, currency, undefined, {
    userId: req.user!.id,
    ...(metadata || {}),
  })
  await Payment.create({
    user: req.user!.id,
    amount,
    currency,
    stripePaymentIntentId: intent.id,
    status: 'pending',
    paymentMethod: 'card',
  })
  res.json({ success: true, data: { clientSecret: intent.client_secret, id: intent.id } })
}))

router.get('/history', authenticate, asyncHandler(async (req: AuthRequest, res) => {
  const payments = await Payment.find({ user: req.user!.id }).sort({ createdAt: -1 })
  res.json({ success: true, data: payments })
}))

export default router
