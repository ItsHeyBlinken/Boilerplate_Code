import mongoose, { Document, Schema } from 'mongoose'

export interface IPayment extends Document {
  _id: string
  user: mongoose.Types.ObjectId
  product?: mongoose.Types.ObjectId
  amount: number
  currency: string
  status: 'pending' | 'succeeded' | 'failed' | 'cancelled' | 'refunded'
  stripePaymentIntentId: string
  stripeChargeId?: string
  paymentMethod: string
  description?: string
  metadata?: Record<string, any>
  refundedAmount?: number
  refundReason?: string
  createdAt: Date
  updatedAt: Date
}

const paymentSchema = new Schema<IPayment>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    default: null,
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative'],
  },
  currency: {
    type: String,
    required: [true, 'Currency is required'],
    default: 'usd',
    uppercase: true,
    enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
  },
  status: {
    type: String,
    required: [true, 'Payment status is required'],
    enum: ['pending', 'succeeded', 'failed', 'cancelled', 'refunded'],
    default: 'pending',
  },
  stripePaymentIntentId: {
    type: String,
    required: [true, 'Stripe payment intent ID is required'],
    unique: true,
  },
  stripeChargeId: {
    type: String,
    default: null,
  },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: null,
  },
  metadata: {
    type: Schema.Types.Mixed,
    default: {},
  },
  refundedAmount: {
    type: Number,
    default: 0,
    min: [0, 'Refunded amount cannot be negative'],
  },
  refundReason: {
    type: String,
    default: null,
    enum: ['duplicate', 'fraudulent', 'requested_by_customer'],
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
paymentSchema.index({ user: 1 })
paymentSchema.index({ product: 1 })
paymentSchema.index({ status: 1 })
paymentSchema.index({ stripePaymentIntentId: 1 })
paymentSchema.index({ createdAt: -1 })

export const Payment = mongoose.model<IPayment>('Payment', paymentSchema)