/**
 * 404 Not Found Page Component
 * 
 * This component renders a user-friendly 404 error page
 * when users navigate to non-existent routes.
 * 
 * Features:
 * - Clear error messaging
 * - Navigation options (home, back)
 * - User-friendly design
 * - Accessibility features
 * - Responsive layout
 * - Brand consistency
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-9xl font-bold text-primary-600 mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. 
          It might have been moved, deleted, or you entered the wrong URL.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn btn-primary btn-lg inline-flex items-center justify-center"
          >
            <Home className="mr-2 h-5 w-5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline btn-lg inline-flex items-center justify-center"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound