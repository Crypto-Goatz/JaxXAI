import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// Mock alerts storage (in production, use a database)
let alerts: any[] = [
  {
    id: "1",
    type: "LED Signal",
    message: "Strong BUY signal detected for BTC/USDT",
    coin: "BTC",
    confidence: 94,
    time: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    read: false,
    endpoint: "coingecko",
    condition: "price_above",
    threshold: 65000,
  },
  {
    id: "2",
    type: "Futures Crush",
    message: "High liquidation risk detected for ETH/USDT",
    coin: "ETH",
    confidence: 87,
    time: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    read: false,
    endpoint: "binance",
    condition: "volume_spike",
    threshold: 150,
  },
]

export async function GET() {
  try {
    return NextResponse.json({ alerts })
  } catch (error) {
    console.error("Error fetching alerts:", error)
    return NextResponse.json({ error: "Failed to fetch alerts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const newAlert = {
      id: Date.now().toString(),
      type: body.type || "Custom Alert",
      message: body.message,
      coin: body.coin,
      confidence: body.confidence || 0,
      time: new Date().toISOString(),
      read: false,
      endpoint: body.endpoint,
      condition: body.condition,
      threshold: body.threshold,
      metric: body.metric,
    }

    alerts.unshift(newAlert)

    return NextResponse.json({ alert: newAlert, success: true })
  } catch (error) {
    console.error("Error creating alert:", error)
    return NextResponse.json({ error: "Failed to create alert" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, read } = body

    const alert = alerts.find((a) => a.id === id)
    if (alert) {
      alert.read = read
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating alert:", error)
    return NextResponse.json({ error: "Failed to update alert" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (id) {
      alerts = alerts.filter((a) => a.id !== id)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting alert:", error)
    return NextResponse.json({ error: "Failed to delete alert" }, { status: 500 })
  }
}
