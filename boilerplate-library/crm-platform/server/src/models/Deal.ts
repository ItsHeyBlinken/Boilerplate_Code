/**
 * Deal Model and Schema Definition
 * 
 * This module defines the Deal model for the CRM platform,
 * including sales opportunity management and revenue forecasting.
 * 
 * Features:
 * - Sales opportunity management
 * - Revenue forecasting and tracking
 * - Deal stage progression
 * - Deal team assignment
 * - Probability and close date tracking
 * - Deal value and currency management
 * - Deal source and campaign tracking
 * - Deal analytics and reporting
 * 
 * @author CRM Platform Team
 * @version 1.0.0
 */

import mongoose, { Document, Schema } from 'mongoose'

export interface IDeal extends Document {
  _id: string
  name: string
  description?: string
  value: number
  currency: string
  stage: 'PROSPECTING' | 'QUALIFICATION' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSED_WON' | 'CLOSED_LOST'
  probability: number
  expectedCloseDate: Date
  actualCloseDate?: Date
  owner: mongoose.Types.ObjectId
  contact?: mongoose.Types.ObjectId
  lead?: mongoose.Types.ObjectId
  company?: string
  source: string
  campaign?: string
  tags: string[]
  notes?: string
  lastActivityDate?: Date
  nextFollowUp?: Date
  dealType: 'NEW_BUSINESS' | 'RENEWAL' | 'UPSELL' | 'CROSS_SELL'
  competitors?: string[]
  decisionMakers: mongoose.Types.ObjectId[]
  products: IDealProduct[]
  createdAt: Date
  updatedAt: Date
  getDaysInPipeline(): number
  calculateWeightedValue(): number
  isOverdue(): boolean
}

export interface IDealProduct {
  product: mongoose.Types.ObjectId
  quantity: number
  unitPrice: number
  discount?: number
  totalPrice: number
}

const dealProductSchema = new Schema<IDealProduct>({
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
  unitPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
})

const dealSchema = new Schema<IDeal>({
  name: {
    type: String,
    required: [true, 'Deal name is required'],
    trim: true,
    maxlength: [200, 'Deal name cannot exceed 200 characters'],
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
    trim: true,
  },
  value: {
    type: Number,
    required: [true, 'Deal value is required'],
    min: [0, 'Deal value cannot be negative'],
  },
  currency: {
    type: String,
    required: [true, 'Currency is required'],
    default: 'USD',
    uppercase: true,
    enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
  },
  stage: {
    type: String,
    enum: ['PROSPECTING', 'QUALIFICATION', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST'],
    default: 'PROSPECTING',
  },
  probability: {
    type: Number,
    required: [true, 'Probability is required'],
    min: [0, 'Probability cannot be less than 0'],
    max: [100, 'Probability cannot exceed 100'],
    default: 10,
  },
  expectedCloseDate: {
    type: Date,
    required: [true, 'Expected close date is required'],
  },
  actualCloseDate: {
    type: Date,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Deal owner is required'],
  },
  contact: {
    type: Schema.Types.ObjectId,
    ref: 'Contact',
  },
  lead: {
    type: Schema.Types.ObjectId,
    ref: 'Lead',
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters'],
  },
  source: {
    type: String,
    required: [true, 'Deal source is required'],
    trim: true,
    maxlength: [100, 'Source cannot exceed 100 characters'],
  },
  campaign: {
    type: String,
    trim: true,
    maxlength: [100, 'Campaign cannot exceed 100 characters'],
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Tag cannot exceed 50 characters'],
  }],
  notes: {
    type: String,
    maxlength: [2000, 'Notes cannot exceed 2000 characters'],
  },
  lastActivityDate: {
    type: Date,
  },
  nextFollowUp: {
    type: Date,
  },
  dealType: {
    type: String,
    enum: ['NEW_BUSINESS', 'RENEWAL', 'UPSELL', 'CROSS_SELL'],
    default: 'NEW_BUSINESS',
  },
  competitors: [{
    type: String,
    trim: true,
    maxlength: [100, 'Competitor name cannot exceed 100 characters'],
  }],
  decisionMakers: [{
    type: Schema.Types.ObjectId,
    ref: 'Contact',
  }],
  products: [dealProductSchema],
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
dealSchema.index({ name: 1 })
dealSchema.index({ stage: 1 })
dealSchema.index({ owner: 1 })
dealSchema.index({ contact: 1 })
dealSchema.index({ lead: 1 })
dealSchema.index({ company: 1 })
dealSchema.index({ source: 1 })
dealSchema.index({ expectedCloseDate: 1 })
dealSchema.index({ createdAt: -1 })
dealSchema.index({ lastActivityDate: -1 })
dealSchema.index({ value: -1 })

// Calculate days in pipeline
dealSchema.methods.getDaysInPipeline = function(): number {
  if (this.stage === 'CLOSED_WON' || this.stage === 'CLOSED_LOST') {
    if (this.actualCloseDate) {
      return Math.floor((this.actualCloseDate.getTime() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24))
    }
  }
  return Math.floor((Date.now() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24))
}

// Calculate weighted value based on probability
dealSchema.methods.calculateWeightedValue = function(): number {
  return (this.value * this.probability) / 100
}

// Check if deal is overdue
dealSchema.methods.isOverdue = function(): boolean {
  return this.expectedCloseDate < new Date() && !['CLOSED_WON', 'CLOSED_LOST'].includes(this.stage)
}

// Auto-calculate product total prices
dealProductSchema.pre('save', function(next) {
  this.totalPrice = this.quantity * this.unitPrice * (1 - (this.discount || 0) / 100)
  next()
})

// Auto-update deal value when products change
dealSchema.pre('save', function(next) {
  if (this.products && this.products.length > 0) {
    this.value = this.products.reduce((total, product) => total + product.totalPrice, 0)
  }
  next()
})

export const Deal = mongoose.model<IDeal>('Deal', dealSchema)