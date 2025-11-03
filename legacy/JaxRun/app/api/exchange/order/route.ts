import { type NextRequest, NextResponse } from "next/server"
import { ExchangeFactory } from "@/lib/exchange-api/exchange-factory"
import type { ExchangeType } from "@/types/integration.types"
import type { OrderParams } from "@/lib/exchange-api/base-exchange"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { exchange, apiKey, apiSecret, order } = body as {
      exchange: ExchangeType
      apiKey: string
      apiSecret: string
      order: OrderParams
    }

    if (!exchange || !apiKey || !apiSecret || !order) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const exchangeClient = ExchangeFactory.createExchange(exchange, apiKey, apiSecret)
    const createdOrder = await exchangeClient.createOrder(order)

    console.log("[v0] Order created:", createdOrder)

    return NextResponse.json({ success: true, order: createdOrder })
  } catch (error) {
    console.error("[v0] Order creation error:", error)
    return NextResponse.json(
      { error: "Failed to create order", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { exchange, apiKey, apiSecret, orderId, symbol } = body as {
      exchange: ExchangeType
      apiKey: string
      apiSecret: string
      orderId: string
      symbol: string
    }

    if (!exchange || !apiKey || !apiSecret || !orderId || !symbol) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const exchangeClient = ExchangeFactory.createExchange(exchange, apiKey, apiSecret)
    await exchangeClient.cancelOrder(orderId, symbol)

    return NextResponse.json({ success: true, message: "Order canceled" })
  } catch (error) {
    console.error("[v0] Order cancellation error:", error)
    return NextResponse.json(
      { error: "Failed to cancel order", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
