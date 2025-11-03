"use client"

import type React from "react"
import { memo } from "react"
import { Position } from "@xyflow/react"
import type { ConditionNodeProps } from "@/types/node.types"
import { BaseNode, BaseNodeHeader, BaseNodeHeaderTitle, BaseNodeContent } from "@/components/flow/nodes/base-node"
import { BaseHandle } from "@/components/flow/handles/base-handle"
import { getNodeIcon } from "@/utils/node-utils"
import { useFlowStore } from "@/contexts/flow-context"
import { cn } from "@/lib/utils"

const ConditionNode = memo(function ConditionNode({ id, data, selected }: ConditionNodeProps) {
  const setSelectedNodes = useFlowStore((state) => state.setSelectedNodes)
  const Icon = getNodeIcon("condition")

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedNodes([id])
  }

  return (
    <BaseNode
      className={cn(
        "border-purple-400/40 bg-gradient-to-br from-purple-50/90 to-violet-100/60",
        "dark:border-purple-500/30 dark:from-purple-950/80 dark:to-violet-900/40",
        "glow-purple glow-purple-hover group",
      )}
      data-selected={selected}
    >
      <BaseNodeHeader
        className="border-purple-300/30 bg-purple-50/60 dark:border-purple-700/30 dark:bg-purple-900/30"
        onSettingsClick={handleSettingsClick}
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-purple-500/15 dark:bg-purple-500/25 ring-1 ring-purple-500/20">
            <Icon className="size-4 text-purple-600 dark:text-purple-400" />
          </div>
          <BaseNodeHeaderTitle className="text-purple-900 dark:text-purple-100">Condition</BaseNodeHeaderTitle>
        </div>
      </BaseNodeHeader>
      <BaseNodeContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-purple-700/70 dark:text-purple-300/70">Type:</span>
            <span className="font-medium text-purple-900 dark:text-purple-100 capitalize">{data.conditionType}</span>
          </div>
          <div className="flex items-center gap-2 justify-center py-1 px-2 bg-purple-100/50 dark:bg-purple-900/30 rounded-lg">
            <code className="font-mono text-xs text-purple-900 dark:text-purple-100">{data.leftValue}</code>
            <span className="text-purple-700 dark:text-purple-300 font-bold">{data.operator}</span>
            <code className="font-mono text-xs text-purple-900 dark:text-purple-100">{data.rightValue}</code>
          </div>
          {data.description && (
            <p className="text-xs text-purple-700/70 dark:text-purple-300/70 text-center">{data.description}</p>
          )}
        </div>
      </BaseNodeContent>
      <BaseHandle type="target" position={Position.Left} />
      <BaseHandle type="source" position={Position.Right} id="true" />
      <BaseHandle type="source" position={Position.Bottom} id="false" />
    </BaseNode>
  )
})

export default ConditionNode
