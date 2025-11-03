"use client"

import type React from "react"
import { memo } from "react"
import { Position } from "@xyflow/react"
import type { PriceAlertNodeProps } from "@/types/node.types"
import { BaseNode, BaseNodeHeader, BaseNodeHeaderTitle, BaseNodeContent } from "@/components/flow/nodes/base-node"
import { BaseHandle } from "@/components/flow/handles/base-handle"
import { getNodeIcon } from "@/utils/node-utils"
import { useFlowStore } from "@/contexts/flow-context"
import { cn } from "@/lib/utils"

const PriceAlertNode = memo(function PriceAlertNode({ id, data, selected }: PriceAlertNodeProps) {
  const setSelectedNodes = useFlowStore((state) => state.setSelectedNodes)
  const Icon = getNodeIcon("priceAlert")

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedNodes([id])
  }

  return (
    <BaseNode
      className={cn(
        "border-yellow-400/40 bg-gradient-to-br from-yellow-50/90 to-amber-100/60",
        "dark:border-yellow-500/30 dark:from-yellow-950/80 dark:to-amber-900/40",
        "glow-yellow glow-yellow-hover group",
      )}
      data-selected={selected}
    >
      <BaseNodeHeader
        className="border-yellow-300/30 bg-yellow-50/60 dark:border-yellow-700/30 dark:bg-yellow-900/30"
        onSettingsClick={handleSettingsClick}
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-yellow-500/15 dark:bg-yellow-500/25 ring-1 ring-yellow-500/20">
            <Icon className="size-4 text-yellow-600 dark:text-yellow-400" />
          </div>
          <BaseNodeHeaderTitle className="text-yellow-900 dark:text-yellow-100">Price Alert</BaseNodeHeaderTitle>
        </div>
      </BaseNodeHeader>
      <BaseNodeContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-yellow-700/70 dark:text-yellow-300/70">Pair:</span>
            <span className="font-medium text-yellow-900 dark:text-yellow-100">{data.tradingPair}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-yellow-700/70 dark:text-yellow-300/70">Type:</span>
            <span className="font-medium text-yellow-900 dark:text-yellow-100 capitalize">{data.alertType}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-yellow-700/70 dark:text-yellow-300/70">Target:</span>
            <span className="font-medium text-yellow-900 dark:text-yellow-100">
              ${data.targetPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </BaseNodeContent>
      <BaseHandle type="target" position={Position.Left} />
      <BaseHandle type="source" position={Position.Right} />
    </BaseNode>
  )
})

export default PriceAlertNode
