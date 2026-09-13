import { Link, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

export function Layout() {
  const { user, clearSession } = useAuthStore()

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-semibold text-sky-700">
            CRM Platform
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
            <Link to="/">Dashboard</Link>
            <Link to="/contacts">Contacts</Link>
            <Link to="/leads">Leads</Link>
            <Link to="/deals">Deals</Link>
            {user && (
              <>
                <span className="text-slate-400">
                  {user.firstName} {user.lastName}
                </span>
                <button type="button" className="rounded border px-2 py-1" onClick={clearSession}>
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
