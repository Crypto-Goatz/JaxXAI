import { NextResponse } from "next/server"
import { calculateLEDScore } from "@/lib/scoringEngine"

export async function GET() {
  try {
    // In production, fetch real market data from APIs
    const mockVolumeData = [100, 120, 150, 180, 200]
    const mockLiquidityData = [1000, 1100, 1200, 1300, 1400]
    const mockPriceData = [50000, 51000, 52000, 53000, 54000]

    const signal = calculateLEDScore(mockVolumeData, mockLiquidityData, mockPriceData)

    return NextResponse.json(signal)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch LED signals" }, { status: 500 })
  }
}
