import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { asyncHandler } from '../middleware/errorHandler'
import { AuthRequest, protect, authorize } from '../middleware/auth'

const router = Router()

router.use(protect)

router.get(
  '/my-orders',
  asyncHandler(async (req: AuthRequest, res) => {
    const orders = await prisma.order.findMany({
      where: { userId: req.user!.id },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    })
    res.json({ success: true, data: orders })
  }),
)

router.get(
  '/',
  authorize('ADMIN'),
  asyncHandler(async (_req, res) => {
    const orders = await prisma.order.findMany({
      include: { items: true, user: { select: { id: true, email: true, firstName: true, lastName: true } } },
      orderBy: { createdAt: 'desc' },
      take: 100,
    })
    res.json({ success: true, data: orders })
  }),
)

router.get(
  '/:id',
  asyncHandler(async (req: AuthRequest, res) => {
    const order = await prisma.order.findFirst({
      where: {
        id: req.params.id,
        ...(req.user!.role === 'ADMIN' ? {} : { userId: req.user!.id }),
      },
      include: { items: true },
    })
    if (!order) {
      res.status(404).json({ success: false, error: 'Order not found' })
      return
    }
    res.json({ success: true, data: order })
  }),
)

router.post(
  '/',
  asyncHandler(async (req: AuthRequest, res) => {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user!.id },
      include: { product: true },
    })
    if (cartItems.length === 0) {
      res.status(400).json({ success: false, error: 'Cart is empty' })
      return
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}`,
        userId: req.user!.id,
        subtotal,
        total: subtotal,
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            total: item.product.price * item.quantity,
          })),
        },
      },
      include: { items: true },
    })

    await prisma.cartItem.deleteMany({ where: { userId: req.user!.id } })
    res.status(201).json({ success: true, data: order })
  }),
)

export default router
