import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

type Props = { params: { slug: string } }

export default async function PostPage({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: { author: { select: { name: true } } },
  })
  if (!post || post.status !== 'PUBLISHED') notFound()

  return (
    <article>
      <Link href="/" className="text-sm text-stone-500 hover:text-stone-800">
        ← All posts
      </Link>
      <h1 className="mt-4 font-serif text-3xl font-bold">{post.title}</h1>
      <p className="mt-2 text-sm text-stone-500">
        {post.author.name}
        {post.publishedAt ? ` · ${post.publishedAt.toLocaleDateString()}` : ''}
      </p>
      <div className="prose-content mt-8">{post.content}</div>
    </article>
  )
}
