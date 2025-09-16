import { Request, Response } from 'express'
import { db } from '@/config/database'
import { generateTokenPair, verifyRefreshToken } from '@/utils/jwt'
import { hashPassword, comparePassword } from '@/utils/password'
import { logger } from '@/utils/logger'
import { AuthRequest } from '@/middleware/auth'
import { v4 as uuidv4 } from 'uuid'

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, firstName, lastName } = req.body

      // Check if user already exists
      const existingUser = await db('users').where('email', email).first()
      if (existingUser) {
        res.status(400).json({
          success: false,
          error: 'User already exists with this email',
        })
        return
      }

      // Hash password
      const hashedPassword = await hashPassword(password)

      // Create user
      const [user] = await db('users')
        .insert({
          email,
          password: hashedPassword,
          first_name: firstName,
          last_name: lastName,
          role: 'user',
        })
        .returning(['id', 'email', 'first_name', 'last_name', 'role', 'created_at'])

      // Generate tokens
      const tokens = generateTokenPair({
        userId: user.id,
        email: user.email,
        role: user.role,
      })

      // Store refresh token
      await db('refresh_tokens').insert({
        user_id: user.id,
        token: tokens.refreshToken,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        device_info: req.get('User-Agent'),
        ip_address: req.ip,
      })

      logger.info(`User registered: ${user.email}`)

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user,
          tokens,
        },
      })
    } catch (error) {
      logger.error('Registration error:', error)
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body

      // Find user
      const user = await db('users')
        .where('email', email)
        .where('is_active', true)
        .first()

      if (!user) {
        res.status(401).json({
          success: false,
          error: 'Invalid credentials',
        })
        return
      }

      // Check password
      const isPasswordValid = await comparePassword(password, user.password)
      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          error: 'Invalid credentials',
        })
        return
      }

      // Update last login
      await db('users')
        .where('id', user.id)
        .update({ last_login: new Date() })

      // Generate tokens
      const tokens = generateTokenPair({
        userId: user.id,
        email: user.email,
        role: user.role,
      })

      // Store refresh token
      await db('refresh_tokens').insert({
        user_id: user.id,
        token: tokens.refreshToken,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        device_info: req.get('User-Agent'),
        ip_address: req.ip,
      })

      logger.info(`User logged in: ${user.email}`)

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            role: user.role,
            avatarUrl: user.avatar_url,
          },
          tokens,
        },
      })
    } catch (error) {
      logger.error('Login error:', error)
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async logout(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body

      if (refreshToken) {
        // Revoke refresh token
        await db('refresh_tokens')
          .where('token', refreshToken)
          .update({
            is_revoked: true,
            revoked_at: new Date(),
          })
      }

      logger.info(`User logged out: ${req.user?.email}`)

      res.json({
        success: true,
        message: 'Logout successful',
      })
    } catch (error) {
      logger.error('Logout error:', error)
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body

      // Verify refresh token
      const decoded = verifyRefreshToken(refreshToken)

      // Check if token exists in database and is not revoked
      const tokenRecord = await db('refresh_tokens')
        .where('token', refreshToken)
        .where('user_id', decoded.userId)
        .where('is_revoked', false)
        .where('expires_at', '>', new Date())
        .first()

      if (!tokenRecord) {
        res.status(401).json({
          success: false,
          error: 'Invalid or expired refresh token',
        })
        return
      }

      // Get user
      const user = await db('users')
        .where('id', decoded.userId)
        .where('is_active', true)
        .first()

      if (!user) {
        res.status(401).json({
          success: false,
          error: 'User not found or inactive',
        })
        return
      }

      // Generate new tokens
      const tokens = generateTokenPair({
        userId: user.id,
        email: user.email,
        role: user.role,
      })

      // Revoke old refresh token
      await db('refresh_tokens')
        .where('id', tokenRecord.id)
        .update({
          is_revoked: true,
          revoked_at: new Date(),
        })

      // Store new refresh token
      await db('refresh_tokens').insert({
        user_id: user.id,
        token: tokens.refreshToken,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        device_info: req.get('User-Agent'),
        ip_address: req.ip,
      })

      res.json({
        success: true,
        message: 'Token refreshed successfully',
        data: { tokens },
      })
    } catch (error) {
      logger.error('Refresh token error:', error)
      res.status(401).json({
        success: false,
        error: 'Invalid refresh token',
      })
    }
  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body

      const user = await db('users').where('email', email).first()
      if (!user) {
        // Don't reveal if email exists or not
        res.json({
          success: true,
          message: 'If the email exists, a password reset link has been sent',
        })
        return
      }

      // Generate reset token
      const resetToken = uuidv4()
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

      // Store reset token (you might want to create a separate table for this)
      // For now, we'll just log it
      logger.info(`Password reset token for ${email}: ${resetToken}`)

      // In a real application, you would send an email here
      // await sendPasswordResetEmail(email, resetToken)

      res.json({
        success: true,
        message: 'If the email exists, a password reset link has been sent',
      })
    } catch (error) {
      logger.error('Forgot password error:', error)
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { token, password } = req.body

      // In a real application, you would verify the token from your database
      // For now, we'll just log it
      logger.info(`Password reset attempt with token: ${token}`)

      res.json({
        success: true,
        message: 'Password reset successful',
      })
    } catch (error) {
      logger.error('Reset password error:', error)
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async changePassword(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { currentPassword, newPassword } = req.body
      const userId = req.user!.id

      // Get user
      const user = await db('users').where('id', userId).first()
      if (!user) {
        res.status(404).json({
          success: false,
          error: 'User not found',
        })
        return
      }

      // Verify current password
      const isCurrentPasswordValid = await comparePassword(currentPassword, user.password)
      if (!isCurrentPasswordValid) {
        res.status(400).json({
          success: false,
          error: 'Current password is incorrect',
        })
        return
      }

      // Hash new password
      const hashedNewPassword = await hashPassword(newPassword)

      // Update password
      await db('users')
        .where('id', userId)
        .update({ password: hashedNewPassword })

      // Revoke all refresh tokens for security
      await db('refresh_tokens')
        .where('user_id', userId)
        .update({
          is_revoked: true,
          revoked_at: new Date(),
        })

      logger.info(`Password changed for user: ${user.email}`)

      res.json({
        success: true,
        message: 'Password changed successfully',
      })
    } catch (error) {
      logger.error('Change password error:', error)
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async getProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user!.id

      const user = await db('users')
        .select([
          'id',
          'email',
          'first_name',
          'last_name',
          'role',
          'avatar_url',
          'phone',
          'date_of_birth',
          'bio',
          'website',
          'location',
          'last_login',
          'email_verified',
          'created_at',
          'updated_at',
        ])
        .where('id', userId)
        .first()

      if (!user) {
        res.status(404).json({
          success: false,
          error: 'User not found',
        })
        return
      }

      res.json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
          avatarUrl: user.avatar_url,
          phone: user.phone,
          dateOfBirth: user.date_of_birth,
          bio: user.bio,
          website: user.website,
          location: user.location,
          lastLogin: user.last_login,
          emailVerified: user.email_verified,
          createdAt: user.created_at,
          updatedAt: user.updated_at,
        },
      })
    } catch (error) {
      logger.error('Get profile error:', error)
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }
}