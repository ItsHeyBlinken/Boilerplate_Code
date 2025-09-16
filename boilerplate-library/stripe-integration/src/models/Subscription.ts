import mongoose, { Document, Schema } from 'mongoose'

export interface ISubscription extends Document {
  _id: string
  user: mongoose.Types.ObjectId
  stripeSubscriptionId: string
  stripeCustomerId: string
  stripePriceId: string
  status: 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid'
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  canceledAt?: Date
  trialStart?: Date
  trialEnd?: Date
  metadata?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

const subscriptionSchema = new Schema<ISubscription>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
  stripeSubscriptionId: {
    type: String,
    required: [true, 'Stripe subscription ID is required'],
    unique: true,
  },
  stripeCustomerId: {
    type: String,
    required: [true, 'Stripe customer ID is required'],
  },
  stripePriceId: {
    type: String,
    required: [true, 'Stripe price ID is required'],
  },
  status: {
    type: String,
    required: [true, 'Subscription status is required'],
    enum: ['incomplete', 'incomplete_expired', 'trialing', 'active', 'past_due', 'canceled', 'unpaid'],
    default: 'incomplete',
  },
  currentPeriodStart: {
    type: Date,
    required: [true, 'Current period start is required'],
  },
  currentPeriodEnd: {
    type: Date,
    required: [true, 'Current period end is required'],
  },
  cancelAtPeriodEnd: {
    type: Boolean,
    default: false,
  },
  canceledAt: {
    type: Date,
    default: null,
  },
  trialStart: {
    type: Date,
    default: null,
  },
  trialEnd: {
    type: Date,
    default: null,
  },
  metadata: {
    type: Schema.Types.Mixed,
    default: {},
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
subscriptionSchema.index({ user: 1 })
subscriptionSchema.index({ stripeSubscriptionId: 1 })
subscriptionSchema.index({ stripeCustomerId: 1 })
subscriptionSchema.index({ status: 1 })
subscriptionSchema.index({ currentPeriodEnd: 1 })

export const Subscription = mongoose.model<ISubscription>('Subscription', subscriptionSchema)