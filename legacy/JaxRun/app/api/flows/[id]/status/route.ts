import { type NextRequest, NextResponse } from "next/server"

interface StatusParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: StatusParams) {
  try {
    const { id: flowId } = await params

    // Here you would fetch the actual flow status from your database
    const status = {
      flowId,
      isActive: true,
      lastExecuted: new Date().toISOString(),
      totalExecutions: 0,
      successfulExecutions: 0,
      failedExecutions: 0,
      averageExecutionTime: 0,
    }

    return NextResponse.json(status)
  } catch (error) {
    console.error("[v0] Status fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch flow status", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
