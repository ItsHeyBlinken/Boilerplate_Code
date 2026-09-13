'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { trpc } from '@/trpc/client'

export function SiteHeader() {
  const router = useRouter()
  const { data: session } = trpc.auth.me.useQuery()
  const logout = trpc.auth.logout.useMutation({
    onSuccess: () => {
      router.push('/login')
      router.refresh()
    },
  })

  return (
    <header className="border-b border-stone-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
        <Link href={session ? '/posts' : '/'} className="font-display text-xl font-semibold">
          {process.env.NEXT_PUBLIC_APP_NAME || 'tRPC Starter'}
        </Link>
        <nav className="flex items-center gap-4 text-sm text-stone-600">
          {session ? (
            <>
              <Link href="/posts">Posts</Link>
              <span className="text-stone-400">{session.name}</span>
              <button type="button" onClick={() => logout.mutate()} className="hover:text-stone-900">
                Logout
              </button>
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
