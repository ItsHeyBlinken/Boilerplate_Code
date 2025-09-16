import mongoose, { Document, Schema } from 'mongoose'

export interface ILike extends Document {
  _id: string
  user: mongoose.Types.ObjectId
  post: mongoose.Types.ObjectId
  createdAt: Date
}

const likeSchema = new Schema<ILike>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'Post is required'],
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

// Compound index to ensure one like per user per post
likeSchema.index({ user: 1, post: 1 }, { unique: true })

// Indexes for better query performance
likeSchema.index({ post: 1 })
likeSchema.index({ user: 1 })
likeSchema.index({ createdAt: -1 })

// Update post like count when like is saved
likeSchema.post('save', async function() {
  const Post = mongoose.model('Post')
  await Post.findByIdAndUpdate(this.post, {
    $inc: { likeCount: 1 }
  })
})

// Update post like count when like is deleted
likeSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    const Post = mongoose.model('Post')
    await Post.findByIdAndUpdate(doc.post, {
      $inc: { likeCount: -1 }
    })
  }
})

export const Like = mongoose.model<ILike>('Like', likeSchema)