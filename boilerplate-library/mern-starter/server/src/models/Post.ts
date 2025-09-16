import mongoose, { Document, Schema } from 'mongoose'

export interface IPost extends Document {
  _id: string
  title: string
  content: string
  slug: string
  excerpt?: string
  featuredImage?: string
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
  isPublished: boolean
  publishedAt?: Date
  viewCount: number
  likeCount: number
  commentCount: number
  metadata?: Record<string, any>
  author: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
  generateSlug(): string
}

const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [10, 'Content must be at least 10 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  excerpt: {
    type: String,
    maxlength: [500, 'Excerpt cannot exceed 500 characters'],
    default: null,
  },
  featuredImage: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
    default: 'DRAFT',
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
    default: null,
  },
  viewCount: {
    type: Number,
    default: 0,
    min: [0, 'View count cannot be negative'],
  },
  likeCount: {
    type: Number,
    default: 0,
    min: [0, 'Like count cannot be negative'],
  },
  commentCount: {
    type: Number,
    default: 0,
    min: [0, 'Comment count cannot be negative'],
  },
  metadata: {
    type: Schema.Types.Mixed,
    default: {},
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required'],
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
postSchema.index({ slug: 1 })
postSchema.index({ status: 1 })
postSchema.index({ isPublished: 1 })
postSchema.index({ publishedAt: 1 })
postSchema.index({ author: 1 })
postSchema.index({ createdAt: -1 })

// Text search index
postSchema.index({
  title: 'text',
  content: 'text',
  excerpt: 'text',
})

// Generate slug from title
postSchema.methods.generateSlug = function(): string {
  return this.title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

// Auto-generate slug before saving
postSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.generateSlug()
  }
  next()
})

// Update publishedAt when status changes to PUBLISHED
postSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'PUBLISHED' && !this.publishedAt) {
    this.publishedAt = new Date()
    this.isPublished = true
  }
  next()
})

export const Post = mongoose.model<IPost>('Post', postSchema)