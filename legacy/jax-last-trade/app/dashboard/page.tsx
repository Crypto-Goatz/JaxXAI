import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Activity, DollarSign, Zap, Bot } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground sm:text-base">Real-time insights from 6 years of on-chain data</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+20.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Signals</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">8 LED, 4 Futures Crush</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bots</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 running, 1 paused</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">24h Performance</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+$5,234</span> profit
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Signals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Recent Signals</CardTitle>
          <CardDescription className="text-sm">Latest trading signals from Jax AI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {[
              { coin: "BTC", type: "LED", signal: "BUY", confidence: 94, time: "2 min ago" },
              { coin: "ETH", type: "Futures Crush", signal: "SELL", confidence: 87, time: "15 min ago" },
              { coin: "SOL", type: "LED", signal: "BUY", confidence: 91, time: "1 hour ago" },
              { coin: "AVAX", type: "LED", signal: "HOLD", confidence: 78, time: "2 hours ago" },
            ].map((signal, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b pb-3 sm:pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                    <span className="font-bold text-primary text-sm">{signal.coin}</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">{signal.coin}/USDT</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{signal.type}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                  <div className="text-left sm:text-right">
                    <p
                      className={`font-bold text-sm sm:text-base ${
                        signal.signal === "BUY"
                          ? "text-green-500"
                          : signal.signal === "SELL"
                            ? "text-red-500"
                            : "text-yellow-500"
                      }`}
                    >
                      {signal.signal}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{signal.confidence}% confidence</p>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{signal.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
