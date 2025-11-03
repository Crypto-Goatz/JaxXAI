import { type NextRequest, NextResponse } from "next/server"
import { ExecutionEngine } from "@/lib/execution-engine"
import type { CustomNode } from "@/types/node.types"
import type { Edge } from "@xyflow/react"
import type { ExchangeIntegration } from "@/types/integration.types"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { flowId, nodes, edges, exchanges, variables } = body as {
      flowId: string
      nodes: CustomNode[]
      edges: Edge[]
      exchanges: ExchangeIntegration[]
      variables?: Record<string, unknown>
    }

    if (!flowId || !nodes || !edges) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log("[v0] Starting workflow execution:", flowId)

    const engine = new ExecutionEngine(flowId, nodes, edges, exchanges || [], variables || {})
    const result = await engine.execute()

    return NextResponse.json({
      success: result.success,
      executionId: engine.getContext().executionId,
      output: result.output,
      error: result.error,
      logs: result.logs,
    })
  } catch (error) {
    console.error("[v0] Execution error:", error)
    return NextResponse.json(
      { error: "Execution failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
