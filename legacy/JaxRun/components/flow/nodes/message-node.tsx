"use client"

import type React from "react"

import { memo } from "react"
import { Position } from "@xyflow/react"
import type { MessageNodeProps } from "@/types/node.types"
import { BaseNode, BaseNodeHeader, BaseNodeHeaderTitle, BaseNodeContent } from "@/components/flow/nodes/base-node"
import { BaseHandle } from "@/components/flow/handles/base-handle"
import { getNodeIcon } from "@/utils/node-utils"
import MessageEditor from "@/components/flow/nodes/properties/shared/message-editor"
import { useFlowStore } from "@/contexts/flow-context"
import { cn } from "@/lib/utils"
import { Clock } from "lucide-react"
import { NodeStatusIndicator } from "@/components/ui/node-status-indicator"
import { useSimulationStore } from "@/contexts/simulation-context"
import { Button } from "@/components/ui/button"

const MessageNode = memo(function MessageNode({ id, data, selected }: MessageNodeProps) {
  const { message, delay } = data
  const setSelectedNodes = useFlowStore((state) => state.setSelectedNodes)
  const currentSimulationNode = useSimulationStore((state) => state.currentNodeId)
  const simulationStatus = useSimulationStore((state) => state.status)

  const isActiveInSimulation = simulationStatus !== "idle" && currentSimulationNode === id

  const Icon = getNodeIcon("message")
  const nodeTitle = "Message"

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedNodes([id])
  }

  return (
    <NodeStatusIndicator status={isActiveInSimulation ? "loading" : "initial"} variant="border">
      <BaseNode
        className={cn(
          "border-cyan-400/40 bg-gradient-to-br from-cyan-50/90 to-blue-100/60",
          "dark:border-cyan-500/30 dark:from-cyan-950/80 dark:to-blue-900/40",
          "glow-cyan glow-cyan-hover group",
        )}
        data-selected={selected}
      >
        <BaseNodeHeader
          className="border-cyan-300/30 bg-cyan-50/60 dark:border-cyan-700/30 dark:bg-cyan-900/30"
          onSettingsClick={handleSettingsClick}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-cyan-500/15 dark:bg-cyan-500/25 ring-1 ring-cyan-500/20">
              <Icon className="size-4 text-cyan-600 dark:text-cyan-400" />
            </div>
            <BaseNodeHeaderTitle className="text-cyan-900 dark:text-cyan-100">{nodeTitle}</BaseNodeHeaderTitle>
          </div>
        </BaseNodeHeader>

        <BaseNodeContent className="gap-2.5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-300 uppercase tracking-wide">
                Message
              </span>
              {!message && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-xs text-cyan-600 hover:text-cyan-700 hover:bg-cyan-100 dark:text-cyan-400 dark:hover:text-cyan-300 dark:hover:bg-cyan-900/40 transition-all duration-200"
                  onClick={handleSettingsClick}
                >
                  <Clock className="size-3 mr-1" />
                  Settings
                </Button>
              )}
            </div>
            <div
              className={cn(
                "py-2.5 px-3 rounded-lg border transition-all duration-200",
                message
                  ? "bg-white/80 dark:bg-cyan-950/60 border-cyan-200/60 dark:border-cyan-800/50 shadow-soft"
                  : "bg-amber-50/80 dark:bg-amber-950/30 border-amber-200/60 dark:border-amber-800/50 border-dashed shadow-inner-soft",
              )}
            >
              {message ? (
                <MessageEditor value={message} readOnly className="text-sm leading-relaxed" />
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-amber-700 dark:text-amber-400 font-medium">Not Set</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-3 text-xs border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/40 bg-transparent shadow-soft hover:shadow-soft-md transition-all duration-200"
                    onClick={handleSettingsClick}
                  >
                    Configure
                  </Button>
                </div>
              )}
            </div>
          </div>

          {delay !== undefined && delay > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-100/50 dark:bg-cyan-900/30 border border-cyan-200/60 dark:border-cyan-800/50 shadow-soft">
              <Clock className="size-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">Delay: {delay}ms</span>
            </div>
          )}
        </BaseNodeContent>

        <BaseHandle type="target" position={Position.Left} />
        <BaseHandle type="source" position={Position.Right} />
      </BaseNode>
    </NodeStatusIndicator>
  )
})

export default MessageNode
