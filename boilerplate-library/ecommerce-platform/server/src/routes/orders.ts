/**
 * Order Management Routes
 * 
 * This module defines all order-related API routes
 * for the e-commerce platform.
 * 
 * Routes:
 * - GET /my-orders - Get user's orders
 * - GET / - Get all orders (Admin only)
 * - POST / - Create new order
 * - PUT /:id/status - Update order status (Admin only)
 * - GET /:id - Get single order
 * - PUT /:id - Update order (Admin only)
 * - DELETE /:id - Delete order (Admin only)
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import express from 'express'
import { 
  getOrders, 
  getOrder, 
  createOrder, 
  updateOrder, 
  deleteOrder,
  getMyOrders,
  updateOrderStatus
} from '../controllers/orderController'
import { protect, authorize } from '../middleware/auth'

const router = express.Router()

router.route('/my-orders')
  .get(protect, getMyOrders)

router.route('/')
  .get(protect, authorize('ADMIN'), getOrders)
  .post(protect, createOrder)

router.route('/:id/status')
  .put(protect, authorize('ADMIN'), updateOrderStatus)

router.route('/:id')
  .get(protect, getOrder)
  .put(protect, authorize('ADMIN'), updateOrder)
  .delete(protect, authorize('ADMIN'), deleteOrder)

export default router