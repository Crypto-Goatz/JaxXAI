import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import type Stripe from "stripe"

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || "")
  } catch (error) {
    console.error("[v0] Webhook signature verification failed:", error)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  console.log("[v0] Stripe webhook event:", event.type)

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session
      console.log("[v0] Checkout completed:", session.id)
      break

    case "customer.subscription.created":
      const subscription = event.data.object as Stripe.Subscription
      console.log("[v0] Subscription created:", subscription.id)
      break

    case "customer.subscription.updated":
      const updatedSubscription = event.data.object as Stripe.Subscription
      console.log("[v0] Subscription updated:", updatedSubscription.id)
      break

    case "customer.subscription.deleted":
      const deletedSubscription = event.data.object as Stripe.Subscription
      console.log("[v0] Subscription deleted:", deletedSubscription.id)
      break

    default:
      console.log("[v0] Unhandled event type:", event.type)
  }

  return NextResponse.json({ received: true })
}
