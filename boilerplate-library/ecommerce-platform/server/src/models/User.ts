/**
 * User Model and Schema Definition
 * 
 * This module defines the User model for the e-commerce platform,
 * including authentication, profile management, and e-commerce specific features.
 * 
 * Features:
 * - User authentication with email/password
 * - Role-based access control (CUSTOMER, ADMIN, SELLER)
 * - Profile management (avatar, bio, preferences)
 * - Address management (billing/shipping)
 * - Shopping cart and wishlist
 * - Order history tracking
 * - Newsletter subscription
 * - Stripe customer integration
 * - Password hashing with bcrypt
 * - Email verification system
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  _id: string
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'CUSTOMER' | 'ADMIN' | 'SELLER'
  isActive: boolean
  emailVerified: boolean
  stripeCustomerId?: string
  avatarUrl?: string
  phone?: string
  dateOfBirth?: Date
  bio?: string
  website?: string
  location?: string
  lastLogin?: Date
  emailVerifiedAt?: Date
  // E-commerce specific fields
  addresses: IAddress[]
  wishlist: mongoose.Types.ObjectId[]
  cart: ICartItem[]
  orders: mongoose.Types.ObjectId[]
  newsletterSubscribed: boolean
  preferences: {
    currency: string
    language: string
    notifications: {
      email: boolean
      sms: boolean
      push: boolean
    }
  }
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
  getFullName(): string
}

export interface IAddress {
  _id?: string
  type: 'billing' | 'shipping'
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
  isDefault: boolean
}

export interface ICartItem {
  product: mongoose.Types.ObjectId
  quantity: number
  price: number
  addedAt: Date
}

const addressSchema = new Schema<IAddress>({
  type: {
    type: String,
    enum: ['billing', 'shipping'],
    required: true,
  },
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
  isDefault: {
    type: Boolean,
    default: false,
  },
})

const cartItemSchema = new Schema<ICartItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
})

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters'],
  },
  role: {
    type: String,
    enum: ['CUSTOMER', 'ADMIN', 'SELLER'],
    default: 'CUSTOMER',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  stripeCustomerId: {
    type: String,
    default: null,
  },
  avatarUrl: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'],
  },
  dateOfBirth: {
    type: Date,
    default: null,
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
    default: null,
  },
  website: {
    type: String,
    default: null,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL'],
  },
  location: {
    type: String,
    maxlength: [100, 'Location cannot exceed 100 characters'],
    default: null,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  emailVerifiedAt: {
    type: Date,
    default: null,
  },
  // E-commerce specific fields
  addresses: [addressSchema],
  wishlist: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
  }],
  cart: [cartItemSchema],
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order',
  }],
  newsletterSubscribed: {
    type: Boolean,
    default: false,
  },
  preferences: {
    currency: {
      type: String,
      default: 'USD',
      enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
    },
    language: {
      type: String,
      default: 'en',
      enum: ['en', 'es', 'fr', 'de', 'it'],
    },
    notifications: {
      email: {
        type: Boolean,
        default: true,
      },
      sms: {
        type: Boolean,
        default: false,
      },
      push: {
        type: Boolean,
        default: true,
      },
    },
  },
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      delete ret.password
      return ret
    },
  },
})

// Indexes for better query performance
userSchema.index({ email: 1 })
userSchema.index({ role: 1 })
userSchema.index({ isActive: 1 })
userSchema.index({ stripeCustomerId: 1 })
userSchema.index({ 'addresses.type': 1 })

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  
  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error as Error)
  }
})

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// Get full name method
userSchema.methods.getFullName = function(): string {
  return `${this.firstName} ${this.lastName}`
}

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`
})

export const User = mongoose.model<IUser>('User', userSchema)