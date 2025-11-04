import { type NextRequest, NextResponse } from "next/server"
import { getAllWebhooks, logWebhookTrigger, verifyWebhookSignature } from "@/lib/webhook-manager"
import { sendWebhook } from "@/lib/webhook-manager"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const signature = request.headers.get("x-webhook-signature")
    const event = request.headers.get("x-webhook-event") || "unknown"

    console.log("[v0] Received webhook:", { event, hasSignature: !!signature })

    // Find all active incoming webhooks
    const webhooks = getAllWebhooks().filter((w) => w.type === "incoming" && w.active)

    // Process webhook
    for (const webhook of webhooks) {
      // Verify signature if secret is set
      if (webhook.secret && signature) {
        const isValid = await verifyWebhookSignature(body, signature, webhook.secret)
        if (!isValid) {
          logWebhookTrigger({
            webhookId: webhook.id,
            event,
            payload: body,
            status: "failed",
            error: "Invalid signature",
          })
          continue
        }
      }

      // Log the webhook
      logWebhookTrigger({
        webhookId: webhook.id,
        event,
        payload: body,
        status: "success",
      })

      // Trigger outgoing webhooks based on this event
      const outgoingWebhooks = getAllWebhooks().filter(
        (w) => w.type === "outgoing" && w.active && (w.events.includes(event) || w.events.includes("*")),
      )

      for (const outgoing of outgoingWebhooks) {
        try {
          await sendWebhook(outgoing, event, body)
        } catch (error) {
          console.error(`[v0] Failed to send outgoing webhook ${outgoing.id}:`, error)
        }
      }
    }

    return NextResponse.json({ success: true, processed: webhooks.length })
  } catch (error) {
    console.error("[v0] Webhook receive error:", error)
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 })
  }
}
