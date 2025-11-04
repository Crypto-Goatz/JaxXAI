import { NextResponse } from "next/server"
import { apiCache } from "@/lib/api-cache"

const CACHE_TTL = 60000 // 1 minute

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = Number.parseInt(searchParams.get("limit") || "50")
  const cacheKey = `prices-optimized-${limit}`

  try {
    // Check cache first
    const cached = apiCache.get(cacheKey)
    if (cached) {
      return NextResponse.json({ ...cached, cached: true })
    }

    // Deduplicate concurrent requests
    const data = await apiCache.dedupe(cacheKey, async () => {
      const apiKey = process.env.COINGECKO_API_KEY

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=1h,24h,7d`,
        {
          headers: apiKey ? { "x-cg-demo-api-key": apiKey } : {},
        },
      )

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const rawData = await response.json()

      // Return only essential data
      return rawData.map((coin: any) => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        price: coin.current_price,
        change1h: coin.price_change_percentage_1h_in_currency,
        change24h: coin.price_change_percentage_24h,
        change7d: coin.price_change_percentage_7d_in_currency,
        volume: coin.total_volume,
        marketCap: coin.market_cap,
        sparkline: coin.sparkline_in_7d?.price?.filter((_: any, i: number) => i % 4 === 0) || [], // Reduce sparkline data
      }))
    })

    // Cache the result
    apiCache.set(cacheKey, data, CACHE_TTL, "coingecko")

    return NextResponse.json({ data, cached: false, timestamp: Date.now() })
  } catch (error) {
    console.error("Error fetching optimized prices:", error)

    // Return cached data even if expired in case of error
    const staleCache = apiCache.get(cacheKey)
    if (staleCache) {
      return NextResponse.json({ ...staleCache, cached: true, stale: true })
    }

    return NextResponse.json({ error: "Failed to fetch prices" }, { status: 500 })
  }
}
