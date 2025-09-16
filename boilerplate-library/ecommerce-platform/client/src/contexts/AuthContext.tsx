/**
 * Authentication Context Provider
 * 
 * This context provides authentication state management for the e-commerce platform,
 * including user login, registration, profile management, and session handling.
 * 
 * Features:
 * - User authentication state management
 * - JWT token handling and storage
 * - User registration and login
 * - Profile updates and management
 * - Password management
 * - Session persistence
 * - Error handling and validation
 * - Loading states management
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { authService } from '@/services/authService'
import { User } from '@/types/user'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  updateProfile: (userData: Partial<User>) => Promise<void>
  clearError: () => void
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'CLEAR_ERROR' }

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      }
    case 'AUTH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      loadUser()
    }
  }, [])

  const loadUser = async () => {
    try {
      dispatch({ type: 'AUTH_START' })
      const response = await authService.getMe()
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: response.user, token: localStorage.getItem('token')! },
      })
    } catch (error: any) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.message })
      localStorage.removeItem('token')
    }
  }

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'AUTH_START' })
      const response = await authService.login(email, password)
      
      localStorage.setItem('token', response.token)
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: response.user, token: response.token },
      })
    } catch (error: any) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.message })
      throw error
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      dispatch({ type: 'AUTH_START' })
      const response = await authService.register(userData)
      
      localStorage.setItem('token', response.token)
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user: response.user, token: response.token },
      })
    } catch (error: any) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.message })
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
  }

  const updateProfile = async (userData: Partial<User>) => {
    try {
      const response = await authService.updateProfile(userData)
      dispatch({ type: 'UPDATE_USER', payload: response.user })
    } catch (error: any) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.message })
      throw error
    }
  }

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}