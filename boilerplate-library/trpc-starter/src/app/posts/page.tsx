'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { trpc } from '@/trpc/client'

export default function PostsPage() {
  const router = useRouter()
  const { data: session, isLoading: sessionLoading } = trpc.auth.me.useQuery()
  const { data: posts, isLoading } = trpc.posts.list.useQuery(undefined, {
    enabled: !!session,
  })
  const utils = trpc.useUtils()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const create = trpc.posts.create.useMutation({
    onSuccess: async () => {
      setTitle('')
      setContent('')
      await utils.posts.list.invalidate()
    },
  })
  const remove = trpc.posts.delete.useMutation({
    onSuccess: async () => {
      await utils.posts.list.invalidate()
    },
  })

  useEffect(() => {
    if (!sessionLoading && !session) {
      router.replace('/login')
    }
  }, [session, sessionLoading, router])

  if (sessionLoading || !session) {
    return <p className="text-sm text-stone-500">Loading…</p>
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    create.mutate({ title, content })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">Your posts</h1>
        <p className="text-sm text-stone-500">Typed mutations via <code>trpc.posts.*</code></p>
      </div>

      <form onSubmit={onSubmit} className="space-y-3 rounded border border-stone-200 bg-white p-4">
        {create.error && <p className="text-sm text-red-600">{create.error.message}</p>}
        <input
          className="w-full rounded border border-stone-200 px-3 py-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full rounded border border-stone-200 px-3 py-2"
          placeholder="Content"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" className="rounded bg-stone-900 px-4 py-2 text-sm text-white">
          Create post
        </button>
      </form>

      {isLoading && <p className="text-sm text-stone-500">Loading…</p>}
      <ul className="space-y-3">
        {posts?.map((post) => (
          <li key={post.id} className="rounded border border-stone-200 bg-white p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-medium">{post.title}</h2>
                <p className="mt-1 whitespace-pre-wrap text-sm text-stone-600">{post.content}</p>
              </div>
              <button
                type="button"
                className="text-sm text-red-600"
                onClick={() => remove.mutate({ id: post.id })}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {posts?.length === 0 && <li className="text-sm text-stone-500">No posts yet.</li>}
      </ul>
    </div>
  )
}
