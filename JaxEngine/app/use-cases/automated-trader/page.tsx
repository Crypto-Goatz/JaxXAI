"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowRightIcon,
  BotIcon,
  TrendingUpIcon,
  ZapIcon,
  NetworkIcon,
  BrainIcon,
  ActivityIcon,
  Share2Icon,
  DatabaseIcon,
  AlertCircleIcon,
  BarChart3Icon,
  CoinsIcon,
  TwitterIcon,
  BellIcon,
  CheckCircle2Icon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "lucide-react"
import Link from "next/link"

export default function AutomatedTraderUseCasePage() {
  const apiIntegrations = [
    { name: "CoinGecko", category: "Market Data", icon: <CoinsIcon className="h-4 w-4" /> },
    { name: "CoinMarketCap", category: "Market Data", icon: <BarChart3Icon className="h-4 w-4" /> },
    { name: "Binance", category: "Exchange", icon: <TrendingUpIcon className="h-4 w-4" /> },
    { name: "Coinbase", category: "Exchange", icon: <TrendingUpIcon className="h-4 w-4" /> },
    { name: "Kraken", category: "Exchange", icon: <TrendingUpIcon className="h-4 w-4" /> },
    { name: "LunarCrush", category: "Social Sentiment", icon: <Share2Icon className="h-4 w-4" /> },
    { name: "Santiment", category: "On-Chain Analytics", icon: <DatabaseIcon className="h-4 w-4" /> },
    { name: "Glassnode", category: "On-Chain Analytics", icon: <DatabaseIcon className="h-4 w-4" /> },
    { name: "Messari", category: "Research Data", icon: <ActivityIcon className="h-4 w-4" /> },
    { name: "The Graph", category: "Blockchain Data", icon: <NetworkIcon className="h-4 w-4" /> },
    { name: "Dune Analytics", category: "On-Chain Queries", icon: <DatabaseIcon className="h-4 w-4" /> },
    { name: "CryptoQuant", category: "Exchange Flows", icon: <ArrowRightIcon className="h-4 w-4" /> },
    { name: "IntoTheBlock", category: "Smart Money", icon: <BrainIcon className="h-4 w-4" /> },
    { name: "Nansen", category: "Wallet Analytics", icon: <DatabaseIcon className="h-4 w-4" /> },
    { name: "DeFi Llama", category: "DeFi TVL", icon: <CoinsIcon className="h-4 w-4" /> },
    { name: "Twitter API", category: "Social Signals", icon: <TwitterIcon className="h-4 w-4" /> },
    { name: "Reddit API", category: "Community Sentiment", icon: <Share2Icon className="h-4 w-4" /> },
    { name: "TradingView", category: "Technical Analysis", icon: <BarChart3Icon className="h-4 w-4" /> },
    { name: "Fear & Greed Index", category: "Market Sentiment", icon: <ActivityIcon className="h-4 w-4" /> },
    { name: "Gas Tracker", category: "Network Metrics", icon: <ZapIcon className="h-4 w-4" /> },
    { name: "Whale Alert", category: "Large Transactions", icon: <AlertCircleIcon className="h-4 w-4" /> },
    { name: "OpenSea", category: "NFT Market Data", icon: <CoinsIcon className="h-4 w-4" /> },
  ]

  const inboundTriggers = [
    {
      title: "Price Action Triggers",
      description: "Real-time price movements, volume spikes, and technical indicator signals",
      icon: <TrendingUpIcon className="h-5 w-5" />,
      examples: ["RSI oversold/overbought", "MACD crossovers", "Volume breakouts", "Support/resistance breaks"],
    },
    {
      title: "On-Chain Triggers",
      description: "Blockchain activity, whale movements, and smart money flows",
      icon: <DatabaseIcon className="h-5 w-5" />,
      examples: [
        "Large wallet transfers",
        "Exchange inflows/outflows",
        "Smart contract interactions",
        "Gas fee spikes",
      ],
    },
    {
      title: "Social Sentiment Triggers",
      description: "Social media buzz, influencer activity, and community sentiment shifts",
      icon: <Share2Icon className="h-5 w-5" />,
      examples: ["Twitter trending topics", "Reddit post volume", "Influencer mentions", "Sentiment score changes"],
    },
    {
      title: "Market Event Triggers",
      description: "News events, regulatory updates, and macro economic indicators",
      icon: <AlertCircleIcon className="h-5 w-5" />,
      examples: ["Exchange listings", "Partnership announcements", "Regulatory news", "Fed rate decisions"],
    },
  ]

  const processingSteps = [
    {
      title: "Data Aggregation",
      description: "Collect and normalize data from 20+ API endpoints in real-time",
      icon: <DatabaseIcon className="h-6 w-6" />,
    },
    {
      title: "AI Analysis",
      description: "Process signals through 6 years of trained on-chain data models",
      icon: <BrainIcon className="h-6 w-6" />,
    },
    {
      title: "Scoring Engine",
      description: "Calculate LED and Futures Crush scores with explainable AI",
      icon: <BarChart3Icon className="h-6 w-6" />,
    },
    {
      title: "Risk Assessment",
      description: "Evaluate position sizing, stop-loss levels, and risk/reward ratios",
      icon: <AlertCircleIcon className="h-6 w-6" />,
    },
    {
      title: "Strategy Matching",
      description: "Match signals to your configured trading strategies and preferences",
      icon: <NetworkIcon className="h-6 w-6" />,
    },
    {
      title: "Execution Decision",
      description: "Determine optimal entry, exit, and position management actions",
      icon: <CheckCircle2Icon className="h-6 w-6" />,
    },
  ]

  const outboundSignals = [
    {
      title: "Automated Trade Execution",
      description: "Execute trades automatically on connected exchanges with smart order routing",
      icon: <BotIcon className="h-5 w-5" />,
      actions: ["Market/limit orders", "Stop-loss placement", "Take-profit targets", "Position scaling"],
    },
    {
      title: "Social Media Alerts",
      description: "Post trading signals and analysis to your social media accounts",
      icon: <TwitterIcon className="h-5 w-5" />,
      actions: ["Twitter signal posts", "Discord notifications", "Telegram alerts", "Custom webhooks"],
    },
    {
      title: "Dashboard Notifications",
      description: "Real-time alerts and updates in your Jax dashboard",
      icon: <BellIcon className="h-5 w-5" />,
      actions: ["Push notifications", "Email alerts", "SMS messages", "In-app popups"],
    },
    {
      title: "Portfolio Updates",
      description: "Automatic portfolio rebalancing and performance tracking",
      icon: <BarChart3Icon className="h-5 w-5" />,
      actions: ["Position updates", "P&L calculations", "Risk metrics", "Performance reports"],
    },
  ]

  const realWorldScenario = {
    title: "Real-World Trading Scenario",
    steps: [
      {
        phase: "Detection",
        description: "Whale Alert detects 5,000 BTC moving from cold storage to Binance",
        time: "T+0s",
        icon: <ArrowDownIcon className="h-5 w-5 text-red-500" />,
      },
      {
        phase: "Analysis",
        description: "AI correlates with social sentiment spike and futures funding rate increase",
        time: "T+2s",
        icon: <BrainIcon className="h-5 w-5 text-blue-500" />,
      },
      {
        phase: "Scoring",
        description: "LED score: 87/100 (High probability of price drop), Futures Crush detected",
        time: "T+4s",
        icon: <BarChart3Icon className="h-5 w-5 text-orange-500" />,
      },
      {
        phase: "Decision",
        description: "Strategy matched: Short BTC with 2% position size, 3% stop-loss",
        time: "T+5s",
        icon: <CheckCircle2Icon className="h-5 w-5 text-green-500" />,
      },
      {
        phase: "Execution",
        description: "Short order placed on Binance, stop-loss set, Twitter alert posted",
        time: "T+6s",
        icon: <ZapIcon className="h-5 w-5 text-purple-500" />,
      },
      {
        phase: "Monitoring",
        description: "Position tracked, price drops 4.2%, take-profit triggered automatically",
        time: "T+45m",
        icon: <TrendingUpIcon className="h-5 w-5 text-green-500" />,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container px-4 sm:px-6 md:px-8 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4" variant="outline">
              <BotIcon className="h-3 w-3 mr-1" />
              Automated Trading Use Case
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              The World's Most Advanced{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Automated Trading System
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Jax combines 20+ crypto and finance APIs with explainable AI to create a fully automated trading workflow
              that monitors markets 24/7, analyzes signals in real-time, and executes trades with precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  View Dashboard <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/#contact">Get Started</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* API Integrations Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/30">
        <div className="container px-4 sm:px-6 md:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">20+ API Integrations</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Jax aggregates data from the most trusted sources in crypto to give you a complete market view
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {apiIntegrations.map((api, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader className="p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-1">
                      {api.icon}
                      <CardTitle className="text-xs sm:text-sm">{api.name}</CardTitle>
                    </div>
                    <Badge variant="secondary" className="text-[10px] sm:text-xs w-fit">
                      {api.category}
                    </Badge>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container px-4 sm:px-6 md:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Complete Trading Workflow</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              From market detection to trade execution, Jax handles every step automatically
            </p>
          </motion.div>

          {/* Inbound Triggers */}
          <div className="mb-16">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
              <ArrowDownIcon className="h-6 w-6 text-blue-500" />
              Inbound Triggers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inboundTriggers.map((trigger, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">{trigger.icon}</div>
                        <CardTitle className="text-lg sm:text-xl">{trigger.title}</CardTitle>
                      </div>
                      <CardDescription className="text-sm sm:text-base">{trigger.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {trigger.examples.map((example, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                            <CheckCircle2Icon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Processing Layer */}
          <div className="mb-16">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
              <BrainIcon className="h-6 w-6 text-purple-500" />
              AI Processing Layer
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {processingSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="p-3 rounded-lg bg-purple-500/10 text-purple-500 w-fit mb-3">{step.icon}</div>
                      <CardTitle className="text-base sm:text-lg">{step.title}</CardTitle>
                      <CardDescription className="text-sm">{step.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Outbound Signals */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
              <ArrowUpIcon className="h-6 w-6 text-green-500" />
              Outbound Signals & Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {outboundSignals.map((signal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-green-500/10 text-green-500">{signal.icon}</div>
                        <CardTitle className="text-lg sm:text-xl">{signal.title}</CardTitle>
                      </div>
                      <CardDescription className="text-sm sm:text-base">{signal.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {signal.actions.map((action, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                            <ZapIcon className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Real-World Scenario */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/30">
        <div className="container px-4 sm:px-6 md:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{realWorldScenario.title}</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              See how Jax detects, analyzes, and executes a profitable trade in under 10 seconds
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {realWorldScenario.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-background border">{step.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                          <CardTitle className="text-base sm:text-lg">{step.phase}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {step.time}
                          </Badge>
                        </div>
                        <CardDescription className="text-sm sm:text-base">{step.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container px-4 sm:px-6 md:px-8">
          <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-600/20">
            <CardHeader className="text-center space-y-4 p-6 sm:p-8 md:p-12">
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Ready to Automate Your Trading?
              </CardTitle>
              <CardDescription className="text-base sm:text-lg max-w-2xl mx-auto">
                Join thousands of traders using Jax to execute profitable trades 24/7 with AI-powered automation
              </CardDescription>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" asChild>
                  <Link href="/dashboard">
                    Start Trading Now <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/#contact">Schedule Demo</Link>
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  )
}
