"use client"

import { useState } from "react"
import {
  Search,
  Plug,
  Database,
  CreditCard,
  MessageSquare,
  BarChart3,
  Zap,
  Bot,
  Coins,
  Code,
  Megaphone,
  ShoppingCart,
  Shield,
  ExternalLink,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const categories = [
  { id: "all", name: "All", icon: Plug },
  { id: "ai", name: "AI & ML", icon: Bot },
  { id: "crypto", name: "Crypto & Blockchain", icon: Coins },
  { id: "payment", name: "Payment", icon: CreditCard },
  { id: "database", name: "Database", icon: Database },
  { id: "development", name: "Development", icon: Code },
  { id: "analytics", name: "Analytics", icon: BarChart3 },
  { id: "marketing", name: "Marketing & CRM", icon: Megaphone },
  { id: "ecommerce", name: "E-commerce", icon: ShoppingCart },
  { id: "communication", name: "Communication", icon: MessageSquare },
  { id: "security", name: "Security", icon: Shield },
  { id: "automation", name: "Automation", icon: Zap },
]

const integrations = [
  // AI & ML
  {
    id: 1,
    name: "MEOW Apps AI Engine",
    description: "Advanced AI engine for intelligent automation",
    category: "ai",
    status: "available",
    logo: "🤖",
    color: "bg-violet-500",
  },
  {
    id: 2,
    name: "DeepSeek API",
    description: "Deep learning and AI model API",
    category: "ai",
    status: "available",
    logo: "🧠",
    color: "bg-indigo-500",
  },
  {
    id: 3,
    name: "Google Gemini",
    description: "Google's multimodal AI model",
    category: "ai",
    status: "available",
    logo: "✨",
    color: "bg-blue-500",
  },
  {
    id: 4,
    name: "Grok xAI",
    description: "xAI's conversational AI platform",
    category: "ai",
    status: "available",
    logo: "🚀",
    color: "bg-slate-700",
  },
  {
    id: 5,
    name: "GROQ",
    description: "Ultra-fast AI inference engine",
    category: "ai",
    status: "available",
    logo: "⚡",
    color: "bg-orange-500",
  },

  // Crypto & Blockchain
  {
    id: 6,
    name: "Binance API",
    description: "World's largest crypto exchange API",
    category: "crypto",
    status: "available",
    logo: "🟡",
    color: "bg-yellow-500",
  },
  {
    id: 7,
    name: "Coinbase API",
    description: "Secure cryptocurrency exchange platform",
    category: "crypto",
    status: "available",
    logo: "🔵",
    color: "bg-blue-600",
  },
  {
    id: 8,
    name: "CoinGecko",
    description: "Comprehensive crypto market data",
    category: "crypto",
    status: "available",
    logo: "🦎",
    color: "bg-green-500",
  },
  {
    id: 9,
    name: "CoinGlass API",
    description: "Crypto derivatives and futures data",
    category: "crypto",
    status: "available",
    logo: "📊",
    color: "bg-cyan-500",
  },
  {
    id: 10,
    name: "CoinLayer",
    description: "Real-time crypto exchange rates",
    category: "crypto",
    status: "available",
    logo: "💱",
    color: "bg-teal-500",
  },
  {
    id: 11,
    name: "CoinMarketCap API",
    description: "Leading crypto market cap tracker",
    category: "crypto",
    status: "available",
    logo: "📈",
    color: "bg-blue-500",
  },
  {
    id: 12,
    name: "CryptoCompare",
    description: "Crypto data and market analysis",
    category: "crypto",
    status: "available",
    logo: "🔍",
    color: "bg-purple-500",
  },
  {
    id: 13,
    name: "Crypto Wallet Tracker",
    description: "Track and monitor crypto wallets",
    category: "crypto",
    status: "available",
    logo: "👛",
    color: "bg-indigo-500",
  },
  {
    id: 14,
    name: "Cryptometer.io",
    description: "Crypto market sentiment analysis",
    category: "crypto",
    status: "available",
    logo: "🎯",
    color: "bg-red-500",
  },
  {
    id: 15,
    name: "DeBank",
    description: "DeFi portfolio tracker",
    category: "crypto",
    status: "available",
    logo: "🏦",
    color: "bg-emerald-500",
  },
  {
    id: 16,
    name: "DeFi Llama",
    description: "DeFi TVL and analytics platform",
    category: "crypto",
    status: "available",
    logo: "🦙",
    color: "bg-blue-400",
  },
  {
    id: 17,
    name: "DexTools API",
    description: "DEX trading and charting tools with comprehensive market data",
    category: "crypto",
    status: "available",
    logo: "🛠️",
    color: "bg-cyan-600",
    hasApiDocs: true, // Added flag to indicate API docs are available
  },
  {
    id: 18,
    name: "DIAData",
    description: "Decentralized financial data oracle",
    category: "crypto",
    status: "available",
    logo: "💎",
    color: "bg-pink-500",
  },
  {
    id: 19,
    name: "Kraken API",
    description: "Professional crypto trading platform",
    category: "crypto",
    status: "available",
    logo: "🐙",
    color: "bg-purple-600",
  },
  {
    id: 20,
    name: "LunarCrush",
    description: "Social sentiment for crypto markets",
    category: "crypto",
    status: "available",
    logo: "🌙",
    color: "bg-indigo-600",
  },
  {
    id: 21,
    name: "OKX JaxBot",
    description: "OKX trading bot integration",
    category: "crypto",
    status: "available",
    logo: "🤖",
    color: "bg-slate-600",
  },
  {
    id: 22,
    name: "OKX Trading API",
    description: "OKX exchange trading API",
    category: "crypto",
    status: "available",
    logo: "⚙️",
    color: "bg-gray-700",
  },
  {
    id: 23,
    name: "Token Metrics API",
    description: "AI-powered crypto analytics",
    category: "crypto",
    status: "available",
    logo: "📊",
    color: "bg-blue-700",
  },
  {
    id: 24,
    name: "Tokenomist",
    description: "Token unlock and vesting schedules",
    category: "crypto",
    status: "available",
    logo: "🔓",
    color: "bg-orange-600",
  },

  // Payment
  {
    id: 25,
    name: "Stripe API",
    description: "Complete payment infrastructure",
    category: "payment",
    status: "available",
    logo: "💳",
    color: "bg-purple-500",
  },
  {
    id: 26,
    name: "Stripe Webhook",
    description: "Real-time payment event notifications",
    category: "payment",
    status: "available",
    logo: "🔔",
    color: "bg-purple-600",
  },
  {
    id: 27,
    name: "PayPal",
    description: "Global payment processing platform",
    category: "payment",
    status: "available",
    logo: "💰",
    color: "bg-blue-600",
  },

  // Development
  {
    id: 28,
    name: "API Verve",
    description: "Awesome API connectivity platform",
    category: "development",
    status: "available",
    logo: "🔌",
    color: "bg-green-600",
  },
  {
    id: 29,
    name: "Cloudflare",
    description: "CDN and security platform",
    category: "development",
    status: "available",
    logo: "☁️",
    color: "bg-orange-500",
  },
  {
    id: 50,
    name: "WordPress",
    description: "Open-source CMS and website platform",
    category: "development",
    status: "available",
    logo: "📝",
    color: "bg-blue-700",
  },
  {
    id: 30,
    name: "GitHub OAuth",
    description: "GitHub authentication integration",
    category: "development",
    status: "available",
    logo: "🐙",
    color: "bg-gray-800",
  },
  {
    id: 31,
    name: "GitHub Key",
    description: "GitHub API access token",
    category: "development",
    status: "available",
    logo: "🔑",
    color: "bg-gray-700",
  },
  {
    id: 32,
    name: "Vercel API",
    description: "Vercel platform API integration",
    category: "development",
    status: "available",
    logo: "▲",
    color: "bg-black",
  },
  {
    id: 33,
    name: "Vercel Token",
    description: "Vercel authentication token",
    category: "development",
    status: "available",
    logo: "🎫",
    color: "bg-slate-900",
  },

  // Analytics
  {
    id: 34,
    name: "Flipside",
    description: "Blockchain analytics platform",
    category: "analytics",
    status: "available",
    logo: "📊",
    color: "bg-blue-500",
  },
  {
    id: 35,
    name: "St Louis FED",
    description: "Federal Reserve economic data",
    category: "analytics",
    status: "available",
    logo: "🏛️",
    color: "bg-green-700",
  },

  // Marketing & CRM
  {
    id: 36,
    name: "Go High Level API",
    description: "All-in-one marketing platform",
    category: "marketing",
    status: "available",
    logo: "📱",
    color: "bg-green-600",
  },
  {
    id: 37,
    name: "Go High Level App",
    description: "GHL app integration",
    category: "marketing",
    status: "available",
    logo: "🚀",
    color: "bg-green-500",
  },
  {
    id: 49,
    name: "High Level Marketplace",
    description: "GHL marketplace apps and extensions",
    category: "marketing",
    status: "available",
    logo: "🏪",
    color: "bg-emerald-600",
  },
  {
    id: 38,
    name: "FS Poster",
    description: "Social media auto-posting tool",
    category: "marketing",
    status: "available",
    logo: "📮",
    color: "bg-pink-500",
  },
  {
    id: 39,
    name: "WP Fusion",
    description: "WordPress CRM integration",
    category: "marketing",
    status: "available",
    logo: "🔗",
    color: "bg-blue-600",
  },

  // E-commerce
  {
    id: 40,
    name: "WooCommerce",
    description: "WordPress e-commerce platform",
    category: "ecommerce",
    status: "available",
    logo: "🛒",
    color: "bg-purple-600",
  },
  {
    id: 41,
    name: "WooCommerce Hub",
    description: "WooCommerce REST API integration",
    category: "ecommerce",
    status: "available",
    logo: "🏪",
    color: "bg-purple-500",
  },
  {
    id: 42,
    name: "Brizy",
    description: "Website and landing page builder",
    category: "ecommerce",
    status: "available",
    logo: "🎨",
    color: "bg-cyan-500",
  },

  // Communication
  {
    id: 43,
    name: "Discord",
    description: "Community chat and voice platform",
    category: "communication",
    status: "available",
    logo: "💬",
    color: "bg-indigo-600",
  },
  {
    id: 44,
    name: "X (Twitter)",
    description: "Social media platform integration",
    category: "communication",
    status: "available",
    logo: "🐦",
    color: "bg-sky-500",
  },

  // Security
  {
    id: 45,
    name: "Google reCAPTCHA",
    description: "Bot protection and verification",
    category: "security",
    status: "available",
    logo: "🛡️",
    color: "bg-red-500",
  },
  {
    id: 46,
    name: "FAUST Secret Key",
    description: "Headless WordPress authentication",
    category: "security",
    status: "available",
    logo: "🔐",
    color: "bg-slate-600",
  },
  {
    id: 47,
    name: "WP Access Token",
    description: "WordPress API authentication",
    category: "security",
    status: "available",
    logo: "🎟️",
    color: "bg-blue-700",
  },

  // Database/Data Source
  {
    id: 48,
    name: "Data Source",
    description: "Custom data source integration",
    category: "database",
    status: "available",
    logo: "🗄️",
    color: "bg-gray-600",
  },
]

export default function ConnectorsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [connectDialogOpen, setConnectDialogOpen] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<(typeof integrations)[0] | null>(null)
  const [apiKey, setApiKey] = useState("")
  const [apiSecret, setApiSecret] = useState("")
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right")

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory
    const matchesSearch =
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleCategoryChange = (newCategory: string) => {
    const currentIndex = categories.findIndex((c) => c.id === selectedCategory)
    const newIndex = categories.findIndex((c) => c.id === newCategory)
    setSlideDirection(newIndex > currentIndex ? "right" : "left")
    setSelectedCategory(newCategory)
  }

  const handleConnect = (integration: (typeof integrations)[0]) => {
    setSelectedIntegration(integration)
    setConnectDialogOpen(true)
  }

  const handleSaveConnection = () => {
    console.log("[v0] Connecting to:", selectedIntegration?.name)
    console.log("[v0] API Key:", apiKey)
    console.log("[v0] API Secret:", apiSecret)

    // Here you would typically save to your backend
    setConnectDialogOpen(false)
    setApiKey("")
    setApiSecret("")
    setSelectedIntegration(null)
  }

  return (
    <div className="min-h-screen bg-background dark">
      <main className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Connectors</h1>
          <p className="text-muted-foreground text-lg">
            Connect your favorite tools and services to enhance your workflow
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search connectors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border text-foreground"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {categories.map((category) => {
              const Icon = category.icon
              const isSelected = selectedCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? "bg-foreground text-background shadow-lg scale-105"
                      : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground border border-border"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
          <span>{filteredIntegrations.length} connectors available</span>
          <span>•</span>
          <span>{integrations.filter((i) => i.status === "connected").length} connected</span>
        </div>

        <div className="relative overflow-hidden">
          <div
            key={selectedCategory}
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 slide-${slideDirection}`}
          >
            {filteredIntegrations.map((integration, index) => (
              <div
                key={integration.id}
                className="group relative aspect-square bg-card border border-border rounded-xl overflow-hidden hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-xl hover:scale-105 stagger-animation"
                style={{
                  animationDelay: `${index * 30}ms`,
                }}
              >
                <div
                  className={`absolute inset-0 ${integration.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                />

                <div className="relative h-full flex flex-col items-center justify-between p-4">
                  {/* Top section with logo and badge */}
                  <div className="w-full flex items-start justify-between">
                    <div
                      className={`w-12 h-12 rounded-lg ${integration.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {integration.logo}
                    </div>
                    {integration.status === "connected" && (
                      <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20 text-xs">
                        ✓
                      </Badge>
                    )}
                  </div>

                  {/* Middle section with name and description */}
                  <div className="flex-1 flex flex-col justify-center text-center w-full">
                    <h3 className="text-sm font-semibold mb-1 text-foreground line-clamp-2">{integration.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {integration.description}
                    </p>
                  </div>

                  {/* Bottom section with button */}
                  <Button
                    variant={integration.status === "connected" ? "outline" : "default"}
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => handleConnect(integration)}
                  >
                    {integration.status === "connected" ? "Manage" : "Connect"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredIntegrations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No connectors found matching your search.</p>
          </div>
        )}
      </main>

      <Dialog open={connectDialogOpen} onOpenChange={setConnectDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Connect {selectedIntegration?.name}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Enter your API credentials to connect this integration. Your credentials are stored securely.
              {selectedIntegration?.hasApiDocs && (
                <a
                  href="/apex-docs"
                  className="block mt-2 text-blue-500 hover:text-blue-400 text-sm flex items-center gap-1"
                >
                  View API Documentation
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="apiKey" className="text-foreground">
                API Key
              </Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-background border-border text-foreground"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="apiSecret" className="text-foreground">
                API Secret <span className="text-muted-foreground text-xs">(optional)</span>
              </Label>
              <Input
                id="apiSecret"
                type="password"
                placeholder="Enter your API secret"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                className="bg-background border-border text-foreground"
              />
            </div>

            {selectedIntegration?.hasApiDocs && (
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-xs text-blue-400 leading-relaxed">
                  Once connected, {selectedIntegration.name} capabilities will be available through APEX. You can use
                  plain language commands to access all API features.
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setConnectDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveConnection} disabled={!apiKey}>
              Connect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
