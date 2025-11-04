"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, TrendingUp, TrendingDown, Clock, Zap, AlertTriangle, Target } from "lucide-react"
import { useState } from "react"

interface Prediction {
  asset: string
  currentPrice: number
  horizons: Array<{
    timeframe: string
    direction: "UP" | "DOWN" | "FLAT"
    confidence: number
    targetPrice?: number
    reasoning: string
  }>
  factors: Array<{
    name: string
    impact: "positive" | "negative" | "neutral"
    score: number
    description: string
  }>
  patterns: Array<{
    name: string
    type: string
    reliability: number
  }>
  riskLevel: "low" | "medium" | "high"
  overallSentiment: "bullish" | "bearish" | "neutral"
  keyInsights: string[]
}

export function PredictionPanel() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [prediction, setPrediction] = useState<Prediction | null>(null)
  const [selectedAsset, setSelectedAsset] = useState("BTC/USDT")

  const runPrediction = async () => {
    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          asset: selectedAsset,
          marketData: {
            // In production, this would include real market data
            timestamp: new Date().toISOString(),
            includeOnChain: true,
            includeTechnical: true,
            includeSentiment: true,
          },
        }),
      })

      const data = await response.json()
      if (data.success) {
        setPrediction(data.prediction)
      }
    } catch (error) {
      console.error("[v0] Prediction error:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Brain className="w-5 h-5 text-primary" />
              AI Price Prediction
            </CardTitle>
            <CardDescription>Multi-horizon directional forecasting</CardDescription>
          </div>
          <Button
            onClick={runPrediction}
            disabled={isAnalyzing}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isAnalyzing ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-pulse" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Run Analysis
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {!prediction ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Brain className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground">Click "Run Analysis" to generate AI predictions</p>
            <p className="text-xs text-muted-foreground mt-2">
              Using GPT-4 with on-chain data, technical analysis, and sentiment
            </p>
          </div>
        ) : (
          <Tabs defaultValue="forecast" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="forecast">Forecast</TabsTrigger>
              <TabsTrigger value="factors">Factors</TabsTrigger>
              <TabsTrigger value="patterns">Patterns</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="forecast" className="space-y-4 mt-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="text-sm text-muted-foreground">Overall Sentiment</p>
                  <p className="text-lg font-semibold text-foreground capitalize">{prediction.overallSentiment}</p>
                </div>
                <Badge
                  variant={prediction.riskLevel === "low" ? "default" : "destructive"}
                  className={
                    prediction.riskLevel === "low"
                      ? "bg-success text-success-foreground"
                      : prediction.riskLevel === "medium"
                        ? "bg-warning text-warning-foreground"
                        : ""
                  }
                >
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {prediction.riskLevel.toUpperCase()} RISK
                </Badge>
              </div>

              <div className="space-y-3">
                {prediction.horizons.map((horizon, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{horizon.timeframe}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={horizon.direction === "UP" ? "default" : "secondary"}
                          className={
                            horizon.direction === "UP"
                              ? "bg-success text-success-foreground"
                              : horizon.direction === "DOWN"
                                ? "bg-destructive text-destructive-foreground"
                                : ""
                          }
                        >
                          {horizon.direction === "UP" && <TrendingUp className="w-3 h-3 mr-1" />}
                          {horizon.direction === "DOWN" && <TrendingDown className="w-3 h-3 mr-1" />}
                          {horizon.direction}
                        </Badge>
                        <span className="text-sm font-mono text-muted-foreground">
                          {(horizon.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    {horizon.targetPrice && (
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Target:</span>
                        <span className="font-mono text-foreground">${horizon.targetPrice.toLocaleString()}</span>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground leading-relaxed">{horizon.reasoning}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="factors" className="space-y-3 mt-4">
              {prediction.factors.map((factor, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-muted/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{factor.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            factor.impact === "positive"
                              ? "bg-success"
                              : factor.impact === "negative"
                                ? "bg-destructive"
                                : "bg-muted-foreground"
                          }`}
                          style={{ width: `${factor.score * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground w-8">
                        {(factor.score * 100).toFixed(0)}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{factor.description}</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="patterns" className="space-y-3 mt-4">
              {prediction.patterns.map((pattern, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-foreground">{pattern.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{pattern.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-foreground">{(pattern.reliability * 100).toFixed(0)}%</p>
                    <p className="text-xs text-muted-foreground">Reliability</p>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="insights" className="space-y-3 mt-4">
              {prediction.keyInsights.map((insight, idx) => (
                <div key={idx} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-primary">{idx + 1}</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{insight}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
