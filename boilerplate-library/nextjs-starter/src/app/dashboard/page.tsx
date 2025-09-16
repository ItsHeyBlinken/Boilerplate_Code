import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { StatsCards } from '@/components/dashboard/stats-cards'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { QuickActions } from '@/components/dashboard/quick-actions'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  // Fetch dashboard data
  const [userCount, postCount, recentPosts] = await Promise.all([
    prisma.user.count(),
    prisma.post.count(),
    prisma.post.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    }),
  ])

  const stats = [
    {
      title: 'Total Users',
      value: userCount,
      description: 'Registered users',
      change: '+12% from last month',
    },
    {
      title: 'Total Posts',
      value: postCount,
      description: 'Published posts',
      change: '+8% from last month',
    },
    {
      title: 'Active Sessions',
      value: 24,
      description: 'Current active sessions',
      change: '+2% from last hour',
    },
    {
      title: 'System Health',
      value: '99.9%',
      description: 'Uptime',
      change: 'All systems operational',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={session.user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {session.user?.name}! Here's what's happening with your application.
          </p>
        </div>

        <StatsCards stats={stats} />

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <RecentActivity posts={recentPosts} />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  )
}