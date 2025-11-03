"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Zap,
  ArrowRight,
  Send,
  Database,
  Mail,
  MessageSquare,
  FileText,
  Globe,
  Sparkles,
  Webhook,
  Clock,
  Filter,
  GitBranch,
  CreditCard,
  Coins,
  BarChart3,
  ShoppingCart,
  Shield,
} from "lucide-react"

// Endpoint definitions with their capabilities
const endpoints = [
  // Triggers (Inbound)
  {
    id: "webhook-trigger",
    name: "Webhook Trigger",
    integration: "Generic",
    icon: Webhook,
    color: "from-blue-500 to-cyan-500",
    type: "trigger",
    description: "Receive HTTP webhooks to start flows",
    capabilities: ["Inbound Trigger"],
    endpoints: [
      { method: "POST", path: "/webhook/:id", description: "Receive webhook data" },
      { method: "GET", path: "/webhook/:id/test", description: "Test webhook endpoint" },
    ],
  },
  {
    id: "schedule-trigger",
    name: "Schedule Trigger",
    integration: "Generic",
    icon: Clock,
    color: "from-purple-500 to-pink-500",
    type: "trigger",
    description: "Run flows on a schedule (cron)",
    capabilities: ["Inbound Trigger"],
    endpoints: [
      { method: "POST", path: "/schedule/create", description: "Create scheduled trigger" },
      { method: "GET", path: "/schedule/:id", description: "Get schedule details" },
    ],
  },
  {
    id: "stripe-webhook",
    name: "Stripe Webhook",
    integration: "Stripe",
    icon: CreditCard,
    color: "from-purple-600 to-indigo-600",
    type: "trigger",
    description: "Trigger on Stripe payment events",
    capabilities: ["Inbound Trigger"],
    endpoints: [
      { method: "POST", path: "/stripe/webhook", description: "Receive Stripe events" },
      { method: "GET", path: "/stripe/events", description: "List recent events" },
    ],
  },
  {
    id: "google-sheets-trigger",
    name: "Google Sheets New Row",
    integration: "Google Sheets",
    icon: FileText,
    color: "from-green-500 to-emerald-500",
    type: "trigger",
    description: "Trigger when new row is added",
    capabilities: ["Inbound Trigger", "Action"],
    endpoints: [
      { method: "GET", path: "/sheets/:id/watch", description: "Watch for new rows" },
      { method: "GET", path: "/sheets/:id/rows", description: "Get all rows" },
    ],
  },

  // Actions (During Flow)
  {
    id: "google-sheets-action",
    name: "Google Sheets",
    integration: "Google Sheets",
    icon: FileText,
    color: "from-green-500 to-emerald-500",
    type: "action",
    description: "Read, write, update spreadsheet data",
    capabilities: ["Action", "Outbound Action"],
    endpoints: [
      { method: "POST", path: "/sheets/:id/rows", description: "Add new row" },
      { method: "PUT", path: "/sheets/:id/rows/:rowId", description: "Update row" },
      { method: "GET", path: "/sheets/:id/rows", description: "Get rows" },
      { method: "DELETE", path: "/sheets/:id/rows/:rowId", description: "Delete row" },
    ],
  },
  {
    id: "database-action",
    name: "Database Query",
    integration: "Firebase/Supabase",
    icon: Database,
    color: "from-blue-500 to-cyan-500",
    type: "action",
    description: "Query and update database records",
    capabilities: ["Action", "Outbound Action"],
    endpoints: [
      { method: "POST", path: "/db/query", description: "Execute query" },
      { method: "POST", path: "/db/insert", description: "Insert records" },
      { method: "PUT", path: "/db/update", description: "Update records" },
      { method: "DELETE", path: "/db/delete", description: "Delete records" },
    ],
  },
  {
    id: "ai-process",
    name: "AI Processing",
    integration: "OpenAI/Gemini/Grok",
    icon: Sparkles,
    color: "from-violet-500 to-purple-500",
    type: "action",
    description: "Process data with AI models",
    capabilities: ["Action"],
    endpoints: [
      { method: "POST", path: "/ai/chat", description: "Chat completion" },
      { method: "POST", path: "/ai/analyze", description: "Analyze text/data" },
      { method: "POST", path: "/ai/generate", description: "Generate content" },
    ],
  },
  {
    id: "filter-action",
    name: "Filter Data",
    integration: "Generic",
    icon: Filter,
    color: "from-orange-500 to-red-500",
    type: "action",
    description: "Filter and transform data",
    capabilities: ["Action"],
    endpoints: [
      { method: "POST", path: "/filter/condition", description: "Apply conditions" },
      { method: "POST", path: "/filter/transform", description: "Transform data" },
    ],
  },
  {
    id: "branch-action",
    name: "Branch Logic",
    integration: "Generic",
    icon: GitBranch,
    color: "from-teal-500 to-cyan-500",
    type: "action",
    description: "Split flow into multiple paths",
    capabilities: ["Action"],
    endpoints: [{ method: "POST", path: "/branch/evaluate", description: "Evaluate conditions" }],
  },

  // Outbound Actions
  {
    id: "email-send",
    name: "Send Email",
    integration: "SMTP/SendGrid",
    icon: Mail,
    color: "from-purple-500 to-pink-500",
    type: "outbound",
    description: "Send email notifications",
    capabilities: ["Outbound Action"],
    endpoints: [
      { method: "POST", path: "/email/send", description: "Send email" },
      { method: "POST", path: "/email/template", description: "Send templated email" },
    ],
  },
  {
    id: "webhook-send",
    name: "Send Webhook",
    integration: "Generic",
    icon: Send,
    color: "from-indigo-500 to-purple-500",
    type: "outbound",
    description: "Send HTTP request to external service",
    capabilities: ["Outbound Action"],
    endpoints: [
      { method: "POST", path: "/webhook/send", description: "Send webhook" },
      { method: "POST", path: "/webhook/batch", description: "Send multiple webhooks" },
    ],
  },
  {
    id: "chat-message",
    name: "Send Chat Message",
    integration: "Discord/Slack",
    icon: MessageSquare,
    color: "from-blue-500 to-indigo-500",
    type: "outbound",
    description: "Send message to chat platform",
    capabilities: ["Outbound Action"],
    endpoints: [
      { method: "POST", path: "/chat/send", description: "Send message" },
      { method: "POST", path: "/chat/channel", description: "Send to channel" },
    ],
  },
  {
    id: "api-call",
    name: "API Call",
    integration: "Generic",
    icon: Globe,
    color: "from-cyan-500 to-blue-500",
    type: "outbound",
    description: "Call any external API",
    capabilities: ["Action", "Outbound Action"],
    endpoints: [
      { method: "POST", path: "/api/call", description: "Make API request" },
      { method: "POST", path: "/api/batch", description: "Batch API calls" },
    ],
  },

  // Crypto & Blockchain
  {
    id: "dextools-api",
    name: "DexTools API",
    integration: "DexTools",
    icon: BarChart3,
    color: "from-cyan-600 to-blue-600",
    type: "action",
    description: "Get DEX trading data and analytics",
    capabilities: ["Action"],
    endpoints: [
      { method: "GET", path: "/dextools/token/:address", description: "Get token info" },
      { method: "GET", path: "/dextools/pairs/:address", description: "Get trading pairs" },
      { method: "GET", path: "/dextools/price/:address", description: "Get token price" },
    ],
  },
  {
    id: "crypto-wallet",
    name: "Crypto Wallet Tracker",
    integration: "Blockchain",
    icon: Coins,
    color: "from-yellow-500 to-orange-500",
    type: "trigger",
    description: "Monitor wallet transactions",
    capabilities: ["Inbound Trigger", "Action"],
    endpoints: [
      { method: "GET", path: "/wallet/:address/balance", description: "Get wallet balance" },
      { method: "GET", path: "/wallet/:address/transactions", description: "Get transactions" },
      { method: "POST", path: "/wallet/:address/watch", description: "Watch wallet" },
    ],
  },

  // E-commerce
  {
    id: "woocommerce",
    name: "WooCommerce",
    integration: "WooCommerce",
    icon: ShoppingCart,
    color: "from-purple-600 to-pink-600",
    type: "trigger",
    description: "E-commerce order events",
    capabilities: ["Inbound Trigger", "Action"],
    endpoints: [
      { method: "GET", path: "/woocommerce/orders", description: "Get orders" },
      { method: "POST", path: "/woocommerce/orders", description: "Create order" },
      { method: "PUT", path: "/woocommerce/orders/:id", description: "Update order" },
    ],
  },

  // Security
  {
    id: "recaptcha",
    name: "reCAPTCHA Verify",
    integration: "Google reCAPTCHA",
    icon: Shield,
    color: "from-red-500 to-orange-500",
    type: "action",
    description: "Verify reCAPTCHA tokens",
    capabilities: ["Action"],
    endpoints: [{ method: "POST", path: "/recaptcha/verify", description: "Verify token" }],
  },
]

export default function EndpointsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  const filteredEndpoints = endpoints.filter((endpoint) => {
    const matchesSearch =
      endpoint.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      endpoint.integration.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = selectedType === "all" || endpoint.type === selectedType

    return matchesSearch && matchesType
  })

  const triggerEndpoints = filteredEndpoints.filter((e) => e.type === "trigger")
  const actionEndpoints = filteredEndpoints.filter((e) => e.type === "action")
  const outboundEndpoints = filteredEndpoints.filter((e) => e.type === "outbound")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white text-black">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <h1 className="text-4xl font-bold">Endpoints Library</h1>
          <p className="text-lg text-black/90 max-w-3xl leading-relaxed">
            Complete reference of all available endpoints and API features. Use these in APEX Flow to build powerful
            automations with any combination of triggers, actions, and outputs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Search and Stats */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search endpoints, integrations, or capabilities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={selectedType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("all")}
              >
                All
              </Button>
              <Button
                variant={selectedType === "trigger" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("trigger")}
              >
                Triggers
              </Button>
              <Button
                variant={selectedType === "action" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("action")}
              >
                Actions
              </Button>
              <Button
                variant={selectedType === "outbound" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("outbound")}
              >
                Outbound
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>{triggerEndpoints.length} Triggers</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-500" />
              <span>{actionEndpoints.length} Actions</span>
            </div>
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4 text-purple-500" />
              <span>{outboundEndpoints.length} Outbound</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Endpoints ({filteredEndpoints.length})</TabsTrigger>
            <TabsTrigger value="triggers">
              <Zap className="w-4 h-4 mr-2" />
              Triggers ({triggerEndpoints.length})
            </TabsTrigger>
            <TabsTrigger value="actions">
              <ArrowRight className="w-4 h-4 mr-2" />
              Actions ({actionEndpoints.length})
            </TabsTrigger>
            <TabsTrigger value="outbound">
              <Send className="w-4 h-4 mr-2" />
              Outbound ({outboundEndpoints.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredEndpoints.map((endpoint) => (
              <EndpointCard key={endpoint.id} endpoint={endpoint} />
            ))}
          </TabsContent>

          <TabsContent value="triggers" className="space-y-4">
            {triggerEndpoints.map((endpoint) => (
              <EndpointCard key={endpoint.id} endpoint={endpoint} />
            ))}
          </TabsContent>

          <TabsContent value="actions" className="space-y-4">
            {actionEndpoints.map((endpoint) => (
              <EndpointCard key={endpoint.id} endpoint={endpoint} />
            ))}
          </TabsContent>

          <TabsContent value="outbound" className="space-y-4">
            {outboundEndpoints.map((endpoint) => (
              <EndpointCard key={endpoint.id} endpoint={endpoint} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function EndpointCard({ endpoint }: { endpoint: any }) {
  const Icon = endpoint.icon

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${endpoint.color} flex items-center justify-center`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="mb-1">{endpoint.name}</CardTitle>
              <CardDescription className="mb-2">{endpoint.description}</CardDescription>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {endpoint.integration}
                </Badge>
                {endpoint.capabilities.map((cap: string) => (
                  <Badge
                    key={cap}
                    variant="outline"
                    className={`text-xs ${
                      cap === "Inbound Trigger"
                        ? "border-yellow-500 text-yellow-500"
                        : cap === "Action"
                          ? "border-blue-500 text-blue-500"
                          : "border-purple-500 text-purple-500"
                    }`}
                  >
                    {cap}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <Button size="sm" variant="outline">
            Use in Flow
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground mb-3">Available Endpoints:</h4>
          {endpoint.endpoints.map((ep: any, idx: number) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
            >
              <Badge
                variant="secondary"
                className={`text-xs font-mono ${
                  ep.method === "GET"
                    ? "bg-green-500/10 text-green-500"
                    : ep.method === "POST"
                      ? "bg-blue-500/10 text-blue-500"
                      : ep.method === "PUT"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : "bg-red-500/10 text-red-500"
                }`}
              >
                {ep.method}
              </Badge>
              <div className="flex-1">
                <code className="text-xs font-mono text-foreground">{ep.path}</code>
                <p className="text-xs text-muted-foreground mt-1">{ep.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
