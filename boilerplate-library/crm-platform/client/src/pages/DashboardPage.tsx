import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'

type Summary = {
  contacts: number
  leads: number
  openDeals: number
  wonDeals: number
}

export function DashboardPage() {
  const [summary, setSummary] = useState<Summary | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get('/dashboard/summary')
      .then((res) => setSummary(res.data.data))
      .catch(() => setError('Could not load dashboard. Is the API running with Postgres migrated?'))
  }, [])

  return (
    <section>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-sm text-slate-600">Lean CRM starter — contacts, leads, and deals.</p>
      {error && <p className="mt-3 text-sm text-amber-700">{error}</p>}
      {summary && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Contacts', summary.contacts, '/contacts'],
            ['Leads', summary.leads, '/leads'],
            ['Open deals', summary.openDeals, '/deals'],
            ['Won deals', summary.wonDeals, '/deals'],
          ].map(([label, value, href]) => (
            <Link key={String(label)} to={String(href)} className="rounded-xl border bg-white p-4">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-2 text-2xl font-semibold">{value as number}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
