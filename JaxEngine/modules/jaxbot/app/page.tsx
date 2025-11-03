import { DashboardHeader } from "@/components/dashboard-header"
import { MarketOverview } from "@/components/market-overview"
import { PredictionPanel } from "@/components/prediction-panel"
import { MMGAnalyzer } from "@/components/mmg-analyzer"
import { PatternRecognition } from "@/components/pattern-recognition"
import { PriceChart } from "@/components/price-chart"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <MarketOverview />
        <PriceChart />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PredictionPanel />
          <MMGAnalyzer />
        </div>
        <PatternRecognition />
      </main>
    </div>
  )
}
