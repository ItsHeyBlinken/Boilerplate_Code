import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { asyncHandler } from '../middleware/errorHandler'
import { AuthRequest, protect } from '../middleware/auth'

const router = Router()

router.use(protect)

async function buildCartResponse(userId: string) {
  const items = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  })
  const mapped = items.map((item) => ({
    id: item.id,
    productId: item.productId,
    quantity: item.quantity,
    product: item.product,
    price: item.product.price,
    name: item.product.name,
    image: item.product.imageUrl,
  }))
  const total = mapped.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = mapped.reduce((sum, item) => sum + item.quantity, 0)
  return { items: mapped, total, itemCount }
}

router.get(
  '/',
  asyncHandler(async (req: AuthRequest, res) => {
    const cart = await buildCartResponse(req.user!.id)
    res.json({ success: true, ...cart })
  }),
)

router.get(
  '/count',
  asyncHandler(async (req: AuthRequest, res) => {
    const items = await prisma.cartItem.findMany({ where: { userId: req.user!.id } })
    const count = items.reduce((sum, item) => sum + item.quantity, 0)
    res.json({ success: true, count })
  }),
)

router.post(
  '/',
  asyncHandler(async (req: AuthRequest, res) => {
    const { productId, quantity = 1 } = req.body
    if (!productId) {
      res.status(400).json({ success: false, error: 'productId is required' })
      return
    }
    const product = await prisma.product.findUnique({ where: { id: productId } })
    if (!product || !product.isActive) {
      res.status(404).json({ success: false, error: 'Product not found' })
      return
    }
    await prisma.cartItem.upsert({
      where: { userId_productId: { userId: req.user!.id, productId } },
      create: { userId: req.user!.id, productId, quantity: Number(quantity) || 1 },
      update: { quantity: { increment: Number(quantity) || 1 } },
    })
    const cart = await buildCartResponse(req.user!.id)
    res.status(201).json({ success: true, ...cart })
  }),
)

router.put(
  '/:productId',
  asyncHandler(async (req: AuthRequest, res) => {
    const quantity = Number(req.body.quantity)
    if (!quantity || quantity < 1) {
      await prisma.cartItem.deleteMany({
        where: { userId: req.user!.id, productId: req.params.productId },
      })
    } else {
      await prisma.cartItem.update({
        where: {
          userId_productId: { userId: req.user!.id, productId: req.params.productId },
        },
        data: { quantity },
      })
    }
    const cart = await buildCartResponse(req.user!.id)
    res.json({ success: true, ...cart })
  }),
)

router.delete(
  '/:productId',
  asyncHandler(async (req: AuthRequest, res) => {
    if (req.params.productId === undefined) {
      res.status(400).json({ success: false, error: 'productId required' })
      return
    }
    await prisma.cartItem.deleteMany({
      where: { userId: req.user!.id, productId: req.params.productId },
    })
    const cart = await buildCartResponse(req.user!.id)
    res.json({ success: true, ...cart })
  }),
)

router.delete(
  '/',
  asyncHandler(async (req: AuthRequest, res) => {
    await prisma.cartItem.deleteMany({ where: { userId: req.user!.id } })
    res.json({ success: true, message: 'Cart cleared' })
  }),
)

export default router
