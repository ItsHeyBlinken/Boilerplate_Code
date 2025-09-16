/**
 * API Service with Axios Configuration
 * 
 * This module provides a centralized API service for making HTTP requests
 * to the e-commerce platform backend with authentication and error handling.
 * 
 * Features:
 * - Axios instance with base configuration
 * - Automatic JWT token injection
 * - Request/response interceptors
 * - Error handling and user notifications
 * - File upload support with progress tracking
 * - Multiple file upload support
 * - Timeout configuration
 * - CORS handling
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import toast from 'react-hot-toast'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

class ApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token')
          window.location.href = '/login'
          toast.error('Session expired. Please login again.')
        } else if (error.response?.status === 403) {
          toast.error('Access denied. You do not have permission to perform this action.')
        } else if (error.response?.status >= 500) {
          toast.error('Server error. Please try again later.')
        } else if (error.response?.data?.error) {
          toast.error(error.response.data.error)
        } else if (error.message) {
          toast.error(error.message)
        }

        return Promise.reject(error)
      }
    )
  }

  // Generic methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.get<T>(url, config)
    return response.data
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.post<T>(url, data, config)
    return response.data
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.put<T>(url, data, config)
    return response.data
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.patch<T>(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.delete<T>(url, config)
    return response.data
  }

  // File upload method
  async uploadFile<T>(url: string, file: File, onProgress?: (progress: number) => void): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(progress)
        }
      },
    }

    const response = await this.api.post<T>(url, formData, config)
    return response.data
  }

  // Multiple file upload method
  async uploadFiles<T>(url: string, files: File[], onProgress?: (progress: number) => void): Promise<T> {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('files', file)
    })

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(progress)
        }
      },
    }

    const response = await this.api.post<T>(url, formData, config)
    return response.data
  }
}

export const apiService = new ApiService()
export default apiService