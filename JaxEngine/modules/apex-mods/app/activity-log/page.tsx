import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle2, AlertCircle, XCircle, Zap, Plug, Settings, User, FileText } from "lucide-react"

export default function ActivityLogPage() {
  const activities = [
    {
      id: 1,
      type: "success",
      icon: CheckCircle2,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      title: "MOD Activated",
      description: "SEO Content Writer MOD has been successfully activated",
      timestamp: "2 minutes ago",
      user: "System",
    },
    {
      id: 2,
      type: "success",
      icon: Plug,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      title: "Connector Added",
      description: "DexTools connector has been successfully integrated",
      timestamp: "15 minutes ago",
      user: "Admin",
    },
    {
      id: 3,
      type: "warning",
      icon: AlertCircle,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      title: "API Rate Limit Warning",
      description: "Approaching rate limit for Google Workspace API (85% used)",
      timestamp: "1 hour ago",
      user: "System",
    },
    {
      id: 4,
      type: "info",
      icon: Settings,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      title: "Configuration Updated",
      description: "Firebase authentication settings have been modified",
      timestamp: "2 hours ago",
      user: "Admin",
    },
    {
      id: 5,
      type: "success",
      icon: Zap,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      title: "Automation Completed",
      description: "Lead Hunter MOD completed 50 new lead searches",
      timestamp: "3 hours ago",
      user: "System",
    },
    {
      id: 6,
      type: "error",
      icon: XCircle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      title: "Connection Failed",
      description: "Failed to connect to Stripe API - Invalid API key",
      timestamp: "4 hours ago",
      user: "System",
    },
    {
      id: 7,
      type: "info",
      icon: User,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      title: "User Login",
      description: "Admin user logged in from new device",
      timestamp: "5 hours ago",
      user: "Admin",
    },
    {
      id: 8,
      type: "success",
      icon: FileText,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      title: "Report Generated",
      description: "Monthly analytics report has been generated and sent",
      timestamp: "6 hours ago",
      user: "System",
    },
  ]

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Activity Log</h1>
          <p className="text-muted-foreground">
            Track all system activities, MOD operations, and connector events in real-time
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>All system events and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full ${activity.bgColor} flex items-center justify-center`}
                    >
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-foreground">{activity.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {activity.user}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
