/**
 * Review Management Routes
 * 
 * This module defines all review-related API routes
 * for the e-commerce platform.
 * 
 * Routes:
 * - GET / - Get all reviews
 * - POST / - Create review
 * - GET /my-reviews - Get user's reviews
 * - GET /product/:id - Get product reviews
 * - GET /:id - Get single review
 * - PUT /:id - Update review
 * - DELETE /:id - Delete review
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import express from 'express'
import { 
  getReviews, 
  getReview, 
  createReview, 
  updateReview, 
  deleteReview,
  getProductReviews,
  getMyReviews
} from '../controllers/reviewController'
import { protect, authorize } from '../middleware/auth'

const router = express.Router()

router.route('/')
  .get(getReviews)
  .post(protect, createReview)

router.route('/my-reviews')
  .get(protect, getMyReviews)

router.route('/product/:productId')
  .get(getProductReviews)

router.route('/:id')
  .get(getReview)
  .put(protect, updateReview)
  .delete(protect, deleteReview)

export default router