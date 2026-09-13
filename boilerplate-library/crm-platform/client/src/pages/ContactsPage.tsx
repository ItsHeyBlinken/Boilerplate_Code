import { FormEvent, useEffect, useState } from 'react'
import { api } from '../services/api'

type Contact = {
  id: string
  firstName: string
  lastName: string
  email: string
  company?: string | null
}

export function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [error, setError] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')

  async function load() {
    try {
      const { data } = await api.get('/contacts')
      setContacts(data.data || [])
      setError('')
    } catch {
      setError('Could not load contacts')
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function create(e: FormEvent) {
    e.preventDefault()
    try {
      await api.post('/contacts', { firstName, lastName, email, company })
      setFirstName('')
      setLastName('')
      setEmail('')
      setCompany('')
      await load()
    } catch {
      setError('Create failed')
    }
  }

  async function remove(id: string) {
    try {
      await api.delete(`/contacts/${id}`)
      await load()
    } catch {
      setError('Delete failed')
    }
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Contacts</h1>
      {error && <p className="mt-2 text-sm text-amber-700">{error}</p>}
      <form onSubmit={create} className="mt-6 grid gap-3 rounded-xl border bg-white p-4 sm:grid-cols-2">
        <input className="rounded border px-3 py-2 text-sm" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <input className="rounded border px-3 py-2 text-sm" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        <input className="rounded border px-3 py-2 text-sm" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="rounded border px-3 py-2 text-sm" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
        <button className="rounded bg-sky-600 px-4 py-2 text-sm text-white sm:col-span-2" type="submit">
          Add contact
        </button>
      </form>
      <ul className="mt-6 space-y-3">
        {contacts.map((c) => (
          <li key={c.id} className="flex items-center justify-between rounded-xl border bg-white p-4">
            <div>
              <p className="font-medium">
                {c.firstName} {c.lastName}
              </p>
              <p className="text-sm text-slate-500">
                {c.email}
                {c.company ? ` · ${c.company}` : ''}
              </p>
            </div>
            <button type="button" className="text-sm text-rose-600" onClick={() => remove(c.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
