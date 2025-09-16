/**
 * Shopping Cart Routes
 * 
 * This module defines all shopping cart API routes
 * for the e-commerce platform.
 * 
 * Routes:
 * - GET / - Get user's cart
 * - POST / - Add item to cart
 * - PUT /:itemId - Update cart item quantity
 * - DELETE /:itemId - Remove item from cart
 * - DELETE / - Clear entire cart
 * - GET /count - Get cart item count
 * 
 * All routes require user authentication.
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import express from 'express'
import { 
  getCart, 
  addToCart, 
  updateCartItem, 
  removeFromCart, 
  clearCart,
  getCartCount
} from '../controllers/cartController'
import { protect } from '../middleware/auth'

const router = express.Router()

// All cart routes require authentication
router.use(protect)

router.route('/')
  .get(getCart)
  .post(addToCart)
  .delete(clearCart)

router.route('/count')
  .get(getCartCount)

router.route('/:itemId')
  .put(updateCartItem)
  .delete(removeFromCart)

export default router