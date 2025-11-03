"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CryptoPrice {
  id?: string
  symbol: string
  name?: string
  price: number | null
  change24h: number | null
  marketCap: number | null
  volume: number | null
  volume24h: number | null
  volume5min: number | null
  high24h: number | null
  low24h: number | null
  trades24h: number | null
}

export function LivePricesList() {
  const [prices, setPrices] = useState<CryptoPrice[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [nextUpdate, setNextUpdate] = useState<number>(0)

  const fetchPrices = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/prices/live?limit=10")
      const result = await response.json()

      setPrices(Array.isArray(result.data) ? result.data : [])
      setLastUpdate(new Date())
      setNextUpdate(result.nextUpdate ?? Date.now() + 2 * 60 * 1000)
    } catch (error) {
      console.error("[v0] Error fetching live prices:", error)
      setPrices([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrices()
    const interval = setInterval(fetchPrices, 3 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number | null) => {
    if (price === null || price === undefined) return "N/A"
    if (price < 1) return `$${price.toFixed(6)}`
    if (price < 100) return `$${price.toFixed(4)}`
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatMarketCap = (cap: number | null) => {
    if (cap === null || cap === undefined) return "N/A"
    if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`
    if (cap >= 1e9) return `$${(cap / 1e9).toFixed(2)}B`
    if (cap >= 1e6) return `$${(cap / 1e6).toFixed(2)}M`
    return `$${cap.toLocaleString()}`
  }

  const formatVolume = (vol?: number | null) => {
    if (vol === null || vol === undefined || Number.isNaN(vol)) return "N/A"
    if (vol >= 1e9) return `$${(vol / 1e9).toFixed(2)}B`
    if (vol >= 1e6) return `$${(vol / 1e6).toFixed(2)}M`
    if (vol >= 1e3) return `$${(vol / 1e3).toFixed(2)}K`
    return `$${vol.toFixed(2)}`
  }

  const formatPercentage = (percentage: number | null) => {
    if (percentage === null || percentage === undefined || Number.isNaN(percentage)) return "N/A"
    return `${percentage >= 0 ? "+" : ""}${percentage.toFixed(2)}%`
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="text-lg sm:text-xl">Live Crypto Prices</CardTitle>
            <CardDescription className="text-sm">Top 10 cryptocurrencies (Binance Live)</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Updated: {lastUpdate.toLocaleTimeString()}</span>
            <Button variant="outline" size="sm" onClick={fetchPrices} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading && prices.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : prices.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
            Live price data is temporarily unavailable.
          </div>
        ) : (
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {prices.map((coin) => (
              <div
                key={coin.id ?? coin.symbol}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-3 last:border-0 last:pb-0 hover:bg-muted/50 rounded-lg p-2 transition-colors"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                    <span className="font-bold text-primary text-xs uppercase">{coin.symbol}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm sm:text-base truncate">{coin.name ?? coin.symbol}</p>
                    <p className="text-xs text-muted-foreground">5min Vol: {formatVolume(coin.volume5min)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                  <div className="text-left sm:text-right">
                    <p className="font-bold text-sm sm:text-base">{formatPrice(coin.price)}</p>
                    <p className="text-xs text-muted-foreground">24h Vol: {formatVolume(coin.volume24h)}</p>
                  </div>
                  <div
                    className={`flex items-center gap-1 font-medium text-sm ${
                      coin.change24h === null
                        ? "text-muted-foreground"
                        : coin.change24h >= 0
                          ? "text-green-500"
                          : "text-red-500"
                    }`}
                  >
                    {coin.change24h !== null && !Number.isNaN(coin.change24h) && (
                      <>
                        {coin.change24h >= 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                      </>
                    )}
                    <span className="whitespace-nowrap">{formatPercentage(coin.change24h)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
