import { type NextRequest, NextResponse } from "next/server"
import { ExchangeFactory } from "@/lib/exchange-api/exchange-factory"
import type { ExchangeType } from "@/types/integration.types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { exchange, apiKey, apiSecret, symbol } = body as {
      exchange: ExchangeType
      apiKey: string
      apiSecret: string
      symbol: string
    }

    if (!exchange || !apiKey || !apiSecret || !symbol) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const exchangeClient = ExchangeFactory.createExchange(exchange, apiKey, apiSecret)
    const ticker = await exchangeClient.fetchTicker(symbol)

    return NextResponse.json({ success: true, ticker })
  } catch (error) {
    console.error("[v0] Ticker fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch ticker", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
