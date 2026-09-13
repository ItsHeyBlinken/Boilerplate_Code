import { FormEvent, useEffect, useState } from 'react'
import { api } from '../services/api'

type Lead = {
  id: string
  firstName: string
  lastName: string
  email: string
  status: string
  company?: string | null
}

export function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [error, setError] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')

  async function load() {
    try {
      const { data } = await api.get('/leads')
      setLeads(data.data || [])
      setError('')
    } catch {
      setError('Could not load leads')
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function create(e: FormEvent) {
    e.preventDefault()
    try {
      await api.post('/leads', { firstName, lastName, email, company, status: 'NEW' })
      setFirstName('')
      setLastName('')
      setEmail('')
      setCompany('')
      await load()
    } catch {
      setError('Create failed')
    }
  }

  async function advance(id: string, status: string) {
    try {
      await api.put(`/leads/${id}`, { status })
      await load()
    } catch {
      setError('Update failed')
    }
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Leads</h1>
      {error && <p className="mt-2 text-sm text-amber-700">{error}</p>}
      <form onSubmit={create} className="mt-6 grid gap-3 rounded-xl border bg-white p-4 sm:grid-cols-2">
        <input className="rounded border px-3 py-2 text-sm" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <input className="rounded border px-3 py-2 text-sm" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        <input className="rounded border px-3 py-2 text-sm" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="rounded border px-3 py-2 text-sm" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
        <button className="rounded bg-sky-600 px-4 py-2 text-sm text-white sm:col-span-2" type="submit">
          Add lead
        </button>
      </form>
      <ul className="mt-6 space-y-3">
        {leads.map((lead) => (
          <li key={lead.id} className="rounded-xl border bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-medium">
                  {lead.firstName} {lead.lastName}
                </p>
                <p className="text-sm text-slate-500">
                  {lead.email} · {lead.status}
                </p>
              </div>
              <button
                type="button"
                className="rounded border px-2 py-1 text-xs"
                onClick={() => advance(lead.id, lead.status === 'NEW' ? 'CONTACTED' : 'QUALIFIED')}
              >
                Advance status
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
