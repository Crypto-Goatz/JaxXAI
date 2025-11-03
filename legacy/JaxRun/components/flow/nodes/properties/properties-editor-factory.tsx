"use client"

import { useNodeDataById } from "@/hooks/use-node-data-by-id"
import MarketMonitorNodePropertiesEditor from "./market-monitor-node-properties-editor"
import PriceAlertNodePropertiesEditor from "./price-alert-node-properties-editor"
import TechnicalIndicatorNodePropertiesEditor from "./technical-indicator-node-properties-editor"
import ConditionNodePropertiesEditor from "./condition-node-properties-editor"
import TradeExecutionNodePropertiesEditor from "./trade-execution-node-properties-editor"
import NotificationNodePropertiesEditor from "./notification-node-properties-editor"
import RiskManagementNodePropertiesEditor from "./risk-management-node-properties-editor"
import type { CustomNode } from "@/types/node.types"

interface PropertiesEditorFactoryProps {
  nodeId: string
  onUpdate: (updates: Partial<CustomNode>) => void
}

export default function PropertiesEditorFactory({ nodeId, onUpdate }: PropertiesEditorFactoryProps) {
  const node = useNodeDataById(nodeId)

  if (!node) {
    return <div className="text-muted-foreground text-sm">Node not found</div>
  }

  switch (node.type) {
    case "marketMonitor":
      return <MarketMonitorNodePropertiesEditor node={node} onUpdate={onUpdate} />
    case "priceAlert":
      return <PriceAlertNodePropertiesEditor node={node} onUpdate={onUpdate} />
    case "technicalIndicator":
      return <TechnicalIndicatorNodePropertiesEditor node={node} onUpdate={onUpdate} />
    case "condition":
      return <ConditionNodePropertiesEditor node={node} onUpdate={onUpdate} />
    case "tradeExecution":
      return <TradeExecutionNodePropertiesEditor node={node} onUpdate={onUpdate} />
    case "notification":
      return <NotificationNodePropertiesEditor node={node} onUpdate={onUpdate} />
    case "riskManagement":
      return <RiskManagementNodePropertiesEditor node={node} onUpdate={onUpdate} />
    default:
      return <div className="text-muted-foreground text-sm">Unknown node type: {node.type}</div>
  }
}
