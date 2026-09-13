'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('DRAFT')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((r) => r.json())
      .then((json) => {
        if (!json.data) {
          setError('Post not found')
          return
        }
        setTitle(json.data.title)
        setExcerpt(json.data.excerpt || '')
        setContent(json.data.content)
        setStatus(json.data.status)
      })
      .catch(() => setError('Failed to load post'))
  }, [id])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, excerpt, content, status }),
    })
    if (!res.ok) {
      setError('Update failed')
      return
    }
    router.push('/admin')
    router.refresh()
  }

  async function onDelete() {
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    if (!res.ok) {
      setError('Delete failed')
      return
    }
    router.push('/admin')
    router.refresh()
  }

  return (
    <section>
      <h1 className="font-serif text-2xl font-bold">Edit post</h1>
      {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
      <form onSubmit={onSubmit} className="mt-6 space-y-3 rounded-xl border bg-white p-4">
        <input className="w-full rounded border px-3 py-2 text-sm" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input className="w-full rounded border px-3 py-2 text-sm" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        <textarea className="min-h-[200px] w-full rounded border px-3 py-2 text-sm" value={content} onChange={(e) => setContent(e.target.value)} required />
        <select className="w-full rounded border px-3 py-2 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
        <div className="flex gap-2">
          <button className="rounded bg-stone-900 px-4 py-2 text-sm text-white" type="submit">
            Save
          </button>
          <button className="rounded border border-rose-300 px-4 py-2 text-sm text-rose-700" type="button" onClick={onDelete}>
            Delete
          </button>
        </div>
      </form>
    </section>
  )
}
