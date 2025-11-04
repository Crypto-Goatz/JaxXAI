"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Terminal, MessageSquare, Sparkles } from "lucide-react"

export function CommandCenter() {
  const [mode, setMode] = useState<"command" | "chat">("command")
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const commandPrompts = [
    "Create a new landing page for my product",
    "Generate SEO content for my blog",
    "Set up email campaign for new subscribers",
    "Analyze my website traffic from last month",
    "Deploy my app to production",
    "Create a customer feedback form",
  ]

  const chatPrompts = [
    "How do I connect my Stripe account?",
    "What MODS are available for marketing?",
    "Show me my recent activity",
    "Explain how the SaaS MOD works",
    "What integrations do I have active?",
    "Help me optimize my workflow",
  ]

  const prompts = mode === "command" ? commandPrompts : chatPrompts

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt)
    setIsFocused(false)
  }

  return (
    <div className="w-full border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-8 py-6">
        {/* Mode Toggle */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            onClick={() => setMode("command")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              mode === "command"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span className="text-sm font-medium">COMMAND</span>
          </button>
          <button
            onClick={() => setMode("chat")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              mode === "chat"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-medium">CHAT</span>
          </button>
        </div>

        {/* Command Input */}
        <div className="relative">
          <div className="relative">
            <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            <Input
              type="text"
              placeholder={
                mode === "command"
                  ? "Tell APEX what to build or execute..."
                  : "Ask APEX anything about your business..."
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className="pl-12 pr-4 h-14 text-base bg-background border-2 border-border focus:border-primary transition-colors"
            />
          </div>

          {/* Suggested Prompts */}
          {isFocused && !inputValue && (
            <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-card border border-border rounded-lg shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Suggested {mode === "command" ? "Commands" : "Questions"}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {prompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(prompt)}
                    className="text-left p-3 rounded-lg bg-muted/50 hover:bg-muted text-sm text-foreground transition-colors group"
                  >
                    <span className="group-hover:text-primary transition-colors">{prompt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mode Description */}
        <div className="mt-3 text-center">
          <Badge variant="outline" className="text-xs">
            {mode === "command"
              ? "Execute actions and build features with natural language"
              : "Get help and insights about your APEX system"}
          </Badge>
        </div>
      </div>
    </div>
  )
}
