import { NextResponse } from "next/server"
import { okxTrading } from "@/lib/okx-trading"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const instId = searchParams.get("instId") || "BTC-USDT"

    const volumeData = await okxTrading.get5MinVolume(instId)

    if (!volumeData) {
      return NextResponse.json({ error: "Failed to fetch volume data" }, { status: 404 })
    }

    return NextResponse.json(volumeData)
  } catch (error) {
    console.error("[v0] OKX volume error:", error)
    return NextResponse.json({ error: "Failed to fetch volume" }, { status: 500 })
  }
}
