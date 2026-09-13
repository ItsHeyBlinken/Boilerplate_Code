import Stripe from 'stripe'
import { prisma } from './prisma'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_replace_me', {
  apiVersion: '2023-10-16',
  typescript: true,
})

export function appUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
}

export async function ensureOrgStripeCustomer(organizationId: string) {
  const org = await prisma.organization.findUnique({ where: { id: organizationId } })
  if (!org) throw new Error('Organization not found')
  if (org.stripeCustomerId) return org

  const customer = await stripe.customers.create({
    name: org.name,
    metadata: { organizationId: org.id },
  })

  return prisma.organization.update({
    where: { id: org.id },
    data: { stripeCustomerId: customer.id },
  })
}
