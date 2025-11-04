"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, CheckCircle2 } from "lucide-react"

export function InteractiveEndpointTester() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const testEndpoint = async () => {
    if (!email) return

    setIsLoading(true)
    setResult(null)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setResult(`✓ Email validated: ${email}`)
    setIsLoading(false)
  }

  return (
    <Card className="p-8 bg-gray-900/50 border-gray-800">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-white mb-2">Test API Endpoint</h3>
        <p className="text-gray-400">Try our email validation endpoint</p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black/50 border-gray-700 text-white"
            disabled={isLoading}
          />
          <Button
            onClick={testEndpoint}
            disabled={isLoading || !email}
            className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 hover:opacity-90"
          >
            <Send className="w-4 h-4 mr-2" />
            {isLoading ? "Testing..." : "Test"}
          </Button>
        </div>

        {result && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-green-400 font-medium mb-1">Success!</div>
              <div className="text-sm text-gray-300">{result}</div>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500">
          This is a demo endpoint. Sign up to access 50+ real integrations and build custom workflows.
        </div>
      </div>
    </Card>
  )
}
