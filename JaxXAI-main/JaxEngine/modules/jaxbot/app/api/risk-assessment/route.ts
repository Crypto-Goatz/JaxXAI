import { generateObject } from "ai"
import { z } from "zod"

const riskSchema = z.object({
  overallRisk: z.enum(["low", "medium", "high", "extreme"]),
  riskScore: z.number().min(0).max(100),
  factors: z.array(
    z.object({
      category: z.string(),
      risk: z.enum(["low", "medium", "high"]),
      score: z.number().min(0).max(100),
      description: z.string(),
      mitigation: z.string(),
    }),
  ),
  volatilityForecast: z.object({
    next24h: z.enum(["low", "medium", "high"]),
    next7d: z.enum(["low", "medium", "high"]),
    expectedRange: z.object({
      low: z.number(),
      high: z.number(),
    }),
  }),
  liquidationRisks: z.array(
    z.object({
      priceLevel: z.number(),
      amount: z.string(),
      impact: z.enum(["minor", "moderate", "significant", "severe"]),
    }),
  ),
  recommendations: z.array(z.string()),
})

export async function POST(req: Request) {
  try {
    const { asset, position, marketConditions } = await req.json()

    const prompt = `Perform comprehensive risk assessment for ${asset}.

Position Details:
${position ? JSON.stringify(position, null, 2) : "No active position"}

Market Conditions:
${marketConditions ? JSON.stringify(marketConditions, null, 2) : "Current market state"}

Assess risk across multiple dimensions:

1. Market Risk:
   - Volatility levels and trends
   - Liquidity depth and slippage potential
   - Market regime stability

2. Technical Risk:
   - Proximity to key support/resistance
   - Overbought/oversold conditions
   - Divergences and warning signals

3. On-chain Risk:
   - Large holder behavior
   - Exchange flow anomalies
   - Network congestion

4. Sentiment Risk:
   - Extreme positioning (funding rates)
   - Liquidation cascade potential
   - Social sentiment extremes

5. Macro Risk:
   - Correlation with broader markets
   - Regulatory developments
   - Black swan event probability

Provide specific risk scores (0-100) for each category and overall risk level. Include actionable mitigation strategies and position sizing recommendations.

Identify critical price levels where liquidation cascades could occur and their potential market impact.`

    const { object: assessment } = await generateObject({
      model: "openai/gpt-4o",
      schema: riskSchema,
      prompt,
    })

    return Response.json({
      success: true,
      assessment,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Risk assessment error:", error)
    return Response.json(
      {
        success: false,
        error: "Failed to assess risk",
      },
      { status: 500 },
    )
  }
}
