"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Puzzle, Plug, Workflow, LayoutDashboard, GitBranch, Settings } from "lucide-react"

export function BottomNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const menuItems = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
      description: "Dashboard home",
      color: "from-slate-500 to-gray-500",
    },
    {
      name: "Connectors",
      href: "/connectors",
      icon: Plug,
      description: "Connect external services",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "MODS",
      href: "/mods",
      icon: Puzzle,
      description: "Extend APEX functionality",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "APEX Flow",
      href: "/apex-flow",
      icon: GitBranch,
      description: "Visual automation builder",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "SaaS MOD",
      href: "/saas-mod",
      icon: Workflow,
      description: "Complete SaaS deployment",
      color: "from-indigo-500 to-purple-500",
    },
    {
      name: "Account",
      href: "/dashboard/account",
      icon: Settings,
      description: "Account settings",
      color: "from-gray-500 to-slate-500",
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-t border-border/50">
      <div className="w-full px-8">
        <div className="flex items-center justify-evenly py-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            const isHovered = hoveredItem === item.name

            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 transition-all duration-300 ease-out ${
                    isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-xl backdrop-blur-sm whitespace-nowrap">
                    <div className="font-semibold text-xs text-foreground">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                </div>

                <button
                  onClick={() => router.push(item.href)}
                  className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-br ${item.color} text-white scale-110 shadow-lg`
                      : "bg-background/10 text-white hover:text-foreground hover:bg-accent hover:scale-105"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{item.name.split(" ")[0]}</span>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
