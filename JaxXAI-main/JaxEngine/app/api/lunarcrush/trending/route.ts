import { NextResponse } from "next/server"

const LUNARCRUSH_API_KEY = process.env.LUNARCRUSH_API_KEY
const LUNARCRUSH_BASE_URL = "https://lunarcrush.com/api4/public"

export async function GET() {
  if (!LUNARCRUSH_API_KEY) {
    return NextResponse.json({ error: "LunarCrush API key not configured" }, { status: 500 })
  }

  try {
    const response = await fetch(`${LUNARCRUSH_BASE_URL}/coins/list?sort=social_volume&desc=true&limit=20`, {
      headers: {
        Authorization: `Bearer ${LUNARCRUSH_API_KEY}`,
      },
      next: { revalidate: 120 },
    })

    if (!response.ok) {
      throw new Error(`LunarCrush API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] LunarCrush trending API error:", error)
    return NextResponse.json({ error: "Failed to fetch trending data" }, { status: 500 })
  }
}
