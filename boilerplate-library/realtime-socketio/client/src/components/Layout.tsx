import { Link, Outlet } from 'react-router-dom'
import { disconnectSocket } from '../services/socket'
import { useAuthStore } from '../store/auth'

export function Layout() {
  const user = useAuthStore((s) => s.user)
  const clearSession = useAuthStore((s) => s.clearSession)

  return (
    <div className="mx-auto min-h-screen max-w-4xl px-4 py-6">
      <header className="mb-8 flex items-center justify-between border-b border-ink-100 pb-4">
        <Link to="/" className="font-display text-xl font-semibold tracking-tight text-ink-900">
          Realtime
        </Link>
        <div className="flex items-center gap-4 text-sm text-ink-800/70">
          <span>{user?.name}</span>
          <button
            type="button"
            className="text-signal hover:text-signal-dark"
            onClick={() => {
              disconnectSocket()
              clearSession()
            }}
          >
            Logout
          </button>
        </div>
      </header>
      <Outlet />
    </div>
  )
}
