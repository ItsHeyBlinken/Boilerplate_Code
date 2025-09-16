import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatRelativeTime } from '@/lib/utils'
import { Calendar, User } from 'lucide-react'

interface Post {
  id: string
  title: string
  content: string | null
  published: boolean
  createdAt: Date
  author: {
    name: string | null
    email: string
  }
}

interface RecentActivityProps {
  posts: Post[]
}

export function RecentActivity({ posts }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest posts and updates from your application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-8 w-8 mx-auto mb-2" />
              <p>No recent activity</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {post.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {formatRelativeTime(post.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    By {post.author.name || post.author.email}
                  </p>
                  {post.content && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {post.content}
                    </p>
                  )}
                  <div className="flex items-center mt-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        post.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}