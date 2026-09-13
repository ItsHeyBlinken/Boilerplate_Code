import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import { useAuthStore } from '../store/auth'

type Order = {
  id: string
  orderNumber: string
  total: number
  status: string
  createdAt: string
}

export function OrdersPage() {
  const token = useAuthStore((s) => s.token)
  const [orders, setOrders] = useState<Order[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) {
      setError('Login to view orders')
      return
    }
    api
      .get('/orders/my-orders')
      .then((res) => setOrders(res.data.data || []))
      .catch(() => setError('Could not load orders'))
  }, [token])

  return (
    <section>
      <h1 className="text-2xl font-bold">Orders</h1>
      {!token && (
        <p className="mt-2 text-sm">
          <Link className="text-amber-800 underline" to="/login">
            Login
          </Link>{' '}
          required.
        </p>
      )}
      {error && <p className="mt-2 text-sm text-amber-800">{error}</p>}
      <ul className="mt-6 space-y-3">
        {orders.map((order) => (
          <li key={order.id} className="rounded-xl border bg-white p-4">
            <p className="font-medium">{order.orderNumber}</p>
            <p className="text-sm text-stone-500">
              ${order.total.toFixed(2)} · {order.status}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
