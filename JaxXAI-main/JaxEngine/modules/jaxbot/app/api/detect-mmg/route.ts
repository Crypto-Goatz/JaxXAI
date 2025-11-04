import { generateObject } from "ai"
import { z } from "zod"

const mmgDetectionSchema = z.object({
  clusterId: z.string(),
  clusterName: z.string(),
  confidence: z.number().min(0).max(1),
  walletCount: z.number(),
  totalVolume: z.string(),
  coordinationScore: z.number().min(0).max(100),
  tactics: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      frequency: z.enum(["rare", "occasional", "frequent", "constant"]),
      effectiveness: z.number().min(0).max(1),
    }),
  ),
  targetAssets: z.array(
    z.object({
      asset: z.string(),
      manipulationCount: z.number(),
      averageImpact: z.string(),
      lastActivity: z.string(),
    }),
  ),
  timeline: z.array(
    z.object({
      date: z.string(),
      event: z.string(),
      impact: z.string(),
    }),
  ),
  riskLevel: z.enum(["low", "medium", "high", "critical"]),
  recommendations: z.array(z.string()),
})

export async function POST(req: Request) {
  try {
    const { walletAddresses, timeframe } = await req.json()

    const prompt = `You are an expert in detecting coordinated market manipulation groups (MMGs) in crypto markets. Analyze the following wallet addresses for signs of coordinated manipulation: ${walletAddresses.join(", ")}

Timeframe: ${timeframe || "Last 30 days"}

Detection Framework:

1. Coordination Indicators:
   - Synchronized trading patterns
   - Circular fund flows between wallets
   - Simultaneous position building/dumping
   - Coordinated social media activity timing
   - Shared funding sources

2. Common MMG Tactics:
   - Pump and Dump: Coordinated buying followed by synchronized selling
   - Wash Trading: Fake volume through self-trading
   - Spoofing: Large fake orders to manipulate price
   - Front-running: Using bots to front-run retail orders
   - Rug Pulls: Coordinated liquidity removal
   - FUD Campaigns: Coordinated negative sentiment spreading
   - FOMO Creation: Artificial hype generation

3. Cluster Analysis:
   - Assign cluster ID and creative name
   - Estimate number of wallets in group
   - Calculate total coordinated volume
   - Score coordination level (0-100)

4. Target Asset Analysis:
   - Which assets they frequently manipulate
   - Success rate and average price impact
   - Recent activity timeline

5. Historical Pattern:
   - Timeline of major manipulation events
   - Evolution of tactics
   - Success/failure rate

6. Risk Assessment:
   - Current threat level to market
   - Likelihood of ongoing manipulation
   - Assets currently at risk

Provide specific recommendations for:
- How to avoid being caught in their schemes
- Warning signs to watch for
- Potential counter-trading opportunities
- Protective measures for traders`

    const { object: detection } = await generateObject({
      model: "openai/gpt-4o",
      schema: mmgDetectionSchema,
      prompt,
    })

    return Response.json({
      success: true,
      detection,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] MMG detection error:", error)
    return Response.json(
      {
        success: false,
        error: "Failed to detect MMG",
      },
      { status: 500 },
    )
  }
}
