import { NextResponse } from "next/server"
import { calculateFuturesCrushScore } from "@/lib/scoringEngine"

export async function GET() {
  try {
    // In production, fetch real futures market data
    const mockFundingRate = -0.05
    const mockOpenInterest = 8200000000
    const mockLiquidationData = [10000000, 15000000, 20000000]

    const signal = calculateFuturesCrushScore(mockFundingRate, mockOpenInterest, mockLiquidationData)

    return NextResponse.json(signal)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch futures signals" }, { status: 500 })
  }
}
