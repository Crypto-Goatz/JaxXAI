interface WebhookEvent {
  id: string
  flowId: string
  event: string
  data: Record<string, unknown>
  receivedAt: Date
  processedAt?: Date
  status: "pending" | "processing" | "completed" | "failed"
  error?: string
}

class WebhookService {
  private events: Map<string, WebhookEvent> = new Map()

  async receiveWebhook(flowId: string, event: string, data: Record<string, unknown>): Promise<string> {
    const webhookEvent: WebhookEvent = {
      id: `wh_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      flowId,
      event,
      data,
      receivedAt: new Date(),
      status: "pending",
    }

    this.events.set(webhookEvent.id, webhookEvent)

    // Queue for processing
    this.processWebhook(webhookEvent.id)

    return webhookEvent.id
  }

  private async processWebhook(webhookId: string) {
    const event = this.events.get(webhookId)
    if (!event) return

    try {
      event.status = "processing"
      console.log("[v0] Processing webhook:", webhookId)

      // Here you would:
      // 1. Load the workflow
      // 2. Find the appropriate trigger node
      // 3. Execute the workflow with the webhook data
      // 4. Update variables with webhook payload

      // Simulate processing
      await new Promise((resolve) => setTimeout(resolve, 100))

      event.status = "completed"
      event.processedAt = new Date()
      console.log("[v0] Webhook processed successfully:", webhookId)
    } catch (error) {
      event.status = "failed"
      event.error = error instanceof Error ? error.message : "Unknown error"
      console.error("[v0] Webhook processing failed:", webhookId, error)
    }
  }

  async sendWebhook(
    webhookUrl: string,
    event: string,
    data: Record<string, unknown>,
    secret?: string,
  ): Promise<boolean> {
    try {
      const payload = {
        event,
        data,
        timestamp: new Date().toISOString(),
        source: "crypto-trading-workflow",
      }

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      }

      if (secret) {
        headers["X-Webhook-Secret"] = secret
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      })

      return response.ok
    } catch (error) {
      console.error("[v0] Failed to send webhook:", error)
      return false
    }
  }

  getWebhookStatus(webhookId: string): WebhookEvent | undefined {
    return this.events.get(webhookId)
  }

  getWebhooksByFlow(flowId: string): WebhookEvent[] {
    return Array.from(this.events.values()).filter((event) => event.flowId === flowId)
  }
}

export const webhookService = new WebhookService()
