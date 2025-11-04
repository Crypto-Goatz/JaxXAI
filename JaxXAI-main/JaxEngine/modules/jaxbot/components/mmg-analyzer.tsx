"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Search, AlertTriangle, Users, Activity, TrendingUp, TrendingDown } from "lucide-react"
import { useState } from "react"

interface WalletAnalysis {
  wallet: string
  classification: string
  riskScore: number
  behaviorProfile: {
    tradingStyle: string
    averageHoldTime: string
    preferredAssets: string[]
    activityPattern: string
  }
  suspiciousActivities: Array<{
    type: string
    severity: "low" | "medium" | "high" | "critical"
    description: string
    timestamp?: string
  }>
  connections: {
    linkedWallets: number
    mmgCluster?: string
    knownEntities: string[]
  }
  metrics: {
    totalTransactions: number
    totalVolume: string
    uniqueInteractions: number
    profitLoss: string
    winRate: number
  }
  recentActivity: Array<{
    action: string
    asset: string
    amount: string
    impact: "bullish" | "bearish" | "neutral"
    timestamp: string
  }>
  insights: string[]
  recommendations: string[]
}

export function MMGAnalyzer() {
  const [walletAddress, setWalletAddress] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<WalletAnalysis | null>(null)

  const analyzeWallet = async () => {
    if (!walletAddress) return

    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/analyze-wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress,
          includeHistory: true,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setAnalysis(data.analysis)
      }
    } catch (error) {
      console.error("[v0] Wallet analysis error:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getRiskColor = (score: number) => {
    if (score >= 70) return "text-destructive"
    if (score >= 40) return "text-warning"
    return "text-success"
  }

  const getRiskBg = (score: number) => {
    if (score >= 70) return "bg-destructive"
    if (score >= 40) return "bg-warning"
    return "bg-success"
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-destructive text-destructive-foreground"
      case "high":
        return "bg-destructive/80 text-destructive-foreground"
      case "medium":
        return "bg-warning text-warning-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Shield className="w-5 h-5 text-primary" />
          MMG Wallet Analyzer
        </CardTitle>
        <CardDescription>Identify whale behavior and market manipulation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter wallet address (0x...)"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="font-mono text-sm bg-background border-border text-foreground"
            />
            <Button
              onClick={analyzeWallet}
              disabled={isAnalyzing || !walletAddress}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isAnalyzing ? (
                <>Analyzing...</>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Analyze
                </>
              )}
            </Button>
          </div>

          {analysis ? (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="risks">Risks</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Classification</p>
                    <p className="font-semibold text-foreground capitalize">{analysis.classification}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Risk Score</p>
                    <p className={`font-semibold text-lg ${getRiskColor(analysis.riskScore)}`}>
                      {analysis.riskScore.toFixed(0)}/100
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/30 space-y-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">Behavior Profile</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Trading Style</p>
                      <p className="text-foreground font-medium">{analysis.behaviorProfile.tradingStyle}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Hold Time</p>
                      <p className="text-foreground font-medium">{analysis.behaviorProfile.averageHoldTime}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground mb-1">Preferred Assets</p>
                      <div className="flex flex-wrap gap-1">
                        {analysis.behaviorProfile.preferredAssets.map((asset, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {asset}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Performance Metrics</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between p-2 rounded bg-muted/30">
                      <span className="text-muted-foreground">Transactions</span>
                      <span className="font-mono text-foreground">{analysis.metrics.totalTransactions}</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-muted/30">
                      <span className="text-muted-foreground">Volume</span>
                      <span className="font-mono text-foreground">{analysis.metrics.totalVolume}</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-muted/30">
                      <span className="text-muted-foreground">Win Rate</span>
                      <span className="font-mono text-foreground">{(analysis.metrics.winRate * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-muted/30">
                      <span className="text-muted-foreground">P&L</span>
                      <span className="font-mono text-foreground">{analysis.metrics.profitLoss}</span>
                    </div>
                  </div>
                </div>

                {analysis.connections.mmgCluster && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-destructive" />
                      <span className="font-medium text-destructive">MMG Cluster Detected</span>
                    </div>
                    <p className="text-sm text-foreground">{analysis.connections.mmgCluster}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Linked to {analysis.connections.linkedWallets} other wallets
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="activity" className="space-y-3 mt-4">
                {analysis.recentActivity.map((activity, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-muted/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {activity.impact === "bullish" ? (
                          <TrendingUp className="w-4 h-4 text-success" />
                        ) : activity.impact === "bearish" ? (
                          <TrendingDown className="w-4 h-4 text-destructive" />
                        ) : (
                          <Activity className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className="font-medium text-foreground">{activity.action}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {activity.asset}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Amount: {activity.amount}</span>
                      <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="risks" className="space-y-3 mt-4">
                {analysis.suspiciousActivities.length > 0 ? (
                  analysis.suspiciousActivities.map((activity, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-muted/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-destructive" />
                          <span className="font-medium text-foreground">{activity.type}</span>
                        </div>
                        <Badge className={getSeverityColor(activity.severity)}>{activity.severity}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{activity.description}</p>
                      {activity.timestamp && <p className="text-xs text-muted-foreground">{activity.timestamp}</p>}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Shield className="w-12 h-12 text-success mb-3 opacity-50" />
                    <p className="text-sm text-muted-foreground">No suspicious activities detected</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="insights" className="space-y-4 mt-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Key Insights</h4>
                  <div className="space-y-2">
                    {analysis.insights.map((insight, idx) => (
                      <div key={idx} className="flex gap-2 p-3 rounded-lg bg-muted/50">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-primary">{idx + 1}</span>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Recommendations</h4>
                  <div className="space-y-2">
                    {analysis.recommendations.map((rec, idx) => (
                      <div key={idx} className="flex gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                        <Shield className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground leading-relaxed">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Shield className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground">Enter a wallet address to analyze</p>
              <p className="text-xs text-muted-foreground mt-2">AI-powered whale tracking and manipulation detection</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
