"use client"

import { memo, useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Sparkles, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CoinData {
  symbol: string
  name: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  isNew?: boolean
}

const MarketPricingPanel = memo(function MarketPricingPanel() {
  const [topGainers, setTopGainers] = useState<CoinData[]>([])
  const [topLosers, setTopLosers] = useState<CoinData[]>([])
  const [newCoins, setNewCoins] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with actual Coinbase API calls
    const mockGainers: CoinData[] = [
      {
        symbol: "BTC",
        name: "Bitcoin",
        price: 45230.5,
        change24h: 8.5,
        volume24h: 28500000000,
        marketCap: 885000000000,
      },
      {
        symbol: "ETH",
        name: "Ethereum",
        price: 2340.2,
        change24h: 6.2,
        volume24h: 15200000000,
        marketCap: 281000000000,
      },
      { symbol: "SOL", name: "Solana", price: 98.45, change24h: 12.3, volume24h: 2100000000, marketCap: 42000000000 },
    ]

    const mockLosers: CoinData[] = [
      { symbol: "DOGE", name: "Dogecoin", price: 0.082, change24h: -5.2, volume24h: 580000000, marketCap: 11700000000 },
      { symbol: "ADA", name: "Cardano", price: 0.48, change24h: -3.8, volume24h: 420000000, marketCap: 16800000000 },
    ]

    const mockNew: CoinData[] = [
      {
        symbol: "NEW1",
        name: "New Token 1",
        price: 1.25,
        change24h: 0,
        volume24h: 5000000,
        marketCap: 125000000,
        isNew: true,
      },
      {
        symbol: "NEW2",
        name: "New Token 2",
        price: 0.5,
        change24h: 0,
        volume24h: 2000000,
        marketCap: 50000000,
        isNew: true,
      },
    ]

    setTimeout(() => {
      setTopGainers(mockGainers)
      setTopLosers(mockLosers)
      setNewCoins(mockNew)
      setLoading(false)
    }, 500)
  }, [])

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(6)}`
    if (price < 1) return `$${price.toFixed(4)}`
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `$${(volume / 1e9).toFixed(2)}B`
    if (volume >= 1e6) return `$${(volume / 1e6).toFixed(2)}M`
    return `$${(volume / 1e3).toFixed(2)}K`
  }

  const CoinCard = ({ coin }: { coin: CoinData }) => (
    <div className="p-3 border rounded-lg hover:border-primary/50 transition-colors group">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <code className="text-sm font-mono font-semibold">{coin.symbol}</code>
            {coin.isNew && (
              <Badge variant="default" className="text-xs">
                <Sparkles className="size-2 mr-1" />
                New
              </Badge>
            )}
          </div>
          <div className="text-xs text-muted-foreground">{coin.name}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold">{formatPrice(coin.price)}</div>
          <div className={`text-xs flex items-center gap-1 ${coin.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
            {coin.change24h >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
            {Math.abs(coin.change24h).toFixed(2)}%
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
        <div>
          <div className="text-xs">Vol: {formatVolume(coin.volume24h)}</div>
        </div>
        <div>
          <div className="text-xs">MCap: {formatVolume(coin.marketCap)}</div>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-sm text-muted-foreground">Loading market data...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/coinbase-logo.png" alt="Coinbase" className="size-5" />
          <span className="text-sm font-medium">Coinbase Markets</span>
        </div>
        <a
          href="https://www.coinbase.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
        >
          View on Coinbase
          <ExternalLink className="size-3" />
        </a>
      </div>

      <Tabs defaultValue="gainers" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 text-xs">
          <TabsTrigger value="gainers" className="text-xs">
            <TrendingUp className="size-3 mr-1 text-green-500" />
            Gainers ({topGainers.length})
          </TabsTrigger>
          <TabsTrigger value="losers" className="text-xs">
            <TrendingDown className="size-3 mr-1 text-red-500" />
            Losers ({topLosers.length})
          </TabsTrigger>
          <TabsTrigger value="new" className="text-xs">
            <Sparkles className="size-3 mr-1" />
            New ({newCoins.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gainers" className="space-y-3">
          {topGainers.map((coin) => (
            <CoinCard key={coin.symbol} coin={coin} />
          ))}
        </TabsContent>

        <TabsContent value="losers" className="space-y-3">
          {topLosers.map((coin) => (
            <CoinCard key={coin.symbol} coin={coin} />
          ))}
        </TabsContent>

        <TabsContent value="new" className="space-y-3">
          {newCoins.length > 0 ? (
            newCoins.map((coin) => <CoinCard key={coin.symbol} coin={coin} />)
          ) : (
            <div className="text-center py-8">
              <Sparkles className="size-10 mx-auto text-muted-foreground/50 mb-2" />
              <div className="text-sm text-muted-foreground">No new coins today</div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
})

export default MarketPricingPanel
