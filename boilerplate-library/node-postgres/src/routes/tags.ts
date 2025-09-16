import { Router } from 'express'
import { TagController } from '@/controllers/TagController'
import { authenticateToken, requireAdmin } from '@/middleware/auth'
import { validateRequest, validateParams } from '@/middleware/validation'
import Joi from 'joi'

const router = Router()
const tagController = new TagController()

// Validation schemas
const createTagSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  slug: Joi.string().min(2).max(100),
  description: Joi.string().max(500),
  color: Joi.string().pattern(/^#[0-9A-F]{6}$/i),
})

const updateTagSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  slug: Joi.string().min(2).max(100),
  description: Joi.string().max(500),
  color: Joi.string().pattern(/^#[0-9A-F]{6}$/i),
})

const tagIdSchema = Joi.object({
  id: Joi.string().required(),
})

// Routes
router.get('/', tagController.getAllTags)
router.get('/:id', validateParams(tagIdSchema), tagController.getTagById)
router.post('/', authenticateToken, requireAdmin, validateRequest(createTagSchema), tagController.createTag)
router.put('/:id', authenticateToken, requireAdmin, validateParams(tagIdSchema), validateRequest(updateTagSchema), tagController.updateTag)
router.delete('/:id', authenticateToken, requireAdmin, validateParams(tagIdSchema), tagController.deleteTag)

export default router