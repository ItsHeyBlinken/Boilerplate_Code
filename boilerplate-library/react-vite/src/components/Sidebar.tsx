import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X, Home, Info, BarChart3, User, Settings } from 'lucide-react'
import { useStore } from '../store/useStore'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

interface NavItemProps {
  to: string
  icon: ReactNode
  children: ReactNode
  isActive?: boolean
}

function NavItem({ to, icon, children, isActive }: NavItemProps) {
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? 'bg-primary-100 text-primary-700'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <span className="mr-3">{icon}</span>
      {children}
    </Link>
  )
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation()
  const { isAuthenticated } = useStore()

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: Info },
    ...(isAuthenticated
      ? [
          { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
          { name: 'Profile', href: '/profile', icon: User },
          { name: 'Settings', href: '/settings', icon: Settings },
        ]
      : []),
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
            <button
              onClick={onToggle}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              
              return (
                <NavItem
                  key={item.name}
                  to={item.href}
                  icon={<Icon className="h-5 w-5" />}
                  isActive={isActive}
                >
                  {item.name}
                </NavItem>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              <p>React Vite Boilerplate</p>
              <p>Version 1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}