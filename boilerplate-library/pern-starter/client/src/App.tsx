import { useEffect } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { PostsPage } from './pages/PostsPage'
import { LoginPage } from './pages/LoginPage'
import { useAuthStore } from './store/auth'

export default function App() {
  const { user, hydrate, clearSession } = useAuthStore()

  useEffect(() => {
    hydrate()
  }, [hydrate])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-semibold text-emerald-700">
            PERN Starter
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
            <Link to="/">Home</Link>
            <Link to="/posts">Posts</Link>
            {user ? (
              <>
                <span className="text-slate-500">
                  {user.firstName} {user.lastName}
                </span>
                <button
                  type="button"
                  className="rounded border border-slate-300 px-3 py-1 text-slate-700"
                  onClick={clearSession}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </div>
  )
}
