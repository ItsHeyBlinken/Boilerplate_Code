import mongoose, { Document, Schema } from 'mongoose'

export interface IComment extends Document {
  _id: string
  content: string
  isApproved: boolean
  author: mongoose.Types.ObjectId
  post: mongoose.Types.ObjectId
  parent?: mongoose.Types.ObjectId
  replies: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const commentSchema = new Schema<IComment>({
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
    minlength: [1, 'Content must be at least 1 character'],
    maxlength: [1000, 'Content cannot exceed 1000 characters'],
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required'],
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'Post is required'],
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    default: null,
  },
  replies: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
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
commentSchema.index({ post: 1 })
commentSchema.index({ author: 1 })
commentSchema.index({ parent: 1 })
commentSchema.index({ isApproved: 1 })
commentSchema.index({ createdAt: -1 })

// Update post comment count when comment is saved
commentSchema.post('save', async function() {
  const Post = mongoose.model('Post')
  await Post.findByIdAndUpdate(this.post, {
    $inc: { commentCount: 1 }
  })
})

// Update post comment count when comment is deleted
commentSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    const Post = mongoose.model('Post')
    await Post.findByIdAndUpdate(doc.post, {
      $inc: { commentCount: -1 }
    })
  }
})

export const Comment = mongoose.model<IComment>('Comment', commentSchema)