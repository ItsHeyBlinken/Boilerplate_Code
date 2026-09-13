import { Router, Request, Response } from 'express'
import { verifyWebhookSignature } from '@/config/stripe'
import { Payment } from '@/models/Payment'
import { logger } from '@/utils/logger'

const router = Router()

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
        const intent = event.data.object as { id: string; status: string }
        await Payment.findOneAndUpdate(
          { stripePaymentIntentId: intent.id },
          { status: intent.status },
        )
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
