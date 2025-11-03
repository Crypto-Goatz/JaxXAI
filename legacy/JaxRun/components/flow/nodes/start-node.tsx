"use client"

import type React from "react"

import { memo } from "react"
import { Position } from "@xyflow/react"
import type { StartNodeProps } from "@/types/node.types"
import { BaseNode, BaseNodeHeader, BaseNodeHeaderTitle, BaseNodeContent } from "@/components/flow/nodes/base-node"
import { BaseHandle } from "@/components/flow/handles/base-handle"
import { getNodeIcon } from "@/utils/node-utils"
import MessageEditor from "@/components/flow/nodes/properties/shared/message-editor"
import { useFlowStore } from "@/contexts/flow-context"
import { cn } from "@/lib/utils"
import { NodeStatusIndicator } from "@/components/ui/node-status-indicator"
import { useSimulationStore } from "@/contexts/simulation-context"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

const StartNode = memo(function StartNode({ id, data, selected }: StartNodeProps) {
  const { message } = data
  const setActiveSidebarPanel = useFlowStore((state) => state.setSidebarActivePanel)
  const setSelectedNodes = useFlowStore((state) => state.setSelectedNodes)
  const currentSimulationNode = useSimulationStore((state) => state.currentNodeId)
  const simulationStatus = useSimulationStore((state) => state.status)

  const isActiveInSimulation = simulationStatus !== "idle" && currentSimulationNode === id

  const Icon = getNodeIcon("start")
  const nodeTitle = "Start"

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedNodes([id])
  }

  return (
    <NodeStatusIndicator status={isActiveInSimulation ? "loading" : "initial"} variant="border">
      <BaseNode
        className={cn(
          "border-green-400/40 bg-gradient-to-br from-green-50/90 to-emerald-100/60",
          "dark:border-green-500/30 dark:from-green-950/80 dark:to-emerald-900/40",
          "glow-green glow-green-hover group",
        )}
        data-selected={selected}
      >
        <BaseNodeHeader
          className="border-green-300/30 bg-green-50/60 dark:border-green-700/30 dark:bg-green-900/30"
          onSettingsClick={handleSettingsClick}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-green-500/15 dark:bg-green-500/25 ring-1 ring-green-500/20">
              <Icon className="size-4 text-green-600 dark:text-green-400" />
            </div>
            <BaseNodeHeaderTitle className="text-green-900 dark:text-green-100">{nodeTitle}</BaseNodeHeaderTitle>
          </div>
        </BaseNodeHeader>

        <BaseNodeContent className="gap-2.5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-wide">
                Welcome Message
              </span>
              {!message && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-xs text-green-600 hover:text-green-700 hover:bg-green-100 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/40 transition-all duration-200"
                  onClick={handleSettingsClick}
                >
                  <Settings className="size-3 mr-1" />
                  Settings
                </Button>
              )}
            </div>
            <div
              className={cn(
                "py-2.5 px-3 rounded-lg border transition-all duration-200",
                message
                  ? "bg-white/80 dark:bg-green-950/60 border-green-200/60 dark:border-green-800/50 shadow-soft"
                  : "bg-amber-50/80 dark:bg-amber-950/30 border-amber-200/60 dark:border-amber-800/50 border-dashed shadow-inner-soft",
              )}
            >
              {message ? (
                <MessageEditor value={message} readOnly className="text-sm leading-relaxed text-foreground" />
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
        </BaseNodeContent>

        <BaseHandle type="source" position={Position.Right} />
      </BaseNode>
    </NodeStatusIndicator>
  )
})

export default StartNode
