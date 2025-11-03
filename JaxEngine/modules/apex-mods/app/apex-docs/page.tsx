"use client"

import { useState } from "react"
import { Search, Check, Copy, ChevronDown, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// API Documentation structure for each connector
const apiDocs = {
  saasmod: {
    id: "saasmod",
    name: "SaaS MOD - Complete Integration",
    description: "Full-stack SaaS deployment with Firebase, Google Cloud, and Stripe",
    status: "connected",
    baseUrl: "https://apex-saas-mod.app",
    endpoints: [
      {
        category: "Firebase Authentication",
        methods: [
          {
            name: "Sign Up User",
            method: "POST",
            path: "/auth/signup",
            description: "Create a new user account with email and password",
            parameters: [
              { name: "email", type: "string", required: true, description: "User email address" },
              { name: "password", type: "string", required: true, description: "User password (min 6 characters)" },
              { name: "displayName", type: "string", required: false, description: "User display name" },
            ],
            response: {
              uid: "string",
              email: "string",
              token: "string",
            },
          },
          {
            name: "Sign In User",
            method: "POST",
            path: "/auth/signin",
            description: "Authenticate user with email and password",
            parameters: [
              { name: "email", type: "string", required: true, description: "User email address" },
              { name: "password", type: "string", required: true, description: "User password" },
            ],
            response: {
              uid: "string",
              email: "string",
              token: "string",
            },
          },
        ],
      },
      {
        category: "Stripe Payments",
        methods: [
          {
            name: "Create Checkout Session",
            method: "POST",
            path: "/payments/checkout",
            description: "Create a Stripe checkout session for subscription",
            parameters: [
              { name: "priceId", type: "string", required: true, description: "Stripe price ID" },
              { name: "customerId", type: "string", required: false, description: "Existing customer ID" },
            ],
            response: {
              sessionId: "string",
              url: "string",
            },
          },
          {
            name: "Get Subscription Status",
            method: "GET",
            path: "/payments/subscription/:userId",
            description: "Get user's current subscription status",
            parameters: [{ name: "userId", type: "string", required: true, description: "User ID" }],
            response: {
              status: "string",
              currentPeriodEnd: "number",
              cancelAtPeriodEnd: "boolean",
            },
          },
        ],
      },
      {
        category: "Google Cloud Run",
        methods: [
          {
            name: "Deploy Service",
            method: "POST",
            path: "/deploy/service",
            description: "Deploy a new Cloud Run service",
            parameters: [
              { name: "serviceName", type: "string", required: true, description: "Service name" },
              { name: "image", type: "string", required: true, description: "Container image URL" },
              { name: "region", type: "string", required: false, description: "Deployment region" },
            ],
            response: {
              serviceUrl: "string",
              status: "string",
            },
          },
        ],
      },
    ],
    capabilities: [
      "Complete user authentication with Firebase",
      "Subscription payment processing with Stripe",
      "Serverless backend deployment on Google Cloud Run",
      "Frontend hosting with Firebase Hosting",
      "Google Workspace API integration",
      "Automated CI/CD pipeline",
      "Environment variable management",
      "Custom domain and SSL setup",
    ],
  },
  dextools: {
    id: "dextools",
    name: "DexTools API",
    description: "DEX trading and charting tools with comprehensive market data",
    status: "connected",
    baseUrl: "https://api.dextools.io/v1",
    endpoints: [
      {
        category: "Token Information",
        methods: [
          {
            name: "Get Token Info",
            method: "GET",
            path: "/token/:chain/:address",
            description: "Retrieve detailed information about a specific token",
            parameters: [
              { name: "chain", type: "string", required: true, description: "Blockchain network (e.g., ether, bsc)" },
              { name: "address", type: "string", required: true, description: "Token contract address" },
            ],
            response: {
              name: "string",
              symbol: "string",
              decimals: "number",
              totalSupply: "string",
              price: "number",
            },
          },
          {
            name: "Get Token Price",
            method: "GET",
            path: "/token/:chain/:address/price",
            description: "Get current price and price change data for a token",
            parameters: [
              { name: "chain", type: "string", required: true, description: "Blockchain network" },
              { name: "address", type: "string", required: true, description: "Token contract address" },
            ],
            response: {
              price: "number",
              priceChange24h: "number",
              volume24h: "number",
            },
          },
        ],
      },
      {
        category: "Pool Information",
        methods: [
          {
            name: "Get Pool Info",
            method: "GET",
            path: "/pool/:chain/:address",
            description: "Retrieve liquidity pool information",
            parameters: [
              { name: "chain", type: "string", required: true, description: "Blockchain network" },
              { name: "address", type: "string", required: true, description: "Pool contract address" },
            ],
            response: {
              token0: "object",
              token1: "object",
              liquidity: "string",
              volume24h: "number",
            },
          },
          {
            name: "Get Pool Transactions",
            method: "GET",
            path: "/pool/:chain/:address/transactions",
            description: "Get recent transactions for a liquidity pool",
            parameters: [
              { name: "chain", type: "string", required: true, description: "Blockchain network" },
              { name: "address", type: "string", required: true, description: "Pool contract address" },
              { name: "limit", type: "number", required: false, description: "Number of transactions to return" },
            ],
            response: {
              transactions: "array",
              count: "number",
            },
          },
        ],
      },
      {
        category: "Market Data",
        methods: [
          {
            name: "Get Hot Pairs",
            method: "GET",
            path: "/ranking/:chain/hotpairs",
            description: "Get trending trading pairs on a specific chain",
            parameters: [
              { name: "chain", type: "string", required: true, description: "Blockchain network" },
              { name: "limit", type: "number", required: false, description: "Number of pairs to return" },
            ],
            response: {
              pairs: "array",
              timestamp: "number",
            },
          },
          {
            name: "Get Chain List",
            method: "GET",
            path: "/blockchain",
            description: "Get list of supported blockchain networks",
            parameters: [],
            response: {
              chains: "array",
            },
          },
        ],
      },
      {
        category: "Analytics",
        methods: [
          {
            name: "Get Token Locks",
            method: "GET",
            path: "/token/:chain/:address/locks",
            description: "Get liquidity lock information for a token",
            parameters: [
              { name: "chain", type: "string", required: true, description: "Blockchain network" },
              { name: "address", type: "string", required: true, description: "Token contract address" },
            ],
            response: {
              locks: "array",
              totalLocked: "string",
            },
          },
          {
            name: "Get Token Holders",
            method: "GET",
            path: "/token/:chain/:address/holders",
            description: "Get top holders of a specific token",
            parameters: [
              { name: "chain", type: "string", required: true, description: "Blockchain network" },
              { name: "address", type: "string", required: true, description: "Token contract address" },
            ],
            response: {
              holders: "array",
              totalHolders: "number",
            },
          },
        ],
      },
    ],
    capabilities: [
      "Real-time token price tracking across multiple chains",
      "Liquidity pool analysis and monitoring",
      "Trading pair discovery and trending tokens",
      "Token holder and lock information",
      "Transaction history and volume analytics",
      "Multi-chain support (Ethereum, BSC, Polygon, etc.)",
    ],
  },
}

export default function ApexDocsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})
  const [copiedPath, setCopiedPath] = useState<string | null>(null)

  const connectedIntegrations = Object.values(apiDocs).filter((doc) => doc.status === "connected")

  const toggleCategory = (integrationId: string, category: string) => {
    const key = `${integrationId}-${category}`
    setExpandedCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedPath(text)
    setTimeout(() => setCopiedPath(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background dark">
      <main className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">APEX Docs</h1>
          <p className="text-muted-foreground text-lg">
            API documentation for all connected integrations. These capabilities are now available through APEX.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search endpoints..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border text-foreground"
            />
          </div>
        </div>

        {/* Connected Integrations Count */}
        <div className="mb-6">
          <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
            {connectedIntegrations.length} Integration{connectedIntegrations.length !== 1 ? "s" : ""} Connected
          </Badge>
        </div>

        {/* API Documentation */}
        <div className="space-y-8">
          {connectedIntegrations.map((integration) => (
            <div key={integration.id} className="bg-card border border-border rounded-xl p-6">
              {/* Integration Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-2xl font-bold text-foreground">{integration.name}</h2>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                    <Check className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">{integration.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Base URL:</span>
                  <code className="bg-background px-2 py-1 rounded text-foreground font-mono text-xs">
                    {integration.baseUrl}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => copyToClipboard(integration.baseUrl)}
                  >
                    {copiedPath === integration.baseUrl ? (
                      <Check className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Capabilities */}
              <div className="mb-6 p-4 bg-background rounded-lg border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-3">APEX Capabilities Unlocked:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {integration.capabilities.map((capability, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Endpoints by Category */}
              <div className="space-y-4">
                {integration.endpoints.map((category) => {
                  const categoryKey = `${integration.id}-${category.category}`
                  const isExpanded = expandedCategories[categoryKey]

                  return (
                    <div key={category.category} className="border border-border rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleCategory(integration.id, category.category)}
                        className="w-full flex items-center justify-between p-4 bg-background hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          )}
                          <h4 className="font-semibold text-foreground">{category.category}</h4>
                          <Badge variant="outline" className="text-xs">
                            {category.methods.length} endpoint{category.methods.length !== 1 ? "s" : ""}
                          </Badge>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="p-4 space-y-4 bg-card">
                          {category.methods.map((method, index) => (
                            <div key={index} className="border border-border rounded-lg p-4 bg-background">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge
                                      variant="outline"
                                      className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-mono text-xs"
                                    >
                                      {method.method}
                                    </Badge>
                                    <code className="text-sm font-mono text-foreground">{method.path}</code>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0"
                                      onClick={() => copyToClipboard(integration.baseUrl + method.path)}
                                    >
                                      {copiedPath === integration.baseUrl + method.path ? (
                                        <Check className="w-3 h-3 text-green-500" />
                                      ) : (
                                        <Copy className="w-3 h-3" />
                                      )}
                                    </Button>
                                  </div>
                                  <h5 className="font-semibold text-foreground">{method.name}</h5>
                                  <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
                                </div>
                              </div>

                              {/* Parameters */}
                              {method.parameters.length > 0 && (
                                <div className="mt-4">
                                  <h6 className="text-xs font-semibold text-foreground mb-2">Parameters:</h6>
                                  <div className="space-y-2">
                                    {method.parameters.map((param, paramIndex) => (
                                      <div
                                        key={paramIndex}
                                        className="flex items-start gap-3 text-xs bg-card p-2 rounded border border-border"
                                      >
                                        <code className="font-mono text-blue-400">{param.name}</code>
                                        <Badge variant="outline" className="text-xs">
                                          {param.type}
                                        </Badge>
                                        {param.required && (
                                          <Badge variant="outline" className="text-xs bg-red-500/10 text-red-500">
                                            required
                                          </Badge>
                                        )}
                                        <span className="text-muted-foreground flex-1">{param.description}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Response */}
                              <div className="mt-4">
                                <h6 className="text-xs font-semibold text-foreground mb-2">Response:</h6>
                                <pre className="bg-card p-3 rounded border border-border text-xs font-mono text-foreground overflow-x-auto">
                                  {JSON.stringify(method.response, null, 2)}
                                </pre>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {connectedIntegrations.length === 0 && (
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <p className="text-muted-foreground mb-4">No integrations connected yet.</p>
            <Button asChild>
              <a href="/connectors">Browse Connectors</a>
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
