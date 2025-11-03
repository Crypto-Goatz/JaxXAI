"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageCircle,
  TrendingUp,
  Users,
  Heart,
  Share2,
  Star,
  Activity,
  BarChart3,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from "lucide-react"

interface SocialMetric {
  symbol: string
  name: string
  price: number
  price_change_24h: number
  social_volume: number
  social_volume_change: number
  sentiment: number
  sentiment_change: number
  galaxy_score: number
  alt_rank: number
  social_dominance: number
  interactions: number
  contributors: number
}

export default function SocialInsightsPage() {
  const [metrics, setMetrics] = useState<SocialMetric[]>([])
  const [trending, setTrending] = useState<SocialMetric[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch main social metrics
      const metricsRes = await fetch("/api/lunarcrush?endpoint=coins")
      const metricsData = await metricsRes.json()

      // Fetch trending coins
      const trendingRes = await fetch("/api/lunarcrush/trending")
      const trendingData = await trendingRes.json()

      // Mock data for demonstration (replace with actual API response parsing)
      const mockMetrics: SocialMetric[] = [
        {
          symbol: "BTC",
          name: "Bitcoin",
          price: 43250,
          price_change_24h: 2.4,
          social_volume: 125000,
          social_volume_change: 45,
          sentiment: 78,
          sentiment_change: 12,
          galaxy_score: 92,
          alt_rank: 1,
          social_dominance: 34.5,
          interactions: 450000,
          contributors: 12500,
        },
        {
          symbol: "ETH",
          name: "Ethereum",
          price: 2280,
          price_change_24h: 3.8,
          social_volume: 98000,
          social_volume_change: 67,
          sentiment: 82,
          sentiment_change: 18,
          galaxy_score: 88,
          alt_rank: 2,
          social_dominance: 28.2,
          interactions: 380000,
          contributors: 9800,
        },
        {
          symbol: "SOL",
          name: "Solana",
          price: 98.5,
          price_change_24h: 8.2,
          social_volume: 67000,
          social_volume_change: 156,
          sentiment: 85,
          sentiment_change: 34,
          galaxy_score: 85,
          alt_rank: 3,
          social_dominance: 18.7,
          interactions: 290000,
          contributors: 7200,
        },
        {
          symbol: "AVAX",
          name: "Avalanche",
          price: 36.8,
          price_change_24h: 5.6,
          social_volume: 45000,
          social_volume_change: 89,
          sentiment: 76,
          sentiment_change: 22,
          galaxy_score: 79,
          alt_rank: 5,
          social_dominance: 12.3,
          interactions: 180000,
          contributors: 5400,
        },
        {
          symbol: "MATIC",
          name: "Polygon",
          price: 0.82,
          price_change_24h: 4.2,
          social_volume: 38000,
          social_volume_change: 72,
          sentiment: 74,
          sentiment_change: 15,
          galaxy_score: 76,
          alt_rank: 7,
          social_dominance: 10.8,
          interactions: 150000,
          contributors: 4800,
        },
      ]

      setMetrics(mockMetrics)
      setTrending(mockMetrics.slice(0, 3))
      setLastUpdate(new Date())
    } catch (error) {
      console.error("[v0] Failed to fetch social insights:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 120000) // Refresh every 2 minutes
    return () => clearInterval(interval)
  }, [])

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 80) return "text-green-500"
    if (sentiment >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getSentimentBadge = (sentiment: number) => {
    if (sentiment >= 80) return { label: "Bullish", variant: "default" as const }
    if (sentiment >= 60) return { label: "Neutral", variant: "secondary" as const }
    return { label: "Bearish", variant: "destructive" as const }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Social Insights
          </h1>
          <p className="text-muted-foreground">
            Real-time social sentiment and engagement metrics powered by LunarCrush
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">Last update: {lastUpdate.toLocaleTimeString()}</div>
          <Button onClick={fetchData} disabled={loading} size="sm" variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/40 bg-gradient-to-br from-background to-blue-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Total Social Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(metrics.reduce((acc, m) => acc + m.social_volume, 0) / 1000).toFixed(1)}K
            </div>
            <p className="text-xs text-muted-foreground mt-1">Mentions across platforms</p>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-gradient-to-br from-background to-green-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Avg Sentiment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.length > 0 ? (metrics.reduce((acc, m) => acc + m.sentiment, 0) / metrics.length).toFixed(0) : 0}
              /100
            </div>
            <p className="text-xs text-muted-foreground mt-1">Overall market sentiment</p>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-gradient-to-br from-background to-purple-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Active Contributors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(metrics.reduce((acc, m) => acc + m.contributors, 0) / 1000).toFixed(1)}K
            </div>
            <p className="text-xs text-muted-foreground mt-1">Unique social contributors</p>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-gradient-to-br from-background to-orange-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Total Interactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(metrics.reduce((acc, m) => acc + m.interactions, 0) / 1000000).toFixed(2)}M
            </div>
            <p className="text-xs text-muted-foreground mt-1">Likes, shares, comments</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {metrics.map((metric) => {
              const sentimentBadge = getSentimentBadge(metric.sentiment)
              return (
                <Card
                  key={metric.symbol}
                  className="border-border/40 bg-gradient-to-br from-background to-primary/5 hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                          <span className="font-bold text-primary-foreground">{metric.symbol}</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">{metric.name}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <span className="text-lg font-semibold text-foreground">
                              ${metric.price.toLocaleString()}
                            </span>
                            <span
                              className={`flex items-center text-sm ${metric.price_change_24h > 0 ? "text-green-500" : "text-red-500"}`}
                            >
                              {metric.price_change_24h > 0 ? (
                                <ArrowUpRight className="h-3 w-3" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3" />
                              )}
                              {Math.abs(metric.price_change_24h)}%
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={sentimentBadge.variant}>{sentimentBadge.label}</Badge>
                        <Badge variant="outline" className="gap-1">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />#{metric.alt_rank}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          Social Volume
                        </p>
                        <p className="text-lg font-semibold">{(metric.social_volume / 1000).toFixed(1)}K</p>
                        <p className="text-xs text-green-500 flex items-center">
                          <ArrowUpRight className="h-3 w-3" />+{metric.social_volume_change}%
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          Sentiment
                        </p>
                        <p className={`text-lg font-semibold ${getSentimentColor(metric.sentiment)}`}>
                          {metric.sentiment}/100
                        </p>
                        <p className="text-xs text-green-500 flex items-center">
                          <ArrowUpRight className="h-3 w-3" />+{metric.sentiment_change}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          Galaxy Score
                        </p>
                        <p className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                          {metric.galaxy_score}
                        </p>
                        <p className="text-xs text-muted-foreground">LunarCrush metric</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <BarChart3 className="h-3 w-3" />
                          Dominance
                        </p>
                        <p className="text-lg font-semibold">{metric.social_dominance}%</p>
                        <p className="text-xs text-muted-foreground">Social share</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <Card className="border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Trending Cryptocurrencies
              </CardTitle>
              <CardDescription>Top coins by social volume growth in the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trending.map((coin, index) => (
                  <div
                    key={coin.symbol}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/40 bg-gradient-to-r from-background to-primary/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-muted-foreground">#{index + 1}</div>
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                        <span className="font-bold text-primary-foreground text-sm">{coin.symbol}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{coin.name}</p>
                        <p className="text-sm text-muted-foreground">{coin.symbol}/USDT</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Social Volume</p>
                        <p className="font-semibold">{(coin.social_volume / 1000).toFixed(1)}K</p>
                      </div>
                      <Badge variant="default" className="gap-1">
                        <ArrowUpRight className="h-3 w-3" />+{coin.social_volume_change}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-border/40 bg-gradient-to-br from-background to-green-500/10">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-500" />
                  Bullish Sentiment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {metrics
                    .filter((m) => m.sentiment >= 80)
                    .map((coin) => (
                      <div key={coin.symbol} className="flex items-center justify-between">
                        <span className="font-medium">{coin.symbol}</span>
                        <span className="text-green-500 font-semibold">{coin.sentiment}/100</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-gradient-to-br from-background to-yellow-500/10">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-yellow-500" />
                  Neutral Sentiment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {metrics
                    .filter((m) => m.sentiment >= 60 && m.sentiment < 80)
                    .map((coin) => (
                      <div key={coin.symbol} className="flex items-center justify-between">
                        <span className="font-medium">{coin.symbol}</span>
                        <span className="text-yellow-500 font-semibold">{coin.sentiment}/100</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-gradient-to-br from-background to-red-500/10">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-red-500" />
                  Bearish Sentiment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {metrics
                    .filter((m) => m.sentiment < 60)
                    .map((coin) => (
                      <div key={coin.symbol} className="flex items-center justify-between">
                        <span className="font-medium">{coin.symbol}</span>
                        <span className="text-red-500 font-semibold">{coin.sentiment}/100</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
