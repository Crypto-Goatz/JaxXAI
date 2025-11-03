import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Fetch recent price data and social sentiment
    const [pricesRes, sentimentRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/prices/live?limit=10`),
      fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/lunarcrush`),
    ])

    const prices = await pricesRes.json()
    const sentiment = await sentimentRes.json()

    // Calculate correlations between sentiment and price movements
    const correlations = prices.data
      .map((coin: any) => {
        const sentimentData = sentiment.data?.find((s: any) => s.symbol === coin.symbol)

        if (!sentimentData) {
          return null
        }

        // Simple correlation calculation
        const sentimentScore = sentimentData.sentiment || 50
        const priceChange = coin.change24h

        // Normalize sentiment to -1 to 1 scale
        const normalizedSentiment = (sentimentScore - 50) / 50
        const normalizedPrice = priceChange / 100

        // Calculate correlation coefficient (simplified)
        const correlation =
          normalizedSentiment * normalizedPrice > 0
            ? Math.min(Math.abs(normalizedSentiment) + Math.abs(normalizedPrice), 1)
            : -Math.min(Math.abs(normalizedSentiment) + Math.abs(normalizedPrice), 1)

        const strength = Math.abs(correlation) > 0.7 ? "strong" : Math.abs(correlation) > 0.4 ? "moderate" : "weak"

        // Generate insight based on correlation
        let insight = ""
        if (correlation > 0.7) {
          insight = "Strong positive correlation. Sentiment is driving price action. High confidence buy signal."
        } else if (correlation > 0.4) {
          insight = "Moderate correlation. Sentiment and price moving together. Watch for continuation."
        } else if (correlation < -0.4) {
          insight = "Negative correlation. Price diverging from sentiment. Potential reversal signal."
        } else {
          insight = "Weak correlation. Sentiment and price not aligned. Wait for clearer signal."
        }

        return {
          symbol: coin.symbol,
          correlation,
          strength,
          sentiment: normalizedSentiment,
          priceChange,
          insight,
          timestamp: Date.now(),
        }
      })
      .filter(Boolean)

    return NextResponse.json({
      correlations,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error("Error calculating correlations:", error)
    return NextResponse.json(
      {
        correlations: [],
        error: "Failed to calculate correlations",
      },
      { status: 500 },
    )
  }
}
