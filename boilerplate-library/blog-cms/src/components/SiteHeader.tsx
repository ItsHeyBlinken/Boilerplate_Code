import Link from 'next/link'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getSession } from '@/lib/auth'

async function logoutAction() {
  'use server'
  cookies().set('blog_cms_token', '', { httpOnly: true, path: '/', maxAge: 0 })
  redirect('/')
}

export async function SiteHeader() {
  const session = await getSession()
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-serif text-xl font-semibold text-stone-900">
          {process.env.NEXT_PUBLIC_APP_NAME || 'Blog CMS'}
        </Link>
        <nav className="flex items-center gap-4 text-sm text-stone-600" style={{ fontFamily: 'var(--font-sans), system-ui, sans-serif' }}>
          <Link href="/" className="hover:text-stone-900">
            Posts
          </Link>
          {session?.role === 'ADMIN' && <Link href="/admin">Admin</Link>}
          {session ? (
            <>
              <span className="text-stone-400">{session.name}</span>
              <form action={logoutAction}>
                <button type="submit" className="hover:text-stone-900">
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
