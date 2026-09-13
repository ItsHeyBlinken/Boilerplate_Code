import Link from 'next/link'
import { redirect, notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { getOrgBySlugForUser } from '@/lib/tenant'
import { BillingActions } from '@/components/BillingActions'

type Props = { params: { slug: string }; searchParams: { checkout?: string } }

export default async function BillingPage({ params, searchParams }: Props) {
  const session = await getSession()
  if (!session) redirect('/login')

  const result = await getOrgBySlugForUser(session.id, params.slug)
  if (!result) notFound()

  const { organization, membership } = result
  const canManage = membership.role === 'OWNER' || membership.role === 'ADMIN'

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/org/${params.slug}`} className="text-sm text-accent">
          ← {organization.name}
        </Link>
        <h1 className="mt-2 font-display text-2xl font-semibold">Billing</h1>
        <p className="text-sm text-slateink-800/60">
          Plan: <strong>{organization.plan}</strong>
          {organization.subscriptionStatus ? ` · ${organization.subscriptionStatus}` : ''}
        </p>
      </div>

      {searchParams.checkout === 'success' && (
        <p className="rounded border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
          Checkout completed. Webhook will sync PRO status shortly.
        </p>
      )}
      {searchParams.checkout === 'cancel' && (
        <p className="rounded border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Checkout canceled.
        </p>
      )}

      {canManage ? (
        <BillingActions organizationId={organization.id} plan={organization.plan} />
      ) : (
        <p className="text-sm text-slateink-800/60">Only OWNER or ADMIN can manage billing.</p>
      )}
    </div>
  )
}
