import { FormEvent, useEffect, useState } from 'react'
import { api } from '../services/api'

type Deal = {
  id: string
  title: string
  amount: number
  status: string
  stage: string
}

export function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('1000')

  async function load() {
    try {
      const { data } = await api.get('/deals')
      setDeals(data.data || [])
      setError('')
    } catch {
      setError('Could not load deals')
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function create(e: FormEvent) {
    e.preventDefault()
    try {
      await api.post('/deals', { title, amount: Number(amount), status: 'OPEN' })
      setTitle('')
      setAmount('1000')
      await load()
    } catch {
      setError('Create failed')
    }
  }

  async function setStatus(id: string, status: string) {
    try {
      await api.patch(`/deals/${id}/status`, { status })
      await load()
    } catch {
      setError('Status update failed')
    }
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Deals</h1>
      {error && <p className="mt-2 text-sm text-amber-700">{error}</p>}
      <form onSubmit={create} className="mt-6 grid gap-3 rounded-xl border bg-white p-4 sm:grid-cols-2">
        <input className="rounded border px-3 py-2 text-sm" placeholder="Deal title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input className="rounded border px-3 py-2 text-sm" type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <button className="rounded bg-sky-600 px-4 py-2 text-sm text-white sm:col-span-2" type="submit">
          Add deal
        </button>
      </form>
      <ul className="mt-6 space-y-3">
        {deals.map((deal) => (
          <li key={deal.id} className="rounded-xl border bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-medium">{deal.title}</p>
                <p className="text-sm text-slate-500">
                  ${deal.amount} · {deal.status} · {deal.stage}
                </p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="rounded border px-2 py-1 text-xs" onClick={() => setStatus(deal.id, 'WON')}>
                  Mark won
                </button>
                <button type="button" className="rounded border px-2 py-1 text-xs" onClick={() => setStatus(deal.id, 'LOST')}>
                  Mark lost
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
