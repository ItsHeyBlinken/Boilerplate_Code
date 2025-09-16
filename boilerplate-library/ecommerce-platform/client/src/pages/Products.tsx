/**
 * Products Listing Page Component
 * 
 * This component renders the products listing page with search, filtering,
 * sorting, and pagination functionality for the e-commerce platform.
 * 
 * Features:
 * - Product grid/list view toggle
 * - Search functionality
 * - Advanced filtering options
 * - Sorting capabilities
 * - Pagination
 * - Loading states
 * - Empty state handling
 * - Responsive design
 * 
 * @author E-commerce Platform Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Grid, List } from 'lucide-react'
import { productService } from '@/services/productService'
import { Product } from '@/types/product'

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    loadProducts()
  }, [searchTerm, sortBy])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const response = await productService.getProducts({
        search: searchTerm,
        sort: sortBy,
        limit: 20,
      })
      setProducts(response.data)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    loadProducts()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Products</h1>
          <p className="text-gray-600">
            Discover our wide range of high-quality products
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input w-full pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input w-full lg:w-48"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </select>

            {/* View Mode */}
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="card">
                <div className="skeleton h-48 w-full rounded-t-lg"></div>
                <div className="card-content">
                  <div className="skeleton h-4 w-3/4 mb-2"></div>
                  <div className="skeleton h-3 w-full mb-4"></div>
                  <div className="skeleton h-6 w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
          }>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSortBy('newest')
                loadProducts()
              }}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

interface ProductCardProps {
  product: Product
  viewMode: 'grid' | 'list'
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="card flex flex-row">
        <div className="w-32 h-32 bg-gray-200 rounded-l-lg flex-shrink-0"></div>
        <div className="card-content flex-1">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <Link to={`/products/${product.id}`} className="card-title hover:text-primary-600">
                {product.name}
              </Link>
              <p className="text-gray-600 mt-1 line-clamp-2">
                {product.shortDescription || product.description}
              </p>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">★</span>
                  ))}
                  <span className="text-gray-600 ml-2">({product.reviewCount})</span>
                </div>
              </div>
            </div>
            <div className="text-right ml-4">
              <div className="text-2xl font-bold text-primary-600">
                ${product.price.toFixed(2)}
              </div>
              {product.comparePrice && product.comparePrice > product.price && (
                <div className="text-sm text-gray-500 line-through">
                  ${product.comparePrice.toFixed(2)}
                </div>
              )}
              <button className="btn btn-primary btn-sm mt-2">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card hover-lift">
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square bg-gray-200 rounded-t-lg relative overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          {product.featured && (
            <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-semibold">
              Featured
            </div>
          )}
        </div>
      </Link>
      <div className="card-content">
        <Link to={`/products/${product.id}`} className="card-title hover:text-primary-600">
          {product.name}
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {product.shortDescription || product.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-primary-600">
              ${product.price.toFixed(2)}
            </div>
            {product.comparePrice && product.comparePrice > product.price && (
              <div className="text-sm text-gray-500 line-through">
                ${product.comparePrice.toFixed(2)}
              </div>
            )}
          </div>
          <button className="btn btn-primary btn-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Products