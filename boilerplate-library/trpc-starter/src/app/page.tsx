import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="space-y-6">
      <p className="text-sm uppercase tracking-[0.2em] text-amber-800">tRPC Starter</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight">
        End-to-end typesafe APIs on Next.js
      </h1>
      <p className="max-w-lg text-stone-600">
        Cookie auth, Prisma posts CRUD, and React Query hooks that share types with the server
        router.
      </p>
      <div className="flex gap-3">
        <Link href="/register" className="rounded bg-stone-900 px-4 py-2 text-sm text-white">
          Get started
        </Link>
        <Link href="/login" className="rounded border border-stone-200 bg-white px-4 py-2 text-sm">
          Login
        </Link>
      </div>
    </div>
  )
}
