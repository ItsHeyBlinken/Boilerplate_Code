import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useAuthStore } from '../store/auth'

export function LoginPage() {
  const navigate = useNavigate()
  const setSession = useAuthStore((s) => s.setSession)
  const [email, setEmail] = useState('demo@example.com')
  const [password, setPassword] = useState('password123')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/login', { email, password })
      setSession(data.token, data.user)
      navigate('/products')
    } catch {
      setError('Login failed')
    }
  }

  return (
    <section className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold">Login</h1>
      {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
      <form onSubmit={onSubmit} className="mt-6 space-y-3 rounded-xl border bg-white p-4">
        <input className="w-full rounded border px-3 py-2 text-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded border px-3 py-2 text-sm" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full rounded bg-amber-700 px-4 py-2 text-sm text-white" type="submit">
          Sign in
        </button>
      </form>
      <p className="mt-4 text-sm">
        <Link className="text-amber-800 underline" to="/register">
          Create an account
        </Link>
      </p>
    </section>
  )
}
