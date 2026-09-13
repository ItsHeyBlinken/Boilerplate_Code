'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('password123')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) {
      setError('Login failed')
      return
    }
    router.push('/admin')
    router.refresh()
  }

  return (
    <section className="mx-auto max-w-md">
      <h1 className="font-serif text-2xl font-bold">Login</h1>
      {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
      <form onSubmit={onSubmit} className="mt-6 space-y-3 rounded-xl border bg-white p-4">
        <input className="w-full rounded border px-3 py-2 text-sm" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="w-full rounded border px-3 py-2 text-sm" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="w-full rounded bg-stone-900 px-4 py-2 text-sm text-white" type="submit">
          Sign in
        </button>
      </form>
      <p className="mt-4 text-sm">
        <Link href="/register" className="underline">
          Create an account
        </Link>
      </p>
    </section>
  )
}
