"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Activity,
  TrendingUp,
  Volume2,
  Waves,
  Users,
  Flame,
  DollarSign,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  AlertTriangle,
  Zap,
} from "lucide-react"

interface ScoutingMetric {
  id: string
  title: string
  category: string
  value: string
  change: number
  changeLabel: string
  status: "hot" | "warm" | "cold"
  icon: any
  description: string
  details: {
    current: string
    average: string
    peak: string
    trend: string
    timeframe: string
  }
  coins: Array<{
    symbol: string
    value: string
    change: number
  }>
}

const scoutingMetrics: ScoutingMetric[] = [
  {
    id: "okx-5min-volume",
    title: "5min Volume Spike (OKX)",
    category: "Volume",
    value: "$2.4B",
    change: 342,
    changeLabel: "+342% vs avg",
    status: "hot",
    icon: Volume2,
    description: "Unusual 5-minute volume spike detected on OKX exchange indicating potential breakout",
    details: {
      current: "$2.4B",
      average: "$580M",
      peak: "$3.1B",
      trend: "Accelerating",
      timeframe: "Last 5 minutes",
    },
    coins: [
      { symbol: "BTC", value: "$1.2B", change: 425 },
      { symbol: "ETH", value: "$680M", change: 312 },
      { symbol: "SOL", value: "$520M", change: 289 },
    ],
  },
  {
    id: "binance-order-book",
    title: "Buy Wall Formation (Binance)",
    category: "Order Book",
    value: "$45M",
    change: 156,
    changeLabel: "Large buy orders",
    status: "hot",
    icon: BarChart3,
    description: "Significant buy wall detected at key support level on Binance",
    details: {
      current: "$45M",
      average: "$12M",
      peak: "$67M",
      trend: "Building",
      timeframe: "Last 15 minutes",
    },
    coins: [
      { symbol: "BTC", value: "$28M", change: 178 },
      { symbol: "ETH", value: "$12M", change: 145 },
      { symbol: "AVAX", value: "$5M", change: 134 },
    ],
  },
  {
    id: "social-sentiment",
    title: "Social Sentiment Surge",
    category: "Social",
    value: "94/100",
    change: 67,
    changeLabel: "+67 points",
    status: "hot",
    icon: Users,
    description: "Massive increase in positive social sentiment across Twitter and Reddit",
    details: {
      current: "94/100",
      average: "56/100",
      peak: "98/100",
      trend: "Surging",
      timeframe: "Last hour",
    },
    coins: [
      { symbol: "SOL", value: "96/100", change: 72 },
      { symbol: "AVAX", value: "93/100", change: 65 },
      { symbol: "MATIC", value: "91/100", change: 58 },
    ],
  },
  {
    id: "whale-movements",
    title: "Whale Accumulation",
    category: "On-Chain",
    value: "12 whales",
    change: 200,
    changeLabel: "Active buyers",
    status: "warm",
    icon: Waves,
    description: "Multiple whale wallets accumulating positions in the last 30 minutes",
    details: {
      current: "12 active",
      average: "4 active",
      peak: "18 active",
      trend: "Increasing",
      timeframe: "Last 30 minutes",
    },
    coins: [
      { symbol: "BTC", value: "8 whales", change: 233 },
      { symbol: "ETH", value: "6 whales", change: 200 },
      { symbol: "LINK", value: "4 whales", change: 150 },
    ],
  },
  {
    id: "funding-rate",
    title: "Funding Rate Anomaly",
    category: "Derivatives",
    value: "0.18%",
    change: 450,
    changeLabel: "Extreme positive",
    status: "hot",
    icon: DollarSign,
    description: "Unusually high positive funding rate indicating strong bullish sentiment",
    details: {
      current: "0.18%",
      average: "0.04%",
      peak: "0.22%",
      trend: "Rising",
      timeframe: "Current 8h period",
    },
    coins: [
      { symbol: "SOL", value: "0.24%", change: 500 },
      { symbol: "AVAX", value: "0.19%", change: 475 },
      { symbol: "MATIC", value: "0.15%", change: 375 },
    ],
  },
  {
    id: "volatility-spike",
    title: "Volatility Breakout",
    category: "Price Action",
    value: "8.2%",
    change: 164,
    changeLabel: "15min volatility",
    status: "warm",
    icon: Activity,
    description: "Sharp increase in price volatility suggesting imminent large move",
    details: {
      current: "8.2%",
      average: "3.1%",
      peak: "12.4%",
      trend: "Expanding",
      timeframe: "Last 15 minutes",
    },
    coins: [
      { symbol: "ETH", value: "9.1%", change: 193 },
      { symbol: "BTC", value: "7.8%", change: 151 },
      { symbol: "SOL", value: "7.2%", change: 132 },
    ],
  },
  {
    id: "open-interest",
    title: "Open Interest Surge",
    category: "Derivatives",
    value: "$1.8B",
    change: 89,
    changeLabel: "+89% increase",
    status: "warm",
    icon: TrendingUp,
    description: "Rapid increase in futures open interest indicating growing market participation",
    details: {
      current: "$1.8B",
      average: "$950M",
      peak: "$2.1B",
      trend: "Growing",
      timeframe: "Last hour",
    },
    coins: [
      { symbol: "BTC", value: "$890M", change: 95 },
      { symbol: "ETH", value: "$620M", change: 87 },
      { symbol: "SOL", value: "$290M", change: 82 },
    ],
  },
  {
    id: "exchange-inflow",
    title: "Exchange Outflow Spike",
    category: "On-Chain",
    value: "45K BTC",
    change: 234,
    changeLabel: "Leaving exchanges",
    status: "hot",
    icon: Flame,
    description: "Large amount of BTC moving off exchanges to cold storage - bullish signal",
    details: {
      current: "45K BTC",
      average: "13K BTC",
      peak: "67K BTC",
      trend: "Accelerating",
      timeframe: "Last 24 hours",
    },
    coins: [
      { symbol: "BTC", value: "45K", change: 234 },
      { symbol: "ETH", value: "280K", change: 198 },
      { symbol: "SOL", value: "1.2M", change: 167 },
    ],
  },
]

export default function ScoutingPage() {
  const [selectedMetric, setSelectedMetric] = useState<ScoutingMetric | null>(null)
  const [correlations, setCorrelations] = useState<any[]>([])

  useEffect(() => {
    const fetchCorrelations = async () => {
      try {
        const response = await fetch("/api/scouting/correlations")
        const data = await response.json()
        setCorrelations(data.correlations || [])
      } catch (error) {
        console.error("[v0] Error fetching correlations:", error)
      }
    }

    fetchCorrelations()
    const interval = setInterval(fetchCorrelations, 5 * 60 * 1000) // Every 5 minutes
    return () => clearInterval(interval)
  }, [])

  const categories = Array.from(new Set(scoutingMetrics.map((m) => m.category)))

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Scouting Dashboard
        </h1>
        <p className="text-muted-foreground">
          Actionable buyer insights: whale movements, volume spikes, sentiment correlation, and breakout signals
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge key={category} variant="outline" className="px-3 py-1 text-sm">
            {category}
          </Badge>
        ))}
      </div>

      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <CardTitle>Price-Sentiment Correlation Insights</CardTitle>
          </div>
          <CardDescription>Real-time analysis of how social sentiment correlates with price movements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {correlations.length > 0 ? (
              correlations.map((corr, i) => (
                <Card key={i} className="border-border/40">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="font-mono">
                        {corr.symbol}
                      </Badge>
                      <Badge variant={corr.strength === "strong" ? "default" : "secondary"}>
                        {corr.correlation > 0 ? "Positive" : "Negative"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Correlation:</span>
                      <span className="font-bold">{(corr.correlation * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sentiment:</span>
                      <span className={corr.sentiment > 0 ? "text-green-500" : "text-red-500"}>
                        {corr.sentiment > 0 ? "Bullish" : "Bearish"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Price Action:</span>
                      <span className={corr.priceChange > 0 ? "text-green-500" : "text-red-500"}>
                        {corr.priceChange > 0 ? "+" : ""}
                        {corr.priceChange.toFixed(2)}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 pt-2 border-t">{corr.insight}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                <Activity className="h-8 w-8 mx-auto mb-2 animate-pulse" />
                <p>Analyzing correlations...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-background">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <CardTitle>Buyer Action Alerts</CardTitle>
          </div>
          <CardDescription>Immediate opportunities based on whale activity and unusual market behavior</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg border border-green-500/20 bg-green-500/5">
              <Waves className="h-5 w-5 text-green-500 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-sm">BTC: 3 Whales Accumulating</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Large wallets buying $45M in last 15 minutes. Historical pattern shows +8% avg gain within 24h.
                </p>
                <Badge variant="outline" className="mt-2 text-xs">
                  Confidence: 87%
                </Badge>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg border border-blue-500/20 bg-blue-500/5">
              <Volume2 className="h-5 w-5 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-sm">SOL: Volume Spike + Positive Sentiment</p>
                <p className="text-xs text-muted-foreground mt-1">
                  5-min volume up 340% with 94/100 social score. Correlation analysis shows 78% chance of continued
                  uptrend.
                </p>
                <Badge variant="outline" className="mt-2 text-xs">
                  Confidence: 78%
                </Badge>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg border border-yellow-500/20 bg-yellow-500/5">
              <Users className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-sm">ETH: Sentiment Leading Price</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Social sentiment spiked 2 hours before price. Pattern recognition suggests price will follow within
                  4-6 hours.
                </p>
                <Badge variant="outline" className="mt-2 text-xs">
                  Confidence: 72%
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      {categories.map((category) => (
        <div key={category} className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <div className="h-1 w-8 bg-gradient-to-r from-primary to-primary/60 rounded-full" />
            {category}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {scoutingMetrics
              .filter((metric) => metric.category === category)
              .map((metric) => {
                const Icon = metric.icon
                return (
                  <Card
                    key={metric.id}
                    className={`cursor-pointer border-border/40 bg-gradient-to-br from-background to-primary/5 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1 group ${
                      metric.status === "hot"
                        ? "ring-2 ring-red-500/20"
                        : metric.status === "warm"
                          ? "ring-2 ring-orange-500/20"
                          : ""
                    }`}
                    onClick={() => setSelectedMetric(metric)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            metric.status === "hot"
                              ? "bg-red-500/10"
                              : metric.status === "warm"
                                ? "bg-orange-500/10"
                                : "bg-blue-500/10"
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 ${
                              metric.status === "hot"
                                ? "text-red-500"
                                : metric.status === "warm"
                                  ? "text-orange-500"
                                  : "text-blue-500"
                            }`}
                          />
                        </div>
                        <Badge variant={metric.status === "hot" ? "destructive" : "secondary"} className="text-xs">
                          {metric.status === "hot" ? "🔥 HOT" : metric.status === "warm" ? "⚡ WARM" : "❄️ COLD"}
                        </Badge>
                      </div>
                      <CardTitle className="text-base mt-3 group-hover:text-primary transition-colors">
                        {metric.title}
                      </CardTitle>
                      <CardDescription className="text-xs line-clamp-2">{metric.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                              {metric.value}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">{metric.changeLabel}</p>
                          </div>
                          <div
                            className={`flex items-center gap-1 text-sm font-medium ${
                              metric.change > 0 ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {metric.change > 0 ? (
                              <ArrowUpRight className="h-4 w-4" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4" />
                            )}
                            {Math.abs(metric.change)}%
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-xs group-hover:bg-primary/10 transition-colors"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </div>
      ))}

      {/* Detail Modal */}
      <Dialog open={!!selectedMetric} onOpenChange={() => setSelectedMetric(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedMetric && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`h-12 w-12 rounded-full flex items-center justify-center ${
                      selectedMetric.status === "hot"
                        ? "bg-red-500/10"
                        : selectedMetric.status === "warm"
                          ? "bg-orange-500/10"
                          : "bg-blue-500/10"
                    }`}
                  >
                    <selectedMetric.icon
                      className={`h-6 w-6 ${
                        selectedMetric.status === "hot"
                          ? "text-red-500"
                          : selectedMetric.status === "warm"
                            ? "text-orange-500"
                            : "text-blue-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-xl">{selectedMetric.title}</DialogTitle>
                    <Badge variant="outline" className="mt-1">
                      {selectedMetric.category}
                    </Badge>
                  </div>
                  <Badge variant={selectedMetric.status === "hot" ? "destructive" : "secondary"}>
                    {selectedMetric.status === "hot"
                      ? "🔥 HOT"
                      : selectedMetric.status === "warm"
                        ? "⚡ WARM"
                        : "❄️ COLD"}
                  </Badge>
                </div>
                <DialogDescription className="text-base">{selectedMetric.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-border/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">Current Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{selectedMetric.details.current}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">Average</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{selectedMetric.details.average}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">Peak (24h)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{selectedMetric.details.peak}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-muted-foreground">Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-primary">{selectedMetric.details.trend}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Top Coins */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Top Affected Coins</h3>
                  <div className="space-y-2">
                    {selectedMetric.coins.map((coin, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg border border-border/40 bg-gradient-to-r from-background to-primary/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                            <span className="font-bold text-primary-foreground text-sm">{coin.symbol}</span>
                          </div>
                          <div>
                            <p className="font-medium">{coin.symbol}/USDT</p>
                            <p className="text-sm text-muted-foreground">{coin.value}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={coin.change > 0 ? "default" : "destructive"}>
                            {coin.change > 0 ? "+" : ""}
                            {coin.change}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeframe */}
                <Card className="border-border/40 bg-gradient-to-br from-primary/5 to-background">
                  <CardHeader>
                    <CardTitle className="text-sm">Timeframe</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">{selectedMetric.details.timeframe}</p>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
