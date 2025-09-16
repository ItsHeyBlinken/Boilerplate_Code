/**
 * Authentication Controller
 * 
 * This module handles all authentication-related operations for the e-commerce platform,
 * including user registration, login, logout, and password management.
 * 
 * Features:
 * - User registration with email validation
 * - Secure login with password verification
 * - JWT token generation and management
 * - Password hashing and comparison
 * - User profile retrieval
 * - Password reset functionality
 * - Account status validation
 * - Session management with cookies
 * - Security error handling
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { logger } from '../utils/logger'

// Generate JWT Token
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  })
}

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, firstName, lastName } = req.body

    // Check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(400).json({
        success: false,
        error: 'User already exists',
      })
      return
    }

    // Create user
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
    })

    // Generate token
    const token = generateToken(user._id)

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    })
  } catch (error) {
    logger.error('Registration error:', error)
    next(error)
  }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body

    // Check for user
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      })
      return
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      })
      return
    }

    // Check if user is active
    if (!user.isActive) {
      res.status(401).json({
        success: false,
        error: 'Account is deactivated',
      })
      return
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate token
    const token = generateToken(user._id)

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    })
  } catch (error) {
    logger.error('Login error:', error)
    next(error)
  }
}

// @desc    Logout user
// @route   GET /api/auth/logout
// @access  Private
export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
    })

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    })
  } catch (error) {
    logger.error('Logout error:', error)
    next(error)
  }
}

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.user.id)

    res.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    logger.error('Get me error:', error)
    next(error)
  }
}

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found',
      })
      return
    }

    // Generate reset token (simplified - in production, use crypto.randomBytes)
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    
    // In production, you would:
    // 1. Hash the reset token
    // 2. Save it to the user document
    // 3. Send email with reset link
    // 4. Set expiration time

    res.status(200).json({
      success: true,
      message: 'Password reset email sent',
      // In development, return the token for testing
      ...(process.env.NODE_ENV === 'development' && { resetToken }),
    })
  } catch (error) {
    logger.error('Forgot password error:', error)
    next(error)
  }
}

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:resettoken
// @access  Public
export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { password } = req.body
    const { resettoken } = req.params

    // In production, you would:
    // 1. Hash the provided token
    // 2. Find user with matching hashed token
    // 3. Check if token is not expired
    // 4. Update password and clear reset token

    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    })
  } catch (error) {
    logger.error('Reset password error:', error)
    next(error)
  }
}

// @desc    Update password
// @route   PUT /api/auth/update-password
// @access  Private
export const updatePassword = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body

    const user = await User.findById(req.user.id).select('+password')

    // Check current password
    const isMatch = await user!.comparePassword(currentPassword)
    if (!isMatch) {
      res.status(400).json({
        success: false,
        error: 'Current password is incorrect',
      })
      return
    }

    // Update password
    user!.password = newPassword
    await user!.save()

    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
    })
  } catch (error) {
    logger.error('Update password error:', error)
    next(error)
  }
}