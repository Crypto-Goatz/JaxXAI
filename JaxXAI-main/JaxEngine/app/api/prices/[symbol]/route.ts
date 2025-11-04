import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: Request, { params }: { params: { symbol: string } }) {
  try {
    const { symbol } = params

    // Fetch specific coin data from CoinGecko
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${symbol}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`,
      {
        next: { revalidate: 30 },
      },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch price")
    }

    const data = await response.json()

    return NextResponse.json({
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      current_price: data.market_data.current_price.usd,
      price_change_percentage_24h: data.market_data.price_change_percentage_24h,
      market_cap: data.market_data.market_cap.usd,
      total_volume: data.market_data.total_volume.usd,
      high_24h: data.market_data.high_24h.usd,
      low_24h: data.market_data.low_24h.usd,
    })
  } catch (error) {
    console.error("[v0] Error fetching crypto price:", error)
    return NextResponse.json({ error: "Failed to fetch crypto price" }, { status: 500 })
  }
}
