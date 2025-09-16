import { useState, useEffect } from 'react'
import { BarChart3, Users, DollarSign, TrendingUp, Activity, Calendar } from 'lucide-react'
import { useStore } from '../store/useStore'

interface StatCardProps {
  title: string
  value: string | number
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: React.ComponentType<{ className?: string }>
}

function StatCard({ title, value, change, changeType, icon: Icon }: StatCardProps) {
  const changeColor = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600',
  }[changeType]

  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className={`text-sm ${changeColor}`}>
              {change}
            </p>
          </div>
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary-600" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function Dashboard() {
  const { user, setUser } = useStore()
  const [stats, setStats] = useState({
    totalUsers: 0,
    revenue: 0,
    orders: 0,
    growth: 0,
  })

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalUsers: 1247,
        revenue: 45678,
        orders: 892,
        growth: 12.5,
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Simulate user login for demo
  useEffect(() => {
    if (!user) {
      setUser({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      })
    }
  }, [user, setUser])

  const recentActivities = [
    { id: 1, action: 'New user registered', time: '2 minutes ago', type: 'user' },
    { id: 2, action: 'Order #1234 completed', time: '5 minutes ago', type: 'order' },
    { id: 3, action: 'Payment received', time: '10 minutes ago', type: 'payment' },
    { id: 4, action: 'System backup completed', time: '1 hour ago', type: 'system' },
  ]

  const quickActions = [
    { title: 'Add New User', description: 'Create a new user account', icon: Users },
    { title: 'View Reports', description: 'Access analytics and reports', icon: BarChart3 },
    { title: 'Manage Orders', description: 'Process and track orders', icon: Activity },
    { title: 'Schedule Event', description: 'Create a new calendar event', icon: Calendar },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back, {user?.name}! Here's what's happening with your application.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          change="+12% from last month"
          changeType="positive"
          icon={Users}
        />
        <StatCard
          title="Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          change="+8% from last month"
          changeType="positive"
          icon={DollarSign}
        />
        <StatCard
          title="Orders"
          value={stats.orders.toLocaleString()}
          change="+23% from last month"
          changeType="positive"
          icon={Activity}
        />
        <StatCard
          title="Growth Rate"
          value={`${stats.growth}%`}
          change="+2.1% from last month"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'user' ? 'bg-blue-500' :
                      activity.type === 'order' ? 'bg-green-500' :
                      activity.type === 'payment' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <button
                      key={index}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                          <Icon className="h-4 w-4 text-primary-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {action.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section (Placeholder) */}
      <div className="mt-8">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Analytics Overview</h3>
          </div>
          <div className="card-body">
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Chart visualization would go here
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Integrate with Chart.js, Recharts, or D3.js
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}