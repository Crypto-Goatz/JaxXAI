import { Activity, TrendingUp, Brain, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthButton } from "@/components/auth-button"

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Jaxbot Strategy Control</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Market Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Markets
            </Button>
            <Button variant="ghost" size="sm">
              <Brain className="w-4 h-4 mr-2" />
              AI Models
            </Button>
            <Button variant="ghost" size="sm">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </Button>
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  )
}
