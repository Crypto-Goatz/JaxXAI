import { NextResponse } from "next/server"
import { okxTrading } from "@/lib/okx-trading"

export async function GET() {
  try {
    const balance = await okxTrading.getAccountBalance()
    return NextResponse.json(balance)
  } catch (error) {
    console.error("[v0] OKX balance error:", error)
    return NextResponse.json({ error: "Failed to fetch balance" }, { status: 500 })
  }
}
