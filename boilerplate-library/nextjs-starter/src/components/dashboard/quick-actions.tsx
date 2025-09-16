import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, FileText, Users, Settings, BarChart3 } from 'lucide-react'

const actions = [
  {
    title: 'Create Post',
    description: 'Write a new blog post',
    icon: Plus,
    href: '/posts/create',
  },
  {
    title: 'View Posts',
    description: 'Manage your posts',
    icon: FileText,
    href: '/posts',
  },
  {
    title: 'User Management',
    description: 'Manage users and roles',
    icon: Users,
    href: '/admin/users',
  },
  {
    title: 'Analytics',
    description: 'View detailed analytics',
    icon: BarChart3,
    href: '/analytics',
  },
  {
    title: 'Settings',
    description: 'Configure your application',
    icon: Settings,
    href: '/settings',
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common tasks and shortcuts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.title}
                variant="outline"
                className="w-full justify-start h-auto p-3"
                asChild
              >
                <a href={action.href}>
                  <Icon className="h-4 w-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </a>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}