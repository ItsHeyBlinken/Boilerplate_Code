'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [organizationName, setOrganizationName] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, organizationName }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'Register failed')
      return
    }
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="font-display text-2xl font-semibold">Create account</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        {error && <p className="text-sm text-red-600">{error}</p>}
        <input
          className="w-full rounded border border-slateink-100 bg-white px-3 py-2"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="w-full rounded border border-slateink-100 bg-white px-3 py-2"
          placeholder="Organization name (optional)"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
        />
        <input
          className="w-full rounded border border-slateink-100 bg-white px-3 py-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full rounded border border-slateink-100 bg-white px-3 py-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full rounded bg-accent px-3 py-2 text-white hover:bg-accent-dark">
          Register
        </button>
      </form>
      <p className="text-sm text-slateink-800/60">
        Have an account? <Link className="text-accent" href="/login">Login</Link>
      </p>
    </div>
  )
}
