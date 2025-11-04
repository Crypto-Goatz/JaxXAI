export interface Webhook {
  id: string
  name: string
  type: "incoming" | "outgoing"
  url: string
  events: string[]
  active: boolean
  secret?: string
  headers?: Record<string, string>
  createdAt: Date
  lastTriggered?: Date
  triggerCount: number
}

export interface WebhookLog {
  id: string
  webhookId: string
  timestamp: Date
  event: string
  payload: any
  response?: any
  status: "success" | "failed"
  error?: string
}

// In-memory storage (in production, use a database)
const webhooks: Map<string, Webhook> = new Map()
const webhookLogs: Map<string, WebhookLog[]> = new Map()

export function createWebhook(webhook: Omit<Webhook, "id" | "createdAt" | "triggerCount">): Webhook {
  const id = `wh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  const newWebhook: Webhook = {
    ...webhook,
    id,
    createdAt: new Date(),
    triggerCount: 0,
  }
  webhooks.set(id, newWebhook)
  webhookLogs.set(id, [])
  return newWebhook
}

export function getWebhook(id: string): Webhook | undefined {
  return webhooks.get(id)
}

export function getAllWebhooks(): Webhook[] {
  return Array.from(webhooks.values())
}

export function updateWebhook(id: string, updates: Partial<Webhook>): Webhook | undefined {
  const webhook = webhooks.get(id)
  if (!webhook) return undefined

  const updated = { ...webhook, ...updates }
  webhooks.set(id, updated)
  return updated
}

export function deleteWebhook(id: string): boolean {
  webhookLogs.delete(id)
  return webhooks.delete(id)
}

export function logWebhookTrigger(log: Omit<WebhookLog, "id" | "timestamp">): void {
  const webhook = webhooks.get(log.webhookId)
  if (!webhook) return

  const logEntry: WebhookLog = {
    ...log,
    id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(),
  }

  const logs = webhookLogs.get(log.webhookId) || []
  logs.unshift(logEntry)
  webhookLogs.set(log.webhookId, logs.slice(0, 100)) // Keep last 100 logs

  // Update webhook stats
  webhook.lastTriggered = new Date()
  webhook.triggerCount++
  webhooks.set(webhook.id, webhook)
}

export function getWebhookLogs(webhookId: string, limit = 50): WebhookLog[] {
  const logs = webhookLogs.get(webhookId) || []
  return logs.slice(0, limit)
}

export async function sendWebhook(webhook: Webhook, event: string, payload: any): Promise<void> {
  if (!webhook.active) {
    throw new Error("Webhook is not active")
  }

  if (!webhook.events.includes(event) && !webhook.events.includes("*")) {
    return // Event not subscribed
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "X-Webhook-Event": event,
      "X-Webhook-ID": webhook.id,
      ...webhook.headers,
    }

    if (webhook.secret) {
      // Add signature for verification
      const signature = await generateWebhookSignature(payload, webhook.secret)
      headers["X-Webhook-Signature"] = signature
    }

    const response = await fetch(webhook.url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        event,
        timestamp: new Date().toISOString(),
        data: payload,
      }),
    })

    const responseData = await response.json().catch(() => null)

    logWebhookTrigger({
      webhookId: webhook.id,
      event,
      payload,
      response: responseData,
      status: response.ok ? "success" : "failed",
      error: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`,
    })

    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    logWebhookTrigger({
      webhookId: webhook.id,
      event,
      payload,
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown error",
    })
    throw error
  }
}

async function generateWebhookSignature(payload: any, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(JSON.stringify(payload))
  const key = encoder.encode(secret)

  // Simple HMAC-like signature (in production, use proper crypto)
  const combined = new Uint8Array([...key, ...data])
  const hashBuffer = await crypto.subtle.digest("SHA-256", combined)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export function verifyWebhookSignature(payload: any, signature: string, secret: string): Promise<boolean> {
  return generateWebhookSignature(payload, secret).then((expected) => expected === signature)
}
