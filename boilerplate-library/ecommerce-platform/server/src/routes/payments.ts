/**
 * Payment Processing Routes
 * 
 * This module defines all payment-related API routes
 * for the e-commerce platform.
 * 
 * Routes:
 * - POST /intent - Create payment intent
 * - POST /confirm - Confirm payment
 * - POST /refund - Create refund
 * - GET /methods - Get payment methods
 * - POST /methods - Add payment method
 * - DELETE /methods/:id - Remove payment method
 * 
 * All routes require user authentication.
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import express from 'express'
import { 
  createPaymentIntent, 
  confirmPayment, 
  createRefund,
  getPaymentMethods,
  addPaymentMethod,
  removePaymentMethod
} from '../controllers/paymentController'
import { protect } from '../middleware/auth'

const router = express.Router()

// All payment routes require authentication
router.use(protect)

router.route('/intent')
  .post(createPaymentIntent)

router.route('/confirm')
  .post(confirmPayment)

router.route('/refund')
  .post(createRefund)

router.route('/methods')
  .get(getPaymentMethods)
  .post(addPaymentMethod)

router.route('/methods/:methodId')
  .delete(removePaymentMethod)

export default router