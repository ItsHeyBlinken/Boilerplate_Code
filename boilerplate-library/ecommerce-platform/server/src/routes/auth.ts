/**
 * Authentication Routes
 * 
 * This module defines all authentication-related API routes
 * for the e-commerce platform.
 * 
 * Routes:
 * - POST /register - User registration
 * - POST /login - User login
 * - GET /logout - User logout
 * - GET /me - Get current user
 * - POST /forgot-password - Password reset request
 * - PUT /reset-password/:token - Password reset
 * - PUT /update-password - Update password
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import express from 'express'
import { register, login, logout, getMe, forgotPassword, resetPassword, updatePassword } from '../controllers/authController'
import { protect } from '../middleware/auth'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/me', protect, getMe)
router.post('/forgot-password', forgotPassword)
router.put('/reset-password/:resettoken', resetPassword)
router.put('/update-password', protect, updatePassword)

export default router