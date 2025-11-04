export interface DashboardModule {
  id: string
  name: string
  description: string
  enabled: boolean
  category: "metrics" | "data" | "trading" | "analytics"
  loadPriority: number // Lower = loads first
}

export const DEFAULT_MODULES: DashboardModule[] = [
  {
    id: "portfolio",
    name: "Portfolio Value",
    description: "Display your current portfolio value and performance",
    enabled: true,
    category: "metrics",
    loadPriority: 1,
  },
  {
    id: "signals",
    name: "Active Signals",
    description: "Show recent trading signals from Jax AI",
    enabled: true,
    category: "trading",
    loadPriority: 2,
  },
  {
    id: "bots",
    name: "Active Bots",
    description: "Monitor your automated trading bots",
    enabled: true,
    category: "trading",
    loadPriority: 3,
  },
  {
    id: "performance",
    name: "24h Performance",
    description: "Track your 24-hour trading performance",
    enabled: true,
    category: "metrics",
    loadPriority: 4,
  },
  {
    id: "live-prices",
    name: "Live Prices",
    description: "Real-time top coins streamed directly from Binance",
    enabled: true,
    category: "data",
    loadPriority: 10,
  },
]

export function getModuleSettings(): DashboardModule[] {
  if (typeof window === "undefined") return DEFAULT_MODULES

  const stored = localStorage.getItem("dashboard-modules")
  if (!stored) return DEFAULT_MODULES

  try {
    return JSON.parse(stored)
  } catch {
    return DEFAULT_MODULES
  }
}

export function saveModuleSettings(modules: DashboardModule[]) {
  if (typeof window === "undefined") return
  localStorage.setItem("dashboard-modules", JSON.stringify(modules))
}

export function toggleModule(moduleId: string, enabled: boolean) {
  const modules = getModuleSettings()
  const updated = modules.map((m) => (m.id === moduleId ? { ...m, enabled } : m))
  saveModuleSettings(updated)
  return updated
}
