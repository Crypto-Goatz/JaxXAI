"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, RefreshCw } from "lucide-react"
import { perfMonitor } from "@/lib/performance-utils"
import { cacheManager } from "@/lib/cache-manager"

export function PerformanceMonitorWidget() {
  const [stats, setStats] = useState<any>({})
  const [cacheStats, setCacheStats] = useState<any>({})
  const [visible, setVisible] = useState(false)

  const refresh = () => {
    setStats(perfMonitor.getAllStats())
    setCacheStats(cacheManager.getStats())
  }

  useEffect(() => {
    if (visible) {
      refresh()
      const interval = setInterval(refresh, 2000)
      return () => clearInterval(interval)
    }
  }, [visible])

  if (!visible) {
    return (
      <Button size="sm" variant="outline" onClick={() => setVisible(true)} className="fixed bottom-4 right-4 z-50">
        <Activity className="h-4 w-4 mr-2" />
        Performance
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-96 max-h-96 overflow-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Performance Monitor
        </h3>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={refresh}>
            <RefreshCw className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setVisible(false)}>
            ×
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-medium">Cache Stats</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-muted-foreground">Entries:</span> {cacheStats.size || 0}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-medium">API Performance</div>
        <div className="space-y-1 text-xs">
          {Object.entries(stats).map(([label, data]: [string, any]) => (
            <div key={label} className="flex items-center justify-between p-2 rounded bg-muted/50">
              <span className="font-mono truncate">{label}</span>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  {data?.avg?.toFixed(0)}ms
                </Badge>
                <Badge variant="outline" className="text-xs">
                  p95: {data?.p95?.toFixed(0)}ms
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
