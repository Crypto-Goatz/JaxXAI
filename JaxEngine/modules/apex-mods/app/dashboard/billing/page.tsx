"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Calendar, TrendingUp, Download, CheckCircle2 } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

export default function BillingPage() {
  const [loading, setLoading] = useState(false)

  const currentPlan = {
    name: "Professional",
    price: 99,
    billingCycle: "monthly",
    nextBillingDate: "Dec 15, 2024",
    status: "active",
  }

  const billingHistory = [
    { id: 1, date: "Nov 15, 2024", amount: "$99.00", status: "paid", invoice: "INV-001" },
    { id: 2, date: "Oct 15, 2024", amount: "$99.00", status: "paid", invoice: "INV-002" },
    { id: 3, date: "Sep 15, 2024", amount: "$99.00", status: "paid", invoice: "INV-003" },
  ]

  const handleUpgrade = async (planId: string) => {
    setLoading(true)
    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("[v0] Checkout error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-red-500/5 to-yellow-500/5 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-8 py-8 relative">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Billing & Subscription</h1>
          <p className="text-white/60">Manage your subscription and billing information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-white/60">Current Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-white">${currentPlan.price}</span>
                <span className="text-white/40 text-sm">/month</span>
              </div>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 mb-3">
                {currentPlan.name}
              </Badge>
              <p className="text-xs text-white/60">Billed {currentPlan.billingCycle}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-white/60">Next Billing Date</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-500" />
                </div>
                <span className="text-xl font-semibold text-white">{currentPlan.nextBillingDate}</span>
              </div>
              <p className="text-xs text-white/60">Auto-renewal enabled</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-white/60">Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">•••• 4242</p>
                  <p className="text-xs text-white/40">Expires 12/25</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-white/20 text-white/80 hover:bg-white/5 bg-transparent"
              >
                Update Card
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Upgrade Your Plan</CardTitle>
                <CardDescription className="text-white/60">Unlock more features and higher limits</CardDescription>
              </div>
              <TrendingUp className="w-6 h-6 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10">
                <h3 className="text-lg font-bold text-white mb-2">Enterprise</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-white">$299</span>
                  <span className="text-white/40 text-sm">/month</span>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Unlimited API Calls
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Dedicated Support
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Custom Integrations
                  </li>
                </ul>
                <Button
                  onClick={() => handleUpgrade("enterprise")}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  {loading ? "Processing..." : "Upgrade to Enterprise"}
                </Button>
              </div>

              <div className="p-4 rounded-lg border border-white/10 bg-white/5">
                <h3 className="text-lg font-bold text-white mb-2">Starter</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-white">$29</span>
                  <span className="text-white/40 text-sm">/month</span>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />5 Active MODS
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    10 Connectors
                  </li>
                  <li className="flex items-center gap-2 text-sm text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    10K API Calls/month
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white/80 hover:bg-white/5 bg-transparent"
                >
                  Downgrade to Starter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Billing History</CardTitle>
            <CardDescription className="text-white/60">Your past invoices and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {billingHistory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{item.invoice}</p>
                      <p className="text-xs text-white/40">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-white">{item.amount}</span>
                    <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
