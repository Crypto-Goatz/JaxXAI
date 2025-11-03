"use client"

import { memo, useEffect } from "react"
import {
  ReactFlow,
  type FitViewOptions,
  type DefaultEdgeOptions,
  type NodeTypes,
  Background,
  useReactFlow,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import { useFlowStore } from "@/contexts/flow-context"
import StartNode from "@/components/flow/nodes/start-node"
import MessageNode from "@/components/flow/nodes/message-node"
import TextInputNode from "@/components/flow/nodes/text-input-node"
import MarketMonitorNode from "@/components/flow/nodes/market-monitor-node"
import PriceAlertNode from "@/components/flow/nodes/price-alert-node"
import TechnicalIndicatorNode from "@/components/flow/nodes/technical-indicator-node"
import ConditionNode from "@/components/flow/nodes/condition-node"
import TradeExecutionNode from "@/components/flow/nodes/trade-execution-node"
import NotificationNode from "@/components/flow/nodes/notification-node"
import RiskManagementNode from "@/components/flow/nodes/risk-management-node"
import { useCanvasPanning } from "@/hooks/use-canvas-panning"
import { useNodeDragDrop } from "@/hooks/use-node-drag-drop"

// Define custom node types outside component to prevent re-renders
const nodeTypes: NodeTypes = {
  start: StartNode,
  message: MessageNode,
  textInput: TextInputNode,
  marketMonitor: MarketMonitorNode,
  priceAlert: PriceAlertNode,
  technicalIndicator: TechnicalIndicatorNode,
  condition: ConditionNode,
  tradeExecution: TradeExecutionNode,
  notification: NotificationNode,
  riskManagement: RiskManagementNode,
}

// Static configurations outside component to prevent recreating on each render
const fitViewOptions: FitViewOptions = {
  padding: 0.2,
}

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: false,
  type: "smoothstep",
}

const proOptions = {
  hideAttribution: true,
}

// Memoized Flow component to prevent unnecessary re-renders
const Flow = memo(function Flow() {
  // Direct store subscriptions for better performance
  const nodes = useFlowStore((state) => state.nodes)
  const edges = useFlowStore((state) => state.edges)
  const onNodesChange = useFlowStore((state) => state.onNodesChange)
  const onEdgesChange = useFlowStore((state) => state.onEdgesChange)
  const onConnect = useFlowStore((state) => state.onConnect)

  const { panOnDrag, isMiddlePanning, delta } = useCanvasPanning()
  const { onDragOver, onDrop } = useNodeDragDrop()
  const reactFlowInstance = useReactFlow()

  // Apply manual panning for middle mouse
  useEffect(() => {
    if (isMiddlePanning && (delta.x !== 0 || delta.y !== 0)) {
      const current = reactFlowInstance.getViewport()
      reactFlowInstance.setViewport({
        x: current.x + delta.x,
        y: current.y + delta.y,
        zoom: current.zoom,
      })
    }
  }, [delta, isMiddlePanning, reactFlowInstance])

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        panOnDrag={panOnDrag} // enables space + left mouse pan
        selectionOnDrag={!panOnDrag}
        selectNodesOnDrag={!isMiddlePanning}
        nodesDraggable={!panOnDrag && !isMiddlePanning}
        defaultEdgeOptions={defaultEdgeOptions}
        fitViewOptions={fitViewOptions}
        proOptions={proOptions}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Background gap={16} />
      </ReactFlow>
    </div>
  )
})

export default Flow
