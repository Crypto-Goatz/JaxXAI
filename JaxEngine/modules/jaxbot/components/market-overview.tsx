"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface MarketData {
  assets: Array<{
    symbol: string
    price: number
    change24h: number
    volume24h: string
    marketCap: string
    sentiment: "bullish" | "bearish" | "neutral"
    technicalSignal: string
    keyLevels: {
      support: number[]
      resistance: number[]
    }
  }>
  marketOverview: {
    totalMarketCap: string
    totalVolume24h: string
    btcDominance: number
    fearGreedIndex: number
    trendingAssets: string[]
  }
  onChainMetrics: {
    exchangeFlows: {
      inflow: string
      outflow: string
      netFlow: string
      signal: "bullish" | "bearish" | "neutral"
    }
    whaleActivity: {
      largeTransactions: number
      trend: string
    }
    networkActivity: {
      activeAddresses: number
      transactionCount: number
      trend: string
    }
  }
  insights: string[]
}

export function MarketOverview() {
  const [marketData, setMarketData] = useState<MarketData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMarketData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/market-data?assets=BTC,ETH,SOL,BNB")
      const result = await response.json()
      console.log("[v0] Market data response:", result)
      if (result.success) {
        setMarketData(result.data)
      } else {
        setError(result.error || "Failed to fetch market data")
      }
    } catch (error) {
      console.error("[v0] Market data fetch error:", error)
      setError("Network error: Unable to fetch market data")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMarketData()
  }, [])

  const getSignalColor = (signal: string) => {
    if (signal.includes("buy")) return "text-success"
    if (signal.includes("sell")) return "text-destructive"
    return "text-muted-foreground"
  }

  const getSignalBadge = (signal: string) => {
    if (signal.includes("buy")) return "bg-success text-success-foreground"
    if (signal.includes("sell")) return "bg-destructive text-destructive-foreground"
    return "bg-muted text-muted-foreground"
  }

  if (error) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-3">
            <Activity className="w-12 h-12 text-destructive mx-auto" />
            <p className="text-destructive font-medium">{error}</p>
            <Button onClick={fetchMarketData} variant="outline" size="sm">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!marketData || !marketData.marketOverview || !marketData.assets) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-3 animate-pulse" />
            <p className="text-muted-foreground">Loading market data...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Market Cap</span>
            </div>
            <p className="text-lg font-bold text-foreground">{marketData.marketOverview?.totalMarketCap || "N/A"}</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">24h Volume</span>
            </div>
            <p className="text-lg font-bold text-foreground">{marketData.marketOverview?.totalVolume24h || "N/A"}</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">BTC Dominance</span>
            </div>
            <p className="text-lg font-bold text-foreground">
              {marketData.marketOverview?.btcDominance?.toFixed(1) || "0.0"}%
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Fear & Greed</span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-foreground">{marketData.marketOverview?.fearGreedIndex || 50}</p>
              <Badge
                className={
                  (marketData.marketOverview?.fearGreedIndex || 50) > 60
                    ? "bg-success text-success-foreground"
                    : (marketData.marketOverview?.fearGreedIndex || 50) < 40
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-muted text-muted-foreground"
                }
              >
                {(marketData.marketOverview?.fearGreedIndex || 50) > 60
                  ? "Greed"
                  : (marketData.marketOverview?.fearGreedIndex || 50) < 40
                    ? "Fear"
                    : "Neutral"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketData.assets?.map((asset) => (
          <Card key={asset.symbol} className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">{asset.symbol}</CardTitle>
                <Badge
                  variant={asset.change24h >= 0 ? "default" : "destructive"}
                  className={asset.change24h >= 0 ? "bg-success text-success-foreground" : ""}
                >
                  {asset.change24h >= 0 ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {Math.abs(asset.change24h).toFixed(2)}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">${asset.price.toLocaleString()}</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Volume</span>
                  <span className="font-mono text-foreground">{asset.volume24h}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Market Cap</span>
                  <span className="font-mono text-foreground">{asset.marketCap}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">Signal</span>
                <Badge className={getSignalBadge(asset.technicalSignal)} variant="outline">
                  {asset.technicalSignal.replace("_", " ").toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Support</span>
                  <span className="font-mono text-success">${asset.keyLevels.support[0]?.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Resistance</span>
                  <span className="font-mono text-destructive">${asset.keyLevels.resistance[0]?.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {marketData.onChainMetrics && (
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">On-Chain Metrics</CardTitle>
              <Button onClick={fetchMarketData} disabled={isLoading} variant="outline" size="sm">
                {isLoading ? "Refreshing..." : "Refresh"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted/30 space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Exchange Flows</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Inflow</span>
                    <span className="font-mono text-foreground">
                      {marketData.onChainMetrics.exchangeFlows?.inflow || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Outflow</span>
                    <span className="font-mono text-foreground">
                      {marketData.onChainMetrics.exchangeFlows?.outflow || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-border">
                    <span className="text-muted-foreground">Net Flow</span>
                    <span
                      className={`font-mono font-semibold ${
                        marketData.onChainMetrics.exchangeFlows?.signal === "bullish"
                          ? "text-success"
                          : marketData.onChainMetrics.exchangeFlows?.signal === "bearish"
                            ? "text-destructive"
                            : "text-muted-foreground"
                      }`}
                    >
                      {marketData.onChainMetrics.exchangeFlows?.netFlow || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/30 space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Whale Activity</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Large Txs (24h)</span>
                    <span className="font-mono text-foreground">
                      {marketData.onChainMetrics.whaleActivity?.largeTransactions || 0}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-border">
                    <span className="text-muted-foreground">Trend</span>
                    <Badge
                      className={
                        marketData.onChainMetrics.whaleActivity?.trend === "accumulating"
                          ? "bg-success text-success-foreground"
                          : marketData.onChainMetrics.whaleActivity?.trend === "distributing"
                            ? "bg-destructive text-destructive-foreground"
                            : "bg-muted text-muted-foreground"
                      }
                    >
                      {(marketData.onChainMetrics.whaleActivity?.trend || "neutral").toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/30 space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Network Activity</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Addresses</span>
                    <span className="font-mono text-foreground">
                      {(marketData.onChainMetrics.networkActivity?.activeAddresses || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transactions</span>
                    <span className="font-mono text-foreground">
                      {(marketData.onChainMetrics.networkActivity?.transactionCount || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-border">
                    <span className="text-muted-foreground">Trend</span>
                    <Badge
                      className={
                        marketData.onChainMetrics.networkActivity?.trend === "increasing"
                          ? "bg-success text-success-foreground"
                          : marketData.onChainMetrics.networkActivity?.trend === "decreasing"
                            ? "bg-destructive text-destructive-foreground"
                            : "bg-muted text-muted-foreground"
                      }
                    >
                      {(marketData.onChainMetrics.networkActivity?.trend || "stable").toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {marketData.insights && marketData.insights.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Market Insights</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {marketData.insights.map((insight, idx) => (
                    <div key={idx} className="flex gap-2 p-2 rounded bg-muted/50 text-sm">
                      <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-primary">{idx + 1}</span>
                      </div>
                      <p className="text-foreground leading-relaxed">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
