import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap } from "lucide-react"

export function SignalsWidget() {
  return (
    <Card className="border-border/40 bg-gradient-to-br from-background to-primary/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Signals</CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Zap className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">12</div>
        <p className="text-xs text-muted-foreground mt-1">8 LED, 4 Futures Crush</p>
      </CardContent>
    </Card>
  )
}
