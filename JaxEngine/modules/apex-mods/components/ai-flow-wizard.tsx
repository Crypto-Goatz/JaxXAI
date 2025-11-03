"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles, Send, Zap, CheckCircle2, Loader2 } from "lucide-react"

interface Message {
  id: string
  role: "assistant" | "user"
  content: string
  suggestions?: string[]
  endpoints?: any[]
}

interface AIFlowWizardProps {
  isOpen: boolean
  onClose: () => void
  onGenerateFlow: (flow: any) => void
}

export function AIFlowWizard({ isOpen, onClose, onGenerateFlow }: AIFlowWizardProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm your APEX Flow AI assistant. I'll help you build the perfect automation workflow. What would you like to automate today?",
      suggestions: [
        "Send email when payment received",
        "Update spreadsheet from form submissions",
        "Monitor crypto wallet and send alerts",
        "Sync data between apps",
      ],
    },
  ])
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: message,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsGenerating(true)

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate AI response based on step
    let aiResponse: Message

    if (currentStep === 1) {
      // Step 1: Understand the goal
      aiResponse = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: `Great! I understand you want to: "${message}". Now, what should trigger this automation?`,
        suggestions: [
          "New payment received (Stripe)",
          "New row in spreadsheet",
          "Scheduled time (cron)",
          "Webhook from external service",
          "New crypto transaction",
        ],
      }
      setCurrentStep(2)
    } else if (currentStep === 2) {
      // Step 2: Choose trigger
      aiResponse = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: `Perfect! I'll use "${message}" as the trigger. What actions should happen when this trigger fires?`,
        suggestions: [
          "Send email notification",
          "Update Google Sheets",
          "Process with AI",
          "Send webhook to another service",
          "Save to database",
        ],
      }
      setCurrentStep(3)
    } else if (currentStep === 3) {
      // Step 3: Choose actions
      aiResponse = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: `Excellent! I'll add "${message}" as an action. Would you like to add any filtering or additional actions?`,
        suggestions: ["Add filter condition", "Add another action", "No, generate my flow now"],
      }
      setCurrentStep(4)
    } else {
      // Step 4: Finalize
      if (message.toLowerCase().includes("generate") || message.toLowerCase().includes("no")) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content:
            "Perfect! I've analyzed your requirements and I'm ready to generate your automation flow. Click the button below to add it to your canvas!",
        }
        setCurrentStep(5)
      } else {
        aiResponse = {
          id: `ai-${Date.now()}`,
          role: "assistant",
          content: `Got it! I'll add "${message}". Anything else, or should I generate your flow now?`,
          suggestions: ["Add another action", "Generate my flow now"],
        }
      }
    }

    setMessages((prev) => [...prev, aiResponse])
    setIsGenerating(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleGenerateFlow = () => {
    // Extract information from conversation
    const userMessages = messages.filter((m) => m.role === "user").map((m) => m.content)

    // Generate a sample flow based on the conversation
    const generatedFlow = {
      nodes: [
        {
          id: `trigger-${Date.now()}`,
          name: "Webhook Trigger",
          icon: "Webhook",
          color: "from-blue-500 to-cyan-500",
          description: userMessages[1] || "Trigger event",
          category: "triggers",
          x: 100,
          y: 250,
          width: 240,
          height: 135,
        },
        {
          id: `action-${Date.now()}`,
          name: "AI Processing",
          icon: "Sparkles",
          color: "from-violet-500 to-purple-500",
          description: "Process incoming data",
          category: "actions",
          x: 400,
          y: 250,
          width: 240,
          height: 135,
        },
        {
          id: `output-${Date.now()}`,
          name: "Send Email",
          icon: "Mail",
          color: "from-purple-500 to-pink-500",
          description: userMessages[2] || "Send notification",
          category: "outbound",
          x: 700,
          y: 250,
          width: 240,
          height: 135,
        },
      ],
      connections: [
        {
          id: `conn-1-${Date.now()}`,
          from: `trigger-${Date.now()}`,
          to: `action-${Date.now()}`,
          fromPort: "output",
          toPort: "input",
        },
        {
          id: `conn-2-${Date.now()}`,
          from: `action-${Date.now()}`,
          to: `output-${Date.now()}`,
          fromPort: "output",
          toPort: "input",
        },
      ],
    }

    onGenerateFlow(generatedFlow)
    onClose()

    // Reset wizard
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi! I'm your APEX Flow AI assistant. I'll help you build the perfect automation workflow. What would you like to automate today?",
        suggestions: [
          "Send email when payment received",
          "Update spreadsheet from form submissions",
          "Monitor crypto wallet and send alerts",
          "Sync data between apps",
        ],
      },
    ])
    setCurrentStep(1)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[700px] bg-gray-900 border-orange-500/20 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            AI Flow Wizard
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Let AI guide you through building the perfect automation workflow
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex items-center gap-2 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                  step < currentStep
                    ? "bg-green-500 text-white"
                    : step === currentStep
                      ? "bg-gradient-to-br from-orange-500 to-red-500 text-white"
                      : "bg-gray-700 text-gray-400"
                }`}
              >
                {step < currentStep ? <CheckCircle2 className="w-4 h-4" /> : step}
              </div>
              {step < 5 && (
                <div
                  className={`flex-1 h-1 rounded-full transition-all ${
                    step < currentStep ? "bg-green-500" : "bg-gray-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 pr-4 mb-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-orange-500 to-red-500 text-white"
                      : "bg-gray-800 text-gray-100"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-semibold text-orange-500">AI Assistant</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.content}</p>

                  {/* Suggestions */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs text-gray-400 mb-2">Quick suggestions:</p>
                      {message.suggestions.map((suggestion, idx) => (
                        <Button
                          key={idx}
                          size="sm"
                          variant="outline"
                          className="w-full justify-start text-left border-gray-700 hover:border-orange-500/50 hover:bg-orange-500/10 text-gray-300 hover:text-white bg-transparent"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <Zap className="w-3 h-3 mr-2 text-orange-500" />
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isGenerating && (
              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
                    <span className="text-sm text-gray-400">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="space-y-3">
          {currentStep === 5 && (
            <Button
              onClick={handleGenerateFlow}
              className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white hover:from-orange-600 hover:via-red-600 hover:to-yellow-600"
              size="lg"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate My Flow
            </Button>
          )}

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage(input)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              disabled={isGenerating || currentStep === 5}
            />
            <Button
              onClick={() => handleSendMessage(input)}
              disabled={!input.trim() || isGenerating || currentStep === 5}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
