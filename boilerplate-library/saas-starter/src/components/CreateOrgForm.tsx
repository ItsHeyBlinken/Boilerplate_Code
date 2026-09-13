'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export function CreateOrgForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/orgs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'Create failed')
      return
    }
    setName('')
    router.push(`/org/${data.data.slug}`)
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2 border-t border-slateink-100 pt-6">
      <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-slateink-800/50">
        New organization
      </h2>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <input
          className="flex-1 rounded border border-slateink-100 bg-white px-3 py-2"
          placeholder="Organization name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="rounded bg-accent px-4 py-2 text-white hover:bg-accent-dark">
          Create
        </button>
      </div>
    </form>
  )
}
