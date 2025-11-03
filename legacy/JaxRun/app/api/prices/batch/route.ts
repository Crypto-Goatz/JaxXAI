import { type NextRequest, NextResponse } from "next/server"
import { priceService } from "@/lib/price-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { symbols } = body as { symbols: string[] }

    if (!symbols || !Array.isArray(symbols) || symbols.length === 0) {
      return NextResponse.json({ error: "Symbols array is required" }, { status: 400 })
    }

    const prices = await priceService.getMultiplePrices(symbols.map((s) => s.toUpperCase()))

    return NextResponse.json({ success: true, data: prices })
  } catch (error) {
    console.error("[v0] Batch price API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch prices", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
