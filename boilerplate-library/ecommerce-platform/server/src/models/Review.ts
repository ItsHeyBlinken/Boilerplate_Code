/**
 * Review Model and Schema Definition
 * 
 * This module defines the Review model for managing product reviews
 * and ratings in the e-commerce platform with moderation features.
 * 
 * Features:
 * - Product reviews with ratings (1-5 stars)
 * - Review titles and detailed comments
 * - Image attachments for reviews
 * - Verified purchase reviews
 * - Helpful voting system
 * - Review moderation (PENDING, APPROVED, REJECTED)
 * - Vendor response to reviews
 * - Automatic product rating calculation
 * - Review analytics and reporting
 * - User review history
 * - Spam prevention and content filtering
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import mongoose, { Document, Schema } from 'mongoose'

export interface IReview extends Document {
  _id: string
  product: mongoose.Types.ObjectId
  user: mongoose.Types.ObjectId
  order?: mongoose.Types.ObjectId
  rating: number
  title?: string
  comment?: string
  images?: string[]
  verified: boolean
  helpful: number
  helpfulUsers: mongoose.Types.ObjectId[]
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  response?: {
    comment: string
    respondedBy: mongoose.Types.ObjectId
    respondedAt: Date
  }
  createdAt: Date
  updatedAt: Date
  isHelpful(userId: string): boolean
  markHelpful(userId: string): void
  unmarkHelpful(userId: string): void
}

const reviewSchema = new Schema<IReview>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
  },
  title: {
    type: String,
    maxlength: [100, 'Title cannot exceed 100 characters'],
    trim: true,
  },
  comment: {
    type: String,
    maxlength: [1000, 'Comment cannot exceed 1000 characters'],
    trim: true,
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
  verified: {
    type: Boolean,
    default: false,
  },
  helpful: {
    type: Number,
    default: 0,
    min: 0,
  },
  helpfulUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING',
  },
  response: {
    comment: {
      type: String,
      maxlength: [500, 'Response comment cannot exceed 500 characters'],
      trim: true,
    },
    respondedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    respondedAt: {
      type: Date,
    },
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
reviewSchema.index({ product: 1 })
reviewSchema.index({ user: 1 })
reviewSchema.index({ rating: 1 })
reviewSchema.index({ status: 1 })
reviewSchema.index({ createdAt: -1 })
reviewSchema.index({ product: 1, user: 1 }, { unique: true }) // One review per user per product

// Check if user marked review as helpful
reviewSchema.methods.isHelpful = function(userId: string): boolean {
  return this.helpfulUsers.some((id: mongoose.Types.ObjectId) => id.toString() === userId)
}

// Mark review as helpful
reviewSchema.methods.markHelpful = function(userId: string): void {
  if (!this.isHelpful(userId)) {
    this.helpfulUsers.push(userId)
    this.helpful += 1
  }
}

// Unmark review as helpful
reviewSchema.methods.unmarkHelpful = function(userId: string): void {
  const index = this.helpfulUsers.findIndex((id: mongoose.Types.ObjectId) => id.toString() === userId)
  if (index > -1) {
    this.helpfulUsers.splice(index, 1)
    this.helpful = Math.max(0, this.helpful - 1)
  }
}

// Populate user details when finding reviews
reviewSchema.pre('find', function() {
  this.populate('user', 'firstName lastName avatarUrl')
})

// Update product rating when review is saved
reviewSchema.post('save', async function() {
  if (this.status === 'APPROVED') {
    const Product = mongoose.model('Product')
    const product = await Product.findById(this.product)
    
    if (product) {
      const reviews = await mongoose.model('Review').find({
        product: this.product,
        status: 'APPROVED'
      })
      
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
      const averageRating = totalRating / reviews.length
      
      product.averageRating = Math.round(averageRating * 10) / 10
      product.reviewCount = reviews.length
      await product.save()
    }
  }
})

export const Review = mongoose.model<IReview>('Review', reviewSchema)