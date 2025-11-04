"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Triangle, Waves, TrendingUp, TrendingDown, Target, AlertCircle, Zap } from "lucide-react"
import { useEffect, useState } from "react"

interface Pattern {
  name: string
  type: "continuation" | "reversal" | "consolidation" | "breakout" | "breakdown"
  timeframe: string
  confidence: number
  description: string
  historicalReliability: number
  targetPrice?: number
  invalidationPrice?: number
  expectedDuration: string
}

interface PatternAnalysis {
  patterns: Pattern[]
  dominantPattern: string
  marketRegime: "trending" | "ranging" | "volatile" | "consolidating"
  recommendations: string[]
}

export function PatternRecognition() {
  const [analysis, setAnalysis] = useState<PatternAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState("BTC/USDT")
  const [selectedTimeframe, setSelectedTimeframe] = useState("4h")

  const detectPatterns = async () => {
    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/pattern-detection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          asset: selectedAsset,
          timeframe: selectedTimeframe,
          chartData: {
            // In production, this would include actual chart data
            recentCandles: 100,
            includeVolume: true,
          },
        }),
      })

      const data = await response.json()
      if (data.success) {
        setAnalysis(data.analysis)
      }
    } catch (error) {
      console.error("[v0] Pattern detection error:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  useEffect(() => {
    detectPatterns()
  }, [])

  const getTypeColor = (type: string) => {
    switch (type) {
      case "breakout":
        return "bg-success text-success-foreground"
      case "breakdown":
        return "bg-destructive text-destructive-foreground"
      case "reversal":
        return "bg-warning text-warning-foreground"
      case "continuation":
        return "bg-primary text-primary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "breakout":
      case "continuation":
        return <TrendingUp className="w-3 h-3" />
      case "breakdown":
      case "reversal":
        return <TrendingDown className="w-3 h-3" />
      default:
        return <Triangle className="w-3 h-3" />
    }
  }

  const getRegimeColor = (regime: string) => {
    switch (regime) {
      case "trending":
        return "text-success"
      case "volatile":
        return "text-destructive"
      case "ranging":
        return "text-warning"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Waves className="w-5 h-5 text-primary" />
              Pattern Recognition
            </CardTitle>
            <CardDescription>AI-detected chart patterns with historical reliability</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
              className="px-3 py-1.5 text-sm rounded-md bg-background border border-border text-foreground"
            >
              <option>BTC/USDT</option>
              <option>ETH/USDT</option>
              <option>SOL/USDT</option>
              <option>BNB/USDT</option>
            </select>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-3 py-1.5 text-sm rounded-md bg-background border border-border text-foreground"
            >
              <option>15m</option>
              <option>1h</option>
              <option>4h</option>
              <option>1d</option>
            </select>
            <Button
              onClick={detectPatterns}
              disabled={isAnalyzing}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isAnalyzing ? (
                <>
                  <Zap className="w-4 h-4 mr-2 animate-pulse" />
                  Scanning...
                </>
              ) : (
                <>
                  <Waves className="w-4 h-4 mr-2" />
                  Scan
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!analysis ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Waves className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
            <p className="text-muted-foreground">Click "Scan" to detect chart patterns</p>
            <p className="text-xs text-muted-foreground mt-2">Using AI pattern recognition with historical data</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">Market Regime</p>
                <p className={`text-lg font-semibold capitalize ${getRegimeColor(analysis.marketRegime)}`}>
                  {analysis.marketRegime}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">Dominant Pattern</p>
                <p className="text-lg font-semibold text-foreground">{analysis.dominantPattern}</p>
              </div>
            </div>

            <Tabs defaultValue="patterns" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="patterns">Detected Patterns</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>

              <TabsContent value="patterns" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.patterns.map((pattern, idx) => (
                    <div key={idx} className="p-4 rounded-lg border border-border bg-muted/30 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Triangle className="w-4 h-4 text-primary" />
                          <span className="text-xs font-medium text-muted-foreground">{pattern.timeframe}</span>
                        </div>
                        <Badge className={getTypeColor(pattern.type)}>
                          {getTypeIcon(pattern.type)}
                          <span className="ml-1">{pattern.type}</span>
                        </Badge>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{pattern.name}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{pattern.description}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Confidence</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${pattern.confidence * 100}%` }} />
                            </div>
                            <span className="font-mono text-foreground w-8">
                              {(pattern.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Historical Reliability</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-success"
                                style={{ width: `${pattern.historicalReliability * 100}%` }}
                              />
                            </div>
                            <span className="font-mono text-foreground w-8">
                              {(pattern.historicalReliability * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {(pattern.targetPrice || pattern.invalidationPrice) && (
                        <div className="pt-2 border-t border-border space-y-1">
                          {pattern.targetPrice && (
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Target className="w-3 h-3" />
                                <span>Target</span>
                              </div>
                              <span className="font-mono text-success">${pattern.targetPrice.toLocaleString()}</span>
                            </div>
                          )}
                          {pattern.invalidationPrice && (
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <AlertCircle className="w-3 h-3" />
                                <span>Invalidation</span>
                              </div>
                              <span className="font-mono text-destructive">
                                ${pattern.invalidationPrice.toLocaleString()}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Expected Duration</span>
                            <span className="font-mono text-foreground">{pattern.expectedDuration}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="mt-4">
                <div className="space-y-3">
                  {analysis.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-primary">{idx + 1}</span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">{rec}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Risk Disclaimer</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Pattern recognition is a probabilistic tool based on historical data. No pattern guarantees
                        future price movement. Always use proper risk management, position sizing, and stop losses.
                        Consider multiple timeframes and confluence with other indicators before making trading
                        decisions.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
