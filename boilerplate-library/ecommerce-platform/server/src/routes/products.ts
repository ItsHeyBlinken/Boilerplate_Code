/**
 * Product Management Routes
 * 
 * This module defines all product-related API routes
 * for the e-commerce platform.
 * 
 * Routes:
 * - GET / - Get all products with filtering
 * - POST / - Create product (Admin/Seller)
 * - GET /search - Search products
 * - GET /featured - Get featured products
 * - GET /category/:id - Get products by category
 * - GET /:id/related - Get related products
 * - GET /:id - Get single product
 * - PUT /:id - Update product (Admin/Seller)
 * - DELETE /:id - Delete product (Admin/Seller)
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import express from 'express'
import { 
  getProducts, 
  getProduct, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getProductsByCategory,
  searchProducts,
  getFeaturedProducts,
  getRelatedProducts
} from '../controllers/productController'
import { protect, authorize, optionalAuth } from '../middleware/auth'
import { upload } from '../middleware/upload'

const router = express.Router()

router.route('/')
  .get(optionalAuth, getProducts)
  .post(protect, authorize('ADMIN', 'SELLER'), upload.array('images', 10), createProduct)

router.route('/search')
  .get(optionalAuth, searchProducts)

router.route('/featured')
  .get(optionalAuth, getFeaturedProducts)

router.route('/category/:categoryId')
  .get(optionalAuth, getProductsByCategory)

router.route('/:id/related')
  .get(optionalAuth, getRelatedProducts)

router.route('/:id')
  .get(optionalAuth, getProduct)
  .put(protect, authorize('ADMIN', 'SELLER'), upload.array('images', 10), updateProduct)
  .delete(protect, authorize('ADMIN', 'SELLER'), deleteProduct)

export default router