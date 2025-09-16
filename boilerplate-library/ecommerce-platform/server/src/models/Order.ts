/**
 * Order Model and Schema Definition
 * 
 * This module defines the Order model for managing the complete order lifecycle
 * in the e-commerce platform, from cart to fulfillment.
 * 
 * Features:
 * - Complete order management with unique order numbers
 * - Order items with product details and pricing
 * - Shipping and billing address management
 * - Payment information and status tracking
 * - Order status workflow (PENDING → DELIVERED)
 * - Shipping tracking and delivery management
 * - Tax calculation and discount application
 * - Multi-currency support
 * - Order notes and special instructions
 * - Cancellation and refund handling
 * - Order analytics and reporting
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import mongoose, { Document, Schema } from 'mongoose'

export interface IOrder extends Document {
  _id: string
  orderNumber: string
  user: mongoose.Types.ObjectId
  items: IOrderItem[]
  shippingAddress: IAddress
  billingAddress: IAddress
  payment: IPaymentInfo
  shipping: IShippingInfo
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED'
  subtotal: number
  tax: number
  shippingCost: number
  discount: number
  total: number
  currency: string
  notes?: string
  trackingNumber?: string
  estimatedDelivery?: Date
  deliveredAt?: Date
  cancelledAt?: Date
  refundedAt?: Date
  createdAt: Date
  updatedAt: Date
  generateOrderNumber(): string
  calculateTotal(): number
  canBeCancelled(): boolean
  canBeRefunded(): boolean
}

export interface IOrderItem {
  product: mongoose.Types.ObjectId
  variant?: mongoose.Types.ObjectId
  name: string
  sku: string
  price: number
  quantity: number
  total: number
  image?: string
  attributes?: Record<string, string>
}

export interface IAddress {
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
}

export interface IPaymentInfo {
  method: 'CARD' | 'PAYPAL' | 'STRIPE' | 'CASH_ON_DELIVERY'
  status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
  transactionId?: string
  paidAt?: Date
  refundedAt?: Date
  refundAmount?: number
}

export interface IShippingInfo {
  method: string
  carrier?: string
  cost: number
  estimatedDays: number
  trackingUrl?: string
}

const orderItemSchema = new Schema<IOrderItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  variant: {
    type: Schema.Types.ObjectId,
    ref: 'ProductVariant',
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  sku: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
  },
  attributes: {
    type: Map,
    of: String,
  },
})

const addressSchema = new Schema<IAddress>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  address1: {
    type: String,
    required: true,
    trim: true,
  },
  address2: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  zipCode: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
})

const paymentInfoSchema = new Schema<IPaymentInfo>({
  method: {
    type: String,
    enum: ['CARD', 'PAYPAL', 'STRIPE', 'CASH_ON_DELIVERY'],
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'PAID', 'FAILED', 'REFUNDED'],
    default: 'PENDING',
  },
  transactionId: {
    type: String,
    trim: true,
  },
  paidAt: {
    type: Date,
  },
  refundedAt: {
    type: Date,
  },
  refundAmount: {
    type: Number,
    min: 0,
  },
})

const shippingInfoSchema = new Schema<IShippingInfo>({
  method: {
    type: String,
    required: true,
    trim: true,
  },
  carrier: {
    type: String,
    trim: true,
  },
  cost: {
    type: Number,
    required: true,
    min: 0,
  },
  estimatedDays: {
    type: Number,
    required: true,
    min: 1,
  },
  trackingUrl: {
    type: String,
    trim: true,
  },
})

const orderSchema = new Schema<IOrder>({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [orderItemSchema],
  shippingAddress: {
    type: addressSchema,
    required: true,
  },
  billingAddress: {
    type: addressSchema,
    required: true,
  },
  payment: {
    type: paymentInfoSchema,
    required: true,
  },
  shipping: {
    type: shippingInfoSchema,
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'],
    default: 'PENDING',
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0,
  },
  tax: {
    type: Number,
    default: 0,
    min: 0,
  },
  shippingCost: {
    type: Number,
    default: 0,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    required: true,
    default: 'USD',
    uppercase: true,
    enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters'],
    trim: true,
  },
  trackingNumber: {
    type: String,
    trim: true,
  },
  estimatedDelivery: {
    type: Date,
  },
  deliveredAt: {
    type: Date,
  },
  cancelledAt: {
    type: Date,
  },
  refundedAt: {
    type: Date,
  },
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      return ret
    },
  },
})

// Indexes for better query performance
orderSchema.index({ orderNumber: 1 })
orderSchema.index({ user: 1 })
orderSchema.index({ status: 1 })
orderSchema.index({ createdAt: -1 })
orderSchema.index({ 'payment.status': 1 })

// Generate order number
orderSchema.methods.generateOrderNumber = function(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `ORD-${timestamp}-${random}`
}

// Calculate total
orderSchema.methods.calculateTotal = function(): number {
  return this.subtotal + this.tax + this.shippingCost - this.discount
}

// Check if order can be cancelled
orderSchema.methods.canBeCancelled = function(): boolean {
  return ['PENDING', 'CONFIRMED'].includes(this.status)
}

// Check if order can be refunded
orderSchema.methods.canBeRefunded = function(): boolean {
  return ['DELIVERED', 'SHIPPED'].includes(this.status) && this.payment.status === 'PAID'
}

// Auto-generate order number before saving
orderSchema.pre('save', function(next) {
  if (this.isNew && !this.orderNumber) {
    this.orderNumber = this.generateOrderNumber()
  }
  next()
})

// Populate product details when finding orders
orderSchema.pre('find', function() {
  this.populate('items.product', 'name images')
  this.populate('user', 'firstName lastName email')
})

export const Order = mongoose.model<IOrder>('Order', orderSchema)