import { Link, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

export function Layout() {
  const { user, clearSession } = useAuthStore()
  return (
    <div className="min-h-screen">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-semibold text-amber-800">
            Shop Starter
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium text-stone-600">
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">Orders</Link>
            {user ? (
              <>
                <span className="text-stone-400">
                  {user.firstName} {user.lastName}
                </span>
                <button type="button" className="rounded border px-2 py-1" onClick={clearSession}>
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">Login</Link>
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
