import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface AppState {
  // User state
  user: User | null
  isAuthenticated: boolean
  
  // UI state
  isLoading: boolean
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  
  // Actions
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setTheme: (theme: 'light' | 'dark') => void
  toggleSidebar: () => void
  logout: () => void
}

export const useStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      theme: 'light',
      sidebarOpen: false,

      // Actions
      setUser: (user) =>
        set(
          { user, isAuthenticated: !!user },
          false,
          'setUser'
        ),

      setLoading: (isLoading) =>
        set({ isLoading }, false, 'setLoading'),

      setTheme: (theme) =>
        set({ theme }, false, 'setTheme'),

      toggleSidebar: () =>
        set(
          (state) => ({ sidebarOpen: !state.sidebarOpen }),
          false,
          'toggleSidebar'
        ),

      logout: () =>
        set(
          { user: null, isAuthenticated: false },
          false,
          'logout'
        ),
    }),
    {
      name: 'app-store',
    }
  )
)