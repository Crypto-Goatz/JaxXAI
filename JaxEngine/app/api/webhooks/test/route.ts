import { type NextRequest, NextResponse } from "next/server"
import { getWebhook, sendWebhook } from "@/lib/webhook-manager"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { webhookId, event, payload } = body

    if (!webhookId) {
      return NextResponse.json({ error: "Webhook ID required" }, { status: 400 })
    }

    const webhook = getWebhook(webhookId)

    if (!webhook) {
      return NextResponse.json({ error: "Webhook not found" }, { status: 404 })
    }

    if (webhook.type !== "outgoing") {
      return NextResponse.json({ error: "Can only test outgoing webhooks" }, { status: 400 })
    }

    const testEvent = event || "test"
    const testPayload = payload || {
      test: true,
      message: "This is a test webhook",
      timestamp: new Date().toISOString(),
    }

    await sendWebhook(webhook, testEvent, testPayload)

    return NextResponse.json({ success: true, message: "Webhook test sent successfully" })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to send test webhook",
      },
      { status: 500 },
    )
  }
}
