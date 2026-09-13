import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../services/api'
import { useAuthStore } from '../store/auth'

type Product = {
  id: string
  name: string
  description: string
  price: number
  stock: number
}

export function ProductDetailPage() {
  const { id } = useParams()
  const token = useAuthStore((s) => s.token)
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data.data))
      .catch(() => setError('Product not found'))
  }, [id])

  async function addToCart() {
    if (!token || !product) {
      setError('Login to add items to cart')
      return
    }
    try {
      await api.post('/cart', { productId: product.id, quantity: 1 })
    } catch {
      setError('Add to cart failed')
    }
  }

  if (error && !product) return <p className="text-sm text-rose-600">{error}</p>
  if (!product) return <p className="text-sm text-stone-500">Loading…</p>

  return (
    <section>
      <Link to="/products" className="text-sm text-amber-800 underline">
        Back to products
      </Link>
      <h1 className="mt-4 text-2xl font-bold">{product.name}</h1>
      <p className="mt-2 text-stone-600">{product.description}</p>
      <p className="mt-4 font-semibold">${product.price.toFixed(2)}</p>
      <p className="text-sm text-stone-500">Stock: {product.stock}</p>
      {error && <p className="mt-2 text-sm text-amber-800">{error}</p>}
      <button type="button" className="mt-4 rounded bg-amber-700 px-4 py-2 text-sm text-white" onClick={addToCart}>
        Add to cart
      </button>
    </section>
  )
}
