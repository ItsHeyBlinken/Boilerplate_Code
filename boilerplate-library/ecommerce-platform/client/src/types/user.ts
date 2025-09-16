/**
 * User Type Definitions
 * 
 * This module contains all TypeScript type definitions related to users
 * in the e-commerce platform frontend.
 * 
 * Types:
 * - User: Complete user profile interface
 * - Address: User address information
 * - CartItem: Shopping cart item structure
 * - LoginCredentials: Login form data
 * - RegisterData: Registration form data
 * - UpdateProfileData: Profile update form data
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'CUSTOMER' | 'ADMIN' | 'SELLER'
  isActive: boolean
  emailVerified: boolean
  stripeCustomerId?: string
  avatarUrl?: string
  phone?: string
  dateOfBirth?: string
  bio?: string
  website?: string
  location?: string
  lastLogin?: string
  emailVerifiedAt?: string
  addresses: Address[]
  wishlist: string[]
  cart: CartItem[]
  orders: string[]
  newsletterSubscribed: boolean
  preferences: {
    currency: string
    language: string
    notifications: {
      email: boolean
      sms: boolean
      push: boolean
    }
  }
  createdAt: string
  updatedAt: string
}

export interface Address {
  id?: string
  type: 'billing' | 'shipping'
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
  isDefault: boolean
}

export interface CartItem {
  product: string
  quantity: number
  price: number
  addedAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface UpdateProfileData {
  firstName?: string
  lastName?: string
  phone?: string
  bio?: string
  website?: string
  location?: string
  preferences?: {
    currency?: string
    language?: string
    notifications?: {
      email?: boolean
      sms?: boolean
      push?: boolean
    }
  }
}