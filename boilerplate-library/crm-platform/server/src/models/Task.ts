/**
 * Task Model and Schema Definition
 * 
 * This module defines the Task model for the CRM platform,
 * including task management, assignment, and tracking functionality.
 * 
 * Features:
 * - Task creation and assignment
 * - Due dates and priorities
 * - Task status tracking
 * - Task categories and types
 * - Related entity associations
 * - Activity logging
 * - Task dependencies
 * - Recurring task support
 * 
 * @author CRM Platform Team
 * @version 1.0.0
 */

import mongoose, { Document, Schema } from 'mongoose'

export interface ITask extends Document {
  _id: string
  title: string
  description?: string
  type: 'CALL' | 'EMAIL' | 'MEETING' | 'FOLLOW_UP' | 'PROPOSAL' | 'DEMO' | 'OTHER'
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  dueDate?: Date
  completedDate?: Date
  owner: mongoose.Types.ObjectId
  assignedTo?: mongoose.Types.ObjectId
  relatedTo?: {
    type: 'CONTACT' | 'LEAD' | 'DEAL' | 'ACTIVITY'
    id: mongoose.Types.ObjectId
  }
  tags: string[]
  notes?: string
  isRecurring: boolean
  recurringPattern?: {
    frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'
    interval: number
    endDate?: Date
  }
  dependencies: mongoose.Types.ObjectId[]
  estimatedDuration?: number // in minutes
  actualDuration?: number // in minutes
  createdAt: Date
  updatedAt: Date
  isOverdue(): boolean
  getDaysUntilDue(): number
  getCompletionPercentage(): number
}

const taskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [200, 'Task title cannot exceed 200 characters'],
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
    trim: true,
  },
  type: {
    type: String,
    enum: ['CALL', 'EMAIL', 'MEETING', 'FOLLOW_UP', 'PROPOSAL', 'DEMO', 'OTHER'],
    default: 'OTHER',
  },
  status: {
    type: String,
    enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING',
  },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
    default: 'MEDIUM',
  },
  dueDate: {
    type: Date,
  },
  completedDate: {
    type: Date,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Task owner is required'],
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  relatedTo: {
    type: {
      type: String,
      enum: ['CONTACT', 'LEAD', 'DEAL', 'ACTIVITY'],
    },
    id: {
      type: Schema.Types.ObjectId,
    },
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
  isRecurring: {
    type: Boolean,
    default: false,
  },
  recurringPattern: {
    frequency: {
      type: String,
      enum: ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'],
    },
    interval: {
      type: Number,
      min: 1,
      default: 1,
    },
    endDate: {
      type: Date,
    },
  },
  dependencies: [{
    type: Schema.Types.ObjectId,
    ref: 'Task',
  }],
  estimatedDuration: {
    type: Number,
    min: 0,
  },
  actualDuration: {
    type: Number,
    min: 0,
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
taskSchema.index({ title: 'text', description: 'text' })
taskSchema.index({ status: 1 })
taskSchema.index({ priority: 1 })
taskSchema.index({ owner: 1 })
taskSchema.index({ assignedTo: 1 })
taskSchema.index({ dueDate: 1 })
taskSchema.index({ createdAt: -1 })
taskSchema.index({ completedDate: -1 })
taskSchema.index({ 'relatedTo.type': 1, 'relatedTo.id': 1 })

// Check if task is overdue
taskSchema.methods.isOverdue = function(): boolean {
  if (!this.dueDate || this.status === 'COMPLETED') return false
  return this.dueDate < new Date()
}

// Get days until due date
taskSchema.methods.getDaysUntilDue = function(): number {
  if (!this.dueDate) return 0
  const now = new Date()
  const diffTime = this.dueDate.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// Get completion percentage based on status
taskSchema.methods.getCompletionPercentage = function(): number {
  switch (this.status) {
    case 'PENDING': return 0
    case 'IN_PROGRESS': return 50
    case 'COMPLETED': return 100
    case 'CANCELLED': return 0
    default: return 0
  }
}

// Auto-set completed date when status changes to completed
taskSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'COMPLETED' && !this.completedDate) {
    this.completedDate = new Date()
  }
  next()
})

export const Task = mongoose.model<ITask>('Task', taskSchema)