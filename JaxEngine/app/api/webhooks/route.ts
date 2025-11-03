import { type NextRequest, NextResponse } from "next/server"
import { createWebhook, getAllWebhooks, deleteWebhook, updateWebhook } from "@/lib/webhook-manager"

export async function GET() {
  try {
    const webhooks = getAllWebhooks()
    return NextResponse.json({ webhooks })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch webhooks" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, type, url, events, active, secret, headers } = body

    if (!name || !type || !url || !events) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const webhook = createWebhook({
      name,
      type,
      url,
      events,
      active: active ?? true,
      secret,
      headers,
    })

    return NextResponse.json({ webhook }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create webhook" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ error: "Webhook ID required" }, { status: 400 })
    }

    const webhook = updateWebhook(id, updates)

    if (!webhook) {
      return NextResponse.json({ error: "Webhook not found" }, { status: 404 })
    }

    return NextResponse.json({ webhook })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update webhook" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Webhook ID required" }, { status: 400 })
    }

    const deleted = deleteWebhook(id)

    if (!deleted) {
      return NextResponse.json({ error: "Webhook not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete webhook" }, { status: 500 })
  }
}
