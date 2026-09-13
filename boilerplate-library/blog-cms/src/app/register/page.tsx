'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('Admin')
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('password123')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    if (!res.ok) {
      setError('Register failed')
      return
    }
    router.push('/admin')
    router.refresh()
  }

  return (
    <section className="mx-auto max-w-md">
      <h1 className="font-serif text-2xl font-bold">Register</h1>
      <p className="mt-2 text-sm text-stone-600">First account becomes ADMIN.</p>
      {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
      <form onSubmit={onSubmit} className="mt-6 space-y-3 rounded-xl border bg-white p-4">
        <input className="w-full rounded border px-3 py-2 text-sm" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input className="w-full rounded border px-3 py-2 text-sm" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="w-full rounded border px-3 py-2 text-sm" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="w-full rounded bg-stone-900 px-4 py-2 text-sm text-white" type="submit">
          Create account
        </button>
      </form>
      <p className="mt-4 text-sm">
        <Link href="/login" className="underline">
          Already have an account?
        </Link>
      </p>
    </section>
  )
}
