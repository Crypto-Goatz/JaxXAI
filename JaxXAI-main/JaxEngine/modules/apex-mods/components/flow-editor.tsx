"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import type { Node, Connection } from "@/lib/flow-types"
import { FlowNode } from "./flow-node"
import { ConnectionLine } from "./connection-line"
import { NodePalette } from "./node-palette"
import { NodePropertiesPanel } from "./node-properties-panel"

const initialNodes: Node[] = [
  {
    id: "1",
    type: "message",
    position: { x: 100, y: 100 },
    label: "Welcome Message",
    description: "Greet the user and introduce the conversation",
  },
  {
    id: "2",
    type: "condition",
    position: { x: 400, y: 100 },
    label: "Check Intent",
    description: "Determine user's intent from their message",
  },
  {
    id: "3",
    type: "action",
    position: { x: 700, y: 50 },
    label: "Process Request",
    description: "Handle the user's request and generate response",
  },
  {
    id: "4",
    type: "data",
    position: { x: 700, y: 200 },
    label: "Fetch Data",
    description: "Retrieve relevant data from the database",
  },
]

const initialConnections: Connection[] = [
  { id: "c1", from: "1", to: "2" },
  { id: "c2", from: "2", to: "3" },
  { id: "c3", from: "2", to: "4" },
]

export function FlowEditor() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [connections, setConnections] = useState<Connection[]>(initialConnections)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [draggedNode, setDraggedNode] = useState<Node | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleAddNode = useCallback((newNode: Node) => {
    setNodes((prev) => [...prev, newNode])
  }, [])

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const { x, y } = event.nativeEvent.offsetX
    if (!draggedNode) return
    setNodes((prev) => prev.map((node) => (node.id === draggedNode.id ? { ...node, position: { x, y } } : node)))
    setDraggedNode(null)
  }, [])

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }, [])

  const handleNodeDragStart = useCallback((node: Node) => {
    setDraggedNode(node)
  }, [])

  const handleNodeDrag = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    if (!draggedNode) return
    const { offsetX, offsetY } = event.nativeEvent
    setNodes((prev) => prev.map((n) => (n.id === draggedNode.id ? { ...n, position: { x: offsetX, y: offsetY } } : n)))
  }, [])

  const handleNodeDragEnd = useCallback(() => {
    setDraggedNode(null)
  }, [])

  const handleUpdateNode = useCallback((nodeId: string, updates: Partial<Node>) => {
    setNodes((prev) => prev.map((node) => (node.id === nodeId ? { ...node, ...updates } : node)))
  }, [])

  const handleDeleteNode = useCallback((nodeId: string) => {
    setNodes((prev) => prev.filter((node) => node.id !== nodeId))
    setConnections((prev) => prev.filter((conn) => conn.from !== nodeId && conn.to !== nodeId))
    setSelectedNodeId(null)
  }, [])

  const handleCanvasClick = useCallback(() => {
    setSelectedNodeId(null)
  }, [])

  const selectedNode = nodes.find((node) => node.id === selectedNodeId) || null

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 overflow-hidden">
        <NodePalette onAddNode={handleAddNode} />

        <div
          ref={canvasRef}
          className="relative flex-1 overflow-hidden bg-muted/30"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleCanvasClick}
        >
          <svg className="pointer-events-none absolute inset-0 h-full w-full">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="currentColor" className="text-muted-foreground/20" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {connections.map((connection) => {
              const fromNode = nodes.find((n) => n.id === connection.from)
              const toNode = nodes.find((n) => n.id === connection.to)
              if (!fromNode || !toNode) return null
              return <ConnectionLine key={connection.id} from={fromNode.position} to={toNode.position} />
            })}
          </svg>

          {nodes.map((node) => (
            <FlowNode
              key={node.id}
              node={node}
              onDragStart={handleNodeDragStart}
              onDrag={handleNodeDrag}
              onDragEnd={handleNodeDragEnd}
              isSelected={node.id === selectedNodeId}
              onSelect={setSelectedNodeId}
            />
          ))}
        </div>

        <div className="w-80 border-l border-border bg-card">
          <NodePropertiesPanel
            selectedNode={selectedNode}
            onUpdateNode={handleUpdateNode}
            onDeleteNode={handleDeleteNode}
          />
        </div>
      </div>
    </div>
  )
}
