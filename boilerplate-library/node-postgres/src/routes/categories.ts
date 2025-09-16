import { Router } from 'express'
import { CategoryController } from '@/controllers/CategoryController'
import { authenticateToken, requireAdmin } from '@/middleware/auth'
import { validateRequest, validateParams } from '@/middleware/validation'
import Joi from 'joi'

const router = Router()
const categoryController = new CategoryController()

// Validation schemas
const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  slug: Joi.string().min(2).max(100),
  description: Joi.string().max(500),
  color: Joi.string().pattern(/^#[0-9A-F]{6}$/i),
  isActive: Joi.boolean().default(true),
})

const updateCategorySchema = Joi.object({
  name: Joi.string().min(2).max(100),
  slug: Joi.string().min(2).max(100),
  description: Joi.string().max(500),
  color: Joi.string().pattern(/^#[0-9A-F]{6}$/i),
  isActive: Joi.boolean(),
})

const categoryIdSchema = Joi.object({
  id: Joi.string().required(),
})

// Routes
router.get('/', categoryController.getAllCategories)
router.get('/:id', validateParams(categoryIdSchema), categoryController.getCategoryById)
router.post('/', authenticateToken, requireAdmin, validateRequest(createCategorySchema), categoryController.createCategory)
router.put('/:id', authenticateToken, requireAdmin, validateParams(categoryIdSchema), validateRequest(updateCategorySchema), categoryController.updateCategory)
router.delete('/:id', authenticateToken, requireAdmin, validateParams(categoryIdSchema), categoryController.deleteCategory)

export default router