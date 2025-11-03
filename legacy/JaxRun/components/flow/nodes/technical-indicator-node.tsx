"use client"

import type React from "react"
import { memo } from "react"
import { Position } from "@xyflow/react"
import type { TechnicalIndicatorNodeProps } from "@/types/node.types"
import { BaseNode, BaseNodeHeader, BaseNodeHeaderTitle, BaseNodeContent } from "@/components/flow/nodes/base-node"
import { BaseHandle } from "@/components/flow/handles/base-handle"
import { getNodeIcon } from "@/utils/node-utils"
import { useFlowStore } from "@/contexts/flow-context"
import { cn } from "@/lib/utils"

const TechnicalIndicatorNode = memo(function TechnicalIndicatorNode({
  id,
  data,
  selected,
}: TechnicalIndicatorNodeProps) {
  const setSelectedNodes = useFlowStore((state) => state.setSelectedNodes)
  const Icon = getNodeIcon("technicalIndicator")

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedNodes([id])
  }

  return (
    <BaseNode
      className={cn(
        "border-blue-400/40 bg-gradient-to-br from-blue-50/90 to-indigo-100/60",
        "dark:border-blue-500/30 dark:from-blue-950/80 dark:to-indigo-900/40",
        "glow-blue glow-blue-hover group",
      )}
      data-selected={selected}
    >
      <BaseNodeHeader
        className="border-blue-300/30 bg-blue-50/60 dark:border-blue-700/30 dark:bg-blue-900/30"
        onSettingsClick={handleSettingsClick}
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-500/15 dark:bg-blue-500/25 ring-1 ring-blue-500/20">
            <Icon className="size-4 text-blue-600 dark:text-blue-400" />
          </div>
          <BaseNodeHeaderTitle className="text-blue-900 dark:text-blue-100">Technical Indicator</BaseNodeHeaderTitle>
        </div>
      </BaseNodeHeader>
      <BaseNodeContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-blue-700/70 dark:text-blue-300/70">Type:</span>
            <span className="font-medium text-blue-900 dark:text-blue-100 uppercase">{data.indicatorType}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-blue-700/70 dark:text-blue-300/70">Period:</span>
            <span className="font-medium text-blue-900 dark:text-blue-100">{data.period}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-blue-700/70 dark:text-blue-300/70">Variable:</span>
            <code className="font-mono text-xs bg-blue-500/15 dark:bg-blue-500/25 px-2 py-1 rounded text-blue-900 dark:text-blue-100">
              {data.variableName}
            </code>
          </div>
        </div>
      </BaseNodeContent>
      <BaseHandle type="target" position={Position.Left} />
      <BaseHandle type="source" position={Position.Right} />
    </BaseNode>
  )
})

export default TechnicalIndicatorNode
