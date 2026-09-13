import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

export default async function HomePage() {
  const session = await getSession()
  if (session) redirect('/dashboard')

  return (
    <div className="space-y-6">
      <p className="font-display text-sm uppercase tracking-[0.2em] text-accent">SaaS Starter</p>
      <h1 className="text-4xl font-semibold tracking-tight text-slateink-900">
        Multi-tenant orgs with Stripe billing
      </h1>
      <p className="max-w-xl text-slateink-800/70">
        Register, create workspaces, invite members, and upgrade an organization to PRO via Stripe
        Checkout.
      </p>
      <div className="flex gap-3">
        <Link
          href="/register"
          className="rounded bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark"
        >
          Get started
        </Link>
        <Link href="/login" className="rounded border border-slateink-100 bg-white px-4 py-2 text-sm">
          Login
        </Link>
      </div>
    </div>
  )
}
