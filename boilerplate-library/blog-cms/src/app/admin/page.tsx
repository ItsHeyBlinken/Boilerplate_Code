import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const session = await getSession()
  if (!session || session.role !== 'ADMIN') redirect('/login')

  const posts = await prisma.post.findMany({ orderBy: { updatedAt: 'desc' } })

  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-2xl font-bold">Admin</h1>
        <Link href="/admin/new" className="rounded bg-stone-900 px-3 py-2 text-sm text-white">
          New post
        </Link>
      </div>
      <ul className="mt-6 space-y-3">
        {posts.map((post) => (
          <li key={post.id} className="flex items-center justify-between rounded-xl border bg-white p-4">
            <div>
              <p className="font-medium">{post.title}</p>
              <p className="text-xs text-stone-500">
                {post.status} · {post.slug}
              </p>
            </div>
            <Link href={`/admin/${post.id}/edit`} className="text-sm underline">
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
