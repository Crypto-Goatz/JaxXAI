"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TrendingUp, Target } from "lucide-react"

export default function ScoutingContent() {
  // ... existing scouting page code from app/dashboard/scouting/page.tsx ...
  const [selectedMetric, setSelectedMetric] = useState<any>(null)

  const metrics = [
    {
      id: "okx-volume",
      category: "Volume",
      title: "OKX 5min Volume Spike",
      value: "Hot",
      description: "Unusual 5-minute volume activity on OKX exchange",
      icon: TrendingUp,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      details: {
        current: "2.4M USDT",
        average: "450K USDT",
        peak: "3.1M USDT",
        trend: "+433%",
        topCoins: [
          { symbol: "BTC", volume: "850K", change: "+520%" },
          { symbol: "ETH", volume: "620K", change: "+380%" },
          { symbol: "SOL", volume: "480K", change: "+290%" },
        ],
      },
    },
    // ... rest of metrics ...
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Target className="h-8 w-8 text-primary" />
          Scouting
        </h1>
        <p className="text-muted-foreground">Real-time breakout prediction metrics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card
              key={metric.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/40"
              onClick={() => setSelectedMetric(metric)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`h-10 w-10 rounded-full ${metric.bgColor} flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      metric.value === "Hot"
                        ? "bg-red-500/10 text-red-500 border-red-500/20"
                        : metric.value === "Warm"
                          ? "bg-orange-500/10 text-orange-500 border-orange-500/20"
                          : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                    }
                  >
                    {metric.value}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-base mb-1">{metric.title}</CardTitle>
                <CardDescription className="text-xs">{metric.description}</CardDescription>
                <p className="text-xs text-muted-foreground mt-2">Category: {metric.category}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={!!selectedMetric} onOpenChange={() => setSelectedMetric(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedMetric && <selectedMetric.icon className={`h-5 w-5 ${selectedMetric.color}`} />}
              {selectedMetric?.title}
            </DialogTitle>
            <DialogDescription>{selectedMetric?.description}</DialogDescription>
          </DialogHeader>
          {selectedMetric?.details && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current Value</p>
                  <p className="text-2xl font-bold">{selectedMetric.details.current}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Trend</p>
                  <p className="text-2xl font-bold text-green-500">{selectedMetric.details.trend}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average</p>
                  <p className="text-lg font-semibold">{selectedMetric.details.average}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Peak (24h)</p>
                  <p className="text-lg font-semibold">{selectedMetric.details.peak}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Top Affected Coins</h4>
                <div className="space-y-2">
                  {selectedMetric.details.topCoins.map((coin: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <span className="font-medium">{coin.symbol}</span>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{coin.volume}</p>
                        <p className="text-xs text-green-500">{coin.change}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
