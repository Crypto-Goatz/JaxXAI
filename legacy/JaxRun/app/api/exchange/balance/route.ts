import { type NextRequest, NextResponse } from "next/server"
import { ExchangeFactory } from "@/lib/exchange-api/exchange-factory"
import type { ExchangeType } from "@/types/integration.types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { exchange, apiKey, apiSecret } = body as {
      exchange: ExchangeType
      apiKey: string
      apiSecret: string
    }

    if (!exchange || !apiKey || !apiSecret) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const exchangeClient = ExchangeFactory.createExchange(exchange, apiKey, apiSecret)
    const balances = await exchangeClient.fetchBalance()

    return NextResponse.json({ success: true, balances })
  } catch (error) {
    console.error("[v0] Balance fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch balance", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
