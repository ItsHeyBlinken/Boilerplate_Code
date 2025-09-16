/**
 * Lead Model and Schema Definition
 * 
 * This module defines the Lead model for the CRM platform,
 * including lead tracking, scoring, and conversion pipeline management.
 * 
 * Features:
 * - Lead information and contact details
 * - Lead scoring and qualification
 * - Lead source and status tracking
 * - Conversion pipeline management
 * - Lead assignment and follow-up
 * - Lead lifecycle tracking
 * - Activity and communication history
 * - Lead analytics and reporting
 * 
 * @author CRM Platform Team
 * @version 1.0.0
 */

import mongoose, { Document, Schema } from 'mongoose'

export interface ILead extends Document {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  jobTitle?: string
  source: string
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSED_WON' | 'CLOSED_LOST'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  score: number
  estimatedValue?: number
  currency: string
  expectedCloseDate?: Date
  actualCloseDate?: Date
  owner: mongoose.Types.ObjectId
  assignedTo?: mongoose.Types.ObjectId
  contact?: mongoose.Types.ObjectId
  deal?: mongoose.Types.ObjectId
  tags: string[]
  notes?: string
  lastActivityDate?: Date
  nextFollowUp?: Date
  leadSource: {
    type: string
    campaign?: string
    medium?: string
    referrer?: string
  }
  qualificationCriteria: {
    budget: boolean
    authority: boolean
    need: boolean
    timeline: boolean
  }
  createdAt: Date
  updatedAt: Date
  getFullName(): string
  calculateScore(): number
  getDaysInPipeline(): number
}

const leadSchema = new Schema<ILead>({
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
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'],
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters'],
  },
  jobTitle: {
    type: String,
    trim: true,
    maxlength: [100, 'Job title cannot exceed 100 characters'],
  },
  source: {
    type: String,
    required: [true, 'Lead source is required'],
    trim: true,
    maxlength: [100, 'Source cannot exceed 100 characters'],
  },
  status: {
    type: String,
    enum: ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST'],
    default: 'NEW',
  },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
    default: 'MEDIUM',
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  estimatedValue: {
    type: Number,
    min: 0,
  },
  currency: {
    type: String,
    default: 'USD',
    uppercase: true,
    enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
  },
  expectedCloseDate: {
    type: Date,
  },
  actualCloseDate: {
    type: Date,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Lead owner is required'],
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  contact: {
    type: Schema.Types.ObjectId,
    ref: 'Contact',
  },
  deal: {
    type: Schema.Types.ObjectId,
    ref: 'Deal',
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
  leadSource: {
    type: {
      type: String,
      required: true,
      enum: ['WEBSITE', 'EMAIL', 'PHONE', 'SOCIAL_MEDIA', 'REFERRAL', 'ADVERTISING', 'EVENT', 'OTHER'],
    },
    campaign: {
      type: String,
      trim: true,
    },
    medium: {
      type: String,
      trim: true,
    },
    referrer: {
      type: String,
      trim: true,
    },
  },
  qualificationCriteria: {
    budget: {
      type: Boolean,
      default: false,
    },
    authority: {
      type: Boolean,
      default: false,
    },
    need: {
      type: Boolean,
      default: false,
    },
    timeline: {
      type: Boolean,
      default: false,
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
leadSchema.index({ email: 1 })
leadSchema.index({ firstName: 1, lastName: 1 })
leadSchema.index({ company: 1 })
leadSchema.index({ status: 1 })
leadSchema.index({ priority: 1 })
leadSchema.index({ owner: 1 })
leadSchema.index({ assignedTo: 1 })
leadSchema.index({ source: 1 })
leadSchema.index({ createdAt: -1 })
leadSchema.index({ expectedCloseDate: 1 })
leadSchema.index({ lastActivityDate: -1 })

// Get full name method
leadSchema.methods.getFullName = function(): string {
  return `${this.firstName} ${this.lastName}`
}

// Calculate lead score based on qualification criteria and other factors
leadSchema.methods.calculateScore = function(): number {
  let score = 0
  
  // Base score from qualification criteria
  const criteria = this.qualificationCriteria
  if (criteria.budget) score += 25
  if (criteria.authority) score += 25
  if (criteria.need) score += 25
  if (criteria.timeline) score += 25
  
  // Bonus for having complete information
  if (this.email) score += 5
  if (this.phone) score += 5
  if (this.company) score += 5
  if (this.jobTitle) score += 5
  if (this.estimatedValue) score += 10
  
  // Bonus for recent activity
  if (this.lastActivityDate) {
    const daysSinceLastActivity = (Date.now() - this.lastActivityDate.getTime()) / (1000 * 60 * 60 * 24)
    if (daysSinceLastActivity < 7) score += 10
    else if (daysSinceLastActivity < 30) score += 5
  }
  
  return Math.min(score, 100)
}

// Calculate days in pipeline
leadSchema.methods.getDaysInPipeline = function(): number {
  if (this.status === 'CLOSED_WON' || this.status === 'CLOSED_LOST') {
    if (this.actualCloseDate) {
      return Math.floor((this.actualCloseDate.getTime() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24))
    }
  }
  return Math.floor((Date.now() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24))
}

// Virtual for full name
leadSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`
})

// Auto-calculate score before saving
leadSchema.pre('save', function(next) {
  this.score = this.calculateScore()
  next()
})

export const Lead = mongoose.model<ILead>('Lead', leadSchema)