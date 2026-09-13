import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { CreateOrgForm } from '@/components/CreateOrgForm'

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const memberships = await prisma.membership.findMany({
    where: { userId: session.id },
    include: { organization: true },
    orderBy: { createdAt: 'asc' },
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">Your organizations</h1>
        <p className="mt-1 text-sm text-slateink-800/60">Open a workspace or create another one.</p>
      </div>

      <ul className="space-y-2">
        {memberships.map((m) => (
          <li key={m.id}>
            <Link
              href={`/org/${m.organization.slug}`}
              className="flex items-center justify-between rounded border border-slateink-100 bg-white px-4 py-3 hover:border-accent"
            >
              <div>
                <p className="font-medium">{m.organization.name}</p>
                <p className="text-xs text-slateink-800/50">
                  {m.role} · {m.organization.plan}
                  {m.organization.subscriptionStatus
                    ? ` · ${m.organization.subscriptionStatus}`
                    : ''}
                </p>
              </div>
              <span className="font-display text-xs text-accent">open →</span>
            </Link>
          </li>
        ))}
      </ul>

      <CreateOrgForm />
    </div>
  )
}
