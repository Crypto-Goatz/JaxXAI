"use client"

import type React from "react"
import { memo } from "react"
import { Position } from "@xyflow/react"
import type { RiskManagementNodeProps } from "@/types/node.types"
import { BaseNode, BaseNodeHeader, BaseNodeHeaderTitle, BaseNodeContent } from "@/components/flow/nodes/base-node"
import { BaseHandle } from "@/components/flow/handles/base-handle"
import { getNodeIcon } from "@/utils/node-utils"
import { useFlowStore } from "@/contexts/flow-context"
import { cn } from "@/lib/utils"

const RiskManagementNode = memo(function RiskManagementNode({ id, data, selected }: RiskManagementNodeProps) {
  const setSelectedNodes = useFlowStore((state) => state.setSelectedNodes)
  const Icon = getNodeIcon("riskManagement")

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedNodes([id])
  }

  return (
    <BaseNode
      className={cn(
        "border-orange-400/40 bg-gradient-to-br from-orange-50/90 to-amber-100/60",
        "dark:border-orange-500/30 dark:from-orange-950/80 dark:to-amber-900/40",
        "glow-orange glow-orange-hover group",
      )}
      data-selected={selected}
    >
      <BaseNodeHeader
        className="border-orange-300/30 bg-orange-50/60 dark:border-orange-700/30 dark:bg-orange-900/30"
        onSettingsClick={handleSettingsClick}
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-orange-500/15 dark:bg-orange-500/25 ring-1 ring-orange-500/20">
            <Icon className="size-4 text-orange-600 dark:text-orange-400" />
          </div>
          <BaseNodeHeaderTitle className="text-orange-900 dark:text-orange-100">Risk Management</BaseNodeHeaderTitle>
        </div>
      </BaseNodeHeader>
      <BaseNodeContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-orange-700/70 dark:text-orange-300/70">Rule:</span>
            <span className="font-medium text-orange-900 dark:text-orange-100 capitalize">
              {data.ruleType.replace("-", " ")}
            </span>
          </div>
          {data.percentage !== undefined && (
            <div className="flex justify-between items-center">
              <span className="text-orange-700/70 dark:text-orange-300/70">Percentage:</span>
              <span className="font-medium text-orange-900 dark:text-orange-100">{data.percentage}%</span>
            </div>
          )}
          {data.amount !== undefined && (
            <div className="flex justify-between items-center">
              <span className="text-orange-700/70 dark:text-orange-300/70">Amount:</span>
              <span className="font-medium text-orange-900 dark:text-orange-100">${data.amount.toLocaleString()}</span>
            </div>
          )}
          {data.tradingPair && (
            <div className="flex justify-between items-center">
              <span className="text-orange-700/70 dark:text-orange-300/70">Pair:</span>
              <span className="font-medium text-orange-900 dark:text-orange-100">{data.tradingPair}</span>
            </div>
          )}
        </div>
      </BaseNodeContent>
      <BaseHandle type="target" position={Position.Left} />
      <BaseHandle type="source" position={Position.Right} />
    </BaseNode>
  )
})

export default RiskManagementNode
