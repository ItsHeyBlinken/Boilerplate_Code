/**
 * Protected Route Component
 * 
 * This component provides route protection for authenticated users
 * and role-based access control for the e-commerce platform.
 * 
 * Features:
 * - Authentication requirement checking
 * - Role-based access control
 * - Redirect to login for unauthenticated users
 * - Loading state handling
 * - Route protection with fallbacks
 * - Admin route protection
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'CUSTOMER' | 'ADMIN' | 'SELLER'
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner w-8 h-8"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute