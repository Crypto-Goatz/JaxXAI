import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bot, Play, Pause, Settings } from "lucide-react"

export default function TradingPage() {
  const bots = [
    {
      name: "Scalper Pro",
      status: "running",
      strategy: "LED + Futures",
      profit: "+$2,345",
      profitPercent: "+12.3%",
      trades: 47,
      winRate: "68%",
      uptime: "24h",
    },
    {
      name: "Swing Trader",
      status: "running",
      strategy: "LED Only",
      profit: "+$1,890",
      profitPercent: "+8.7%",
      trades: 23,
      winRate: "74%",
      uptime: "48h",
    },
    {
      name: "DCA Bot",
      status: "paused",
      strategy: "Dollar Cost Average",
      profit: "+$567",
      profitPercent: "+3.2%",
      trades: 12,
      winRate: "100%",
      uptime: "0h",
    },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2 sm:text-3xl">
            <Bot className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            Trading Bots
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">Automated trading powered by Jax AI</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Bot className="h-4 w-4 mr-2" />
          Create New Bot
        </Button>
      </div>

      <div className="grid gap-3 sm:gap-4">
        {bots.map((bot, i) => (
          <Card key={i}>
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                    <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg sm:text-xl">{bot.name}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">{bot.strategy}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={bot.status === "running" ? "default" : "secondary"} className="text-xs sm:text-sm">
                    {bot.status}
                  </Badge>
                  <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                    {bot.status === "running" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Profit</p>
                  <p className="text-base sm:text-lg font-bold text-green-500">{bot.profit}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">ROI</p>
                  <p className="text-base sm:text-lg font-bold text-green-500">{bot.profitPercent}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Trades</p>
                  <p className="text-base sm:text-lg font-bold">{bot.trades}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Win Rate</p>
                  <p className="text-base sm:text-lg font-bold text-primary">{bot.winRate}</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Uptime</p>
                  <p className="text-base sm:text-lg font-bold">{bot.uptime}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
