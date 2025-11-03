"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Terminal, MessageSquare, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useApp } from "@/components/app-provider"
import { SmartNotificationBell } from "@/components/smart-notification-bell"

export function DashboardNavigation() {
  const [mode, setMode] = useState<"command" | "chat">("command")
  const [inputValue, setInputValue] = useState("")
  const { startChat } = useApp()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      startChat(inputValue, mode)
      setInputValue("")
    }
  }

  return (
    <nav className="sticky top-0 border-b border-orange-500/20 bg-black relative z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-red-500/5 to-yellow-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 py-4 relative">
        <div className="flex items-center justify-between gap-6">
          <Link href="/dashboard" className="flex items-center gap-2 shrink-0 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <img src="/images/design-mode/apex-logo-white.png" alt="APEX" className="h-8 w-auto relative z-10" />
            </div>
          </Link>

          <form onSubmit={handleSubmit} className="flex-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/10">
                <button
                  type="button"
                  onClick={() => setMode("command")}
                  className={`p-1.5 rounded transition-all ${
                    mode === "command"
                      ? "bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white shadow-lg shadow-orange-500/20"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                  title="Command Mode"
                >
                  <Terminal className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setMode("chat")}
                  className={`p-1.5 rounded transition-all ${
                    mode === "chat"
                      ? "bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white shadow-lg shadow-orange-500/20"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                  title="Chat Mode"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>

              <div className="relative flex-1">
                <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                <Input
                  type="text"
                  placeholder={mode === "command" ? "Execute command..." : "Ask APEX..."}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="pl-10 pr-4 h-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                />
              </div>
            </div>
          </form>

          <SmartNotificationBell />
        </div>
      </div>
    </nav>
  )
}
