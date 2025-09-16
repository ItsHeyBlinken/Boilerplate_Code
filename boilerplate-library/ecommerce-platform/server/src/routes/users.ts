/**
 * User Management Routes
 * 
 * This module defines all user management API routes
 * for the e-commerce platform.
 * 
 * Routes:
 * - GET / - Get all users (Admin only)
 * - POST / - Create user (Admin only)
 * - PUT /profile - Update user profile
 * - POST /avatar - Upload avatar
 * - DELETE /avatar - Delete avatar
 * - GET /:id - Get user by ID (Admin only)
 * - PUT /:id - Update user (Admin only)
 * - DELETE /:id - Delete user (Admin only)
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import express from 'express'
import { 
  getUsers, 
  getUser, 
  createUser, 
  updateUser, 
  deleteUser,
  updateProfile,
  uploadAvatar,
  deleteAvatar
} from '../controllers/userController'
import { protect, authorize } from '../middleware/auth'
import { upload } from '../middleware/upload'

const router = express.Router()

router.route('/')
  .get(protect, authorize('ADMIN'), getUsers)
  .post(protect, authorize('ADMIN'), createUser)

router.route('/profile')
  .put(protect, updateProfile)

router.route('/avatar')
  .post(protect, upload.single('avatar'), uploadAvatar)
  .delete(protect, deleteAvatar)

router.route('/:id')
  .get(protect, authorize('ADMIN'), getUser)
  .put(protect, authorize('ADMIN'), updateUser)
  .delete(protect, authorize('ADMIN'), deleteUser)

export default router