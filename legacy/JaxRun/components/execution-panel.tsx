"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Square, AlertCircle, CheckCircle2 } from "lucide-react"
import { useExecution } from "@/hooks/use-execution"
import { useFlowStore } from "@/contexts/flow-context"
import { useIntegrations } from "@/contexts/integration-context"
import { cn } from "@/lib/utils"

export function ExecutionPanel() {
  const { execute, isExecuting, result } = useExecution()
  const nodes = useFlowStore((state) => state.nodes)
  const edges = useFlowStore((state) => state.edges)
  const flowId = useFlowStore((state) => state.flowId)
  const { exchanges } = useIntegrations()
  const [showLogs, setShowLogs] = useState(false)

  const handleExecute = async () => {
    await execute(flowId, nodes, edges, exchanges)
    setShowLogs(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Strategy Execution</CardTitle>
        <CardDescription>Execute your trading workflow with live data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={handleExecute} disabled={isExecuting} className="flex-1">
            {isExecuting ? (
              <>
                <Square className="size-4 mr-2" />
                Executing...
              </>
            ) : (
              <>
                <Play className="size-4 mr-2" />
                Execute Strategy
              </>
            )}
          </Button>
        </div>

        {result && (
          <div className="space-y-3">
            <div
              className={cn(
                "flex items-center gap-2 p-3 rounded-lg",
                result.success ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600",
              )}
            >
              {result.success ? (
                <>
                  <CheckCircle2 className="size-4" />
                  <span className="text-sm font-medium">Execution completed successfully</span>
                </>
              ) : (
                <>
                  <AlertCircle className="size-4" />
                  <span className="text-sm font-medium">Execution failed: {result.error}</span>
                </>
              )}
            </div>

            {result.executionId && (
              <div className="text-xs text-muted-foreground">
                Execution ID: <code className="bg-muted px-1 py-0.5 rounded">{result.executionId}</code>
              </div>
            )}

            {showLogs && result.logs && result.logs.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Execution Logs</h4>
                  <Button variant="ghost" size="sm" onClick={() => setShowLogs(false)}>
                    Hide
                  </Button>
                </div>
                <ScrollArea className="h-48 w-full rounded-md border">
                  <div className="p-3 space-y-1">
                    {result.logs.map((log, index) => (
                      <div key={index} className="text-xs font-mono text-muted-foreground">
                        {log}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Ensure exchange API keys are configured</p>
          <p>• Execution uses live market data</p>
          <p>• Orders will be placed on connected exchanges</p>
        </div>
      </CardContent>
    </Card>
  )
}
