import { Router } from 'express'
import { Product } from '@/models/Product'
import { asyncHandler } from '@/middleware/errorHandler'
import { authenticate } from '@/middleware/auth'

const router = Router()
router.get('/', asyncHandler(async (_req, res) => {
  res.json({ success: true, data: await Product.find().limit(50) })
}))
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404).json({ success: false, error: 'Product not found' })
    return
  }
  res.json({ success: true, data: product })
}))
router.post('/', authenticate, asyncHandler(async (req, res) => {
  const product = await Product.create(req.body)
  res.status(201).json({ success: true, data: product })
}))
export default router
