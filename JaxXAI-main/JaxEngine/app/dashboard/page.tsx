"use client"

import { useEffect, useState, Suspense, lazy } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getModuleSettings, type DashboardModule } from "@/lib/dashboard-modules"
import { PortfolioWidget } from "@/components/dashboard-widgets/portfolio-widget"
import { SignalsWidget } from "@/components/dashboard-widgets/signals-widget"
import { BotsWidget } from "@/components/dashboard-widgets/bots-widget"
import { PerformanceWidget } from "@/components/dashboard-widgets/performance-widget"
import { RefreshCw } from "lucide-react"

const LivePricesList = lazy(() =>
  import("@/components/live-prices-list").then((mod) => ({ default: mod.LivePricesList })),
)
const LiveSignalsCalculator = lazy(() =>
  import("@/components/live-signals-calculator").then((mod) => ({ default: mod.LiveSignalsCalculator })),
)

// Loading fallback component
function ComponentLoader() {
  return (
    <Card>
      <CardContent className="flex items-center justify-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const [modules, setModules] = useState<DashboardModule[]>([])

  useEffect(() => {
    setModules(getModuleSettings())
  }, [])

  const isModuleEnabled = (id: string) => {
    return modules.find((m) => m.id === id)?.enabled ?? false
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">Real-time insights from 6 years of on-chain data</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {isModuleEnabled("portfolio") && <PortfolioWidget />}
        {isModuleEnabled("signals") && <SignalsWidget />}
        {isModuleEnabled("bots") && <BotsWidget />}
        {isModuleEnabled("performance") && <PerformanceWidget />}
      </div>

      {/* Recent Signals */}
      <Card className="border-border/40 bg-gradient-to-br from-background to-primary/5 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Recent Signals</CardTitle>
          <CardDescription className="text-sm">Latest trading signals from Jax AI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {[
              { coin: "BTC", type: "LED", signal: "BUY", confidence: 94, time: "2 min ago" },
              { coin: "ETH", type: "Futures Crush", signal: "SELL", confidence: 87, time: "15 min ago" },
              { coin: "SOL", type: "LED", signal: "BUY", confidence: 91, time: "1 hour ago" },
              { coin: "AVAX", type: "LED", signal: "HOLD", confidence: 78, time: "2 hours ago" },
            ].map((signal, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/40 pb-3 sm:pb-4 last:border-0 last:pb-0 hover:bg-accent/30 -mx-2 px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-md flex-shrink-0">
                    <span className="font-bold text-primary-foreground text-sm">{signal.coin}</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">{signal.coin}/USDT</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{signal.type}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                  <div className="text-left sm:text-right">
                    <p
                      className={`font-bold text-sm sm:text-base ${
                        signal.signal === "BUY"
                          ? "text-green-500"
                          : signal.signal === "SELL"
                            ? "text-red-500"
                            : "text-yellow-500"
                      }`}
                    >
                      {signal.signal}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{signal.confidence}% confidence</p>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{signal.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Suspense fallback={<ComponentLoader />}>
        <LiveSignalsCalculator />
      </Suspense>

      {isModuleEnabled("live-prices") && (
        <Suspense fallback={<ComponentLoader />}>
          <LivePricesList />
        </Suspense>
      )}
    </div>
  )
}
