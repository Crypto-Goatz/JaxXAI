"use client"

import type React from "react"

import { memo } from "react"
import { TrendingUp, Bell, Activity, GitBranch, ArrowRightLeft, MessageSquare, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { NodeType } from "@/types/node.types"

interface NodeTypeItem {
  type: NodeType
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const nodeTypes: NodeTypeItem[] = [
  {
    type: "marketMonitor",
    label: "Market Monitor",
    description: "Monitor crypto pairs and market data",
    icon: TrendingUp,
    color: "text-green-600 dark:text-green-400",
  },
  {
    type: "priceAlert",
    label: "Price Alert",
    description: "Trigger on price thresholds",
    icon: Bell,
    color: "text-yellow-600 dark:text-yellow-400",
  },
  {
    type: "technicalIndicator",
    label: "Technical Indicator",
    description: "Calculate RSI, MACD, SMA, etc.",
    icon: Activity,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    type: "condition",
    label: "Condition",
    description: "Evaluate trading conditions",
    icon: GitBranch,
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    type: "tradeExecution",
    label: "Trade Execution",
    description: "Execute buy/sell orders",
    icon: ArrowRightLeft,
    color: "text-red-600 dark:text-red-400",
  },
  {
    type: "notification",
    label: "Notification",
    description: "Send alerts and notifications",
    icon: MessageSquare,
    color: "text-cyan-600 dark:text-cyan-400",
  },
  {
    type: "riskManagement",
    label: "Risk Management",
    description: "Stop-loss and portfolio protection",
    icon: Shield,
    color: "text-orange-600 dark:text-orange-400",
  },
]

const AvailableNodesPanel = memo(function AvailableNodesPanel() {
  const handleDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <div className="space-y-3">
      <div className="text-sm text-muted-foreground">Drag nodes onto the canvas to build your trading strategy</div>

      <div className="space-y-2">
        {nodeTypes.map((nodeType) => {
          const Icon = nodeType.icon

          return (
            <Button
              key={nodeType.type}
              variant="outline"
              className="w-full h-auto p-3 justify-start cursor-grab active:cursor-grabbing bg-card shadow-soft hover:shadow-soft-md transition-all duration-200 hover:scale-[1.02]"
              draggable
              onDragStart={(e) => handleDragStart(e, nodeType.type)}
            >
              <div className="flex items-start gap-3 w-full">
                <Icon className={cn("size-5 mt-0.5 shrink-0", nodeType.color)} />
                <div className="text-left">
                  <div className="font-medium text-sm">{nodeType.label}</div>
                  <div className="text-xs text-muted-foreground">{nodeType.description}</div>
                </div>
              </div>
            </Button>
          )
        })}
      </div>
    </div>
  )
})

export default AvailableNodesPanel
