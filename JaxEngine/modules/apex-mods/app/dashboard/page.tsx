"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Activity,
  Users,
  DollarSign,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  TrendingUp,
  LinkIcon,
  ArrowRight,
  Plus,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // Mock data for dashboard
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Active Users",
      value: "2,345",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Active MODS",
      value: "12",
      change: "+2",
      trend: "up",
      icon: Zap,
      color: "text-purple-500",
    },
    {
      title: "API Calls",
      value: "89,234",
      change: "-5.2%",
      trend: "down",
      icon: Activity,
      color: "text-orange-500",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      action: "SEO Content Writer MOD activated",
      time: "2 minutes ago",
      status: "success",
      icon: CheckCircle2,
    },
    {
      id: 2,
      action: "DexTools connector connected",
      time: "15 minutes ago",
      status: "success",
      icon: CheckCircle2,
    },
    {
      id: 3,
      action: "Email campaign sent to 1,234 contacts",
      time: "1 hour ago",
      status: "success",
      icon: CheckCircle2,
    },
    {
      id: 4,
      action: "Stripe payment received: $299",
      time: "2 hours ago",
      status: "success",
      icon: CheckCircle2,
    },
    {
      id: 5,
      action: "API rate limit warning",
      time: "3 hours ago",
      status: "warning",
      icon: AlertCircle,
    },
  ]

  const activeMods = [
    { name: "SEO Content Writer", status: "active", usage: "High" },
    { name: "WordPress Assistant", status: "active", usage: "Medium" },
    { name: "Lead Hunter", status: "active", usage: "Low" },
    { name: "Government Contracts", status: "idle", usage: "None" },
  ]

  const connectedServices = [
    { name: "Stripe", status: "connected", health: "healthy" },
    { name: "DexTools", status: "connected", health: "healthy" },
    { name: "Google Workspace", status: "connected", health: "healthy" },
    { name: "Firebase", status: "connected", health: "warning" },
    { name: "Go High Level", status: "disconnected", health: "error" },
  ]

  const recommendations = [
    {
      id: 1,
      title: "Connect Google Sheets to APEX Flow",
      description: "Automate data collection from your forms directly into spreadsheets",
      action: "Set up flow",
      href: "/apex-flow",
      priority: "high",
      icon: Sparkles,
    },
    {
      id: 2,
      title: "Enable SaaS MOD for recurring revenue",
      description: "Start accepting subscriptions with Stripe integration",
      action: "Enable MOD",
      href: "/saas-mod",
      priority: "high",
      icon: TrendingUp,
    },
    {
      id: 3,
      title: "Add more connectors",
      description: "Connect Slack, Notion, and 45+ other services to expand automation",
      action: "Browse connectors",
      href: "/connectors",
      priority: "medium",
      icon: LinkIcon,
    },
  ]

  const connectionStats = [
    {
      service: "Stripe",
      metric: "Revenue",
      value: "$12,450",
      change: "+18%",
      trend: "up",
      color: "from-purple-500 to-indigo-500",
    },
    {
      service: "Google Workspace",
      metric: "Active Users",
      value: "234",
      change: "+12",
      trend: "up",
      color: "from-blue-500 to-cyan-500",
    },
    {
      service: "DexTools",
      metric: "API Calls",
      value: "45.2K",
      change: "+23%",
      trend: "up",
      color: "from-green-500 to-emerald-500",
    },
    {
      service: "Firebase",
      metric: "Database Reads",
      value: "89.1K",
      change: "-5%",
      trend: "down",
      color: "from-orange-500 to-yellow-500",
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-red-500/5 to-yellow-500/5 pointer-events-none" />

      <div className="max-w-full mx-auto px-8 py-8 relative">
        <Card className="bg-gradient-to-br from-orange-500/10 via-red-500/10 to-yellow-500/10 border-orange-500/20 backdrop-blur-sm mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white">AI Recommendations</CardTitle>
                  <CardDescription className="text-white/60">
                    Smart suggestions to optimize your workflow
                  </CardDescription>
                </div>
              </div>
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                {recommendations.length} suggestions
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-orange-500/30 hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`w-8 h-8 rounded-lg ${rec.priority === "high" ? "bg-orange-500/20" : "bg-blue-500/20"} flex items-center justify-center`}
                    >
                      <rec.icon
                        className={`w-4 h-4 ${rec.priority === "high" ? "text-orange-500" : "text-blue-500"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-white mb-1">{rec.title}</h4>
                      <p className="text-xs text-white/60 leading-relaxed">{rec.description}</p>
                    </div>
                  </div>
                  <Link href={rec.href}>
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 group-hover:shadow-lg group-hover:shadow-orange-500/20 transition-all"
                    >
                      {rec.action}
                      <ArrowRight className="w-3 h-3 ml-2" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Connected Services Stats</h2>
            <Link href="/connectors">
              <Button
                variant="outline"
                size="sm"
                className="border-orange-500/30 text-orange-500 hover:bg-orange-500/10 bg-transparent"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {connectionStats.map((stat) => (
              <Card
                key={stat.service}
                className="bg-white/5 border-white/10 backdrop-blur-sm hover:border-orange-500/30 transition-all group"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xs font-medium text-white/60">{stat.service}</CardTitle>
                    <div className={`w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50 animate-pulse`} />
                  </div>
                  <CardDescription className="text-white/40 text-xs">{stat.metric}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="flex items-center text-xs">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-red-500 mr-1" />
                    )}
                    <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                    <span className="text-white/40 ml-1">this week</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="bg-white/5 border-white/10 backdrop-blur-sm hover:border-orange-500/30 transition-all group"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-white/60">{stat.title}</CardTitle>
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color === "text-green-500" ? "from-green-500/20 to-emerald-500/20" : stat.color === "text-blue-500" ? "from-blue-500/20 to-cyan-500/20" : stat.color === "text-purple-500" ? "from-purple-500/20 to-pink-500/20" : "from-orange-500/20 to-red-500/20"} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="flex items-center text-xs">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 text-red-500 mr-1" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                  <span className="text-white/40 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Activity */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <CardDescription className="text-white/60">Your latest actions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-white/10 last:border-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.status === "success"
                          ? "bg-green-500/10 text-green-500 ring-1 ring-green-500/20"
                          : "bg-yellow-500/10 text-yellow-500 ring-1 ring-yellow-500/20"
                      }`}
                    >
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">{activity.action}</p>
                      <p className="text-xs text-white/40 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active MODS */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Active MODS</CardTitle>
              <CardDescription className="text-white/60">Your installed plugins and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeMods.map((mod) => (
                  <div
                    key={mod.name}
                    className="flex items-center justify-between pb-4 border-b border-white/10 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{mod.name}</p>
                      <p className="text-xs text-white/40 mt-1">Usage: {mod.usage}</p>
                    </div>
                    <Badge
                      variant={mod.status === "active" ? "default" : "secondary"}
                      className={
                        mod.status === "active"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
                          : "text-xs bg-white/10 text-white/60 border-white/20"
                      }
                    >
                      {mod.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Connected Services */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Connected Services</CardTitle>
            <CardDescription className="text-white/60">
              Your active integrations and their health status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {connectedServices.map((service) => (
                <div
                  key={service.name}
                  className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-orange-500/30 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-white">{service.name}</p>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        service.health === "healthy"
                          ? "bg-green-500 shadow-lg shadow-green-500/50"
                          : service.health === "warning"
                            ? "bg-yellow-500 shadow-lg shadow-yellow-500/50"
                            : "bg-red-500 shadow-lg shadow-red-500/50"
                      }`}
                    />
                  </div>
                  <Badge
                    variant={service.status === "connected" ? "default" : "secondary"}
                    className={
                      service.status === "connected"
                        ? "text-xs bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0"
                        : "text-xs bg-white/10 text-white/60 border-white/20"
                    }
                  >
                    {service.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
