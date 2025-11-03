"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Activity,
  Zap,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Menu,
  Home,
  Plug,
  Puzzle,
  FileText,
  Wand2,
  Settings,
  ScrollText,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function RightSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasBeenClicked, setHasBeenClicked] = useState(false)
  const pathname = usePathname()

  const handleToggle = () => {
    setIsOpen(true)
    setHasBeenClicked(true)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
  }

  const activeMods = [
    { name: "SEO Content Writer", status: "active", color: "bg-green-500" },
    { name: "WordPress Assistant", status: "active", color: "bg-blue-500" },
    { name: "Lead Hunter", status: "idle", color: "bg-gray-500" },
  ]

  const recentActivity = [
    { action: "MOD activated", time: "2m ago", icon: CheckCircle2, color: "text-green-500" },
    { action: "Connector added", time: "15m ago", icon: CheckCircle2, color: "text-green-500" },
    { action: "API warning", time: "1h ago", icon: AlertCircle, color: "text-yellow-500" },
  ]

  const quickStats = [
    { label: "API Calls", value: "1,234", icon: Activity, trend: "+12%" },
    { label: "Active MODS", value: "3", icon: Zap, trend: "+1" },
  ]

  const navigationLinks = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/connectors", label: "Connectors", icon: Plug },
    { href: "/mods", label: "MODS", icon: Puzzle },
    { href: "/apex-docs", label: "API Docs", icon: FileText },
    { href: "/apex-flow", label: "APEX Flow", icon: Wand2 },
    { href: "/activity-log", label: "Activity Log", icon: ScrollText },
    { href: "/configuration", label: "Configuration", icon: Settings },
  ]

  return (
    <>
      <button
        onClick={handleToggle}
        className={cn(
          "fixed top-1/2 -translate-y-1/2 right-0 z-50 bg-white rounded-l-lg p-3 shadow-lg transition-all duration-300 hover:pr-4",
          "before:absolute before:inset-0 before:rounded-l-lg before:blur-[30px] before:bg-white/20 before:-z-10",
          !hasBeenClicked && "animate-radar-pulse",
        )}
        style={{
          boxShadow: "0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.1)",
        }}
      >
        <Menu className="w-6 h-6 text-black" />
      </button>

      <aside
        onMouseLeave={handleMouseLeave}
        className={cn(
          "fixed right-0 top-[64px] w-80 h-[calc(100vh-64px-73px)] bg-card border-l border-border overflow-y-auto z-40",
          "transition-transform duration-700",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        style={{
          transitionTimingFunction: isOpen
            ? "cubic-bezier(0.34, 1.56, 0.64, 1)" // Fast start, smooth stop (ease-out with bounce)
            : "cubic-bezier(0.6, 0.04, 0.98, 0.34)", // Smooth start, fast end (ease-in)
        }}
      >
        <div className="p-6 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {navigationLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant={pathname === link.href ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickStats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <stat.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">{stat.value}</span>
                    <span className="text-xs text-green-500">{stat.trend}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Active MODS */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Active MODS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeMods.map((mod) => (
                <div key={mod.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${mod.color}`} />
                    <span className="text-sm text-foreground">{mod.name}</span>
                  </div>
                  <Badge variant={mod.status === "active" ? "default" : "secondary"} className="text-xs">
                    {mod.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-2">
                  <activity.icon className={`w-4 h-4 mt-0.5 ${activity.color}`} />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </aside>
    </>
  )
}
