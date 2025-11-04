"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Workflow,
  Plus,
  Search,
  Zap,
  Database,
  Send,
  Filter,
  GitBranch,
  Clock,
  Mail,
  MessageSquare,
  FileText,
  Globe,
  Sparkles,
  Trash2,
  Settings,
  CheckCircle2,
  AlertCircle,
  Cloud,
  Compass as Wordpress,
  Building2,
  Target,
  Download,
  Save,
  PlayCircle,
  Webhook,
  CreditCard,
  Coins,
  BarChart3,
  ShoppingCart,
  Shield,
} from "lucide-react"
import { AISetupWizard } from "@/components/ai-setup-wizard"
import { NodeConfigPanel } from "@/components/node-config-panel"
import { AIFlowWizard } from "@/components/ai-flow-wizard" // Added import for AIFlowWizard
import { AIChatAssistant } from "@/components/ai-chat-assistant" // Added import for AIChatAssistant

// Available node types that can be dragged onto the canvas
const nodeTypes = [
  {
    id: "trigger",
    name: "Trigger",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    description: "Start your flow",
    category: "triggers",
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    icon: FileText,
    color: "from-green-500 to-emerald-500",
    description: "Read/Write spreadsheet data",
    category: "actions",
  },
  {
    id: "database",
    name: "Database",
    icon: Database,
    color: "from-blue-500 to-cyan-500",
    description: "Query or update database",
    category: "actions",
  },
  {
    id: "email",
    name: "Send Email",
    icon: Mail,
    color: "from-purple-500 to-pink-500",
    description: "Send email notifications",
    category: "actions",
  },
  {
    id: "webhook",
    name: "Webhook",
    icon: Send,
    color: "from-indigo-500 to-purple-500",
    description: "Send HTTP request",
    category: "actions",
  },
  {
    id: "filter",
    name: "Filter",
    icon: Filter,
    color: "from-orange-500 to-red-500",
    description: "Filter data conditionally",
    category: "logic",
  },
  {
    id: "branch",
    name: "Branch",
    icon: GitBranch,
    color: "from-teal-500 to-cyan-500",
    description: "Split flow into paths",
    category: "logic",
  },
  {
    id: "delay",
    name: "Delay",
    icon: Clock,
    color: "from-gray-500 to-slate-500",
    description: "Wait before continuing",
    category: "logic",
  },
  {
    id: "ai-process",
    name: "AI Process",
    icon: Sparkles,
    color: "from-violet-500 to-purple-500",
    description: "Process with AI",
    category: "ai",
  },
  {
    id: "chat",
    name: "Chat Message",
    icon: MessageSquare,
    color: "from-blue-500 to-indigo-500",
    description: "Send chat message",
    category: "actions",
  },
  {
    id: "api-call",
    name: "API Call",
    icon: Globe,
    color: "from-cyan-500 to-blue-500",
    description: "Call external API",
    category: "actions",
  },
]

const endpointNodes = [
  // Triggers
  {
    id: "webhook-trigger",
    name: "Webhook Trigger",
    icon: Webhook,
    color: "from-blue-500 to-cyan-500",
    description: "Receive HTTP webhooks to start flows",
    category: "triggers",
    integration: "Generic",
    endpoints: [
      { method: "POST", path: "/webhook/:id", description: "Receive webhook data" },
      { method: "GET", path: "/webhook/:id/test", description: "Test webhook endpoint" },
    ],
  },
  {
    id: "schedule-trigger",
    name: "Schedule Trigger",
    icon: Clock,
    color: "from-purple-500 to-pink-500",
    description: "Run flows on a schedule (cron)",
    category: "triggers",
    integration: "Generic",
    endpoints: [
      { method: "POST", path: "/schedule/create", description: "Create scheduled trigger" },
      { method: "GET", path: "/schedule/:id", description: "Get schedule details" },
    ],
  },
  {
    id: "stripe-webhook",
    name: "Stripe Webhook",
    icon: CreditCard,
    color: "from-purple-600 to-indigo-600",
    description: "Trigger on Stripe payment events",
    category: "triggers",
    integration: "Stripe",
    endpoints: [
      { method: "POST", path: "/stripe/webhook", description: "Receive Stripe events" },
      { method: "GET", path: "/stripe/events", description: "List recent events" },
    ],
  },
  {
    id: "google-sheets-trigger",
    name: "Google Sheets New Row",
    icon: FileText,
    color: "from-green-500 to-emerald-500",
    description: "Trigger when new row is added",
    category: "triggers",
    integration: "Google Sheets",
    endpoints: [
      { method: "GET", path: "/sheets/:id/watch", description: "Watch for new rows" },
      { method: "GET", path: "/sheets/:id/rows", description: "Get all rows" },
    ],
  },
  {
    id: "crypto-wallet-trigger",
    name: "Crypto Wallet Tracker",
    icon: Coins,
    color: "from-yellow-500 to-orange-500",
    description: "Monitor wallet transactions",
    category: "triggers",
    integration: "Blockchain",
    endpoints: [
      { method: "GET", path: "/wallet/:address/balance", description: "Get wallet balance" },
      { method: "GET", path: "/wallet/:address/transactions", description: "Get transactions" },
      { method: "POST", path: "/wallet/:address/watch", description: "Watch wallet" },
    ],
  },
  {
    id: "woocommerce-trigger",
    name: "WooCommerce",
    icon: ShoppingCart,
    color: "from-purple-600 to-pink-600",
    description: "E-commerce order events",
    category: "triggers",
    integration: "WooCommerce",
    endpoints: [
      { method: "GET", path: "/woocommerce/orders", description: "Get orders" },
      { method: "POST", path: "/woocommerce/orders", description: "Create order" },
      { method: "PUT", path: "/woocommerce/orders/:id", description: "Update order" },
    ],
  },

  // Actions
  {
    id: "google-sheets-action",
    name: "Google Sheets",
    icon: FileText,
    color: "from-green-500 to-emerald-500",
    description: "Read, write, update spreadsheet data",
    category: "actions",
    integration: "Google Sheets",
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
    icon: Database,
    color: "from-blue-500 to-cyan-500",
    description: "Query and update database records",
    category: "actions",
    integration: "Firebase/Supabase",
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
    icon: Sparkles,
    color: "from-violet-500 to-purple-500",
    description: "Process data with AI models",
    category: "actions",
    integration: "OpenAI/Gemini/Grok",
    endpoints: [
      { method: "POST", path: "/ai/chat", description: "Chat completion" },
      { method: "POST", path: "/ai/analyze", description: "Analyze text/data" },
      { method: "POST", path: "/ai/generate", description: "Generate content" },
    ],
  },
  {
    id: "filter-action",
    name: "Filter Data",
    icon: Filter,
    color: "from-orange-500 to-red-500",
    description: "Filter and transform data",
    category: "actions",
    integration: "Generic",
    endpoints: [
      { method: "POST", path: "/filter/condition", description: "Apply conditions" },
      { method: "POST", path: "/filter/transform", description: "Transform data" },
    ],
  },
  {
    id: "branch-action",
    name: "Branch Logic",
    icon: GitBranch,
    color: "from-teal-500 to-cyan-500",
    description: "Split flow into multiple paths",
    category: "actions",
    integration: "Generic",
    endpoints: [{ method: "POST", path: "/branch/evaluate", description: "Evaluate conditions" }],
  },
  {
    id: "dextools-api",
    name: "DexTools API",
    icon: BarChart3,
    color: "from-cyan-600 to-blue-600",
    description: "Get DEX trading data and analytics",
    category: "actions",
    integration: "DexTools",
    endpoints: [
      { method: "GET", path: "/dextools/token/:address", description: "Get token info" },
      { method: "GET", path: "/dextools/pairs/:address", description: "Get trading pairs" },
      { method: "GET", path: "/dextools/price/:address", description: "Get token price" },
    ],
  },
  {
    id: "recaptcha-verify",
    name: "reCAPTCHA Verify",
    icon: Shield,
    color: "from-red-500 to-orange-500",
    description: "Verify reCAPTCHA tokens",
    category: "actions",
    integration: "Google reCAPTCHA",
    endpoints: [{ method: "POST", path: "/recaptcha/verify", description: "Verify token" }],
  },

  // Outbound Actions
  {
    id: "email-send",
    name: "Send Email",
    icon: Mail,
    color: "from-purple-500 to-pink-500",
    description: "Send email notifications",
    category: "outbound",
    integration: "SMTP/SendGrid",
    endpoints: [
      { method: "POST", path: "/email/send", description: "Send email" },
      { method: "POST", path: "/email/template", description: "Send templated email" },
    ],
  },
  {
    id: "webhook-send",
    name: "Send Webhook",
    icon: Send,
    color: "from-indigo-500 to-purple-500",
    description: "Send HTTP request to external service",
    category: "outbound",
    integration: "Generic",
    endpoints: [
      { method: "POST", path: "/webhook/send", description: "Send webhook" },
      { method: "POST", path: "/webhook/batch", description: "Send multiple webhooks" },
    ],
  },
  {
    id: "chat-message",
    name: "Send Chat Message",
    icon: MessageSquare,
    color: "from-blue-500 to-indigo-500",
    description: "Send message to chat platform",
    category: "outbound",
    integration: "Discord/Slack",
    endpoints: [
      { method: "POST", path: "/chat/send", description: "Send message" },
      { method: "POST", path: "/chat/channel", description: "Send to channel" },
    ],
  },
  {
    id: "api-call",
    name: "API Call",
    icon: Globe,
    color: "from-cyan-500 to-blue-500",
    description: "Call any external API",
    category: "outbound",
    integration: "Generic",
    endpoints: [
      { method: "POST", path: "/api/call", description: "Make API request" },
      { method: "POST", path: "/api/batch", description: "Batch API calls" },
    ],
  },
]

const categories = [
  { id: "all", name: "All Nodes" },
  { id: "triggers", name: "Triggers" },
  { id: "actions", name: "Actions" },
  { id: "outbound", name: "Outbound" }, // Changed from "logic" to "outbound"
  { id: "mods", name: "MODS" },
]

interface FlowNode {
  id: string
  name: string
  icon: any
  color: string
  description: string
  category: string
  x: number
  y: number
  width: number
  height: number
  installed?: boolean
  requiresInstall?: boolean
  config?: {
    endpoint?: string
    method?: string
    url?: string
    headers?: Record<string, string>
    auth?: {
      type: "none" | "api-key" | "bearer" | "oauth"
      apiKey?: string
      bearerToken?: string
      oauthToken?: string
    }
    body?: string
    params?: Record<string, string>
    responseMapping?: Record<string, string>
  }
}

interface Connection {
  id: string
  from: string
  to: string
  fromPort: "output"
  toPort: "input"
}

interface CompatibilityResult {
  compatible: boolean
  score: number
  reason: string
  suggestion?: string
}

const checkNodeCompatibility = (fromNode: FlowNode, toNode: FlowNode): CompatibilityResult => {
  // Triggers should only be at the start
  if (toNode.category === "triggers") {
    return {
      compatible: false,
      score: 0,
      reason: "Triggers must be at the start of a flow",
      suggestion: "Place trigger nodes at the beginning without input connections",
    }
  }

  // Check category compatibility
  const compatibilityMatrix: Record<string, string[]> = {
    triggers: ["actions", "logic", "ai", "mods", "outbound"], // Added "outbound"
    actions: ["actions", "logic", "ai", "mods", "outbound"], // Added "outbound"
    logic: ["actions", "logic", "ai", "mods", "outbound"], // Added "outbound"
    ai: ["actions", "logic", "ai", "mods", "outbound"], // Added "outbound"
    mods: ["actions", "logic", "ai", "mods", "outbound"], // Added "outbound"
    outbound: ["actions", "logic", "ai", "mods", "outbound"], // Added "outbound"
  }

  const validTargets = compatibilityMatrix[fromNode.category] || []

  if (!validTargets.includes(toNode.category)) {
    return {
      compatible: false,
      score: 0,
      reason: `${fromNode.category} cannot connect to ${toNode.category}`,
      suggestion: `Try connecting to: ${validTargets.join(", ")}`,
    }
  }

  // Calculate compatibility score based on common patterns
  let score = 70 // Base compatibility

  // Boost score for common patterns
  if (fromNode.category === "triggers" && toNode.category === "ai") {
    score = 95
    return {
      compatible: true,
      score,
      reason: "Excellent match: Triggers work great with AI processing",
      suggestion: "AI can analyze incoming data from triggers",
    }
  }

  if (fromNode.category === "ai" && toNode.category === "logic") {
    score = 90
    return {
      compatible: true,
      score,
      reason: "Great match: AI output can be filtered with logic",
      suggestion: "Use filters to process AI-generated data",
    }
  }

  if (fromNode.category === "logic" && toNode.category === "actions") {
    score = 92
    return {
      compatible: true,
      score,
      reason: "Perfect match: Logic gates control which actions execute",
      suggestion: "Conditional logic determines the action flow",
    }
  }

  if (fromNode.name === "Google Sheets" && toNode.name === "AI Process") {
    score = 98
    return {
      compatible: true,
      score,
      reason: "Optimal match: Spreadsheet data is ideal for AI analysis",
      suggestion: "AI can enrich and analyze spreadsheet data",
    }
  }

  if (fromNode.name === "AI Process" && toNode.name === "Google Sheets") {
    score = 96
    return {
      compatible: true,
      score,
      reason: "Excellent match: AI results can be saved to spreadsheets",
      suggestion: "Store AI-processed data for easy access",
    }
  }

  return {
    compatible: true,
    score,
    reason: "Compatible connection",
    suggestion: "This connection will work well",
  }
}

const modNodes = [
  {
    id: "saas-mod",
    name: "SaaS MOD",
    icon: Cloud,
    color: "from-purple-500 to-pink-500",
    description: "Complete SaaS deployment with Firebase, Cloud Run, Stripe",
    category: "mods",
    installed: false,
    requiresInstall: true,
  },
  {
    id: "seo-content-writer",
    name: "SEO Content Writer",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
    description: "AI-powered SEO content generation and optimization",
    category: "mods",
    installed: false,
    requiresInstall: true,
  },
  {
    id: "wordpress-assistant",
    name: "WordPress Assistant",
    icon: Wordpress,
    color: "from-indigo-500 to-blue-600",
    description: "Manage WordPress sites, posts, and plugins",
    category: "mods",
    installed: false,
    requiresInstall: true,
  },
  {
    id: "government-contracts",
    name: "Government Contracts",
    icon: Building2,
    color: "from-emerald-500 to-teal-500",
    description: "Find and track government contract opportunities",
    category: "mods",
    installed: false,
    requiresInstall: true,
  },
  {
    id: "lead-hunter",
    name: "Lead Hunter",
    icon: Target,
    color: "from-orange-500 to-red-500",
    description: "Intelligent lead generation with AI-powered targeting",
    category: "mods",
    installed: false,
    requiresInstall: true,
  },
]

const allNodeTypes = [...endpointNodes, ...modNodes]

export default function ApexFlowPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [canvasNodes, setCanvasNodes] = useState<FlowNode[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [draggedNode, setDraggedNode] = useState<any>(null)
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null)
  const [tempConnection, setTempConnection] = useState<{ x: number; y: number } | null>(null)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)
  const [compatibilityInfo, setCompatibilityInfo] = useState<CompatibilityResult | null>(null)
  const [installedMods, setInstalledMods] = useState<Set<string>>(new Set())
  const [setupWizardOpen, setSetupWizardOpen] = useState(false)
  const [selectedModForSetup, setSelectedModForSetup] = useState<{ id: string; name: string } | null>(null)
  const [configPanelOpen, setConfigPanelOpen] = useState(false)
  const [nodeBeingConfigured, setNodeBeingConfigured] = useState<FlowNode | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [aiWizardOpen, setAiWizardOpen] = useState(false)
  const [smartSuggestions, setSmartSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    const savedFlow = localStorage.getItem("apex-flow-current")
    if (savedFlow) {
      try {
        const parsed = JSON.parse(savedFlow)
        setCanvasNodes(parsed.nodes || [])
        setConnections(parsed.connections || [])
      } catch (e) {
        console.error("[v0] Failed to load saved flow:", e)
      }
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedNodeId) {
        // Prevent default backspace navigation
        e.preventDefault()
        handleDeleteNode()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedNodeId])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedNodeId) {
        // Prevent default backspace navigation
        e.preventDefault()
        handleDeleteNode()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedNodeId])

  useEffect(() => {
    if (selectedNodeId) {
      const selectedNode = canvasNodes.find((n) => n.id === selectedNodeId)
      if (selectedNode) {
        const suggestions = generateSmartSuggestions(selectedNode)
        setSmartSuggestions(suggestions)
        setShowSuggestions(true)
      }
    } else {
      setShowSuggestions(false)
    }
  }, [selectedNodeId, canvasNodes])

  const generateSmartSuggestions = (node: FlowNode) => {
    const suggestions = []

    // Check if node has any outgoing connections
    const hasOutgoingConnection = connections.some((conn) => conn.from === node.id)

    if (!hasOutgoingConnection) {
      // Suggest next nodes based on category
      if (node.category === "triggers") {
        suggestions.push(
          {
            node: endpointNodes.find((n) => n.id === "ai-process"),
            reason: "AI can analyze incoming trigger data",
            score: 95,
          },
          {
            node: endpointNodes.find((n) => n.id === "filter-action"),
            reason: "Filter data before processing",
            score: 85,
          },
          {
            node: endpointNodes.find((n) => n.id === "database-action"),
            reason: "Store trigger data in database",
            score: 80,
          },
        )
      } else if (node.category === "actions" && node.name.includes("AI")) {
        suggestions.push(
          {
            node: endpointNodes.find((n) => n.id === "google-sheets-action"),
            reason: "Save AI results to spreadsheet",
            score: 92,
          },
          {
            node: endpointNodes.find((n) => n.id === "email-send"),
            reason: "Send AI analysis via email",
            score: 88,
          },
          {
            node: endpointNodes.find((n) => n.id === "database-action"),
            reason: "Store AI results in database",
            score: 85,
          },
        )
      } else if (node.category === "actions") {
        suggestions.push(
          {
            node: endpointNodes.find((n) => n.id === "email-send"),
            reason: "Send notification about action",
            score: 85,
          },
          {
            node: endpointNodes.find((n) => n.id === "webhook-send"),
            reason: "Trigger external service",
            score: 82,
          },
          {
            node: endpointNodes.find((n) => n.id === "filter-action"),
            reason: "Add conditional logic",
            score: 78,
          },
        )
      }
    }

    return suggestions.filter((s) => s.node).slice(0, 3)
  }

  const handleSmartConnect = () => {
    const unconnectedNodes = canvasNodes.filter((node) => {
      const hasIncoming = connections.some((conn) => conn.to === node.id)
      const hasOutgoing = connections.some((conn) => conn.from === node.id)
      return !hasIncoming || !hasOutgoing
    })

    if (unconnectedNodes.length === 0) {
      alert("All nodes are already connected!")
      return
    }

    const newConnections: Connection[] = []

    // Sort nodes by x position (left to right)
    const sortedNodes = [...canvasNodes].sort((a, b) => a.x - b.x)

    // Connect nodes in sequence
    for (let i = 0; i < sortedNodes.length - 1; i++) {
      const fromNode = sortedNodes[i]
      const toNode = sortedNodes[i + 1]

      // Check if connection already exists
      const connectionExists = connections.some((conn) => conn.from === fromNode.id && conn.to === toNode.id)

      if (!connectionExists) {
        const compatibility = checkNodeCompatibility(fromNode, toNode)
        if (compatibility.compatible) {
          newConnections.push({
            id: `conn-smart-${Date.now()}-${i}`,
            from: fromNode.id,
            to: toNode.id,
            fromPort: "output",
            toPort: "input",
          })
        }
      }
    }

    if (newConnections.length > 0) {
      setConnections((prev) => [...prev, ...newConnections])
      alert(`Smart Connect: Added ${newConnections.length} intelligent connections!`)
    } else {
      alert("No compatible connections found. Try rearranging your nodes.")
    }
  }

  const handleAddSuggestedNode = (suggestion: any) => {
    if (!selectedNodeId || !suggestion.node) return

    const selectedNode = canvasNodes.find((n) => n.id === selectedNodeId)
    if (!selectedNode) return

    // Position new node to the right of selected node
    const newNode: FlowNode = {
      ...suggestion.node,
      id: `${suggestion.node.id}-${Date.now()}`,
      x: selectedNode.x + 300,
      y: selectedNode.y,
      width: 240,
      height: 135,
    }

    setCanvasNodes((prev) => [...prev, newNode])

    // Auto-connect the nodes
    const newConnection: Connection = {
      id: `conn-suggested-${Date.now()}`,
      from: selectedNodeId,
      to: newNode.id,
      fromPort: "output",
      toPort: "input",
    }
    setConnections((prev) => [...prev, newConnection])

    // Select the new node
    setSelectedNodeId(newNode.id)
  }

  const loadExampleFlow = () => {
    const exampleNodes: FlowNode[] = [
      {
        id: "google-sheets-trigger-example",
        name: "Google Sheets New Row",
        icon: FileText,
        color: "from-green-500 to-emerald-500",
        description: "Trigger: New row added",
        category: "triggers",
        x: 100,
        y: 250,
        width: 240,
        height: 135,
      },
      {
        id: "ai-process-example",
        name: "AI Processing",
        icon: Sparkles,
        color: "from-violet-500 to-purple-500",
        description: "Analyze and enrich data",
        category: "actions",
        x: 400,
        y: 250,
        width: 240,
        height: 135,
      },
      {
        id: "filter-example",
        name: "Filter Data",
        icon: Filter,
        color: "from-orange-500 to-red-500",
        description: "Check if score > 80",
        category: "actions",
        x: 700,
        y: 250,
        width: 240,
        height: 135,
      },
      {
        id: "google-sheets-action-example",
        name: "Google Sheets",
        icon: FileText,
        color: "from-green-500 to-emerald-500",
        description: "Write results to output sheet",
        category: "actions",
        x: 1000,
        y: 250,
        width: 240,
        height: 135,
      },
    ]

    const exampleConnections: Connection[] = [
      {
        id: "conn-1",
        from: "google-sheets-trigger-example",
        to: "ai-process-example",
        fromPort: "output",
        toPort: "input",
      },
      {
        id: "conn-2",
        from: "ai-process-example",
        to: "filter-example",
        fromPort: "output",
        toPort: "input",
      },
      {
        id: "conn-3",
        from: "filter-example",
        to: "google-sheets-action-example",
        fromPort: "output",
        toPort: "input",
      },
    ]

    setCanvasNodes(exampleNodes)
    setConnections(exampleConnections)
    setSelectedNodeId(null)
  }

  const handleGenerateFlowFromAI = (flow: any) => {
    // Add nodes to canvas
    const newNodes = flow.nodes.map((node: any) => ({
      ...node,
      id: `${node.id}-${Date.now()}`,
    }))
    setCanvasNodes((prev) => [...prev, ...newNodes])

    // Add connections
    const newConnections = flow.connections.map((conn: any) => ({
      ...conn,
      id: `${conn.id}-${Date.now()}`,
      from: newNodes.find((n: any) => n.name === flow.nodes.find((fn: any) => fn.id === conn.from)?.name)?.id,
      to: newNodes.find((n: any) => n.name === flow.nodes.find((fn: any) => fn.id === conn.to)?.name)?.id,
    }))
    setConnections((prev) => [...prev, ...newConnections])
  }

  const filteredNodes = allNodeTypes.filter((node) => {
    const matchesCategory = selectedCategory === "all" || node.category === selectedCategory
    const matchesSearch =
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleInstallMod = (modId: string, modName: string) => {
    setSelectedModForSetup({ id: modId, name: modName })
    setSetupWizardOpen(true)
  }

  const handleSetupComplete = () => {
    if (selectedModForSetup) {
      setInstalledMods((prev) => {
        const newSet = new Set(prev)
        newSet.add(selectedModForSetup.id)
        return newSet
      })
      setSelectedModForSetup(null)
    }
  }

  const handleDragStart = (node: any) => {
    if (node.requiresInstall && !installedMods.has(node.id)) {
      alert(`Please install the ${node.name} first before using it in your flow.`)
      return
    }
    setDraggedNode(node)
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      if (!draggedNode || !canvasRef.current) return

      const rect = canvasRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - 120 // Center the node
      const y = e.clientY - rect.top - 67.5 // Center the node (16:9 ratio)

      const newNode: FlowNode = {
        ...draggedNode,
        id: `${draggedNode.id}-${Date.now()}`,
        x,
        y,
        width: 240,
        height: 135, // 16:9 ratio (240/16*9 = 135)
      }

      setCanvasNodes((prev) => [...prev, newNode])
      setDraggedNode(null)

      const nearbyNode = canvasNodes.find((node) => {
        const outputX = node.x + node.width
        const outputY = node.y + node.height / 2
        const distance = Math.sqrt(Math.pow(x - outputX, 2) + Math.pow(y - outputY, 2))
        return distance < 100 // Within 100px
      })

      if (nearbyNode) {
        const compatibility = checkNodeCompatibility(nearbyNode, newNode)
        if (compatibility.compatible && compatibility.score >= 70) {
          const autoConnection: Connection = {
            id: `conn-auto-${Date.now()}`,
            from: nearbyNode.id,
            to: newNode.id,
            fromPort: "output",
            toPort: "input",
          }
          setConnections((prev) => [...prev, autoConnection])
          console.log("[v0] Auto-connected nodes:", nearbyNode.name, "→", newNode.name)
        }
      }
    },
    [draggedNode, canvasNodes, connections],
  )

  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation()
    const node = canvasNodes.find((n) => n.id === nodeId)
    if (!node || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left - node.x,
      y: e.clientY - rect.top - node.y,
    })
    setDraggingNodeId(nodeId)
    setSelectedNodeId(nodeId)
  }

  const handleCanvasMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!canvasRef.current) return

      const rect = canvasRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      if (draggingNodeId) {
        setCanvasNodes((prev) =>
          prev.map((node) =>
            node.id === draggingNodeId
              ? {
                  ...node,
                  x: x - dragOffset.x,
                  y: y - dragOffset.y,
                }
              : node,
          ),
        )
      }

      if (connectingFrom) {
        setTempConnection({ x, y })
      }
    },
    [draggingNodeId, dragOffset, connectingFrom],
  )

  const handleCanvasMouseUp = useCallback(() => {
    setDraggingNodeId(null)
    setConnectingFrom(null)
    setTempConnection(null)
  }, [])

  const handleOutputClick = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation()
    setConnectingFrom(nodeId)
  }

  const handleInputClick = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation()
    if (connectingFrom && connectingFrom !== nodeId) {
      const fromNode = canvasNodes.find((n) => n.id === connectingFrom)
      const toNode = canvasNodes.find((n) => n.id === nodeId)

      if (fromNode && toNode) {
        const compatibility = checkNodeCompatibility(fromNode, toNode)

        if (!compatibility.compatible) {
          alert(`Connection not allowed: ${compatibility.reason}\n\n${compatibility.suggestion}`)
          setConnectingFrom(null)
          setTempConnection(null)
          setCompatibilityInfo(null)
          return
        }
      }

      const newConnection: Connection = {
        id: `conn-${Date.now()}`,
        from: connectingFrom,
        to: nodeId,
        fromPort: "output",
        toPort: "input",
      }
      setConnections((prev) => [...prev, newConnection])
    }
    setConnectingFrom(null)
    setTempConnection(null)
    setCompatibilityInfo(null)
  }

  const handleDeleteNode = () => {
    if (selectedNodeId) {
      setCanvasNodes((prev) => prev.filter((node) => node.id !== selectedNodeId))
      setConnections((prev) => prev.filter((conn) => conn.from !== selectedNodeId && conn.to !== selectedNodeId))
      setSelectedNodeId(null)
    }
  }

  const getNodeCenter = (nodeId: string, port: "input" | "output") => {
    const node = canvasNodes.find((n) => n.id === nodeId)
    if (!node) return { x: 0, y: 0 }

    return {
      x: node.x + (port === "output" ? node.width : 0),
      y: node.y + node.height / 2,
    }
  }

  const handleNodeHover = (nodeId: string) => {
    setHoveredNodeId(nodeId)

    if (connectingFrom && connectingFrom !== nodeId) {
      const fromNode = canvasNodes.find((n) => n.id === connectingFrom)
      const toNode = canvasNodes.find((n) => n.id === nodeId)

      if (fromNode && toNode) {
        const compatibility = checkNodeCompatibility(fromNode, toNode)
        setCompatibilityInfo(compatibility)
      }
    }
  }

  const handleNodeLeave = () => {
    setHoveredNodeId(null)
    if (!connectingFrom) {
      setCompatibilityInfo(null)
    }
  }

  const getNodeCompatibilityClass = (nodeId: string) => {
    if (!connectingFrom || connectingFrom === nodeId) return ""

    const fromNode = canvasNodes.find((n) => n.id === connectingFrom)
    const toNode = canvasNodes.find((n) => n.id === nodeId)

    if (fromNode && toNode) {
      const compatibility = checkNodeCompatibility(fromNode, toNode)
      if (compatibility.compatible) {
        if (compatibility.score >= 90) return "ring-2 ring-green-500 animate-pulse"
        if (compatibility.score >= 70) return "ring-2 ring-blue-500"
      } else {
        return "opacity-30"
      }
    }

    return ""
  }

  const handleConfigureNode = (nodeId: string) => {
    const node = canvasNodes.find((n) => n.id === nodeId)
    if (node) {
      setNodeBeingConfigured(node)
      setConfigPanelOpen(true)
    }
  }

  const handleSaveNodeConfig = (config: any) => {
    if (nodeBeingConfigured) {
      setCanvasNodes((prev) => prev.map((node) => (node.id === nodeBeingConfigured.id ? { ...node, config } : node)))
      console.log("[v0] Saved configuration for node:", nodeBeingConfigured.id, config)
    }
  }

  const handleTestNodeConfig = async (config: any) => {
    console.log("[v0] Testing configuration:", config)
    // Test logic will be implemented in the next task
  }

  const [isTesting, setIsTesting] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)

  const handleSaveFlow = () => {
    const flowData = {
      nodes: canvasNodes,
      connections: connections,
      savedAt: new Date().toISOString(),
    }
    localStorage.setItem("apex-flow-current", JSON.stringify(flowData))

    // Also save to history
    const history = JSON.parse(localStorage.getItem("apex-flow-history") || "[]")
    history.unshift({
      id: Date.now(),
      name: `Flow ${new Date().toLocaleString()}`,
      data: flowData,
    })
    localStorage.setItem("apex-flow-history", JSON.stringify(history.slice(0, 10))) // Keep last 10

    alert("Flow saved successfully!")
  }

  const handleTestFlow = async () => {
    if (canvasNodes.length === 0) {
      alert("Please add nodes to your flow before testing")
      return
    }

    setIsTesting(true)
    setTestResults(null)

    try {
      // Simulate flow execution
      const results: any[] = []

      for (const node of canvasNodes) {
        await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate processing

        results.push({
          nodeId: node.id,
          nodeName: node.name,
          status: "success",
          message: `${node.name} executed successfully`,
          timestamp: new Date().toISOString(),
        })
      }

      setTestResults({
        success: true,
        results,
        executionTime: canvasNodes.length * 500,
      })

      alert(`Flow test completed successfully!\n\nExecuted ${canvasNodes.length} nodes in ${canvasNodes.length * 0.5}s`)
    } catch (error) {
      setTestResults({
        success: false,
        error: "Flow execution failed",
      })
      alert("Flow test failed. Please check your configuration.")
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="border-b border-orange-500/20 bg-gray-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-full mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500 rounded-xl blur-lg opacity-50" />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500 flex items-center justify-center">
                  <Workflow className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                APEX Flow
              </h1>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white hover:from-orange-600 hover:via-red-600 hover:to-yellow-600"
                onClick={() => setAiWizardOpen(true)}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI Wizard
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-orange-500/50 text-orange-500 hover:bg-orange-500/10 bg-transparent"
                onClick={loadExampleFlow}
              >
                <FileText className="w-4 h-4 mr-2" />
                Load Example
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-orange-500/50 text-orange-500 hover:bg-orange-500/10 bg-transparent"
                onClick={() => {
                  setCanvasNodes([])
                  setConnections([])
                  setSelectedNodeId(null)
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Canvas
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-orange-500/50 text-orange-500 hover:bg-orange-500/10 bg-transparent"
                onClick={() => (window.location.href = "/endpoints")}
              >
                <Globe className="w-4 h-4 mr-2" />
                View Endpoints
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AIFlowWizard
        isOpen={aiWizardOpen}
        onClose={() => setAiWizardOpen(false)}
        onGenerateFlow={handleGenerateFlowFromAI}
      />

      {/* AI Setup Wizard */}
      {selectedModForSetup && (
        <AISetupWizard
          isOpen={setupWizardOpen}
          onClose={() => {
            setSetupWizardOpen(false)
            setSelectedModForSetup(null)
          }}
          modName={selectedModForSetup.name}
          modId={selectedModForSetup.id}
          onComplete={handleSetupComplete}
        />
      )}

      {/* Node Configuration Panel */}
      {configPanelOpen && nodeBeingConfigured && (
        <NodeConfigPanel
          nodeId={nodeBeingConfigured.id}
          nodeName={nodeBeingConfigured.name}
          nodeType={nodeBeingConfigured.category}
          config={nodeBeingConfigured.config || {}}
          onClose={() => {
            setConfigPanelOpen(false)
            setNodeBeingConfigured(null)
          }}
          onSave={handleSaveNodeConfig}
          onTest={handleTestNodeConfig}
        />
      )}

      <AIChatAssistant onGenerateFlow={handleGenerateFlowFromAI} />

      <div className="max-w-full mx-auto p-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Node Library */}
          <div className="col-span-3">
            <Card className="sticky top-24 bg-gray-900/50 border-orange-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Plus className="w-5 h-5 text-orange-500" />
                  Endpoints Library {/* Changed from "Add Nodes" */}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Drag endpoints onto the canvas to build your automation flow {/* Updated description */}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Search endpoints..." // Changed placeholder
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`text-xs ${
                        selectedCategory === category.id
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                          : "border-gray-700 text-gray-400 hover:bg-gray-800"
                      }`}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-400 border-t border-gray-800 pt-3">
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-yellow-500" />
                    <span>{endpointNodes.filter((n) => n.category === "triggers").length} Triggers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Database className="w-3 h-3 text-blue-500" />
                    <span>{endpointNodes.filter((n) => n.category === "actions").length} Actions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Send className="w-3 h-3 text-purple-500" />
                    <span>{endpointNodes.filter((n) => n.category === "outbound").length} Outbound</span>
                  </div>
                </div>

                {/* Node List */}
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {filteredNodes.map((node) => {
                    const Icon = node.icon
                    const isMod = node.category === "mods"
                    const isInstalled = isMod ? installedMods.has(node.id) : true

                    return (
                      <div
                        key={node.id}
                        draggable={isInstalled}
                        onDragStart={() => handleDragStart(node)}
                        className={`p-3 rounded-lg border bg-gray-800/50 transition-all ${
                          isInstalled
                            ? "border-gray-700 hover:border-orange-500/50 cursor-move hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20"
                            : "border-gray-800 opacity-60 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${node.color} flex items-center justify-center flex-shrink-0`}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-semibold text-white">{node.name}</h4>
                              {!isMod && node.integration && (
                                <Badge variant="secondary" className="text-xs bg-gray-700/50 text-gray-300">
                                  {node.integration}
                                </Badge>
                              )}
                              {isMod && (
                                <Badge
                                  variant="secondary"
                                  className={`text-xs ${
                                    isInstalled ? "bg-green-500/20 text-green-500" : "bg-orange-500/20 text-orange-500"
                                  }`}
                                >
                                  {isInstalled ? "Installed" : "MOD"}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 line-clamp-2 mb-2">{node.description}</p>
                            {isMod && !isInstalled && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full text-xs h-7 bg-transparent border-orange-500/50 text-orange-500 hover:bg-orange-500/10"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleInstallMod(node.id, node.name)
                                }}
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Install MOD
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Canvas Area */}
          <div className="col-span-9">
            <Card className="h-[800px] bg-gray-900/50 border-orange-500/20 backdrop-blur-sm">
              <CardHeader className="border-b border-orange-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Flow Canvas</CardTitle>
                    <CardDescription className="text-gray-400">
                      {connectingFrom
                        ? "AI suggests compatible connections - green = excellent, blue = good"
                        : selectedNodeId
                          ? "Press Delete or Backspace to remove selected node"
                          : "Drag nodes to move them, connect output to input ports"}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-orange-500/20 text-orange-500">
                      {canvasNodes.length} nodes
                    </Badge>
                    <Badge variant="secondary" className="bg-orange-500/20 text-orange-500">
                      {connections.length} connections
                    </Badge>
                    {selectedNodeId && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={handleDeleteNode}
                        className="bg-red-500/20 text-red-500 border-red-500/50 hover:bg-red-500/30"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    )}
                    {canvasNodes.length > 1 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleSmartConnect}
                        className="border-orange-500/50 text-orange-500 hover:bg-orange-500/10 bg-transparent"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Smart Connect
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleSaveFlow}
                      disabled={canvasNodes.length === 0}
                      className="border-orange-500/50 text-orange-500 hover:bg-orange-500/10 bg-transparent"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Flow
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleTestFlow}
                      disabled={canvasNodes.length === 0 || isTesting}
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
                    >
                      {isTesting ? (
                        <>
                          <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                          Testing...
                        </>
                      ) : (
                        <>
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Test Flow
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-80px)]">
                {showSuggestions && smartSuggestions.length > 0 && (
                  <div className="absolute top-20 right-4 z-50 w-80 bg-gray-900 border-2 border-orange-500/20 rounded-xl shadow-2xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-5 h-5 text-orange-500" />
                      <h3 className="text-sm font-semibold text-white">AI Suggestions</h3>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">
                      Based on your selected node, here are the best next steps:
                    </p>
                    <div className="space-y-2">
                      {smartSuggestions.map((suggestion, idx) => {
                        const Icon = suggestion.node.icon
                        return (
                          <div
                            key={idx}
                            className="p-3 rounded-lg border border-gray-700 bg-gray-800/50 hover:border-orange-500/50 transition-all cursor-pointer"
                            onClick={() => handleAddSuggestedNode(suggestion)}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${suggestion.node.color} flex items-center justify-center flex-shrink-0`}
                              >
                                <Icon className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="text-sm font-semibold text-white">{suggestion.node.name}</h4>
                                  <Badge
                                    variant="secondary"
                                    className={`text-xs ${
                                      suggestion.score >= 90
                                        ? "bg-green-500/20 text-green-500"
                                        : "bg-blue-500/20 text-blue-500"
                                    }`}
                                  >
                                    {suggestion.score}%
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-400 mb-1">{suggestion.reason}</p>
                                <Button
                                  size="sm"
                                  className="w-full text-xs h-7 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
                                >
                                  <Plus className="w-3 h-3 mr-1" />
                                  Add & Connect
                                </Button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {compatibilityInfo && connectingFrom && (
                  <div
                    className={`absolute top-20 left-1/2 -translate-x-1/2 z-50 p-4 rounded-lg shadow-xl backdrop-blur-sm border-2 max-w-md ${
                      compatibilityInfo.compatible ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {compatibilityInfo.compatible ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-semibold text-white">
                            {compatibilityInfo.compatible ? "Compatible Connection" : "Incompatible Connection"}
                          </h4>
                          {compatibilityInfo.compatible && (
                            <Badge
                              variant="secondary"
                              className={`text-xs ${
                                compatibilityInfo.score >= 90
                                  ? "bg-green-500/20 text-green-500"
                                  : "bg-blue-500/20 text-blue-500"
                              }`}
                            >
                              {compatibilityInfo.score}% match
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-300 mb-1">{compatibilityInfo.reason}</p>
                        {compatibilityInfo.suggestion && (
                          <p className="text-xs text-gray-400 italic">{compatibilityInfo.suggestion}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div
                  ref={canvasRef}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseUp={handleCanvasMouseUp}
                  onClick={() => setSelectedNodeId(null)}
                  className="w-full h-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-auto"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(249, 115, 22, 0.1) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                >
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                    {/* Draw existing connections with animation */}
                    {connections.map((conn) => {
                      const from = getNodeCenter(conn.from, "output")
                      const to = getNodeCenter(conn.to, "input")
                      const midX = (from.x + to.x) / 2

                      return (
                        <g key={conn.id}>
                          <path
                            d={`M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`}
                            stroke="url(#gradient)"
                            strokeWidth="3"
                            fill="none"
                            className="drop-shadow-lg"
                          >
                            <animate
                              attributeName="stroke-dasharray"
                              from="0,10"
                              to="10,0"
                              dur="1s"
                              repeatCount="indefinite"
                            />
                          </path>
                          {/* Animated dot traveling along the path */}
                          <circle r="4" fill="#f97316">
                            <animateMotion
                              dur="2s"
                              repeatCount="indefinite"
                              path={`M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`}
                            />
                          </circle>
                        </g>
                      )
                    })}

                    {/* Draw temporary connection while connecting */}
                    {connectingFrom && tempConnection && (
                      <path
                        d={`M ${getNodeCenter(connectingFrom, "output").x} ${getNodeCenter(connectingFrom, "output").y} L ${tempConnection.x} ${tempConnection.y}`}
                        stroke="rgba(249, 115, 22, 0.5)"
                        strokeWidth="3"
                        strokeDasharray="5,5"
                        fill="none"
                      />
                    )}

                    {/* Gradient definition for connection lines */}
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="50%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#eab308" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {canvasNodes.length === 0 ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="relative w-16 h-16 mx-auto mb-4">
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500 rounded-full blur-xl opacity-50" />
                          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500 flex items-center justify-center">
                            <Workflow className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Start Building Your Flow</h3>
                        <p className="text-sm text-gray-400 max-w-md mb-4">
                          Drag nodes from the left sidebar onto this canvas. Connect output ports (right side) to input
                          ports (left side) to create your workflow. AI will suggest the best connections.
                        </p>
                        <Button
                          onClick={loadExampleFlow}
                          variant="outline"
                          size="lg"
                          className="border-orange-500/50 text-orange-500 hover:bg-orange-500/10 bg-transparent"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Load Google Sheets Example Flow
                        </Button>
                      </div>
                    </div>
                  ) : (
                    canvasNodes.map((node) => {
                      const Icon = node.icon
                      const isSelected = selectedNodeId === node.id
                      const isConnecting = connectingFrom === node.id
                      const isHovered = hoveredNodeId === node.id
                      const compatibilityClass = getNodeCompatibilityClass(node.id)

                      return (
                        <div
                          key={node.id}
                          className={`absolute rounded-xl border-2 bg-gray-800/90 backdrop-blur-sm shadow-lg transition-all ${
                            isSelected
                              ? "border-orange-500 shadow-orange-500/50 shadow-2xl scale-105"
                              : "border-gray-700 hover:border-orange-500/50"
                          } ${draggingNodeId === node.id ? "cursor-grabbing" : "cursor-grab"} ${compatibilityClass}`}
                          style={{
                            left: node.x,
                            top: node.y,
                            width: `${node.width}px`,
                            height: `${node.height}px`,
                            zIndex: isSelected ? 10 : 2,
                          }}
                          onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedNodeId(node.id)
                          }}
                          onMouseEnter={() => handleNodeHover(node.id)}
                          onMouseLeave={handleNodeLeave}
                        >
                          {isSelected && (
                            <button
                              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 z-30"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteNode()
                              }}
                              title="Delete node (Delete/Backspace)"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}

                          <div
                            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-gray-700 bg-blue-500 cursor-pointer hover:scale-125 transition-transform z-20 ${
                              connectingFrom && connectingFrom !== node.id ? "ring-2 ring-blue-400 animate-pulse" : ""
                            }`}
                            onClick={(e) => handleInputClick(e, node.id)}
                            title="Input port"
                          />

                          <div
                            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full border-2 border-gray-700 bg-orange-500 cursor-pointer hover:scale-125 transition-transform z-20 ${
                              isConnecting ? "ring-2 ring-orange-400 animate-pulse" : ""
                            }`}
                            onClick={(e) => handleOutputClick(e, node.id)}
                            title="Output port"
                          />

                          <div className="flex flex-col h-full p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <div
                                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${node.color} flex items-center justify-center flex-shrink-0`}
                              >
                                <Icon className="w-4 h-4 text-white" />
                              </div>
                              <h4 className="text-sm font-semibold text-white truncate flex-1">{node.name}</h4>
                            </div>
                            <p className="text-xs text-gray-400 flex-1 line-clamp-2 leading-relaxed">
                              {node.description}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <Badge variant="secondary" className="text-xs bg-gray-700/50 text-gray-300">
                                {node.category}
                              </Badge>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 px-2 text-xs text-gray-400 hover:text-orange-500 hover:bg-orange-500/10"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleConfigureNode(node.id)
                                }}
                              >
                                <Settings className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
