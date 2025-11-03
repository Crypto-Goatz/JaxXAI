import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Extract webhook data
    const { flowId, event, data, secret } = body

    // Validate required fields
    if (!flowId || !event) {
      return NextResponse.json({ error: "Missing required fields: flowId and event are required" }, { status: 400 })
    }

    // Log the webhook event
    console.log("[v0] Inbound webhook received:", {
      flowId,
      event,
      timestamp: new Date().toISOString(),
    })

    // Here you would:
    // 1. Validate the secret if provided
    // 2. Trigger the appropriate workflow
    // 3. Store the event in a queue for processing
    // 4. Return the webhook ID for tracking

    const webhookId = `wh_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    return NextResponse.json({
      success: true,
      webhookId,
      flowId,
      event,
      receivedAt: new Date().toISOString(),
      message: "Webhook received and queued for processing",
    })
  } catch (error) {
    console.error("[v0] Webhook processing error:", error)
    return NextResponse.json(
      { error: "Failed to process webhook", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    service: "Crypto Trading Workflow - Inbound Webhooks",
    status: "active",
    documentation: "/api/webhooks/docs",
  })
}
