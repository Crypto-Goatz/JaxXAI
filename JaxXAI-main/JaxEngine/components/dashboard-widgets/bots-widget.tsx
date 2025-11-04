import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot } from "lucide-react"

export function BotsWidget() {
  return (
    <Card className="border-border/40 bg-gradient-to-br from-background to-primary/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Bots</CardTitle>
        <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
          <Bot className="h-4 w-4 text-blue-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">3</div>
        <p className="text-xs text-muted-foreground mt-1">2 running, 1 paused</p>
      </CardContent>
    </Card>
  )
}
