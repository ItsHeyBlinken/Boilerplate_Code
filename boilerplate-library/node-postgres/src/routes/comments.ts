import { Router } from 'express'
import { CommentController } from '@/controllers/CommentController'
import { authenticateToken, requireModerator } from '@/middleware/auth'
import { validateRequest, validateParams } from '@/middleware/validation'
import Joi from 'joi'

const router = Router()
const commentController = new CommentController()

// Validation schemas
const createCommentSchema = Joi.object({
  content: Joi.string().min(1).max(1000).required(),
  postId: Joi.string().required(),
  parentId: Joi.string().optional(),
})

const updateCommentSchema = Joi.object({
  content: Joi.string().min(1).max(1000).required(),
})

const commentIdSchema = Joi.object({
  id: Joi.string().required(),
})

// Routes
router.get('/', commentController.getAllComments)
router.get('/:id', validateParams(commentIdSchema), commentController.getCommentById)
router.post('/', authenticateToken, validateRequest(createCommentSchema), commentController.createComment)
router.put('/:id', authenticateToken, validateParams(commentIdSchema), validateRequest(updateCommentSchema), commentController.updateComment)
router.delete('/:id', authenticateToken, requireModerator, validateParams(commentIdSchema), commentController.deleteComment)

export default router