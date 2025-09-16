export const APP_CONFIG = {
  name: 'React Vite Boilerplate',
  version: '1.0.0',
  description: 'A modern React application built with Vite, TypeScript, and Tailwind CSS',
  author: 'Your Name',
  url: 'https://your-domain.com',
} as const

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
} as const

export const API_ENDPOINTS = {
  BASE_URL: process.env.VITE_API_URL || 'http://localhost:3001/api',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
  },
} as const

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
} as const