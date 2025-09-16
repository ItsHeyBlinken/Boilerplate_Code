import { Router } from 'express'
import { AuthController } from '@/controllers/AuthController'
import { validateRequest } from '@/middleware/validation'
import { authenticateToken } from '@/middleware/auth'
import Joi from 'joi'

const router = Router()
const authController = new AuthController()

// Validation schemas
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
})

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
})

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
})

const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
})

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
})

// Routes
router.post('/register', validateRequest(registerSchema), authController.register)
router.post('/login', validateRequest(loginSchema), authController.login)
router.post('/logout', authenticateToken, authController.logout)
router.post('/refresh', validateRequest(refreshTokenSchema), authController.refreshToken)
router.post('/forgot-password', validateRequest(forgotPasswordSchema), authController.forgotPassword)
router.post('/reset-password', validateRequest(resetPasswordSchema), authController.resetPassword)
router.post('/change-password', authenticateToken, validateRequest(changePasswordSchema), authController.changePassword)
router.get('/me', authenticateToken, authController.getProfile)

export default router