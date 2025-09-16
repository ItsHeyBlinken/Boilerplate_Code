/**
 * Contact Model and Schema Definition
 * 
 * This module defines the Contact model for the CRM platform,
 * including comprehensive contact management and communication tracking.
 * 
 * Features:
 * - Complete contact information (name, email, phone, address)
 * - Company and job title information
 * - Contact source and lead tracking
 * - Communication history and preferences
 * - Custom fields and tags
 * - Contact status and lifecycle management
 * - Activity tracking and timeline
 * - Contact scoring and segmentation
 * 
 * @author CRM Platform Team
 * @version 1.0.0
 */

import mongoose, { Document, Schema } from 'mongoose'

export interface IContact extends Document {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  mobile?: string
  company?: string
  jobTitle?: string
  department?: string
  address?: IAddress
  website?: string
  source: string
  status: 'ACTIVE' | 'INACTIVE' | 'LEAD' | 'CUSTOMER' | 'PROSPECT'
  leadScore?: number
  tags: string[]
  customFields: Record<string, any>
  owner: mongoose.Types.ObjectId
  assignedTo?: mongoose.Types.ObjectId
  lastContactDate?: Date
  nextFollowUp?: Date
  communicationPreferences: {
    email: boolean
    phone: boolean
    sms: boolean
    preferredTime: string
    timezone: string
  }
  notes?: string
  avatarUrl?: string
  socialProfiles: {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }
  createdAt: Date
  updatedAt: Date
  getFullName(): string
  getContactScore(): number
}

export interface IAddress {
  street?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
}

const addressSchema = new Schema<IAddress>({
  street: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  zipCode: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
})

const contactSchema = new Schema<IContact>({
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
  mobile: {
    type: String,
    trim: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid mobile number'],
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
  department: {
    type: String,
    trim: true,
    maxlength: [100, 'Department cannot exceed 100 characters'],
  },
  address: addressSchema,
  website: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, 'Please enter a valid website URL'],
  },
  source: {
    type: String,
    required: [true, 'Contact source is required'],
    trim: true,
    maxlength: [100, 'Source cannot exceed 100 characters'],
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'LEAD', 'CUSTOMER', 'PROSPECT'],
    default: 'PROSPECT',
  },
  leadScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Tag cannot exceed 50 characters'],
  }],
  customFields: {
    type: Schema.Types.Mixed,
    default: {},
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Contact owner is required'],
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  lastContactDate: {
    type: Date,
  },
  nextFollowUp: {
    type: Date,
  },
  communicationPreferences: {
    email: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: Boolean,
      default: true,
    },
    sms: {
      type: Boolean,
      default: false,
    },
    preferredTime: {
      type: String,
      default: '9:00 AM - 5:00 PM',
    },
    timezone: {
      type: String,
      default: 'UTC',
    },
  },
  notes: {
    type: String,
    maxlength: [2000, 'Notes cannot exceed 2000 characters'],
  },
  avatarUrl: {
    type: String,
  },
  socialProfiles: {
    linkedin: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
    },
    facebook: {
      type: String,
      trim: true,
    },
    instagram: {
      type: String,
      trim: true,
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
contactSchema.index({ email: 1 })
contactSchema.index({ firstName: 1, lastName: 1 })
contactSchema.index({ company: 1 })
contactSchema.index({ status: 1 })
contactSchema.index({ owner: 1 })
contactSchema.index({ assignedTo: 1 })
contactSchema.index({ tags: 1 })
contactSchema.index({ source: 1 })
contactSchema.index({ createdAt: -1 })
contactSchema.index({ lastContactDate: -1 })

// Get full name method
contactSchema.methods.getFullName = function(): string {
  return `${this.firstName} ${this.lastName}`
}

// Calculate contact score based on various factors
contactSchema.methods.getContactScore = function(): number {
  let score = 0
  
  // Base score from leadScore field
  score += this.leadScore || 0
  
  // Bonus for having complete information
  if (this.email) score += 10
  if (this.phone || this.mobile) score += 10
  if (this.company) score += 10
  if (this.jobTitle) score += 5
  if (this.address) score += 5
  
  // Bonus for recent activity
  if (this.lastContactDate) {
    const daysSinceLastContact = (Date.now() - this.lastContactDate.getTime()) / (1000 * 60 * 60 * 24)
    if (daysSinceLastContact < 7) score += 20
    else if (daysSinceLastContact < 30) score += 10
  }
  
  return Math.min(score, 100)
}

// Virtual for full name
contactSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`
})

export const Contact = mongoose.model<IContact>('Contact', contactSchema)