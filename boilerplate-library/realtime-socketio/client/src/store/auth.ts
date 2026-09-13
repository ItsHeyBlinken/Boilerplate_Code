import { create } from 'zustand'

type AuthUser = {
  id: string
  email: string
  name: string
}

type AuthState = {
  token: string | null
  user: AuthUser | null
  setSession: (token: string, user: AuthUser) => void
  clearSession: () => void
  hydrate: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setSession: (token, user) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    set({ token, user })
  },
  clearSession: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ token: null, user: null })
  },
  hydrate: () => {
    const token = localStorage.getItem('token')
    const raw = localStorage.getItem('user')
    if (!token || !raw) {
      set({ token: null, user: null })
      return
    }
    try {
      set({ token, user: JSON.parse(raw) as AuthUser })
    } catch {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      set({ token: null, user: null })
    }
  },
}))
