import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Users, FileText, Activity } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  description: string
  change: string
}

interface StatsCardsProps {
  stats: StatCardProps[]
}

const icons = {
  users: Users,
  posts: FileText,
  sessions: Activity,
  health: TrendingUp,
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const iconKeys = Object.keys(icons) as Array<keyof typeof icons>
        const Icon = icons[iconKeys[index % iconKeys.length]]
        
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              <p className="text-xs text-green-600 mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}