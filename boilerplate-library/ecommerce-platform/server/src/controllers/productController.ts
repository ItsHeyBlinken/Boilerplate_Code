/**
 * Product Management Controller
 * 
 * This module handles all product-related operations for the e-commerce platform,
 * including product CRUD, search, filtering, and inventory management.
 * 
 * Features:
 * - Product CRUD operations with image uploads
 * - Advanced product search and filtering
 * - Category-based product browsing
 * - Featured products management
 * - Related products suggestions
 * - Product view tracking
 * - Inventory management
 * - SEO optimization
 * - Admin/Seller access control
 * - Product analytics and reporting
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import { Request, Response, NextFunction } from 'express'
import { Product } from '../models/Product'
import { logger } from '../utils/logger'

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 20
    const skip = (page - 1) * limit

    const query: any = { status: 'ACTIVE' }

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category
    }

    // Filter by price range
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {}
      if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice as string)
      if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice as string)
    }

    // Filter by brand
    if (req.query.brand) {
      query.brand = new RegExp(req.query.brand as string, 'i')
    }

    // Sort
    let sort: any = { createdAt: -1 }
    if (req.query.sort) {
      const sortField = req.query.sort as string
      if (sortField === 'price-asc') sort = { price: 1 }
      else if (sortField === 'price-desc') sort = { price: -1 }
      else if (sortField === 'name-asc') sort = { name: 1 }
      else if (sortField === 'name-desc') sort = { name: -1 }
      else if (sortField === 'rating') sort = { averageRating: -1 }
      else if (sortField === 'popular') sort = { salesCount: -1 }
    }

    const products = await Product.find(query)
      .populate('category', 'name slug')
      .populate('subcategory', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(limit)

    const total = await Product.countDocuments(query)

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: products,
    })
  } catch (error) {
    logger.error('Get products error:', error)
    next(error)
  }
}

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug')
      .populate('subcategory', 'name slug')
      .populate('reviews', 'rating comment user createdAt')
      .populate('vendor', 'firstName lastName')

    if (!product) {
      res.status(404).json({
        success: false,
        error: 'Product not found',
      })
      return
    }

    // Increment view count
    product.viewCount += 1
    await product.save()

    res.status(200).json({
      success: true,
      data: product,
    })
  } catch (error) {
    logger.error('Get product error:', error)
    next(error)
  }
}

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin/Seller)
export const createProduct = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const productData = req.body

    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      productData.images = req.files.map((file: any) => `/uploads/products/${file.filename}`)
    }

    const product = await Product.create(productData)

    res.status(201).json({
      success: true,
      data: product,
    })
  } catch (error) {
    logger.error('Create product error:', error)
    next(error)
  }
}

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin/Seller)
export const updateProduct = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      res.status(404).json({
        success: false,
        error: 'Product not found',
      })
      return
    }

    const productData = req.body

    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      productData.images = req.files.map((file: any) => `/uploads/products/${file.filename}`)
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, productData, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      success: true,
      data: updatedProduct,
    })
  } catch (error) {
    logger.error('Update product error:', error)
    next(error)
  }
}

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin/Seller)
export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      res.status(404).json({
        success: false,
        error: 'Product not found',
      })
      return
    }

    await Product.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    })
  } catch (error) {
    logger.error('Delete product error:', error)
    next(error)
  }
}

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
export const searchProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { q } = req.query

    if (!q) {
      res.status(400).json({
        success: false,
        error: 'Search query is required',
      })
      return
    }

    const products = await Product.find({
      $text: { $search: q as string },
      status: 'ACTIVE',
    })
      .populate('category', 'name slug')
      .limit(20)

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    })
  } catch (error) {
    logger.error('Search products error:', error)
    next(error)
  }
}

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await Product.find({ featured: true, status: 'ACTIVE' })
      .populate('category', 'name slug')
      .limit(10)
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    })
  } catch (error) {
    logger.error('Get featured products error:', error)
    next(error)
  }
}

// @desc    Get products by category
// @route   GET /api/products/category/:categoryId
// @access  Public
export const getProductsByCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await Product.find({ 
      category: req.params.categoryId,
      status: 'ACTIVE' 
    })
      .populate('category', 'name slug')
      .limit(20)

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    })
  } catch (error) {
    logger.error('Get products by category error:', error)
    next(error)
  }
}

// @desc    Get related products
// @route   GET /api/products/:id/related
// @access  Public
export const getRelatedProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id)
    
    if (!product) {
      res.status(404).json({
        success: false,
        error: 'Product not found',
      })
      return
    }

    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      status: 'ACTIVE',
    })
      .populate('category', 'name slug')
      .limit(5)

    res.status(200).json({
      success: true,
      count: relatedProducts.length,
      data: relatedProducts,
    })
  } catch (error) {
    logger.error('Get related products error:', error)
    next(error)
  }
}