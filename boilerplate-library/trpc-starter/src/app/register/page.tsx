'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { trpc } from '@/trpc/client'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const utils = trpc.useUtils()
  const register = trpc.auth.register.useMutation({
    onSuccess: async () => {
      await utils.auth.me.invalidate()
      router.push('/posts')
    },
  })

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    register.mutate({ name, email, password })
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="font-display text-2xl font-semibold">Create account</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        {register.error && <p className="text-sm text-red-600">{register.error.message}</p>}
        <input
          className="w-full rounded border border-stone-200 bg-white px-3 py-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="w-full rounded border border-stone-200 bg-white px-3 py-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full rounded border border-stone-200 bg-white px-3 py-2"
          type="password"
          placeholder="Password (min 6)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button type="submit" className="w-full rounded bg-stone-900 px-3 py-2 text-white">
          Register
        </button>
      </form>
      <p className="text-sm text-stone-500">
        Have an account? <Link className="text-amber-800" href="/login">Login</Link>
      </p>
    </div>
  )
}
