"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Zap } from "lucide-react"

export function InteractiveFlowDemo() {
  const [nodes, setNodes] = useState([
    { id: "1", type: "trigger", label: "Google Sheets", x: 50, y: 100 },
    { id: "2", type: "action", label: "AI Process", x: 250, y: 100 },
    { id: "3", type: "output", label: "Send Email", x: 450, y: 100 },
  ])
  const [isRunning, setIsRunning] = useState(false)
  const [activeNode, setActiveNode] = useState<string | null>(null)

  const runDemo = () => {
    setIsRunning(true)
    setActiveNode("1")

    setTimeout(() => setActiveNode("2"), 1000)
    setTimeout(() => setActiveNode("3"), 2000)
    setTimeout(() => {
      setActiveNode(null)
      setIsRunning(false)
    }, 3000)
  }

  return (
    <Card className="p-8 bg-gray-900/50 border-gray-800">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-white mb-2">Try APEX Flow</h3>
          <p className="text-gray-400">Click Run to see automation in action</p>
        </div>
        <Button
          onClick={runDemo}
          disabled={isRunning}
          className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 hover:opacity-90"
        >
          <Play className="w-4 h-4 mr-2" />
          {isRunning ? "Running..." : "Run Demo"}
        </Button>
      </div>

      <div className="relative h-64 bg-black/50 rounded-lg border border-gray-800 overflow-hidden">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line
            x1="150"
            y1="120"
            x2="250"
            y2="120"
            stroke={activeNode === "2" ? "url(#lava-gradient)" : "#374151"}
            strokeWidth="2"
          />
          <line
            x1="350"
            y1="120"
            x2="450"
            y2="120"
            stroke={activeNode === "3" ? "url(#lava-gradient)" : "#374151"}
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="lava-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`absolute w-24 h-24 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
              activeNode === node.id
                ? "bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500 scale-110 shadow-lg shadow-orange-500/50"
                : "bg-gray-800 border border-gray-700"
            }`}
            style={{ left: node.x, top: node.y }}
          >
            <Zap className={`w-6 h-6 mb-1 ${activeNode === node.id ? "text-white" : "text-gray-400"}`} />
            <span
              className={`text-xs text-center px-2 ${activeNode === node.id ? "text-white font-semibold" : "text-gray-400"}`}
            >
              {node.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        This is a simplified demo. The full APEX Flow has 50+ integrations and unlimited possibilities.
      </div>
    </Card>
  )
}
