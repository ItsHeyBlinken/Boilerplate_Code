import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useAuthStore } from '../store/auth'

export function LoginPage() {
  const navigate = useNavigate()
  const setSession = useAuthStore((s) => s.setSession)
  const [email, setEmail] = useState('demo@example.com')
  const [password, setPassword] = useState('password123')
  const [firstName, setFirstName] = useState('Demo')
  const [lastName, setLastName] = useState('User')
  const [message, setMessage] = useState('')

  async function register(e: React.FormEvent) {
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/register', { email, password, firstName, lastName })
      setSession(data.data.token, data.data.user)
      setMessage('Registered and signed in')
      navigate('/posts')
    } catch {
      setMessage('Register failed (email may already exist)')
    }
  }

  async function login(e: React.FormEvent) {
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/login', { email, password })
      setSession(data.data.token, data.data.user)
      setMessage('Signed in')
      navigate('/posts')
    } catch {
      setMessage('Login failed')
    }
  }

  return (
    <section className="max-w-md">
      <h1 className="text-2xl font-bold">Auth</h1>
      <p className="mt-2 text-sm text-slate-600">Register or login against the Express + Prisma API.</p>
      {message && <p className="mt-3 text-sm text-emerald-700">{message}</p>}
      <form className="mt-6 space-y-3 rounded-xl border border-slate-200 bg-white p-4">
        <input className="w-full rounded border px-3 py-2 text-sm" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
        <input className="w-full rounded border px-3 py-2 text-sm" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
        <input className="w-full rounded border px-3 py-2 text-sm" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="w-full rounded border px-3 py-2 text-sm" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <div className="flex gap-2">
          <button className="rounded bg-emerald-600 px-4 py-2 text-sm text-white" type="button" onClick={login}>
            Login
          </button>
          <button className="rounded border border-slate-300 px-4 py-2 text-sm" type="button" onClick={register}>
            Register
          </button>
        </div>
      </form>
    </section>
  )
}
