"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { calculateTradingSignal, type TradingSignal } from "@/lib/signal-calculator"

export function LiveSignalsCalculator() {
  const [signals, setSignals] = useState<TradingSignal[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const calculateSignals = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/prices/simple")
      if (response.ok) {
        const data = await response.json()

        // Calculate signals client-side
        const calculatedSignals = data
          .map((coin: any) => {
            // Use sparkline data for technical analysis
            const prices = coin.sparkline || []
            // Generate volume data (simplified - in production, fetch real volume data)
            const volumes = prices.map((_: number, i: number) => coin.volume * (0.8 + Math.random() * 0.4))

            return calculateTradingSignal({
              symbol: coin.symbol,
              prices,
              volumes,
              currentPrice: coin.price,
              priceChange24h: coin.change24h,
              marketCap: coin.marketCap,
              volume24h: coin.volume,
            })
          })
          .filter((s: TradingSignal) => s.signal !== "HOLD")
          .slice(0, 10) // Top 10 signals

        setSignals(calculatedSignals)
        setLastUpdate(new Date())
      }
    } catch (error) {
      console.error("[v0] Error calculating signals:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    calculateSignals()
    const interval = setInterval(calculateSignals, 120000) // Every 2 minutes
    return () => clearInterval(interval)
  }, [])

  const getSignalColor = (signal: TradingSignal["signal"]) => {
    switch (signal) {
      case "STRONG_BUY":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "BUY":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      case "SELL":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      case "STRONG_SELL":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="text-lg sm:text-xl">Live Trading Signals</CardTitle>
            <CardDescription className="text-sm">Calculated in real-time using technical indicators</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Updated: {lastUpdate.toLocaleTimeString()}</span>
            <Button variant="outline" size="sm" onClick={calculateSignals} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading && signals.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-3">
            {signals.map((signal, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 border-b pb-3 last:border-0 last:pb-0 hover:bg-muted/50 rounded-lg p-2 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                      <span className="font-bold text-primary text-xs">{signal.symbol}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{signal.symbol}/USDT</p>
                      <p className="text-xs text-muted-foreground">{signal.confidence}% confidence</p>
                    </div>
                  </div>
                  <Badge className={getSignalColor(signal.signal)}>{signal.signal.replace("_", " ")}</Badge>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {signal.reasoning.map((reason, j) => (
                    <span key={j} className="text-muted-foreground">
                      • {reason}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
