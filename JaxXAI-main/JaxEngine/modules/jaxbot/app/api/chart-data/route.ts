export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const symbol = searchParams.get("symbol") || "BTC/USDT"
    const timeframe = searchParams.get("timeframe") || "1h"
    const points = Number.parseInt(searchParams.get("points") || "50")

    // Generate realistic OHLCV data
    const basePrice = symbol.includes("BTC") ? 67000 : symbol.includes("ETH") ? 3400 : 150
    const volatility = basePrice * 0.02 // 2% volatility

    const data = Array.from({ length: points }, (_, i) => {
      const timestamp = Date.now() - (points - i) * 3600000 // 1 hour intervals
      const trend = Math.sin(i / 10) * volatility
      const noise = (Math.random() - 0.5) * volatility * 0.5

      const open = basePrice + trend + noise
      const close = open + (Math.random() - 0.5) * volatility * 0.3
      const high = Math.max(open, close) + Math.random() * volatility * 0.2
      const low = Math.min(open, close) - Math.random() * volatility * 0.2
      const volume = Math.random() * 1000000 + 500000

      return {
        timestamp,
        open: Number.parseFloat(open.toFixed(2)),
        high: Number.parseFloat(high.toFixed(2)),
        low: Number.parseFloat(low.toFixed(2)),
        close: Number.parseFloat(close.toFixed(2)),
        volume: Number.parseFloat(volume.toFixed(0)),
      }
    })

    return Response.json({
      success: true,
      symbol,
      timeframe,
      data,
    })
  } catch (error) {
    console.error("[v0] Chart data error:", error)
    return Response.json(
      {
        success: false,
        error: "Failed to fetch chart data",
      },
      { status: 500 },
    )
  }
}
