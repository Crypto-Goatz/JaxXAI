import { type NextRequest, NextResponse } from "next/server"

interface TriggerParams {
  params: Promise<{ id: string }>
}

export async function POST(request: NextRequest, { params }: TriggerParams) {
  try {
    const { id: flowId } = await params
    const body = await request.json()

    const { event, data } = body

    console.log("[v0] Manual flow trigger:", { flowId, event })

    // Here you would:
    // 1. Load the workflow
    // 2. Validate it's ready to run
    // 3. Execute the workflow
    // 4. Return execution ID

    const executionId = `exec_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    return NextResponse.json({
      success: true,
      executionId,
      flowId,
      event: event || "manual_trigger",
      startedAt: new Date().toISOString(),
      status: "running",
    })
  } catch (error) {
    console.error("[v0] Flow trigger error:", error)
    return NextResponse.json(
      { error: "Failed to trigger flow", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
