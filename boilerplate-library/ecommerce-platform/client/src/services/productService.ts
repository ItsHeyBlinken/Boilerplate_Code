/**
 * Product Service
 * 
 * This service handles all product-related API calls
 * for the e-commerce platform frontend.
 * 
 * Features:
 * - Product listing with filtering and pagination
 * - Product search functionality
 * - Product detail retrieval
 * - Featured products
 * - Category-based product browsing
 * - Related products
 * - Product CRUD operations (Admin/Seller)
 * - Image upload handling
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import apiService from './api'
import { Product, ProductFilters, PaginationParams } from '@/types/product'

interface ProductsResponse {
  success: boolean
  count: number
  total: number
  page: number
  pages: number
  data: Product[]
}

interface ProductResponse {
  success: boolean
  data: Product
}

export const productService = {
  // Get all products
  async getProducts(params?: PaginationParams & ProductFilters): Promise<ProductsResponse> {
    const queryParams = new URLSearchParams()
    
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.sort) queryParams.append('sort', params.sort)
    if (params?.search) queryParams.append('search', params.search)
    if (params?.category) queryParams.append('category', params.category)
    if (params?.minPrice) queryParams.append('minPrice', params.minPrice.toString())
    if (params?.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString())
    if (params?.brand) queryParams.append('brand', params.brand)
    if (params?.rating) queryParams.append('rating', params.rating.toString())
    if (params?.inStock) queryParams.append('inStock', params.inStock.toString())
    if (params?.featured) queryParams.append('featured', params.featured.toString())
    if (params?.tags) queryParams.append('tags', params.tags.join(','))

    const queryString = queryParams.toString()
    const url = queryString ? `/products?${queryString}` : '/products'
    
    return apiService.get<ProductsResponse>(url)
  },

  // Get single product
  async getProduct(id: string): Promise<ProductResponse> {
    return apiService.get<ProductResponse>(`/products/${id}`)
  },

  // Search products
  async searchProducts(query: string): Promise<ProductsResponse> {
    return apiService.get<ProductsResponse>(`/products/search?q=${encodeURIComponent(query)}`)
  },

  // Get featured products
  async getFeaturedProducts(): Promise<ProductsResponse> {
    return apiService.get<ProductsResponse>('/products/featured')
  },

  // Get products by category
  async getProductsByCategory(categoryId: string): Promise<ProductsResponse> {
    return apiService.get<ProductsResponse>(`/products/category/${categoryId}`)
  },

  // Get related products
  async getRelatedProducts(productId: string): Promise<ProductsResponse> {
    return apiService.get<ProductsResponse>(`/products/${productId}/related`)
  },

  // Create product (Admin/Seller)
  async createProduct(productData: Partial<Product>, images?: File[]): Promise<ProductResponse> {
    const formData = new FormData()
    
    // Append product data
    Object.entries(productData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, value.toString())
        }
      }
    })

    // Append images
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append('images', image)
      })
    }

    return apiService.post<ProductResponse>('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  // Update product (Admin/Seller)
  async updateProduct(id: string, productData: Partial<Product>, images?: File[]): Promise<ProductResponse> {
    const formData = new FormData()
    
    // Append product data
    Object.entries(productData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, value.toString())
        }
      }
    })

    // Append images
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append('images', image)
      })
    }

    return apiService.put<ProductResponse>(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  // Delete product (Admin/Seller)
  async deleteProduct(id: string): Promise<{ success: boolean; message: string }> {
    return apiService.delete(`/products/${id}`)
  },
}