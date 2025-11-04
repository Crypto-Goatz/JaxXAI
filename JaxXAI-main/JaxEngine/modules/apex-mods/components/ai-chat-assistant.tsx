"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, X, Sparkles, Loader2, Zap, Database } from "lucide-react"

interface Message {
  id: string
  role: "assistant" | "user"
  content: string
  generatedFlow?: any
}

interface AIChatAssistantProps {
  onGenerateFlow: (flow: any) => void
}

export function AIChatAssistant({ onGenerateFlow }: AIChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm your APEX AI assistant. Describe what you want to automate in plain English, and I'll build the workflow for you. For example: 'When I receive a Stripe payment, send me an email and update my Google Sheet'",
    },
  ])
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const parseNaturalLanguage = (text: string) => {
    const lowerText = text.toLowerCase()

    // Detect trigger
    let trigger = null
    if (lowerText.includes("stripe") || lowerText.includes("payment")) {
      trigger = {
        id: "stripe-webhook",
        name: "Stripe Webhook",
        icon: "CreditCard",
        color: "from-purple-600 to-indigo-600",
        description: "Trigger on Stripe payment events",
        category: "triggers",
      }
    } else if (lowerText.includes("webhook") || lowerText.includes("receive")) {
      trigger = {
        id: "webhook-trigger",
        name: "Webhook Trigger",
        icon: "Webhook",
        color: "from-blue-500 to-cyan-500",
        description: "Receive HTTP webhooks",
        category: "triggers",
      }
    } else if (lowerText.includes("schedule") || lowerText.includes("every") || lowerText.includes("daily")) {
      trigger = {
        id: "schedule-trigger",
        name: "Schedule Trigger",
        icon: "Clock",
        color: "from-purple-500 to-pink-500",
        description: "Run on schedule",
        category: "triggers",
      }
    } else if (
      lowerText.includes("spreadsheet") ||
      lowerText.includes("google sheets") ||
      lowerText.includes("new row")
    ) {
      trigger = {
        id: "google-sheets-trigger",
        name: "Google Sheets New Row",
        icon: "FileText",
        color: "from-green-500 to-emerald-500",
        description: "Trigger when new row added",
        category: "triggers",
      }
    } else if (lowerText.includes("crypto") || lowerText.includes("wallet") || lowerText.includes("transaction")) {
      trigger = {
        id: "crypto-wallet-trigger",
        name: "Crypto Wallet Tracker",
        icon: "Coins",
        color: "from-yellow-500 to-orange-500",
        description: "Monitor wallet transactions",
        category: "triggers",
      }
    }

    // Detect actions
    const actions = []

    if (lowerText.includes("ai") || lowerText.includes("analyze") || lowerText.includes("process")) {
      actions.push({
        id: "ai-process",
        name: "AI Processing",
        icon: "Sparkles",
        color: "from-violet-500 to-purple-500",
        description: "Process with AI",
        category: "actions",
      })
    }

    if (lowerText.includes("filter") || lowerText.includes("if") || lowerText.includes("condition")) {
      actions.push({
        id: "filter-action",
        name: "Filter Data",
        icon: "Filter",
        color: "from-orange-500 to-red-500",
        description: "Filter data conditionally",
        category: "actions",
      })
    }

    if (lowerText.includes("database") || lowerText.includes("save to db") || lowerText.includes("store")) {
      actions.push({
        id: "database-action",
        name: "Database Query",
        icon: "Database",
        color: "from-blue-500 to-cyan-500",
        description: "Save to database",
        category: "actions",
      })
    }

    // Detect outputs
    const outputs = []

    if (lowerText.includes("email") || lowerText.includes("send me") || lowerText.includes("notify")) {
      outputs.push({
        id: "email-send",
        name: "Send Email",
        icon: "Mail",
        color: "from-purple-500 to-pink-500",
        description: "Send email notification",
        category: "outbound",
      })
    }

    if (lowerText.includes("google sheet") || lowerText.includes("spreadsheet") || lowerText.includes("update sheet")) {
      outputs.push({
        id: "google-sheets-action",
        name: "Google Sheets",
        icon: "FileText",
        color: "from-green-500 to-emerald-500",
        description: "Update spreadsheet",
        category: "actions",
      })
    }

    if (lowerText.includes("webhook") || lowerText.includes("send to") || lowerText.includes("post to")) {
      outputs.push({
        id: "webhook-send",
        name: "Send Webhook",
        icon: "Send",
        color: "from-indigo-500 to-purple-500",
        description: "Send HTTP request",
        category: "outbound",
      })
    }

    if (lowerText.includes("slack") || lowerText.includes("discord") || lowerText.includes("chat")) {
      outputs.push({
        id: "chat-message",
        name: "Send Chat Message",
        icon: "MessageSquare",
        color: "from-blue-500 to-indigo-500",
        description: "Send to chat platform",
        category: "outbound",
      })
    }

    return { trigger, actions, outputs }
  }

  const generateFlowFromNaturalLanguage = (text: string) => {
    const { trigger, actions, outputs } = parseNaturalLanguage(text)

    if (!trigger) {
      return null
    }

    const nodes = []
    const connections = []
    let xPos = 100

    // Add trigger
    nodes.push({
      ...trigger,
      id: `${trigger.id}-${Date.now()}`,
      x: xPos,
      y: 250,
      width: 240,
      height: 135,
    })
    const lastNodeId = nodes[nodes.length - 1].id
    xPos += 300

    // Add actions
    for (const action of actions) {
      const actionNode = {
        ...action,
        id: `${action.id}-${Date.now()}-${Math.random()}`,
        x: xPos,
        y: 250,
        width: 240,
        height: 135,
      }
      nodes.push(actionNode)

      connections.push({
        id: `conn-${Date.now()}-${Math.random()}`,
        from: nodes[nodes.length - 2].id,
        to: actionNode.id,
        fromPort: "output",
        toPort: "input",
      })

      xPos += 300
    }

    // Add outputs
    for (const output of outputs) {
      const outputNode = {
        ...output,
        id: `${output.id}-${Date.now()}-${Math.random()}`,
        x: xPos,
        y: 250,
        width: 240,
        height: 135,
      }
      nodes.push(outputNode)

      connections.push({
        id: `conn-${Date.now()}-${Math.random()}`,
        from: nodes[nodes.length - 2].id,
        to: outputNode.id,
        fromPort: "output",
        toPort: "input",
      })

      xPos += 300
    }

    return { nodes, connections }
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsGenerating(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const flow = generateFlowFromNaturalLanguage(input)

    if (flow && flow.nodes.length > 0) {
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: `Perfect! I've analyzed your request and created a workflow with ${flow.nodes.length} nodes. I detected:\n\n• Trigger: ${flow.nodes[0].name}\n${flow.nodes
          .slice(1)
          .map((n: any) => `• ${n.category === "outbound" ? "Output" : "Action"}: ${n.name}`)
          .join("\n")}\n\nClick the button below to add this workflow to your canvas!`,
        generatedFlow: flow,
      }
      setMessages((prev) => [...prev, aiMessage])
    } else {
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content:
          "I couldn't quite understand that. Try describing your automation like this:\n\n• 'When [trigger] happens, [action] and then [output]'\n• Example: 'When I receive a Stripe payment, analyze it with AI and send me an email'\n\nWhat would you like to automate?",
      }
      setMessages((prev) => [...prev, aiMessage])
    }

    setIsGenerating(false)
  }

  const handleAddFlowToCanvas = (flow: any) => {
    onGenerateFlow(flow)
    const confirmMessage: Message = {
      id: `confirm-${Date.now()}`,
      role: "assistant",
      content:
        "Great! I've added the workflow to your canvas. You can now customize each node or ask me to create another automation!",
    }
    setMessages((prev) => [...prev, confirmMessage])
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500 text-white shadow-2xl hover:shadow-orange-500/50 hover:scale-110 transition-all z-50"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 w-[450px] h-[600px] bg-gray-900 border-2 border-orange-500/20 rounded-2xl shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-orange-500/20 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-yellow-500/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">APEX AI Assistant</h3>
                <p className="text-xs text-gray-400">Natural language workflow builder</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-orange-500 to-red-500 text-white"
                        : "bg-gray-800 text-gray-100"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-3 h-3 text-orange-500" />
                        <span className="text-xs font-semibold text-orange-500">AI</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>

                    {message.generatedFlow && (
                      <Button
                        onClick={() => handleAddFlowToCanvas(message.generatedFlow)}
                        className="w-full mt-3 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
                        size="sm"
                      >
                        <Zap className="w-3 h-3 mr-2" />
                        Add to Canvas
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              {isGenerating && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 rounded-2xl p-4">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
                      <span className="text-sm text-gray-400">AI is analyzing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Examples */}
          <div className="px-4 py-2 border-t border-gray-800">
            <p className="text-xs text-gray-500 mb-2">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="cursor-pointer border-gray-700 text-gray-400 hover:border-orange-500 hover:text-orange-500 text-xs"
                onClick={() => setInput("When I receive a Stripe payment, send me an email")}
              >
                <Zap className="w-3 h-3 mr-1" />
                Payment → Email
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer border-gray-700 text-gray-400 hover:border-orange-500 hover:text-orange-500 text-xs"
                onClick={() =>
                  setInput("When a new row is added to my Google Sheet, analyze it with AI and save to database")
                }
              >
                <Database className="w-3 h-3 mr-1" />
                Sheet → AI → DB
              </Badge>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-orange-500/20">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Describe your automation..."
                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                disabled={isGenerating}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isGenerating}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
