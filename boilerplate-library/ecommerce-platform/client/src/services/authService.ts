/**
 * Authentication Service
 * 
 * This service handles all authentication-related API calls
 * for the e-commerce platform frontend.
 * 
 * Features:
 * - User login and registration
 * - Profile management
 * - Password reset functionality
 * - Avatar upload and management
 * - Session management
 * - Token handling
 * - Error handling
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import apiService from './api'
import { User, LoginCredentials, RegisterData, UpdateProfileData } from '@/types/user'

interface AuthResponse {
  success: boolean
  token: string
  user: User
}

interface ProfileResponse {
  success: boolean
  user: User
}

export const authService = {
  // Login user
  async login(email: string, password: string): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/login', { email, password })
  },

  // Register user
  async register(userData: RegisterData): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/register', userData)
  },

  // Logout user
  async logout(): Promise<void> {
    return apiService.get('/auth/logout')
  },

  // Get current user
  async getMe(): Promise<ProfileResponse> {
    return apiService.get<ProfileResponse>('/auth/me')
  },

  // Update profile
  async updateProfile(userData: UpdateProfileData): Promise<ProfileResponse> {
    return apiService.put<ProfileResponse>('/users/profile', userData)
  },

  // Forgot password
  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    return apiService.post('/auth/forgot-password', { email })
  },

  // Reset password
  async resetPassword(token: string, password: string): Promise<{ success: boolean; message: string }> {
    return apiService.put(`/auth/reset-password/${token}`, { password })
  },

  // Update password
  async updatePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    return apiService.put('/auth/update-password', { currentPassword, newPassword })
  },

  // Upload avatar
  async uploadAvatar(file: File): Promise<ProfileResponse> {
    return apiService.uploadFile<ProfileResponse>('/users/avatar', file)
  },

  // Delete avatar
  async deleteAvatar(): Promise<ProfileResponse> {
    return apiService.delete<ProfileResponse>('/users/avatar')
  },
}