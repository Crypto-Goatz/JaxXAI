import { NextResponse } from "next/server"

export async function GET() {
  try {
    const apiKey = process.env.COINGECKO_API_KEY

    // Fetch only top 50 coins for faster response
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h`,
      {
        headers: apiKey ? { "x-cg-demo-api-key": apiKey } : {},
        next: { revalidate: 60 }, // Cache for 1 minute
      },
    )

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    const data = await response.json()

    // Return simplified data structure optimized for calculations
    const simplifiedData = data.map((coin: any) => ({
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      price: coin.current_price,
      change24h: coin.price_change_percentage_24h,
      volume: coin.total_volume,
      marketCap: coin.market_cap,
      // Sparkline provides 7 days of hourly prices (168 data points)
      sparkline: coin.sparkline_in_7d?.price || [],
    }))

    return NextResponse.json(simplifiedData)
  } catch (error) {
    console.error("Error fetching simple prices:", error)
    return NextResponse.json({ error: "Failed to fetch prices" }, { status: 500 })
  }
}
