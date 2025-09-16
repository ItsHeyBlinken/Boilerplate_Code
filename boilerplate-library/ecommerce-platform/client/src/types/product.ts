/**
 * Product Type Definitions
 * 
 * This module contains all TypeScript type definitions related to products
 * in the e-commerce platform frontend.
 * 
 * Types:
 * - Product: Complete product interface
 * - ProductVariant: Product variant information
 * - ProductAttribute: Product attribute structure
 * - Category: Product category interface
 * - Review: Product review interface
 * - ProductFilters: Product filtering options
 * - ProductSortOptions: Product sorting options
 * - PaginationParams: Pagination parameters
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  sku: string
  price: number
  comparePrice?: number
  costPrice?: number
  currency: string
  images: string[]
  category: Category
  subcategory?: Category
  tags: string[]
  brand?: string
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
    unit: string
  }
  inventory: {
    trackQuantity: boolean
    quantity: number
    lowStockThreshold: number
    allowBackorder: boolean
  }
  variants: ProductVariant[]
  attributes: ProductAttribute[]
  seo: {
    title?: string
    description?: string
    keywords?: string[]
  }
  status: 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'ARCHIVED'
  featured: boolean
  digital: boolean
  downloadable: boolean
  downloadFiles?: string[]
  requiresShipping: boolean
  taxable: boolean
  vendor?: User
  reviews: Review[]
  averageRating: number
  reviewCount: number
  salesCount: number
  viewCount: number
  metadata?: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface ProductVariant {
  id?: string
  name: string
  sku: string
  price: number
  comparePrice?: number
  costPrice?: number
  images: string[]
  inventory: {
    trackQuantity: boolean
    quantity: number
    lowStockThreshold: number
    allowBackorder: boolean
  }
  attributes: Record<string, string>
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
    unit: string
  }
  status: 'ACTIVE' | 'INACTIVE'
}

export interface ProductAttribute {
  name: string
  value: string
  type: 'TEXT' | 'NUMBER' | 'BOOLEAN' | 'SELECT' | 'MULTISELECT'
  options?: string[]
  required: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parent?: string
  children?: Category[]
  isActive: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface Review {
  id: string
  product: string
  user: User
  rating: number
  title?: string
  comment?: string
  images?: string[]
  verified: boolean
  helpful: number
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  firstName: string
  lastName: string
  avatarUrl?: string
}

export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  brand?: string
  rating?: number
  inStock?: boolean
  featured?: boolean
  tags?: string[]
}

export interface ProductSortOptions {
  field: 'name' | 'price' | 'rating' | 'createdAt' | 'salesCount'
  order: 'asc' | 'desc'
}

export interface PaginationParams {
  page: number
  limit: number
  sort?: string
  search?: string
}