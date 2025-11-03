"use client"

import type React from "react"
import { memo } from "react"
import { Position } from "@xyflow/react"
import type { NotificationNodeProps } from "@/types/node.types"
import { BaseNode, BaseNodeHeader, BaseNodeHeaderTitle, BaseNodeContent } from "@/components/flow/nodes/base-node"
import { BaseHandle } from "@/components/flow/handles/base-handle"
import { getNodeIcon } from "@/utils/node-utils"
import { useFlowStore } from "@/contexts/flow-context"
import { cn } from "@/lib/utils"

const NotificationNode = memo(function NotificationNode({ id, data, selected }: NotificationNodeProps) {
  const setSelectedNodes = useFlowStore((state) => state.setSelectedNodes)
  const Icon = getNodeIcon("notification")

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedNodes([id])
  }

  return (
    <BaseNode
      className={cn(
        "border-cyan-400/40 bg-gradient-to-br from-cyan-50/90 to-sky-100/60",
        "dark:border-cyan-500/30 dark:from-cyan-950/80 dark:to-sky-900/40",
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
          <BaseNodeHeaderTitle className="text-cyan-900 dark:text-cyan-100">Notification</BaseNodeHeaderTitle>
        </div>
      </BaseNodeHeader>
      <BaseNodeContent>
        <div className="space-y-2 text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-cyan-700/70 dark:text-cyan-300/70 text-xs">Message:</span>
            <p className="text-xs leading-relaxed text-cyan-900 dark:text-cyan-100">{data.message}</p>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-cyan-700/70 dark:text-cyan-300/70">Channels:</span>
            <span className="font-medium text-cyan-900 dark:text-cyan-100 text-xs">{data.channels.join(", ")}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-cyan-700/70 dark:text-cyan-300/70">Priority:</span>
            <span
              className={cn(
                "font-medium capitalize",
                data.priority === "high"
                  ? "text-red-600 dark:text-red-400"
                  : data.priority === "medium"
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-green-600 dark:text-green-400",
              )}
            >
              {data.priority}
            </span>
          </div>
        </div>
      </BaseNodeContent>
      <BaseHandle type="target" position={Position.Left} />
      <BaseHandle type="source" position={Position.Right} />
    </BaseNode>
  )
})

export default NotificationNode
