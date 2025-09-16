/**
 * Category Management Routes
 * 
 * This module defines all category-related API routes
 * for the e-commerce platform.
 * 
 * Routes:
 * - GET / - Get all categories
 * - POST / - Create category (Admin only)
 * - GET /tree - Get category tree structure
 * - GET /:id - Get single category
 * - PUT /:id - Update category (Admin only)
 * - DELETE /:id - Delete category (Admin only)
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import express from 'express'
import { 
  getCategories, 
  getCategory, 
  createCategory, 
  updateCategory, 
  deleteCategory,
  getCategoryTree
} from '../controllers/categoryController'
import { protect, authorize } from '../middleware/auth'
import { upload } from '../middleware/upload'

const router = express.Router()

router.route('/')
  .get(getCategories)
  .post(protect, authorize('ADMIN'), upload.single('image'), createCategory)

router.route('/tree')
  .get(getCategoryTree)

router.route('/:id')
  .get(getCategory)
  .put(protect, authorize('ADMIN'), upload.single('image'), updateCategory)
  .delete(protect, authorize('ADMIN'), deleteCategory)

export default router