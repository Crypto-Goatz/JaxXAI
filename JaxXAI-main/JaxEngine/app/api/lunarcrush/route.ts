import { NextResponse } from "next/server"

const LUNARCRUSH_API_KEY = process.env.LUNARCRUSH_API_KEY
const LUNARCRUSH_BASE_URL = "https://lunarcrush.com/api4/public"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get("endpoint") || "coins"
  const symbol = searchParams.get("symbol")

  if (!LUNARCRUSH_API_KEY) {
    return NextResponse.json({ error: "LunarCrush API key not configured" }, { status: 500 })
  }

  try {
    const url = `${LUNARCRUSH_BASE_URL}/${endpoint}`
    const params = new URLSearchParams()

    if (symbol) {
      params.append("symbol", symbol)
    }

    // Add common parameters
    params.append("limit", "50")
    params.append("sort", "galaxy_score")
    params.append("desc", "true")

    const fullUrl = `${url}?${params.toString()}`

    const response = await fetch(fullUrl, {
      headers: {
        Authorization: `Bearer ${LUNARCRUSH_API_KEY}`,
      },
      next: { revalidate: 120 }, // Cache for 2 minutes
    })

    if (!response.ok) {
      throw new Error(`LunarCrush API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] LunarCrush API error:", error)
    return NextResponse.json({ error: "Failed to fetch LunarCrush data" }, { status: 500 })
  }
}
