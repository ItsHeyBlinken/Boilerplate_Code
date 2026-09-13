import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { appUrl, ensureOrgStripeCustomer, stripe } from '@/lib/stripe'
import { requireMembership } from '@/lib/tenant'

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not authorized' }, { status: 401 })
  }

  const { organizationId, action } = await req.json()
  if (!organizationId) {
    return NextResponse.json({ success: false, error: 'organizationId is required' }, { status: 400 })
  }

  const membership = await requireMembership(session.id, organizationId, ['OWNER', 'ADMIN'])
  if (!membership) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  }

  const org = await ensureOrgStripeCustomer(organizationId)
  if (!org.stripeCustomerId) {
    return NextResponse.json({ success: false, error: 'Missing Stripe customer' }, { status: 500 })
  }

  if (action === 'portal') {
    const portal = await stripe.billingPortal.sessions.create({
      customer: org.stripeCustomerId,
      return_url: `${appUrl()}/org/${org.slug}/billing`,
    })
    return NextResponse.json({ success: true, url: portal.url })
  }

  const priceId = process.env.STRIPE_PRICE_PRO
  if (!priceId) {
    return NextResponse.json(
      { success: false, error: 'STRIPE_PRICE_PRO is not configured' },
      { status: 500 },
    )
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: org.stripeCustomerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl()}/org/${org.slug}/billing?checkout=success`,
    cancel_url: `${appUrl()}/org/${org.slug}/billing?checkout=cancel`,
    metadata: { organizationId: org.id },
    subscription_data: {
      metadata: { organizationId: org.id },
    },
  })

  return NextResponse.json({ success: true, url: checkout.url })
}
