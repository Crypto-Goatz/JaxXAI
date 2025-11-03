import { type NextRequest, NextResponse } from "next/server"
import { priceService } from "@/lib/price-service"

interface PriceParams {
  params: Promise<{ symbol: string }>
}

export async function GET(request: NextRequest, { params }: PriceParams) {
  try {
    const { symbol } = await params

    if (!symbol) {
      return NextResponse.json({ error: "Symbol is required" }, { status: 400 })
    }

    const priceData = await priceService.getPrice(symbol.toUpperCase())

    return NextResponse.json({ success: true, data: priceData })
  } catch (error) {
    console.error("[v0] Price API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch price", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
