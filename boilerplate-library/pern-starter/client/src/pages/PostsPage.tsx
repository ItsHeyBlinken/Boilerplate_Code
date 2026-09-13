import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import { useAuthStore } from '../store/auth'

type Post = {
  id: string
  title: string
  content: string
  likeCount?: number
  author?: { firstName: string; lastName: string }
}

export function PostsPage() {
  const user = useAuthStore((s) => s.user)
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
      setError('Could not load posts. Is the API running with PostgreSQL migrated?')
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

  async function deletePost(id: string) {
    try {
      await api.delete(`/posts/${id}`)
      await loadPosts()
    } catch {
      setError('Delete failed. You can only delete your own posts.')
    }
  }

  async function likePost(id: string) {
    try {
      await api.post(`/posts/${id}/like`)
      await loadPosts()
    } catch {
      setError('Like failed. Login first, or you already liked this post.')
    }
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Posts</h1>
      {!user && (
        <p className="mt-2 text-sm text-slate-600">
          <Link className="text-emerald-700 underline" to="/login">
            Sign in
          </Link>{' '}
          to create, like, or delete posts.
        </p>
      )}
      {error && <p className="mt-3 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">{error}</p>}

      {user && (
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
      )}

      <ul className="mt-8 space-y-3">
        {posts.map((post) => (
          <li key={post.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold">{post.title}</h2>
                <p className="mt-1 text-sm text-slate-600">{post.content}</p>
                <p className="mt-2 text-xs text-slate-400">
                  {post.author ? `${post.author.firstName} ${post.author.lastName}` : 'Unknown'} · {post.likeCount ?? 0} likes
                </p>
              </div>
              {user && (
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    className="rounded border border-slate-300 px-2 py-1 text-xs"
                    onClick={() => likePost(post.id)}
                  >
                    Like
                  </button>
                  <button
                    type="button"
                    className="rounded border border-rose-300 px-2 py-1 text-xs text-rose-700"
                    onClick={() => deletePost(post.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
