import { Router } from 'express'
import { PostController } from '@/controllers/PostController'
import { authenticateToken, requireModerator } from '@/middleware/auth'
import { validateRequest, validateParams, validateQuery } from '@/middleware/validation'
import Joi from 'joi'

const router = Router()
const postController = new PostController()

// Validation schemas
const createPostSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  content: Joi.string().min(10).required(),
  excerpt: Joi.string().max(500),
  featuredImage: Joi.string().uri(),
  status: Joi.string().valid('draft', 'published', 'archived').default('draft'),
})

const updatePostSchema = Joi.object({
  title: Joi.string().min(3).max(200),
  content: Joi.string().min(10),
  excerpt: Joi.string().max(500),
  featuredImage: Joi.string().uri(),
  status: Joi.string().valid('draft', 'published', 'archived'),
})

const postIdSchema = Joi.object({
  id: Joi.string().uuid().required(),
})

const querySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  status: Joi.string().valid('draft', 'published', 'archived'),
  search: Joi.string().max(100),
  sortBy: Joi.string().valid('created_at', 'updated_at', 'published_at', 'title', 'view_count').default('created_at'),
  sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
})

// Routes
router.get('/', validateQuery(querySchema), postController.getAllPosts)
router.get('/:id', validateParams(postIdSchema), postController.getPostById)
router.post('/', authenticateToken, validateRequest(createPostSchema), postController.createPost)
router.put('/:id', authenticateToken, validateParams(postIdSchema), validateRequest(updatePostSchema), postController.updatePost)
router.delete('/:id', authenticateToken, requireModerator, validateParams(postIdSchema), postController.deletePost)
router.post('/:id/like', authenticateToken, validateParams(postIdSchema), postController.likePost)
router.delete('/:id/like', authenticateToken, validateParams(postIdSchema), postController.unlikePost)

export default router