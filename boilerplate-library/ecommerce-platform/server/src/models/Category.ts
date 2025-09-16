/**
 * Category Model and Schema Definition
 * 
 * This module defines the Category model for organizing products
 * in the e-commerce platform with hierarchical structure and SEO features.
 * 
 * Features:
 * - Hierarchical category structure (parent/children)
 * - SEO-friendly slugs and meta information
 * - Category images and descriptions
 * - Sort order management
 * - Active/inactive status control
 * - Category tree navigation
 * - SEO optimization (title, description, keywords)
 * - Automatic slug generation
 * - Category population for efficient queries
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import mongoose, { Document, Schema } from 'mongoose'

export interface ICategory extends Document {
  _id: string
  name: string
  slug: string
  description?: string
  image?: string
  parent?: mongoose.Types.ObjectId
  children?: mongoose.Types.ObjectId[]
  isActive: boolean
  sortOrder: number
  seo: {
    title?: string
    description?: string
    keywords?: string[]
  }
  createdAt: Date
  updatedAt: Date
  generateSlug(): string
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: [100, 'Category name cannot exceed 100 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Category slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    trim: true,
  },
  image: {
    type: String,
    validate: {
      validator: function(v: string) {
        return !v || /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v)
      },
      message: 'Please provide a valid image URL'
    }
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  },
  children: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  sortOrder: {
    type: Number,
    default: 0,
  },
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
categorySchema.index({ slug: 1 })
categorySchema.index({ parent: 1 })
categorySchema.index({ isActive: 1 })
categorySchema.index({ sortOrder: 1 })
categorySchema.index({ name: 'text', description: 'text' })

// Generate slug from name
categorySchema.methods.generateSlug = function(): string {
  return this.name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Auto-generate slug before saving
categorySchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.generateSlug()
  }
  next()
})

// Populate children when finding categories
categorySchema.pre('find', function() {
  this.populate('children', 'name slug')
})

export const Category = mongoose.model<ICategory>('Category', categorySchema)