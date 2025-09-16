import { Router } from 'express'
import { UserController } from '@/controllers/UserController'
import { authenticateToken, requireAdmin } from '@/middleware/auth'
import { validateRequest, validateParams } from '@/middleware/validation'
import Joi from 'joi'

const router = Router()
const userController = new UserController()

// Validation schemas
const updateUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(50),
  lastName: Joi.string().min(2).max(50),
  phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/),
  dateOfBirth: Joi.date().max('now'),
  bio: Joi.string().max(500),
  website: Joi.string().uri(),
  location: Joi.string().max(100),
  role: Joi.string().valid('USER', 'MODERATOR', 'ADMIN'),
  isActive: Joi.boolean(),
})

const updateProfileSchema = Joi.object({
  firstName: Joi.string().min(2).max(50),
  lastName: Joi.string().min(2).max(50),
  phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/),
  dateOfBirth: Joi.date().max('now'),
  bio: Joi.string().max(500),
  website: Joi.string().uri(),
  location: Joi.string().max(100),
})

const userIdSchema = Joi.object({
  id: Joi.string().required(),
})

// Routes
router.get('/', authenticateToken, requireAdmin, userController.getAllUsers)
router.get('/profile', authenticateToken, userController.getProfile)
router.put('/profile', authenticateToken, validateRequest(updateProfileSchema), userController.updateProfile)
router.get('/:id', authenticateToken, validateParams(userIdSchema), userController.getUserById)
router.put('/:id', authenticateToken, requireAdmin, validateParams(userIdSchema), validateRequest(updateUserSchema), userController.updateUser)
router.delete('/:id', authenticateToken, requireAdmin, validateParams(userIdSchema), userController.deleteUser)

export default router