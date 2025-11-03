"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Zap,
  TrendingUp,
  Bot,
  Bell,
  Settings,
  ChevronLeft,
  Target,
  Plug,
  MessageCircle,
  Activity,
  Webhook,
  Terminal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Signals",
    href: "/dashboard/signals",
    icon: Activity,
  },
  {
    title: "LED Signals",
    href: "/dashboard/led",
    icon: Zap,
  },
  {
    title: "Futures Crush",
    href: "/dashboard/futures-crush",
    icon: TrendingUp,
  },
  {
    title: "Scouting",
    href: "/dashboard/scouting",
    icon: Target,
  },
  {
    title: "Social Insights",
    href: "/dashboard/social-insights",
    icon: MessageCircle,
  },
  {
    title: "Trading Bots",
    href: "/dashboard/trading",
    icon: Bot,
  },
  {
    title: "Alerts",
    href: "/dashboard/alerts",
    icon: Bell,
  },
  {
    title: "Webhooks",
    href: "/dashboard/webhooks",
    icon: Webhook,
  },
  {
    title: "Integrations",
    href: "/dashboard/integrations",
    icon: Plug,
  },
  {
    title: "Admin CLI",
    href: "/dashboard/admin",
    icon: Terminal,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "relative flex flex-col border-r border-border/40 bg-background/95 backdrop-blur-xl transition-all duration-300 h-full shadow-lg",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-border/40 px-4">
        {!collapsed && (
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Jax
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("h-8 w-8 hidden lg:flex hover:bg-primary/10 transition-colors", collapsed && "mx-auto")}
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md shadow-primary/20"
                  : "hover:bg-accent/50 hover:text-accent-foreground hover:shadow-sm",
                collapsed && "justify-center",
              )}
              title={collapsed ? item.title : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border/40 p-4 bg-gradient-to-t from-primary/5 to-transparent">
        {!collapsed && (
          <div className="space-y-1 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Jax v2.0.0</p>
            <p>Predictive XAI</p>
          </div>
        )}
      </div>
    </div>
  )
}
