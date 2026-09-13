'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export function AddMemberForm({ organizationId }: { organizationId: string }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('MEMBER')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    const res = await fetch(`/api/orgs/${organizationId}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'Add failed')
      return
    }
    setEmail('')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2 border-t border-slateink-100 pt-6">
      <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-slateink-800/50">
        Add member
      </h2>
      <p className="text-xs text-slateink-800/50">User must already have an account (no email invite).</p>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          className="flex-1 rounded border border-slateink-100 bg-white px-3 py-2"
          type="email"
          placeholder="member@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <select
          className="rounded border border-slateink-100 bg-white px-3 py-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="MEMBER">MEMBER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button type="submit" className="rounded bg-accent px-4 py-2 text-white hover:bg-accent-dark">
          Add
        </button>
      </div>
    </form>
  )
}
