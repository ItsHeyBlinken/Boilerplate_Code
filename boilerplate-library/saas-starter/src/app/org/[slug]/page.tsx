import Link from 'next/link'
import { redirect, notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { getOrgBySlugForUser } from '@/lib/tenant'

type Props = { params: { slug: string } }

export default async function OrgPage({ params }: Props) {
  const session = await getSession()
  if (!session) redirect('/login')

  const result = await getOrgBySlugForUser(session.id, params.slug)
  if (!result) notFound()

  const { organization, membership } = result

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard" className="text-sm text-accent">
          ← Dashboard
        </Link>
        <h1 className="mt-2 font-display text-2xl font-semibold">{organization.name}</h1>
        <p className="text-sm text-slateink-800/60">
          You are {membership.role} · plan {organization.plan}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href={`/org/${organization.slug}/members`}
          className="rounded border border-slateink-100 bg-white px-4 py-4 hover:border-accent"
        >
          <p className="font-medium">Members</p>
          <p className="text-sm text-slateink-800/50">Add registered users by email</p>
        </Link>
        <Link
          href={`/org/${organization.slug}/billing`}
          className="rounded border border-slateink-100 bg-white px-4 py-4 hover:border-accent"
        >
          <p className="font-medium">Billing</p>
          <p className="text-sm text-slateink-800/50">Upgrade to PRO or open portal</p>
        </Link>
      </div>
    </div>
  )
}
