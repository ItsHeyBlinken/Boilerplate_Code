'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewPostPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('DRAFT')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, excerpt, content, status }),
    })
    if (!res.ok) {
      setError('Create failed (ADMIN required)')
      return
    }
    router.push('/admin')
    router.refresh()
  }

  return (
    <section>
      <h1 className="font-serif text-2xl font-bold">New post</h1>
      {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
      <form onSubmit={onSubmit} className="mt-6 space-y-3 rounded-xl border bg-white p-4">
        <input className="w-full rounded border px-3 py-2 text-sm" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input className="w-full rounded border px-3 py-2 text-sm" placeholder="Excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        <textarea className="min-h-[200px] w-full rounded border px-3 py-2 text-sm" placeholder="Content (markdown/plain)" value={content} onChange={(e) => setContent(e.target.value)} required />
        <select className="w-full rounded border px-3 py-2 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
        <button className="rounded bg-stone-900 px-4 py-2 text-sm text-white" type="submit">
          Save
        </button>
      </form>
    </section>
  )
}
