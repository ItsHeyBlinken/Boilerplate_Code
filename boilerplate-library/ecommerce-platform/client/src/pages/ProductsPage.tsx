import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import { useAuthStore } from '../store/auth'

type Product = {
  id: string
  name: string
  description: string
  price: number
  stock: number
}

export function ProductsPage() {
  const token = useAuthStore((s) => s.token)
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('19.99')

  async function load() {
    try {
      const { data } = await api.get('/products')
      setProducts(data.data || [])
      setError('')
    } catch {
      setError('Could not load products. Migrate Postgres and seed/create products.')
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function addToCart(productId: string) {
    if (!token) {
      setError('Login to add items to cart')
      return
    }
    try {
      await api.post('/cart', { productId, quantity: 1 })
      setError('')
    } catch {
      setError('Add to cart failed')
    }
  }

  async function createProduct(e: React.FormEvent) {
    e.preventDefault()
    try {
      await api.post('/products', { name, description, price: Number(price), stock: 10 })
      setName('')
      setDescription('')
      await load()
    } catch {
      setError('Create product failed (ADMIN role required)')
    }
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Products</h1>
      {error && <p className="mt-2 text-sm text-amber-800">{error}</p>}

      <form onSubmit={createProduct} className="mt-6 space-y-3 rounded-xl border bg-white p-4">
        <p className="text-xs text-stone-500">Admin-only create (user must have ADMIN role).</p>
        <input className="w-full rounded border px-3 py-2 text-sm" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <textarea className="w-full rounded border px-3 py-2 text-sm" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input className="w-full rounded border px-3 py-2 text-sm" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
        <button className="rounded bg-stone-800 px-4 py-2 text-sm text-white" type="submit">
          Create product
        </button>
      </form>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {products.map((p) => (
          <li key={p.id} className="rounded-xl border bg-white p-4">
            <Link to={`/products/${p.id}`} className="font-semibold text-amber-900">
              {p.name}
            </Link>
            <p className="mt-1 text-sm text-stone-600 line-clamp-2">{p.description}</p>
            <p className="mt-2 text-sm font-medium">${p.price.toFixed(2)}</p>
            <button type="button" className="mt-3 rounded border px-3 py-1 text-xs" onClick={() => addToCart(p.id)}>
              Add to cart
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
