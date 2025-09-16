/**
 * Activity Model and Schema Definition
 * 
 * This module defines the Activity model for the CRM platform,
 * including comprehensive activity logging and communication tracking.
 * 
 * Features:
 * - Comprehensive activity logging
 * - Communication tracking (calls, emails, meetings)
 * - Activity categorization and types
 * - Related entity associations
 * - Activity timeline and history
 * - Document attachments
 * - Activity analytics and reporting
 * - Automated activity creation
 * 
 * @author CRM Platform Team
 * @version 1.0.0
 */

import mongoose, { Document, Schema } from 'mongoose'

export interface IActivity extends Document {
  _id: string
  type: 'CALL' | 'EMAIL' | 'MEETING' | 'NOTE' | 'TASK' | 'DEAL_UPDATE' | 'LEAD_UPDATE' | 'CONTACT_UPDATE'
  subject: string
  description?: string
  owner: mongoose.Types.ObjectId
  relatedTo?: {
    type: 'CONTACT' | 'LEAD' | 'DEAL' | 'TASK'
    id: mongoose.Types.ObjectId
  }
  participants: mongoose.Types.ObjectId[]
  duration?: number // in minutes
  outcome?: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'FOLLOW_UP_REQUIRED'
  nextAction?: string
  nextActionDate?: Date
  attachments: string[]
  tags: string[]
  isImportant: boolean
  location?: string
  meetingType?: 'IN_PERSON' | 'PHONE' | 'VIDEO' | 'EMAIL'
  direction?: 'INBOUND' | 'OUTBOUND'
  createdAt: Date
  updatedAt: Date
  getActivitySummary(): string
  getDurationText(): string
}

const activitySchema = new Schema<IActivity>({
  type: {
    type: String,
    required: [true, 'Activity type is required'],
    enum: ['CALL', 'EMAIL', 'MEETING', 'NOTE', 'TASK', 'DEAL_UPDATE', 'LEAD_UPDATE', 'CONTACT_UPDATE'],
  },
  subject: {
    type: String,
    required: [true, 'Activity subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters'],
  },
  description: {
    type: String,
    maxlength: [2000, 'Description cannot exceed 2000 characters'],
    trim: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Activity owner is required'],
  },
  relatedTo: {
    type: {
      type: String,
      enum: ['CONTACT', 'LEAD', 'DEAL', 'TASK'],
    },
    id: {
      type: Schema.Types.ObjectId,
    },
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'Contact',
  }],
  duration: {
    type: Number,
    min: 0,
  },
  outcome: {
    type: String,
    enum: ['POSITIVE', 'NEUTRAL', 'NEGATIVE', 'FOLLOW_UP_REQUIRED'],
  },
  nextAction: {
    type: String,
    trim: true,
    maxlength: [500, 'Next action cannot exceed 500 characters'],
  },
  nextActionDate: {
    type: Date,
  },
  attachments: [{
    type: String,
  }],
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Tag cannot exceed 50 characters'],
  }],
  isImportant: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters'],
  },
  meetingType: {
    type: String,
    enum: ['IN_PERSON', 'PHONE', 'VIDEO', 'EMAIL'],
  },
  direction: {
    type: String,
    enum: ['INBOUND', 'OUTBOUND'],
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
activitySchema.index({ type: 1 })
activitySchema.index({ owner: 1 })
activitySchema.index({ 'relatedTo.type': 1, 'relatedTo.id': 1 })
activitySchema.index({ createdAt: -1 })
activitySchema.index({ isImportant: 1 })
activitySchema.index({ outcome: 1 })
activitySchema.index({ tags: 1 })
activitySchema.index({ subject: 'text', description: 'text' })

// Get activity summary
activitySchema.methods.getActivitySummary = function(): string {
  const typeText = this.type.toLowerCase().replace('_', ' ')
  const subject = this.subject
  const date = this.createdAt.toLocaleDateString()
  
  return `${typeText}: ${subject} (${date})`
}

// Get duration text
activitySchema.methods.getDurationText = function(): string {
  if (!this.duration) return 'No duration'
  
  const hours = Math.floor(this.duration / 60)
  const minutes = this.duration % 60
  
  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
  }
  return `${minutes}m`
}

// Auto-populate related entity based on type
activitySchema.pre('save', function(next) {
  if (this.isModified('type')) {
    // Auto-set meeting type based on activity type
    if (this.type === 'MEETING' && !this.meetingType) {
      this.meetingType = 'IN_PERSON'
    } else if (this.type === 'CALL' && !this.meetingType) {
      this.meetingType = 'PHONE'
    } else if (this.type === 'EMAIL' && !this.meetingType) {
      this.meetingType = 'EMAIL'
    }
  }
  next()
})

export const Activity = mongoose.model<IActivity>('Activity', activitySchema)