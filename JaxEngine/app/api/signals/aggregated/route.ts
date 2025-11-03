import { type NextRequest, NextResponse } from "next/server"
import { generateAggregatedSignal } from "@/lib/signal-aggregator"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const coin = searchParams.get("coin") || "BTC"
    const pair = searchParams.get("pair") || "BTCUSDT"

    console.log(`[v0] Generating aggregated signal for ${coin}/${pair}`)

    const signal = await generateAggregatedSignal(coin, pair)

    return NextResponse.json(signal)
  } catch (error) {
    console.error("[v0] Error generating aggregated signal:", error)
    return NextResponse.json(
      { error: "Failed to generate signal", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { coins } = body

    if (!Array.isArray(coins)) {
      return NextResponse.json({ error: "Invalid request: coins must be an array" }, { status: 400 })
    }

    console.log(`[v0] Generating signals for ${coins.length} coins`)

    const signals = await Promise.all(
      coins.map(async ({ coin, pair }) => {
        try {
          return await generateAggregatedSignal(coin, pair || `${coin}USDT`)
        } catch (error) {
          console.error(`[v0] Failed to generate signal for ${coin}:`, error)
          return null
        }
      }),
    )

    const validSignals = signals.filter((s) => s !== null)

    return NextResponse.json({
      signals: validSignals,
      total: coins.length,
      successful: validSignals.length,
      failed: coins.length - validSignals.length,
    })
  } catch (error) {
    console.error("[v0] Error generating batch signals:", error)
    return NextResponse.json({ error: "Failed to generate batch signals" }, { status: 500 })
  }
}
