import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export interface CryptoPrice {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  high_24h: number
  low_24h: number
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function GET() {
  try {
    const pages = 2 // Reduced from 3 to 2 pages (200 coins instead of 300)
    const perPage = 100
    const allCoins: CryptoPrice[] = []
    const apiKey = process.env.COINGECKO_API_KEY

    for (let page = 1; page <= pages; page++) {
      if (page > 1) {
        await delay(2000)
      }

      const headers: HeadersInit = {}
      if (apiKey) {
        headers["x-cg-demo-api-key"] = apiKey
      }

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=24h`,
        {
          headers,
          next: { revalidate: 120 }, // Cache for 2 minutes (120 seconds)
        },
      )

      if (!response.ok) {
        const errorBody = await response.text()
        console.error(`[v0] Failed to fetch page ${page}:`, response.status, errorBody)

        if (response.status === 429) {
          console.log(`[v0] Rate limit hit on page ${page}, returning ${allCoins.length} coins`)
          break
        }

        throw new Error(`Failed to fetch prices for page ${page}`)
      }

      const data: CryptoPrice[] = await response.json()
      allCoins.push(...data)
      console.log(`[v0] Successfully fetched page ${page}, total coins: ${allCoins.length}`)
    }

    if (allCoins.length === 0) {
      throw new Error("No crypto prices could be fetched")
    }

    return NextResponse.json(allCoins)
  } catch (error) {
    console.error("[v0] Error fetching crypto prices:", error)
    return NextResponse.json({ error: "Failed to fetch crypto prices" }, { status: 500 })
  }
}
