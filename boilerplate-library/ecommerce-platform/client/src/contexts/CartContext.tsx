/**
 * Shopping Cart Context Provider
 * 
 * This context provides shopping cart state management for the e-commerce platform,
 * including cart operations, item management, and checkout preparation.
 * 
 * Features:
 * - Shopping cart state management
 * - Add/remove items from cart
 * - Cart quantity updates
 * - Cart persistence and synchronization
 * - Cart total and item count calculation
 * - Cart clearing functionality
 * - Error handling and validation
 * - Loading states management
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { cartService } from '@/services/cartService'
import { Product } from '@/types/product'

interface CartItem {
  product: Product
  quantity: number
  price: number
  addedAt: string
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  isLoading: boolean
  error: string | null
}

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity?: number) => Promise<void>
  removeFromCart: (productId: string) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  getCartCount: () => number
  getCartTotal: () => number
}

type CartAction =
  | { type: 'CART_START' }
  | { type: 'CART_SUCCESS'; payload: CartItem[] }
  | { type: 'CART_FAILURE'; payload: string }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_ITEM'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isLoading: false,
  error: null,
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'CART_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case 'CART_SUCCESS':
      return {
        ...state,
        isLoading: false,
        items: action.payload,
        itemCount: action.payload.reduce((sum, item) => sum + item.quantity, 0),
        total: action.payload.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        error: null,
      }
    case 'CART_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.product.id === action.payload.product.id)
      let newItems: CartItem[]
      
      if (existingItem) {
        newItems = state.items.map(item =>
          item.product.id === action.payload.product.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
      } else {
        newItems = [...state.items, action.payload]
      }
      
      return {
        ...state,
        items: newItems,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      }
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.product.id !== action.payload)
      return {
        ...state,
        items: filteredItems,
        itemCount: filteredItems.reduce((sum, item) => sum + item.quantity, 0),
        total: filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      }
    case 'UPDATE_ITEM':
      const updatedItems = state.items.map(item =>
        item.product.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0)
      
      return {
        ...state,
        items: updatedItems,
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      }
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0,
      }
    default:
      return state
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart on mount
  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      dispatch({ type: 'CART_START' })
      const response = await cartService.getCart()
      dispatch({ type: 'CART_SUCCESS', payload: response.items })
    } catch (error: any) {
      dispatch({ type: 'CART_FAILURE', payload: error.message })
    }
  }

  const addToCart = async (product: Product, quantity: number = 1) => {
    try {
      const cartItem: CartItem = {
        product,
        quantity,
        price: product.price,
        addedAt: new Date().toISOString(),
      }
      
      await cartService.addToCart(product.id, quantity)
      dispatch({ type: 'ADD_ITEM', payload: cartItem })
    } catch (error: any) {
      dispatch({ type: 'CART_FAILURE', payload: error.message })
      throw error
    }
  }

  const removeFromCart = async (productId: string) => {
    try {
      await cartService.removeFromCart(productId)
      dispatch({ type: 'REMOVE_ITEM', payload: productId })
    } catch (error: any) {
      dispatch({ type: 'CART_FAILURE', payload: error.message })
      throw error
    }
  }

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      await cartService.updateCartItem(productId, quantity)
      dispatch({ type: 'UPDATE_ITEM', payload: { productId, quantity } })
    } catch (error: any) {
      dispatch({ type: 'CART_FAILURE', payload: error.message })
      throw error
    }
  }

  const clearCart = async () => {
    try {
      await cartService.clearCart()
      dispatch({ type: 'CLEAR_CART' })
    } catch (error: any) {
      dispatch({ type: 'CART_FAILURE', payload: error.message })
      throw error
    }
  }

  const getCartCount = () => {
    return state.itemCount
  }

  const getCartTotal = () => {
    return state.total
  }

  const value: CartContextType = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartCount,
    getCartTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}