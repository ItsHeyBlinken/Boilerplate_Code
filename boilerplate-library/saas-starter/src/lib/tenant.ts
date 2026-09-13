import { MembershipRole } from '@prisma/client'
import { prisma } from './prisma'

export async function getMembership(userId: string, organizationId: string) {
  return prisma.membership.findUnique({
    where: { userId_organizationId: { userId, organizationId } },
    include: { organization: true },
  })
}

export async function requireMembership(
  userId: string,
  organizationId: string,
  roles?: MembershipRole[],
) {
  const membership = await getMembership(userId, organizationId)
  if (!membership) return null
  if (roles && !roles.includes(membership.role)) return null
  return membership
}

export async function getOrgBySlugForUser(userId: string, slug: string) {
  const org = await prisma.organization.findUnique({ where: { slug } })
  if (!org) return null
  const membership = await getMembership(userId, org.id)
  if (!membership) return null
  return { organization: org, membership }
}
