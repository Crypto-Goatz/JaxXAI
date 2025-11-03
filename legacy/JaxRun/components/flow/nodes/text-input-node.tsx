"use client"

import type React from "react"

import { memo } from "react"
import { Position } from "@xyflow/react"
import type { TextInputNodeProps } from "@/types/node.types"
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

const TextInputNode = memo(function TextInputNode({ id, data, selected }: TextInputNodeProps) {
  const { message, placeholder, variableName, required, minLength, maxLength } = data
  const setSelectedNodes = useFlowStore((state) => state.setSelectedNodes)
  const currentSimulationNode = useSimulationStore((state) => state.currentNodeId)
  const simulationStatus = useSimulationStore((state) => state.status)

  const isActiveInSimulation = simulationStatus !== "idle" && currentSimulationNode === id

  const Icon = getNodeIcon("textInput")
  const nodeTitle = "Text Input"

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedNodes([id])
  }

  const handleDoubleClick = () => {
    setSelectedNodes([id])
  }

  return (
    <NodeStatusIndicator status={isActiveInSimulation ? "loading" : "initial"} variant="border">
      <BaseNode
        className={cn(
          "border-blue-400/40 bg-gradient-to-br from-blue-50/90 to-indigo-100/60",
          "dark:border-blue-500/30 dark:from-blue-950/80 dark:to-indigo-900/40",
          "glow-blue glow-blue-hover group",
        )}
        data-selected={selected}
        onDoubleClick={handleDoubleClick}
      >
        <BaseNodeHeader
          className="border-blue-300/30 bg-blue-50/60 dark:border-blue-700/30 dark:bg-blue-900/30"
          onSettingsClick={handleSettingsClick}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-500/15 dark:bg-blue-500/25 ring-1 ring-blue-500/20">
              <Icon className="size-4 text-blue-600 dark:text-blue-400" />
            </div>
            <BaseNodeHeaderTitle className="text-blue-900 dark:text-blue-100">{nodeTitle}</BaseNodeHeaderTitle>
          </div>
        </BaseNodeHeader>

        <BaseNodeContent className="gap-2.5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                Prompt
              </span>
              {!message && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/40 transition-all duration-200"
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
                  ? "bg-white/80 dark:bg-blue-950/60 border-blue-200/60 dark:border-blue-800/50 shadow-soft"
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

          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
              Placeholder
            </span>
            <div
              className={cn(
                "px-3 py-2 rounded-lg text-xs border transition-all duration-200",
                placeholder
                  ? "bg-blue-50/60 dark:bg-blue-950/40 border-blue-200/60 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 shadow-soft"
                  : "bg-muted/30 border-dashed text-muted-foreground/60 italic shadow-inner-soft",
              )}
            >
              {placeholder || "Not Set"}
            </div>
          </div>

          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-blue-100/50 dark:bg-blue-900/30 border border-blue-200/60 dark:border-blue-800/50 shadow-soft">
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">Variable</span>
            <code className="rounded-md bg-blue-500/15 dark:bg-blue-500/25 px-2 py-1 text-xs font-mono text-blue-700 dark:text-blue-300 ring-1 ring-blue-500/20">
              {variableName}
            </code>
          </div>

          {(required || minLength !== undefined || maxLength !== undefined) && (
            <div className="flex flex-wrap gap-1.5">
              {required && (
                <span className="inline-flex items-center rounded-md bg-red-100/80 dark:bg-red-900/30 border border-red-200/60 dark:border-red-800/50 px-2.5 py-1 text-xs font-semibold text-red-700 dark:text-red-300 shadow-soft">
                  Required
                </span>
              )}
              {minLength !== undefined && (
                <span className="inline-flex items-center rounded-md bg-blue-100/60 dark:bg-blue-900/30 border border-blue-200/60 dark:border-blue-800/50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 shadow-soft">
                  Min: {minLength}
                </span>
              )}
              {maxLength !== undefined && (
                <span className="inline-flex items-center rounded-md bg-blue-100/60 dark:bg-blue-900/30 border border-blue-200/60 dark:border-blue-800/50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 shadow-soft">
                  Max: {maxLength}
                </span>
              )}
            </div>
          )}
        </BaseNodeContent>

        <BaseHandle type="target" position={Position.Left} />
        <BaseHandle type="source" position={Position.Right} />
      </BaseNode>
    </NodeStatusIndicator>
  )
})

export default TextInputNode
