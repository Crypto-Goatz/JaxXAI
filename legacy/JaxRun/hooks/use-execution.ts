"use client"

import { useState } from "react"
import type { CustomNode } from "@/types/node.types"
import type { Edge } from "@xyflow/react"
import type { ExchangeIntegration } from "@/types/integration.types"

interface ExecutionResult {
  success: boolean
  executionId?: string
  output?: Record<string, unknown>
  error?: string
  logs?: string[]
}

export function useExecution() {
  const [isExecuting, setIsExecuting] = useState(false)
  const [result, setResult] = useState<ExecutionResult | null>(null)

  const execute = async (
    flowId: string,
    nodes: CustomNode[],
    edges: Edge[],
    exchanges: ExchangeIntegration[],
    variables?: Record<string, unknown>,
  ): Promise<ExecutionResult> => {
    setIsExecuting(true)
    setResult(null)

    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flowId, nodes, edges, exchanges, variables }),
      })

      const data = await response.json()
      setResult(data)
      return data
    } catch (error) {
      const errorResult = {
        success: false,
        error: error instanceof Error ? error.message : "Execution failed",
      }
      setResult(errorResult)
      return errorResult
    } finally {
      setIsExecuting(false)
    }
  }

  return {
    execute,
    isExecuting,
    result,
  }
}
