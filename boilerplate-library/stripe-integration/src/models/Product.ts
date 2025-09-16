import mongoose, { Document, Schema } from 'mongoose'

export interface IProduct extends Document {
  _id: string
  name: string
  description: string
  price: number
  currency: string
  stripeProductId?: string
  stripePriceId?: string
  images: string[]
  category: string
  tags: string[]
  isActive: boolean
  isDigital: boolean
  downloadUrl?: string
  metadata?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters'],
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [2000, 'Product description cannot exceed 2000 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative'],
  },
  currency: {
    type: String,
    required: [true, 'Currency is required'],
    default: 'usd',
    uppercase: true,
    enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
  },
  stripeProductId: {
    type: String,
    default: null,
  },
  stripePriceId: {
    type: String,
    default: null,
  },
  images: [{
    type: String,
    validate: {
      validator: function(v: string) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v)
      },
      message: 'Please provide a valid image URL'
    }
  }],
  category: {
    type: String,
    required: [true, 'Product category is required'],
    trim: true,
    maxlength: [100, 'Category cannot exceed 100 characters'],
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Tag cannot exceed 50 characters'],
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  isDigital: {
    type: Boolean,
    default: false,
  },
  downloadUrl: {
    type: String,
    default: null,
    validate: {
      validator: function(v: string) {
        if (!this.isDigital) return true
        return /^https?:\/\/.+/.test(v)
      },
      message: 'Download URL is required for digital products'
    }
  },
  metadata: {
    type: Schema.Types.Mixed,
    default: {},
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
productSchema.index({ name: 'text', description: 'text' })
productSchema.index({ category: 1 })
productSchema.index({ isActive: 1 })
productSchema.index({ price: 1 })
productSchema.index({ stripeProductId: 1 })
productSchema.index({ stripePriceId: 1 })

export const Product = mongoose.model<IProduct>('Product', productSchema)