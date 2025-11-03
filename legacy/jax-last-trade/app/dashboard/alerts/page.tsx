import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Check, X } from "lucide-react"

export default function AlertsPage() {
  const alerts = [
    {
      type: "LED Signal",
      message: "Strong BUY signal detected for BTC/USDT",
      coin: "BTC",
      confidence: 94,
      time: "2 min ago",
      read: false,
    },
    {
      type: "Futures Crush",
      message: "High liquidation risk detected for ETH/USDT",
      coin: "ETH",
      confidence: 87,
      time: "15 min ago",
      read: false,
    },
    {
      type: "Bot Alert",
      message: "Scalper Pro executed profitable trade",
      coin: "SOL",
      confidence: 91,
      time: "1 hour ago",
      read: true,
    },
    {
      type: "Price Alert",
      message: "BTC reached target price of $67,000",
      coin: "BTC",
      confidence: 100,
      time: "2 hours ago",
      read: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Bell className="h-8 w-8 text-primary" />
            Alerts
          </h1>
          <p className="text-muted-foreground">Real-time notifications from Jax AI</p>
        </div>
        <Button variant="outline">
          <Check className="h-4 w-4 mr-2" />
          Mark All as Read
        </Button>
      </div>

      <div className="grid gap-4">
        {alerts.map((alert, i) => (
          <Card key={i} className={alert.read ? "opacity-60" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="font-bold text-primary text-lg">{alert.coin}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{alert.type}</CardTitle>
                      {!alert.read && <Badge variant="default" className="h-2 w-2 p-0 rounded-full" />}
                    </div>
                    <CardDescription>{alert.time}</CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">{alert.message}</p>
              <div className="flex items-center gap-4">
                <Badge variant="outline">Confidence: {alert.confidence}%</Badge>
                {!alert.read && (
                  <Button variant="link" size="sm" className="h-auto p-0">
                    Mark as read
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
