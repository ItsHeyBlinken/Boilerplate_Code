'use client'

import { useState } from 'react'

export function BillingActions({
  organizationId,
  plan,
}: {
  organizationId: string
  plan: string
}) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function start(action?: 'portal') {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/billing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organizationId, action }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setError(data.error || 'Billing request failed')
        return
      }
      window.location.href = data.url
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      {error && <p className="text-sm text-red-600">{error}</p>}
      {plan !== 'PRO' && (
        <button
          type="button"
          disabled={loading}
          onClick={() => start()}
          className="rounded bg-accent px-4 py-2 text-white hover:bg-accent-dark disabled:opacity-60"
        >
          Upgrade to PRO
        </button>
      )}
      <button
        type="button"
        disabled={loading}
        onClick={() => start('portal')}
        className="ml-0 block rounded border border-slateink-100 bg-white px-4 py-2 sm:ml-2 sm:inline-block"
      >
        Open customer portal
      </button>
      <p className="text-xs text-slateink-800/50">
        Requires Stripe test keys and <code>STRIPE_PRICE_PRO</code>. Use Stripe CLI for local webhooks.
      </p>
    </div>
  )
}
