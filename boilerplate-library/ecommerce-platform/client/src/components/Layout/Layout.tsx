/**
 * Main Layout Component
 * 
 * This component provides the main layout structure for the e-commerce platform,
 * including header, main content area, and footer.
 * 
 * Features:
 * - Consistent layout across all pages
 * - Header with navigation and user menu
 * - Main content area with outlet for routes
 * - Footer with links and information
 * - Responsive design
 * - SEO-friendly structure
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout