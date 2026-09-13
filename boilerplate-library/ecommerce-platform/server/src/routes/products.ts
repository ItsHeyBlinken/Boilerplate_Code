import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { asyncHandler } from '../middleware/errorHandler'
import { AuthRequest, protect, authorize } from '../middleware/auth'

const router = Router()

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
}

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const page = parseInt(String(req.query.page || '1'), 10) || 1
    const limit = parseInt(String(req.query.limit || '20'), 10) || 20
    const skip = (page - 1) * limit
    const where: { isActive: boolean; categoryId?: string; name?: { contains: string; mode: 'insensitive' } } = {
      isActive: true,
    }
    if (req.query.category) {
      where.categoryId = String(req.query.category)
    }
    if (req.query.search) {
      where.name = { contains: String(req.query.search), mode: 'insensitive' }
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ])

    res.json({
      success: true,
      count: products.length,
      total,
      page,
      pages: Math.ceil(total / limit) || 1,
      data: products,
    })
  }),
)

router.get(
  '/featured',
  asyncHandler(async (_req, res) => {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
      take: 8,
    })
    res.json({
      success: true,
      count: products.length,
      total: products.length,
      page: 1,
      pages: 1,
      data: products,
    })
  }),
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { category: true },
    })
    if (!product) {
      res.status(404).json({ success: false, error: 'Product not found' })
      return
    }
    res.json({ success: true, data: product })
  }),
)

router.post(
  '/',
  protect,
  authorize('ADMIN'),
  asyncHandler(async (req: AuthRequest, res) => {
    const { name, description, price, stock, categoryId, imageUrl } = req.body
    if (!name || !description || price === undefined) {
      res.status(400).json({ success: false, error: 'name, description, and price are required' })
      return
    }
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        stock: Number(stock) || 0,
        categoryId: categoryId || null,
        imageUrl,
        slug: `${slugify(name)}-${Date.now()}`,
      },
    })
    res.status(201).json({ success: true, data: product })
  }),
)

router.put(
  '/:id',
  protect,
  authorize('ADMIN'),
  asyncHandler(async (req, res) => {
    const { name, description, price, stock, categoryId, imageUrl, isActive } = req.body
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(price !== undefined ? { price: Number(price) } : {}),
        ...(stock !== undefined ? { stock: Number(stock) } : {}),
        ...(categoryId !== undefined ? { categoryId: categoryId || null } : {}),
        ...(imageUrl !== undefined ? { imageUrl } : {}),
        ...(isActive !== undefined ? { isActive: Boolean(isActive) } : {}),
      },
    })
    res.json({ success: true, data: product })
  }),
)

router.delete(
  '/:id',
  protect,
  authorize('ADMIN'),
  asyncHandler(async (req, res) => {
    await prisma.product.delete({ where: { id: req.params.id } })
    res.json({ success: true, data: { message: 'Deleted' } })
  }),
)

export default router
