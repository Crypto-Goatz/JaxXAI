"use client"

import type React from "react"

import type { Node, NodeType } from "@/lib/flow-types"
import { MessageSquare, Zap, GitBranch, Database } from "lucide-react"
import { cn } from "@/lib/utils"

interface FlowNodeProps {
  node: Node
  onDragStart: (e: React.DragEvent, node: Node) => void
  onDrag: (e: React.DragEvent, node: Node) => void
  onDragEnd: () => void
  isSelected: boolean
  onSelect: (nodeId: string) => void
}

const nodeTypeConfig: Record<NodeType, { icon: React.ReactNode; color: string; bgColor: string }> = {
  message: {
    icon: <MessageSquare className="h-4 w-4" />,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
  },
  action: {
    icon: <Zap className="h-4 w-4" />,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
  },
  condition: {
    icon: <GitBranch className="h-4 w-4" />,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
  },
  data: {
    icon: <Database className="h-4 w-4" />,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
  },
}

export function FlowNode({ node, onDragStart, onDrag, onDragEnd, isSelected, onSelect }: FlowNodeProps) {
  const config = nodeTypeConfig[node.type]

  return (
    <div
      className={cn(
        "absolute cursor-move rounded-lg border-2 bg-card p-3 shadow-sm transition-all hover:shadow-md",
        isSelected ? "border-blue-500 ring-2 ring-blue-500/20" : "border-border hover:border-blue-300",
      )}
      style={{
        left: `${node.position.x}px`,
        top: `${node.position.y}px`,
        width: "180px",
      }}
      draggable
      onDragStart={(e) => onDragStart(e, node)}
      onDrag={(e) => onDrag(e, node)}
      onDragEnd={onDragEnd}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(node.id)
      }}
    >
      <div className="flex items-start gap-2">
        <div
          className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-md", config.bgColor, config.color)}
        >
          {config.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium leading-tight text-foreground">{node.label}</div>
          {node.description && (
            <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{node.description}</div>
          )}
        </div>
      </div>

      {/* Connection points */}
      <div className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-border bg-background" />
      <div className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-border bg-background" />
    </div>
  )
}
