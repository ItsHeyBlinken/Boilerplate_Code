/**
 * User Management Controller
 * 
 * This module handles user management operations for the e-commerce platform,
 * including CRUD operations, profile updates, and avatar management.
 * 
 * Features:
 * - User CRUD operations (Create, Read, Update, Delete)
 * - Profile management and updates
 * - Avatar upload and management
 * - Admin-only user management
 * - User data validation
 * - Role-based access control
 * - File upload handling
 * - Error handling and logging
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import { Request, Response, NextFunction } from 'express'
import { User } from '../models/User'
import { logger } from '../utils/logger'

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin)
export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.find().select('-password')
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    })
  } catch (error) {
    logger.error('Get users error:', error)
    next(error)
  }
}

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private (Admin)
export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    
    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    logger.error('Get user error:', error)
    next(error)
  }
}

// @desc    Create user
// @route   POST /api/users
// @access  Private (Admin)
export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.create(req.body)
    res.status(201).json({
      success: true,
      data: user,
    })
  } catch (error) {
    logger.error('Create user error:', error)
    next(error)
  }
}

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (Admin)
export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select('-password')

    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    logger.error('Update user error:', error)
    next(error)
  }
}

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Admin)
export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found',
      })
      return
    }

    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    })
  } catch (error) {
    logger.error('Delete user error:', error)
    next(error)
  }
}

// @desc    Update profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    }).select('-password')

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    logger.error('Update profile error:', error)
    next(error)
  }
}

// @desc    Upload avatar
// @route   POST /api/users/avatar
// @access  Private
export const uploadAvatar = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        error: 'No file uploaded',
      })
      return
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatarUrl: `/uploads/avatars/${req.file.filename}` },
      { new: true }
    ).select('-password')

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    logger.error('Upload avatar error:', error)
    next(error)
  }
}

// @desc    Delete avatar
// @route   DELETE /api/users/avatar
// @access  Private
export const deleteAvatar = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatarUrl: null },
      { new: true }
    ).select('-password')

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    logger.error('Delete avatar error:', error)
    next(error)
  }
}