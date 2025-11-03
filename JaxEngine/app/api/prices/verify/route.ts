import { NextResponse } from "next/server"

const lastFetch = { time: 0, data: null as any }
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

export async function GET() {
  try {
    // Return cached data if less than 10 minutes old
    if (lastFetch.data && Date.now() - lastFetch.time < CACHE_DURATION) {
      return NextResponse.json({
        ...lastFetch.data,
        cached: true,
        nextUpdate: lastFetch.time + CACHE_DURATION,
      })
    }

    const apiKey = process.env.COINGECKO_API_KEY
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`,
      {
        headers: apiKey ? { "x-cg-demo-api-key": apiKey } : {},
      },
    )

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    const rawData = await response.json()
    const data = rawData.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      price: coin.current_price,
      marketCap: coin.market_cap,
    }))

    lastFetch.time = Date.now()
    lastFetch.data = { data, timestamp: Date.now() }

    return NextResponse.json({
      ...lastFetch.data,
      cached: false,
      nextUpdate: Date.now() + CACHE_DURATION,
    })
  } catch (error) {
    console.error("Error fetching verification prices:", error)

    // Return stale cache if available
    if (lastFetch.data) {
      return NextResponse.json({ ...lastFetch.data, cached: true, stale: true })
    }

    return NextResponse.json({ error: "Failed to fetch verification prices" }, { status: 500 })
  }
}
