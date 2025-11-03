import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, AlertTriangle } from "lucide-react"

export default function FuturesCrushPage() {
  const futuresSignals = [
    {
      coin: "ETH",
      pair: "ETH/USDT",
      signal: "SHORT",
      confidence: 89,
      price: "$3,456.78",
      fundingRate: "-0.05%",
      openInterest: "$8.2B",
      liquidations: "$124M",
      risk: "High",
      timestamp: "5 min ago",
    },
    {
      coin: "BTC",
      pair: "BTC/USDT",
      signal: "LONG",
      confidence: 82,
      price: "$67,234.50",
      fundingRate: "+0.02%",
      openInterest: "$15.4B",
      liquidations: "$89M",
      risk: "Medium",
      timestamp: "12 min ago",
    },
    {
      coin: "SOL",
      pair: "SOL/USDT",
      signal: "SHORT",
      confidence: 76,
      price: "$142.34",
      fundingRate: "-0.08%",
      openInterest: "$2.1B",
      liquidations: "$45M",
      risk: "High",
      timestamp: "20 min ago",
    },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2 sm:text-3xl">
          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Futures Crush Analysis
          </span>
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Advanced futures market analysis with liquidation predictions
        </p>
      </div>

      <div className="grid gap-3 sm:gap-4">
        {futuresSignals.map((signal, i) => (
          <Card
            key={i}
            className="border-border/40 bg-gradient-to-br from-background to-primary/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="font-bold text-primary text-lg">{signal.coin}</span>
                  </div>
                  <div>
                    <CardTitle className="text-xl">{signal.pair}</CardTitle>
                    <CardDescription>{signal.timestamp}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={signal.signal === "LONG" ? "default" : "destructive"} className="text-sm px-3 py-1">
                    {signal.signal}
                  </Badge>
                  {signal.risk === "High" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-lg font-bold">{signal.price}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Funding Rate</p>
                  <p
                    className={`text-lg font-bold ${
                      signal.fundingRate.startsWith("+") ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {signal.fundingRate}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Open Interest</p>
                  <p className="text-lg font-bold">{signal.openInterest}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Liquidations</p>
                  <p className="text-lg font-bold text-red-500">{signal.liquidations}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Risk Level</p>
                  <Badge variant={signal.risk === "High" ? "destructive" : "secondary"}>{signal.risk}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Confidence</p>
                  <p className="text-lg font-bold text-primary">{signal.confidence}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
