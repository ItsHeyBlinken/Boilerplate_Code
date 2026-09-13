import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useAuthStore } from '../store/auth'

type CartItem = {
  id: string
  productId: string
  quantity: number
  name: string
  price: number
}

export function CartPage() {
  const token = useAuthStore((s) => s.token)
  const navigate = useNavigate()
  const [items, setItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)
  const [error, setError] = useState('')

  async function load() {
    if (!token) {
      setError('Login to view cart')
      return
    }
    try {
      const { data } = await api.get('/cart')
      setItems(data.items || [])
      setTotal(data.total || 0)
      setError('')
    } catch {
      setError('Could not load cart')
    }
  }

  useEffect(() => {
    load()
  }, [token])

  async function checkout() {
    try {
      await api.post('/orders')
      navigate('/orders')
    } catch {
      setError('Checkout failed')
    }
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Cart</h1>
      {!token && (
        <p className="mt-2 text-sm">
          <Link className="text-amber-800 underline" to="/login">
            Login
          </Link>{' '}
          to manage your cart.
        </p>
      )}
      {error && <p className="mt-2 text-sm text-amber-800">{error}</p>}
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item.id} className="rounded-xl border bg-white p-4">
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-stone-500">
              Qty {item.quantity} · ${(item.price * item.quantity).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
      {items.length > 0 && (
        <div className="mt-6">
          <p className="font-semibold">Total: ${total.toFixed(2)}</p>
          <button type="button" className="mt-3 rounded bg-amber-700 px-4 py-2 text-sm text-white" onClick={checkout}>
            Place order
          </button>
        </div>
      )}
    </section>
  )
}
