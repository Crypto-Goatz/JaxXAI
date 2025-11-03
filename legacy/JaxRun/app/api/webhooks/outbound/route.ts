import { type NextRequest, NextResponse } from "next/server"

interface OutboundWebhookPayload {
  webhookUrl: string
  event: string
  data: Record<string, unknown>
  secret?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: OutboundWebhookPayload = await request.json()

    const { webhookUrl, event, data, secret } = body

    if (!webhookUrl || !event) {
      return NextResponse.json({ error: "Missing required fields: webhookUrl and event are required" }, { status: 400 })
    }

    // Prepare webhook payload
    const payload = {
      event,
      data,
      timestamp: new Date().toISOString(),
      source: "crypto-trading-workflow",
    }

    // Send webhook
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }

    if (secret) {
      headers["X-Webhook-Secret"] = secret
    }

    console.log("[v0] Sending outbound webhook:", { webhookUrl, event })

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Webhook delivery failed: ${response.status} ${response.statusText}`)
    }

    return NextResponse.json({
      success: true,
      status: response.status,
      deliveredAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Outbound webhook error:", error)
    return NextResponse.json(
      { error: "Failed to deliver webhook", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
