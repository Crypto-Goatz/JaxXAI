import { NextResponse } from "next/server"
import { okxTrading } from "@/lib/okx-trading"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { instId, side, ordType, sz, px, tdMode = "cash" } = body

    if (!instId || !side || !ordType || !sz) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const result = await okxTrading.placeOrder({
      instId,
      tdMode,
      side,
      ordType,
      sz,
      px,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] OKX trade error:", error)
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 })
  }
}
