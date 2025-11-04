import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
})

export const STRIPE_PLANS = {
  starter: {
    name: "Starter",
    price: 29,
    priceId: process.env.STRIPE_STARTER_PRICE_ID || "price_starter",
    features: ["5 Active MODS", "10 Connectors", "10,000 API Calls/month", "Email Support", "Basic Analytics"],
  },
  professional: {
    name: "Professional",
    price: 99,
    priceId: process.env.STRIPE_PRO_PRICE_ID || "price_professional",
    features: [
      "Unlimited MODS",
      "50+ Connectors",
      "100,000 API Calls/month",
      "Priority Support",
      "Advanced Analytics",
      "Custom Workflows",
      "Team Collaboration",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: 299,
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || "price_enterprise",
    features: [
      "Everything in Professional",
      "Unlimited API Calls",
      "Dedicated Support",
      "Custom Integrations",
      "SLA Guarantee",
      "White Label Options",
      "Advanced Security",
    ],
  },
}
