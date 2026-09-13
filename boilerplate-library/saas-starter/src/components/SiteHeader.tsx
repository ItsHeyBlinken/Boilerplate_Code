import Link from 'next/link'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getSession } from '@/lib/auth'

async function logoutAction() {
  'use server'
  cookies().set('saas_starter_token', '', { httpOnly: true, path: '/', maxAge: 0 })
  redirect('/login')
}

export async function SiteHeader() {
  const session = await getSession()
  return (
    <header className="border-b border-slateink-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
        <Link href={session ? '/dashboard' : '/'} className="font-display text-lg font-semibold tracking-tight">
          {process.env.NEXT_PUBLIC_APP_NAME || 'SaaS Starter'}
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slateink-800/70">
          {session ? (
            <>
              <Link href="/dashboard" className="hover:text-slateink-900">
                Dashboard
              </Link>
              <span className="text-slateink-800/40">{session.name}</span>
              <form action={logoutAction}>
                <button type="submit" className="hover:text-slateink-900">
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
