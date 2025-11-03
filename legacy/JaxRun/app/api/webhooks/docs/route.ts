import { NextResponse } from "next/server"

export async function GET() {
  const documentation = {
    service: "Crypto Trading Workflow Webhooks",
    version: "1.0.0",
    endpoints: {
      inbound: {
        url: "/api/webhooks/inbound",
        method: "POST",
        description: "Receive webhooks from external services to trigger workflows",
        payload: {
          flowId: "string (required) - The workflow ID to trigger",
          event: "string (required) - Event type (e.g., 'price_alert', 'signal_triggered')",
          data: "object (optional) - Event-specific data",
          secret: "string (optional) - Webhook secret for validation",
        },
        example: {
          flowId: "1",
          event: "price_alert",
          data: {
            symbol: "BTC/USDT",
            price: 50000,
            condition: "above",
            timestamp: new Date().toISOString(),
          },
          secret: "your_webhook_secret",
        },
      },
      outbound: {
        url: "/api/webhooks/outbound",
        method: "POST",
        description: "Send webhooks to external services (internal use)",
        payload: {
          webhookUrl: "string (required) - Destination URL",
          event: "string (required) - Event type",
          data: "object (required) - Event data",
          secret: "string (optional) - Webhook secret",
        },
      },
    },
    eventTypes: [
      "price_alert",
      "signal_triggered",
      "trade_executed",
      "condition_met",
      "risk_threshold_reached",
      "workflow_started",
      "workflow_completed",
      "workflow_error",
    ],
  }

  return NextResponse.json(documentation, {
    headers: {
      "Content-Type": "application/json",
    },
  })
}
