import { streamText } from "ai"

export async function POST(req: Request) {
  try {
    const { asset, analysisType } = await req.json()

    const prompts = {
      onchain: `Analyze on-chain metrics for ${asset}:
- Whale wallet movements and accumulation patterns
- Exchange inflows/outflows (potential selling pressure)
- Active addresses and network growth
- Transaction volume trends
- UTXO age distribution
- Miner behavior and reserves

Provide actionable insights on what these metrics suggest for price movement.`,

      technical: `Perform technical analysis on ${asset}:
- Key support and resistance levels
- Trend analysis (short, medium, long-term)
- Volume profile and liquidity zones
- Chart patterns currently forming
- Indicator confluence (RSI, MACD, Bollinger Bands)
- Fibonacci retracement levels

Identify high-probability trade setups.`,

      sentiment: `Analyze market sentiment for ${asset}:
- Funding rates across exchanges (long/short bias)
- Open interest trends
- Liquidation clusters and potential cascades
- Social media sentiment and trending topics
- News impact and narrative shifts
- Fear & Greed index correlation

Assess whether sentiment is aligned with price action.`,

      macro: `Analyze macro factors affecting ${asset}:
- Bitcoin dominance and altcoin season indicators
- Total crypto market cap trends
- Correlation with traditional markets (stocks, gold, DXY)
- Regulatory developments and policy changes
- Institutional adoption signals
- Global liquidity conditions

Determine the broader market context for trading decisions.`,
    }

    const prompt = prompts[analysisType as keyof typeof prompts] || prompts.technical

    const result = streamText({
      model: "openai/gpt-4o",
      prompt,
      temperature: 0.7,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[v0] Market analysis error:", error)
    return Response.json(
      {
        success: false,
        error: "Failed to generate analysis",
      },
      { status: 500 },
    )
  }
}
