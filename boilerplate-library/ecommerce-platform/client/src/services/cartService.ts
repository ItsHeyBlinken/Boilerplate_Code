/**
 * Shopping Cart Service
 * 
 * This service handles all shopping cart-related API calls
 * for the e-commerce platform frontend.
 * 
 * Features:
 * - Cart retrieval and management
 * - Add/remove items from cart
 * - Cart quantity updates
 * - Cart clearing
 * - Cart count tracking
 * - Cart synchronization
 * - Error handling
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import apiService from './api'
import { CartItem } from '@/types/user'

interface CartResponse {
  success: boolean
  items: CartItem[]
  total: number
  itemCount: number
}

interface CartCountResponse {
  success: boolean
  count: number
}

export const cartService = {
  // Get cart
  async getCart(): Promise<CartResponse> {
    return apiService.get<CartResponse>('/cart')
  },

  // Add to cart
  async addToCart(productId: string, quantity: number = 1): Promise<CartResponse> {
    return apiService.post<CartResponse>('/cart', { productId, quantity })
  },

  // Update cart item
  async updateCartItem(productId: string, quantity: number): Promise<CartResponse> {
    return apiService.put<CartResponse>(`/cart/${productId}`, { quantity })
  },

  // Remove from cart
  async removeFromCart(productId: string): Promise<CartResponse> {
    return apiService.delete<CartResponse>(`/cart/${productId}`)
  },

  // Clear cart
  async clearCart(): Promise<{ success: boolean; message: string }> {
    return apiService.delete('/cart')
  },

  // Get cart count
  async getCartCount(): Promise<CartCountResponse> {
    return apiService.get<CartCountResponse>('/cart/count')
  },
}