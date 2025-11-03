import { generateObject } from "ai"
import { z } from "zod"

const walletAnalysisSchema = z.object({
  wallet: z.string(),
  classification: z.enum(["whale", "institutional", "retail", "bot", "mixer", "exchange"]),
  riskScore: z.number().min(0).max(100),
  behaviorProfile: z.object({
    tradingStyle: z.string(),
    averageHoldTime: z.string(),
    preferredAssets: z.array(z.string()),
    activityPattern: z.string(),
  }),
  suspiciousActivities: z.array(
    z.object({
      type: z.string(),
      severity: z.enum(["low", "medium", "high", "critical"]),
      description: z.string(),
      timestamp: z.string().optional(),
    }),
  ),
  connections: z.object({
    linkedWallets: z.number(),
    mmgCluster: z.string().optional(),
    knownEntities: z.array(z.string()),
  }),
  metrics: z.object({
    totalTransactions: z.number(),
    totalVolume: z.string(),
    uniqueInteractions: z.number(),
    profitLoss: z.string(),
    winRate: z.number(),
  }),
  recentActivity: z.array(
    z.object({
      action: z.string(),
      asset: z.string(),
      amount: z.string(),
      impact: z.enum(["bullish", "bearish", "neutral"]),
      timestamp: z.string(),
    }),
  ),
  insights: z.array(z.string()),
  recommendations: z.array(z.string()),
})

export async function POST(req: Request) {
  try {
    const { walletAddress, includeHistory } = await req.json()

    const prompt = `You are an expert blockchain analyst specializing in wallet behavior analysis and market manipulation detection. Analyze the following wallet address: ${walletAddress}

Analysis Framework:

1. Wallet Classification:
   - Whale (>$1M holdings)
   - Institutional (exchange, fund, protocol)
   - Retail trader
   - Bot/automated trading
   - Mixer/privacy service
   - Exchange hot/cold wallet

2. Risk Assessment (0-100):
   - Transaction patterns (wash trading, circular transfers)
   - Timing analysis (front-running, sandwich attacks)
   - Connection to known bad actors
   - Unusual volume spikes
   - Privacy tool usage
   - Regulatory compliance

3. Behavior Profiling:
   - Trading style (scalper, swing trader, holder, arbitrageur)
   - Average hold time for positions
   - Preferred assets and sectors
   - Activity patterns (time of day, frequency)

4. Suspicious Activity Detection:
   - Pump and dump coordination
   - Wash trading patterns
   - Front-running behavior
   - Sybil attack indicators
   - MEV exploitation
   - Rug pull preparation signals

5. Network Analysis:
   - Linked wallets (same owner indicators)
   - MMG (Market Manipulator Group) cluster identification
   - Known entity connections (exchanges, protocols, famous wallets)
   - Fund flow patterns

6. Performance Metrics:
   - Total transaction count and volume
   - Unique contract/wallet interactions
   - Estimated profit/loss
   - Win rate on trades

7. Recent Activity:
   - Last 10 significant transactions
   - Current positions and changes
   - Market impact of recent moves

Provide actionable insights about:
- Whether to follow or fade this wallet's moves
- Potential market manipulation risks
- Trading opportunities based on their behavior
- Warning signs to watch for

${includeHistory ? "Include detailed historical analysis of past behavior patterns." : "Focus on recent activity and current risk profile."}`

    const { object: analysis } = await generateObject({
      model: "openai/gpt-4o",
      schema: walletAnalysisSchema,
      prompt,
    })

    return Response.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Wallet analysis error:", error)
    return Response.json(
      {
        success: false,
        error: "Failed to analyze wallet",
      },
      { status: 500 },
    )
  }
}
