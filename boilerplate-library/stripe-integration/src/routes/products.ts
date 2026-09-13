import { Router } from 'express'
import { prisma } from '@/lib/prisma'
import { asyncHandler } from '@/middleware/errorHandler'
import { authenticate } from '@/middleware/auth'

const router = Router()

router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    res.json({ success: true, data: products })
  }),
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await prisma.product.findUnique({ where: { id: req.params.id } })
    if (!product) {
      res.status(404).json({ success: false, error: 'Product not found' })
      return
    }
    res.json({ success: true, data: product })
  }),
)

router.post(
  '/',
  authenticate,
  asyncHandler(async (req, res) => {
    const { name, description, price, currency, stripeProductId, stripePriceId } = req.body
    if (!name || !description || price === undefined) {
      res.status(400).json({ success: false, error: 'name, description, and price are required' })
      return
    }
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        currency: currency || 'usd',
        stripeProductId,
        stripePriceId,
      },
    })
    res.status(201).json({ success: true, data: product })
  }),
)

export default router
