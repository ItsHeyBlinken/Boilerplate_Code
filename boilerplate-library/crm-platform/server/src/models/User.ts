/**
 * User Model and Schema Definition
 * 
 * This module defines the User model for the CRM platform,
 * including authentication, profile management, and role-based access.
 * 
 * Features:
 * - User authentication with email/password
 * - Role-based access control (ADMIN, MANAGER, SALES_REP, USER)
 * - Profile management (avatar, bio, preferences)
 * - Team and department assignment
 * - Activity tracking and preferences
 * - Password hashing with bcrypt
 * - Email verification system
 * - Last login tracking
 * 
 * @author CRM Platform Team
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
  role: 'ADMIN' | 'MANAGER' | 'SALES_REP' | 'USER'
  isActive: boolean
  emailVerified: boolean
  avatarUrl?: string
  phone?: string
  bio?: string
  department?: string
  jobTitle?: string
  manager?: mongoose.Types.ObjectId
  team?: mongoose.Types.ObjectId
  lastLogin?: Date
  emailVerifiedAt?: Date
  preferences: {
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
    }
    dashboard: {
      defaultView: string
      widgets: string[]
    }
    theme: 'light' | 'dark' | 'auto'
    timezone: string
    language: string
  }
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
  getFullName(): string
}

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
    enum: ['ADMIN', 'MANAGER', 'SALES_REP', 'USER'],
    default: 'USER',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
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
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
    default: null,
  },
  department: {
    type: String,
    trim: true,
    maxlength: [100, 'Department cannot exceed 100 characters'],
  },
  jobTitle: {
    type: String,
    trim: true,
    maxlength: [100, 'Job title cannot exceed 100 characters'],
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  emailVerifiedAt: {
    type: Date,
    default: null,
  },
  preferences: {
    notifications: {
      email: {
        type: Boolean,
        default: true,
      },
      push: {
        type: Boolean,
        default: true,
      },
      sms: {
        type: Boolean,
        default: false,
      },
    },
    dashboard: {
      defaultView: {
        type: String,
        default: 'overview',
        enum: ['overview', 'contacts', 'leads', 'deals', 'tasks'],
      },
      widgets: [{
        type: String,
        enum: ['recentActivities', 'upcomingTasks', 'salesPipeline', 'leadStats', 'dealStats'],
      }],
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'light',
    },
    timezone: {
      type: String,
      default: 'UTC',
    },
    language: {
      type: String,
      default: 'en',
      enum: ['en', 'es', 'fr', 'de', 'it'],
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
userSchema.index({ department: 1 })
userSchema.index({ team: 1 })
userSchema.index({ manager: 1 })

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