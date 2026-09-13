import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    include: { author: { select: { name: true } } },
    orderBy: { publishedAt: 'desc' },
  })

  return (
    <section>
      <h1 className="font-serif text-3xl font-bold">Latest posts</h1>
      <p className="mt-2 text-stone-600">Public published articles from the lean CMS.</p>
      <ul className="mt-8 space-y-6">
        {posts.length === 0 && (
          <li className="rounded-xl border border-dashed border-stone-300 bg-white p-6 text-sm text-stone-500">
            No published posts yet. Register (first user is ADMIN) and create one in Admin.
          </li>
        )}
        {posts.map((post) => (
          <li key={post.id} className="rounded-xl border border-stone-200 bg-white p-5">
            <Link href={`/posts/${post.slug}`} className="font-serif text-xl font-semibold text-stone-900 hover:underline">
              {post.title}
            </Link>
            {post.excerpt && <p className="mt-2 text-sm text-stone-600">{post.excerpt}</p>}
            <p className="mt-3 text-xs text-stone-400">
              {post.author.name}
              {post.publishedAt ? ` · ${post.publishedAt.toLocaleDateString()}` : ''}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
