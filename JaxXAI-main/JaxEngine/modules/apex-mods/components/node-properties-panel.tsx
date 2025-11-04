"use client"

import type React from "react"

import type { Node, NodeType } from "@/lib/flow-types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { MessageSquare, Zap, GitBranch, Database, Trash2 } from "lucide-react"

interface NodePropertiesPanelProps {
  selectedNode: Node | null
  onUpdateNode: (nodeId: string, updates: Partial<Node>) => void
  onDeleteNode: (nodeId: string) => void
}

const nodeTypeIcons: Record<NodeType, React.ReactNode> = {
  message: <MessageSquare className="h-4 w-4" />,
  action: <Zap className="h-4 w-4" />,
  condition: <GitBranch className="h-4 w-4" />,
  data: <Database className="h-4 w-4" />,
}

const nodeTypeLabels: Record<NodeType, string> = {
  message: "Message Node",
  action: "Action Node",
  condition: "Condition Node",
  data: "Data Node",
}

export function NodePropertiesPanel({ selectedNode, onUpdateNode, onDeleteNode }: NodePropertiesPanelProps) {
  if (!selectedNode) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="text-center">
          <div className="mb-2 text-sm font-medium text-muted-foreground">No node selected</div>
          <p className="text-xs text-muted-foreground">Click on a node to view and edit its properties</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          {nodeTypeIcons[selectedNode.type]}
          <span>{nodeTypeLabels[selectedNode.type]}</span>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <div className="space-y-2">
          <Label htmlFor="node-label" className="text-xs font-medium">
            Label
          </Label>
          <Input
            id="node-label"
            value={selectedNode.label}
            onChange={(e) => onUpdateNode(selectedNode.id, { label: e.target.value })}
            placeholder="Enter node label"
            className="h-9"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="node-description" className="text-xs font-medium">
            Description
          </Label>
          <Textarea
            id="node-description"
            value={selectedNode.description || ""}
            onChange={(e) => onUpdateNode(selectedNode.id, { description: e.target.value })}
            placeholder="Enter node description"
            className="min-h-[100px] resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-medium">Node ID</Label>
          <div className="rounded-md bg-muted px-3 py-2 text-xs font-mono text-muted-foreground">{selectedNode.id}</div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <Button variant="destructive" size="sm" className="w-full" onClick={() => onDeleteNode(selectedNode.id)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Node
        </Button>
      </div>
    </div>
  )
}
