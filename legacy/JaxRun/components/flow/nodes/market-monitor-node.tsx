"use client"

import type React from "react"
import { memo } from "react"
import { Position } from "@xyflow/react"
import type { MarketMonitorNodeProps } from "@/types/node.types"
import { BaseNode, BaseNodeHeader, BaseNodeHeaderTitle, BaseNodeContent } from "@/components/flow/nodes/base-node"
import { BaseHandle } from "@/components/flow/handles/base-handle"
import { getNodeIcon } from "@/utils/node-utils"
import { useFlowStore } from "@/contexts/flow-context"
import { cn } from "@/lib/utils"

const MarketMonitorNode = memo(function MarketMonitorNode({ id, data, selected }: MarketMonitorNodeProps) {
  const setSelectedNodes = useFlowStore((state) => state.setSelectedNodes)
  const Icon = getNodeIcon("marketMonitor")

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedNodes([id])
  }

  return (
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
          <BaseNodeHeaderTitle className="text-green-900 dark:text-green-100">Market Monitor</BaseNodeHeaderTitle>
        </div>
      </BaseNodeHeader>
      <BaseNodeContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-green-700/70 dark:text-green-300/70">Pair:</span>
            <span className="font-medium text-green-900 dark:text-green-100">{data.tradingPair}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-green-700/70 dark:text-green-300/70">Exchange:</span>
            <span className="font-medium text-green-900 dark:text-green-100 capitalize">{data.exchange}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-green-700/70 dark:text-green-300/70">Timeframe:</span>
            <span className="font-medium text-green-900 dark:text-green-100">{data.timeframe}</span>
          </div>
        </div>
      </BaseNodeContent>
      <BaseHandle type="source" position={Position.Right} />
    </BaseNode>
  )
})

export default MarketMonitorNode
