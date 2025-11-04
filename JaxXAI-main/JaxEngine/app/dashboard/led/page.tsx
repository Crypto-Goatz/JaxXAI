import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, TrendingUp } from "lucide-react"

export default function LEDPage() {
  const ledSignals = [
    {
      coin: "BTC",
      pair: "BTC/USDT",
      signal: "STRONG BUY",
      confidence: 94,
      price: "$67,234.50",
      change: "+3.2%",
      volume: "$2.4B",
      liquidity: "High",
      timestamp: "2 min ago",
    },
    {
      coin: "ETH",
      pair: "ETH/USDT",
      signal: "BUY",
      confidence: 87,
      price: "$3,456.78",
      change: "+2.1%",
      volume: "$1.2B",
      liquidity: "High",
      timestamp: "5 min ago",
    },
    {
      coin: "SOL",
      pair: "SOL/USDT",
      signal: "BUY",
      confidence: 91,
      price: "$142.34",
      change: "+5.7%",
      volume: "$456M",
      liquidity: "Medium",
      timestamp: "12 min ago",
    },
    {
      coin: "AVAX",
      pair: "AVAX/USDT",
      signal: "HOLD",
      confidence: 78,
      price: "$38.92",
      change: "+1.2%",
      volume: "$234M",
      liquidity: "Medium",
      timestamp: "18 min ago",
    },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2 sm:text-3xl">
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
          </div>
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            LED Signals
          </span>
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Liquidity Event Detection - Real-time on-chain liquidity analysis
        </p>
      </div>

      <div className="grid gap-3 sm:gap-4">
        {ledSignals.map((signal, i) => (
          <Card
            key={i}
            className="border-border/40 bg-gradient-to-br from-background to-primary/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
          >
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-md flex-shrink-0">
                    <span className="font-bold text-primary-foreground text-base sm:text-lg">{signal.coin}</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg sm:text-xl">{signal.pair}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">{signal.timestamp}</CardDescription>
                  </div>
                </div>
                <Badge
                  variant={signal.signal.includes("BUY") ? "default" : "secondary"}
                  className="text-xs sm:text-sm px-2 py-1 sm:px-3 w-fit shadow-sm"
                >
                  {signal.signal}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Price</p>
                  <p className="text-base sm:text-lg font-bold">{signal.price}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">24h Change</p>
                  <p className="text-base sm:text-lg font-bold text-green-500 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                    {signal.change}
                  </p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Volume</p>
                  <p className="text-base sm:text-lg font-bold">{signal.volume}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Liquidity</p>
                  <Badge variant="outline" className="text-xs sm:text-sm w-fit">
                    {signal.liquidity}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Confidence</p>
                  <p className="text-base sm:text-lg font-bold text-primary">{signal.confidence}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
