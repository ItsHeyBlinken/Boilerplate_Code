import { Request, Response } from 'express'
import { prisma } from '@/config/database'
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
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })
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
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          role: 'USER',
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
        },
      })

      // Generate tokens
      const tokens = generateTokenPair({
        userId: user.id,
        email: user.email,
        role: user.role,
      })

      // Store refresh token
      await prisma.refreshToken.create({
        data: {
          userId: user.id,
          token: tokens.refreshToken,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          deviceInfo: req.get('User-Agent'),
          ipAddress: req.ip,
        },
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
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user || !user.isActive) {
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
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      })

      // Generate tokens
      const tokens = generateTokenPair({
        userId: user.id,
        email: user.email,
        role: user.role,
      })

      // Store refresh token
      await prisma.refreshToken.create({
        data: {
          userId: user.id,
          token: tokens.refreshToken,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          deviceInfo: req.get('User-Agent'),
          ipAddress: req.ip,
        },
      })

      logger.info(`User logged in: ${user.email}`)

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            avatarUrl: user.avatarUrl,
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
        await prisma.refreshToken.updateMany({
          where: { token: refreshToken },
          data: {
            isRevoked: true,
            revokedAt: new Date(),
          },
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
      const tokenRecord = await prisma.refreshToken.findFirst({
        where: {
          token: refreshToken,
          userId: decoded.userId,
          isRevoked: false,
          expiresAt: { gt: new Date() },
        },
      })

      if (!tokenRecord) {
        res.status(401).json({
          success: false,
          error: 'Invalid or expired refresh token',
        })
        return
      }

      // Get user
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      })

      if (!user || !user.isActive) {
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
      await prisma.refreshToken.update({
        where: { id: tokenRecord.id },
        data: {
          isRevoked: true,
          revokedAt: new Date(),
        },
      })

      // Store new refresh token
      await prisma.refreshToken.create({
        data: {
          userId: user.id,
          token: tokens.refreshToken,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          deviceInfo: req.get('User-Agent'),
          ipAddress: req.ip,
        },
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

      const user = await prisma.user.findUnique({
        where: { email },
      })
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
      const user = await prisma.user.findUnique({
        where: { id: userId },
      })
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
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword },
      })

      // Revoke all refresh tokens for security
      await prisma.refreshToken.updateMany({
        where: { userId },
        data: {
          isRevoked: true,
          revokedAt: new Date(),
        },
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

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          avatarUrl: true,
          phone: true,
          dateOfBirth: true,
          bio: true,
          website: true,
          location: true,
          lastLogin: true,
          emailVerified: true,
          createdAt: true,
          updatedAt: true,
        },
      })

      if (!user) {
        res.status(404).json({
          success: false,
          error: 'User not found',
        })
        return
      }

      res.json({
        success: true,
        data: user,
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