import Link from 'next/link'
import { redirect, notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getOrgBySlugForUser } from '@/lib/tenant'
import { AddMemberForm } from '@/components/AddMemberForm'

type Props = { params: { slug: string } }

export default async function MembersPage({ params }: Props) {
  const session = await getSession()
  if (!session) redirect('/login')

  const result = await getOrgBySlugForUser(session.id, params.slug)
  if (!result) notFound()

  const members = await prisma.membership.findMany({
    where: { organizationId: result.organization.id },
    include: { user: { select: { id: true, email: true, name: true } } },
    orderBy: { createdAt: 'asc' },
  })

  const canManage = result.membership.role === 'OWNER' || result.membership.role === 'ADMIN'

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/org/${params.slug}`} className="text-sm text-accent">
          ← {result.organization.name}
        </Link>
        <h1 className="mt-2 font-display text-2xl font-semibold">Members</h1>
      </div>

      <ul className="space-y-2">
        {members.map((m) => (
          <li
            key={m.id}
            className="flex items-center justify-between rounded border border-slateink-100 bg-white px-4 py-3"
          >
            <div>
              <p className="font-medium">{m.user.name}</p>
              <p className="text-xs text-slateink-800/50">{m.user.email}</p>
            </div>
            <span className="font-display text-xs text-slateink-800/50">{m.role}</span>
          </li>
        ))}
      </ul>

      {canManage && <AddMemberForm organizationId={result.organization.id} />}
    </div>
  )
}
