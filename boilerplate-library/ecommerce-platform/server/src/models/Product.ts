/**
 * Product Model and Schema Definition
 * 
 * This module defines the Product model for the e-commerce platform,
 * including comprehensive product management, inventory tracking, and SEO features.
 * 
 * Features:
 * - Complete product information (name, description, SKU, pricing)
 * - Product variants and attributes
 * - Inventory management with low stock alerts
 * - Image gallery and media management
 * - Category and subcategory relationships
 * - SEO optimization (meta tags, slugs)
 * - Digital and physical product support
 * - Vendor management
 * - Review and rating system
 * - Sales tracking and analytics
 * - Product status management (DRAFT, ACTIVE, INACTIVE, ARCHIVED)
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import mongoose, { Document, Schema } from 'mongoose'

export interface IProduct extends Document {
  _id: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  sku: string
  price: number
  comparePrice?: number
  costPrice?: number
  currency: string
  images: string[]
  category: mongoose.Types.ObjectId
  subcategory?: mongoose.Types.ObjectId
  tags: string[]
  brand?: string
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
    unit: string
  }
  inventory: {
    trackQuantity: boolean
    quantity: number
    lowStockThreshold: number
    allowBackorder: boolean
  }
  variants: IProductVariant[]
  attributes: IProductAttribute[]
  seo: {
    title?: string
    description?: string
    keywords?: string[]
  }
  status: 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'ARCHIVED'
  featured: boolean
  digital: boolean
  downloadable: boolean
  downloadFiles?: string[]
  requiresShipping: boolean
  taxable: boolean
  vendor?: mongoose.Types.ObjectId
  reviews: mongoose.Types.ObjectId[]
  averageRating: number
  reviewCount: number
  salesCount: number
  viewCount: number
  metadata?: Record<string, any>
  createdAt: Date
  updatedAt: Date
  generateSlug(): string
  calculateDiscount(): number
  isInStock(): boolean
  isLowStock(): boolean
}

export interface IProductVariant {
  _id?: string
  name: string
  sku: string
  price: number
  comparePrice?: number
  costPrice?: number
  images: string[]
  inventory: {
    trackQuantity: boolean
    quantity: number
    lowStockThreshold: number
    allowBackorder: boolean
  }
  attributes: Record<string, string>
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
    unit: string
  }
  status: 'ACTIVE' | 'INACTIVE'
}

export interface IProductAttribute {
  name: string
  value: string
  type: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'SELECT' | 'MULTISELECT'
  options?: string[]
  required: boolean
}

const variantSchema = new Schema<IProductVariant>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  comparePrice: {
    type: Number,
    min: 0,
  },
  costPrice: {
    type: Number,
    min: 0,
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
  inventory: {
    trackQuantity: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 10,
      min: 0,
    },
    allowBackorder: {
      type: Boolean,
      default: false,
    },
  },
  attributes: {
    type: Map,
    of: String,
  },
  weight: {
    type: Number,
    min: 0,
  },
  dimensions: {
    length: {
      type: Number,
      min: 0,
    },
    width: {
      type: Number,
      min: 0,
    },
    height: {
      type: Number,
      min: 0,
    },
    unit: {
      type: String,
      enum: ['cm', 'in', 'm', 'ft'],
      default: 'cm',
    },
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'ACTIVE',
  },
})

const attributeSchema = new Schema<IProductAttribute>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['TEXT', 'NUMBER', 'BOOLEAN', 'SELECT', 'MULTISELECT'],
    default: 'TEXT',
  },
  options: [{
    type: String,
    trim: true,
  }],
  required: {
    type: Boolean,
    default: false,
  },
})

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Product slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
  },
  shortDescription: {
    type: String,
    maxlength: [500, 'Short description cannot exceed 500 characters'],
    trim: true,
  },
  sku: {
    type: String,
    required: [true, 'Product SKU is required'],
    unique: true,
    trim: true,
    uppercase: true,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative'],
  },
  comparePrice: {
    type: Number,
    min: [0, 'Compare price cannot be negative'],
  },
  costPrice: {
    type: Number,
    min: [0, 'Cost price cannot be negative'],
  },
  currency: {
    type: String,
    required: [true, 'Currency is required'],
    default: 'USD',
    uppercase: true,
    enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
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
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Product category is required'],
  },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Tag cannot exceed 50 characters'],
  }],
  brand: {
    type: String,
    trim: true,
    maxlength: [100, 'Brand name cannot exceed 100 characters'],
  },
  weight: {
    type: Number,
    min: [0, 'Weight cannot be negative'],
  },
  dimensions: {
    length: {
      type: Number,
      min: [0, 'Length cannot be negative'],
    },
    width: {
      type: Number,
      min: [0, 'Width cannot be negative'],
    },
    height: {
      type: Number,
      min: [0, 'Height cannot be negative'],
    },
    unit: {
      type: String,
      enum: ['cm', 'in', 'm', 'ft'],
      default: 'cm',
    },
  },
  inventory: {
    trackQuantity: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      default: 0,
      min: [0, 'Quantity cannot be negative'],
    },
    lowStockThreshold: {
      type: Number,
      default: 10,
      min: [0, 'Low stock threshold cannot be negative'],
    },
    allowBackorder: {
      type: Boolean,
      default: false,
    },
  },
  variants: [variantSchema],
  attributes: [attributeSchema],
  seo: {
    title: {
      type: String,
      maxlength: [60, 'SEO title cannot exceed 60 characters'],
      trim: true,
    },
    description: {
      type: String,
      maxlength: [160, 'SEO description cannot exceed 160 characters'],
      trim: true,
    },
    keywords: [{
      type: String,
      trim: true,
    }],
  },
  status: {
    type: String,
    enum: ['DRAFT', 'ACTIVE', 'INACTIVE', 'ARCHIVED'],
    default: 'DRAFT',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  digital: {
    type: Boolean,
    default: false,
  },
  downloadable: {
    type: Boolean,
    default: false,
  },
  downloadFiles: [{
    type: String,
  }],
  requiresShipping: {
    type: Boolean,
    default: true,
  },
  taxable: {
    type: Boolean,
    default: true,
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review',
  }],
  averageRating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5'],
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: [0, 'Review count cannot be negative'],
  },
  salesCount: {
    type: Number,
    default: 0,
    min: [0, 'Sales count cannot be negative'],
  },
  viewCount: {
    type: Number,
    default: 0,
    min: [0, 'View count cannot be negative'],
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
productSchema.index({ name: 'text', description: 'text', tags: 'text' })
productSchema.index({ slug: 1 })
productSchema.index({ sku: 1 })
productSchema.index({ category: 1 })
productSchema.index({ status: 1 })
productSchema.index({ featured: 1 })
productSchema.index({ price: 1 })
productSchema.index({ averageRating: -1 })
productSchema.index({ salesCount: -1 })
productSchema.index({ createdAt: -1 })

// Generate slug from name
productSchema.methods.generateSlug = function(): string {
  return this.name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Calculate discount percentage
productSchema.methods.calculateDiscount = function(): number {
  if (this.comparePrice && this.comparePrice > this.price) {
    return Math.round(((this.comparePrice - this.price) / this.comparePrice) * 100)
  }
  return 0
}

// Check if product is in stock
productSchema.methods.isInStock = function(): boolean {
  if (!this.inventory.trackQuantity) return true
  return this.inventory.quantity > 0
}

// Check if product is low in stock
productSchema.methods.isLowStock = function(): boolean {
  if (!this.inventory.trackQuantity) return false
  return this.inventory.quantity <= this.inventory.lowStockThreshold
}

// Auto-generate slug before saving
productSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.generateSlug()
  }
  next()
})

export const Product = mongoose.model<IProduct>('Product', productSchema)