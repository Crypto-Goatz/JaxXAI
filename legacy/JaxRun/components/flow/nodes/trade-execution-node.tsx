"use client"

import type React from "react"
import { memo } from "react"
import { Position } from "@xyflow/react"
import type { TradeExecutionNodeProps } from "@/types/node.types"
import { BaseNode, BaseNodeHeader, BaseNodeHeaderTitle, BaseNodeContent } from "@/components/flow/nodes/base-node"
import { BaseHandle } from "@/components/flow/handles/base-handle"
import { getNodeIcon } from "@/utils/node-utils"
import { useFlowStore } from "@/contexts/flow-context"
import { cn } from "@/lib/utils"

const TradeExecutionNode = memo(function TradeExecutionNode({ id, data, selected }: TradeExecutionNodeProps) {
  const setSelectedNodes = useFlowStore((state) => state.setSelectedNodes)
  const Icon = getNodeIcon("tradeExecution")

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedNodes([id])
  }

  return (
    <BaseNode
      className={cn(
        "border-red-400/40 bg-gradient-to-br from-red-50/90 to-rose-100/60",
        "dark:border-red-500/30 dark:from-red-950/80 dark:to-rose-900/40",
        "glow-red glow-red-hover group",
      )}
      data-selected={selected}
    >
      <BaseNodeHeader
        className="border-red-300/30 bg-red-50/60 dark:border-red-700/30 dark:bg-red-900/30"
        onSettingsClick={handleSettingsClick}
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-red-500/15 dark:bg-red-500/25 ring-1 ring-red-500/20">
            <Icon className="size-4 text-red-600 dark:text-red-400" />
          </div>
          <BaseNodeHeaderTitle className="text-red-900 dark:text-red-100">Trade Execution</BaseNodeHeaderTitle>
        </div>
      </BaseNodeHeader>
      <BaseNodeContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-red-700/70 dark:text-red-300/70">Action:</span>
            <span
              className={cn(
                "font-medium uppercase",
                data.action === "buy" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
              )}
            >
              {data.action}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-red-700/70 dark:text-red-300/70">Type:</span>
            <span className="font-medium text-red-900 dark:text-red-100 capitalize">{data.orderType}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-red-700/70 dark:text-red-300/70">Amount:</span>
            <span className="font-medium text-red-900 dark:text-red-100">
              {data.amount} {data.amountType}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-red-700/70 dark:text-red-300/70">Pair:</span>
            <span className="font-medium text-red-900 dark:text-red-100">{data.tradingPair}</span>
          </div>
        </div>
      </BaseNodeContent>
      <BaseHandle type="target" position={Position.Left} />
      <BaseHandle type="source" position={Position.Right} />
    </BaseNode>
  )
})

export default TradeExecutionNode
