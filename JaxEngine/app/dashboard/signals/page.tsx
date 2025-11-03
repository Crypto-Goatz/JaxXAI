"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, TrendingUp, TrendingDown, Minus, Activity, Zap } from "lucide-react"

interface AggregatedSignal {
  coin: string
  pair: string
  signal: "STRONG_BUY" | "BUY" | "HOLD" | "SELL" | "STRONG_SELL"
  confidence: number
  sources: any[]
  metrics: {
    priceScore: number
    volumeScore: number
    socialScore: number
    onChainScore: number
    technicalScore: number
    derivativesScore: number
  }
  timestamp: string
}

export default function SignalsPage() {
  const [signals, setSignals] = useState<AggregatedSignal[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchSignals = async () => {
    try {
      setRefreshing(true)
      const coins = ["BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "DOGE", "MATIC"]

      const response = await fetch("/api/signals/aggregated", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coins: coins.map((coin) => ({ coin, pair: `${coin}USDT` })) }),
      })

      const data = await response.json()
      setSignals(data.signals || [])
    } catch (error) {
      console.error("Failed to fetch signals:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchSignals()
    const interval = setInterval(fetchSignals, 5 * 60 * 1000) // Refresh every 5 minutes
    return () => clearInterval(interval)
  }, [])

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "STRONG_BUY":
        return "text-green-500"
      case "BUY":
        return "text-green-400"
      case "HOLD":
        return "text-yellow-500"
      case "SELL":
        return "text-red-400"
      case "STRONG_SELL":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case "STRONG_BUY":
      case "BUY":
        return <TrendingUp className="h-5 w-5" />
      case "HOLD":
        return <Minus className="h-5 w-5" />
      case "SELL":
      case "STRONG_SELL":
        return <TrendingDown className="h-5 w-5" />
      default:
        return <Activity className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Advanced Signals
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Multi-source aggregated trading signals with AI-powered analysis
          </p>
        </div>
        <Button onClick={fetchSignals} disabled={refreshing} className="gap-2">
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh Signals
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4 border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Strong Signals</p>
              <p className="text-2xl font-bold">
                {signals.filter((s) => s.signal === "STRONG_BUY" || s.signal === "STRONG_SELL").length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Activity className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Signals</p>
              <p className="text-2xl font-bold">{signals.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Zap className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Confidence</p>
              <p className="text-2xl font-bold">
                {signals.length > 0
                  ? Math.round(signals.reduce((sum, s) => sum + s.confidence, 0) / signals.length)
                  : 0}
                %
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <Activity className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Data Sources</p>
              <p className="text-2xl font-bold">{signals[0]?.sources.length || 0}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Signals Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground mt-2">Generating signals...</p>
          </div>
        ) : (
          signals.map((signal, index) => (
            <Card
              key={index}
              className="p-6 border-border/50 bg-gradient-to-br from-card to-card/50 hover:border-primary/50 transition-all"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{signal.coin}</h3>
                    <p className="text-sm text-muted-foreground">{signal.pair}</p>
                  </div>
                  <div className={`flex items-center gap-2 ${getSignalColor(signal.signal)}`}>
                    {getSignalIcon(signal.signal)}
                    <span className="font-bold">{signal.signal.replace("_", " ")}</span>
                  </div>
                </div>

                {/* Confidence */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="font-bold">{Math.round(signal.confidence)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                      style={{ width: `${signal.confidence}%` }}
                    />
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-bold">{Math.round(signal.metrics.priceScore)}%</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                    <span className="text-muted-foreground">Volume</span>
                    <span className="font-bold">{Math.round(signal.metrics.volumeScore)}%</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                    <span className="text-muted-foreground">Social</span>
                    <span className="font-bold">{Math.round(signal.metrics.socialScore)}%</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                    <span className="text-muted-foreground">On-Chain</span>
                    <span className="font-bold">{Math.round(signal.metrics.onChainScore)}%</span>
                  </div>
                </div>

                {/* Sources */}
                <div className="flex flex-wrap gap-1">
                  {signal.sources.map((source: any, i: number) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {source.name}
                    </Badge>
                  ))}
                </div>

                {/* Timestamp */}
                <p className="text-xs text-muted-foreground">
                  Updated: {new Date(signal.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
