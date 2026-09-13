import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useAuthStore } from '../store/auth'

export function LoginPage() {
  const navigate = useNavigate()
  const setSession = useAuthStore((s) => s.setSession)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    try {
      const { data } = await api.post('/auth/login', { email, password })
      setSession(data.data.token, data.data.user)
      navigate('/')
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ||
        'Login failed'
      setError(msg)
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <h1 className="font-display text-2xl font-semibold text-ink-900">Sign in</h1>
      <p className="mt-1 text-sm text-ink-800/60">Join rooms and chat in realtime.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {error && <p className="text-sm text-red-600">{error}</p>}
        <input
          className="w-full rounded border border-ink-100 bg-white px-3 py-2"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full rounded border border-ink-100 bg-white px-3 py-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full rounded bg-signal px-3 py-2 font-medium text-white hover:bg-signal-dark">
          Login
        </button>
      </form>
      <p className="mt-4 text-sm text-ink-800/60">
        No account? <Link className="text-signal" to="/register">Register</Link>
      </p>
    </div>
  )
}
