import { useEffect, useState } from 'react'
import { api } from '../services/api'

type Post = {
  id?: string
  _id?: string
  title: string
  content: string
}

export function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  async function loadPosts() {
    try {
      const { data } = await api.get('/posts')
      setPosts(data.data || [])
      setError('')
    } catch {
      setError('Could not load posts. Is the API running with MongoDB?')
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  async function createPost(e: React.FormEvent) {
    e.preventDefault()
    try {
      await api.post('/posts', { title, content, status: 'PUBLISHED' })
      setTitle('')
      setContent('')
      await loadPosts()
    } catch {
      setError('Create failed. Login first, then try again.')
    }
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Posts</h1>
      {error && <p className="mt-3 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">{error}</p>}

      <form onSubmit={createPost} className="mt-6 space-y-3 rounded-xl border border-slate-200 bg-white p-4">
        <input
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button className="rounded bg-emerald-600 px-4 py-2 text-sm font-medium text-white" type="submit">
          Create Post
        </button>
      </form>

      <ul className="mt-8 space-y-3">
        {posts.map((post) => (
          <li key={post.id || post._id} className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="font-semibold">{post.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{post.content}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
