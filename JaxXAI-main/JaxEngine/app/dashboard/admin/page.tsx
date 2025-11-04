"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Terminal, Send, Lock, CheckCircle2, XCircle, Clock } from "lucide-react"

interface CLICommand {
  id: string
  command: string
  provider: "openai" | "gemini"
  timestamp: string
  status: "pending" | "running" | "success" | "failed"
  output?: string
  error?: string
  executionTime?: number
}

export default function AdminCLIPage() {
  const [command, setCommand] = useState("")
  const [provider, setProvider] = useState<"openai" | "gemini">("openai")
  const [history, setHistory] = useState<CLICommand[]>([])
  const [loading, setLoading] = useState(false)
  const [adminKey, setAdminKey] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const fetchHistory = async () => {
    if (!authenticated) return

    try {
      const response = await fetch("/api/admin/cli", {
        headers: {
          "x-admin-key": adminKey,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setHistory(data.history || [])
      }
    } catch (error) {
      console.error("Failed to fetch history:", error)
    }
  }

  useEffect(() => {
    if (authenticated) {
      fetchHistory()
      const interval = setInterval(fetchHistory, 5000)
      return () => clearInterval(interval)
    }
  }, [authenticated])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  const handleExecute = async () => {
    if (!command.trim() || !authenticated) return

    setLoading(true)

    try {
      const response = await fetch("/api/admin/cli", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ command, provider }),
      })

      const data = await response.json()

      if (response.ok) {
        setCommand("")
        fetchHistory()
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      alert("Failed to execute command")
    } finally {
      setLoading(false)
    }
  }

  const handleAuth = () => {
    if (adminKey) {
      setAuthenticated(true)
    }
  }

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md p-8 space-y-6">
          <div className="text-center space-y-2">
            <Lock className="h-12 w-12 mx-auto text-primary" />
            <h1 className="text-2xl font-bold">Admin CLI Access</h1>
            <p className="text-sm text-muted-foreground">Enter your admin key to access the CLI</p>
          </div>

          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Admin Secret Key"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAuth()}
            />
            <Button onClick={handleAuth} className="w-full">
              Authenticate
            </Button>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>⚠️ This is a restricted area</p>
            <p>Only authorized administrators can access this feature</p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Admin CLI
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Execute commands via OpenAI Codex or Gemini CLI</p>
        </div>
        <div className="flex gap-2">
          <Select value={provider} onValueChange={(value: any) => setProvider(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="openai">OpenAI</SelectItem>
              <SelectItem value="gemini">Gemini</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => setAuthenticated(false)}>
            <Lock className="h-4 w-4 mr-2" />
            Lock
          </Button>
        </div>
      </div>

      {/* Terminal */}
      <Card className="p-6 bg-black/90 border-primary/20">
        <div className="h-96 overflow-y-auto pr-4" ref={scrollRef}>
          <div className="space-y-4 font-mono text-sm">
            {history.length === 0 ? (
              <div className="text-muted-foreground text-center py-12">
                <Terminal className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No commands executed yet</p>
                <p className="text-xs mt-2">Type a command below to get started</p>
              </div>
            ) : (
              history.map((cmd) => (
                <div key={cmd.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">$</span>
                    <span className="text-white">{cmd.command}</span>
                    <Badge variant="outline" className="ml-auto text-xs">
                      {cmd.provider}
                    </Badge>
                    {cmd.status === "success" && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    {cmd.status === "failed" && <XCircle className="h-4 w-4 text-red-500" />}
                    {cmd.status === "running" && <Clock className="h-4 w-4 text-yellow-500 animate-pulse" />}
                  </div>

                  {cmd.output && (
                    <div className="pl-4 text-gray-300 whitespace-pre-wrap border-l-2 border-primary/30">
                      {cmd.output}
                    </div>
                  )}

                  {cmd.error && (
                    <div className="pl-4 text-red-400 whitespace-pre-wrap border-l-2 border-red-500/30">
                      Error: {cmd.error}
                    </div>
                  )}

                  {cmd.executionTime && (
                    <div className="text-xs text-muted-foreground">Executed in {cmd.executionTime}ms</div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </Card>

      {/* Input */}
      <Card className="p-4">
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
            <Terminal className="h-4 w-4 text-muted-foreground" />
            <Input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleExecute()}
              placeholder="Enter command (e.g., ls -la, npm --version, git status)"
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={loading}
            />
          </div>
          <Button onClick={handleExecute} disabled={loading || !command.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 text-xs text-muted-foreground space-y-1">
          <p>⚠️ Allowed commands: ls, pwd, cat, echo, date, node, npm, git, curl, grep, find, ps, df, du</p>
          <p>🔒 Dangerous commands are automatically blocked for security</p>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Terminal className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total Commands</p>
              <p className="text-2xl font-bold">{history.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Successful</p>
              <p className="text-2xl font-bold">{history.filter((h) => h.status === "success").length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <XCircle className="h-5 w-5 text-red-500" />
            <div>
              <p className="text-sm text-muted-foreground">Failed</p>
              <p className="text-2xl font-bold">{history.filter((h) => h.status === "failed").length}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
