import { type NextRequest, NextResponse } from "next/server"
import {
  addCommandToHistory,
  updateCommandStatus,
  getCommandHistory,
  validateCommand,
  executeWithOpenAI,
  executeWithGemini,
} from "@/lib/admin-cli"

// Simple admin authentication (in production, use proper auth)
function isAdmin(request: NextRequest): boolean {
  const adminKey = request.headers.get("x-admin-key")
  return adminKey === process.env.ADMIN_SECRET_KEY
}

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    if (!isAdmin(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { command, provider = "openai" } = body

    if (!command) {
      return NextResponse.json({ error: "Command is required" }, { status: 400 })
    }

    // Validate command
    const validation = validateCommand(command)
    if (!validation.valid) {
      return NextResponse.json({ error: validation.reason }, { status: 400 })
    }

    // Add to history
    const cmdRecord = addCommandToHistory({
      command,
      provider,
      status: "running",
    })

    console.log(`[v0] Executing command via ${provider}: ${command}`)

    const startTime = Date.now()

    try {
      let output: string

      if (provider === "openai") {
        output = await executeWithOpenAI(command)
      } else if (provider === "gemini") {
        output = await executeWithGemini(command)
      } else {
        throw new Error("Invalid provider")
      }

      const executionTime = Date.now() - startTime

      updateCommandStatus(cmdRecord.id, {
        status: "success",
        output,
        executionTime,
      })

      return NextResponse.json({
        id: cmdRecord.id,
        output,
        executionTime,
        status: "success",
      })
    } catch (error) {
      const executionTime = Date.now() - startTime
      const errorMessage = error instanceof Error ? error.message : "Unknown error"

      updateCommandStatus(cmdRecord.id, {
        status: "failed",
        error: errorMessage,
        executionTime,
      })

      return NextResponse.json(
        {
          id: cmdRecord.id,
          error: errorMessage,
          executionTime,
          status: "failed",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("[v0] CLI execution error:", error)
    return NextResponse.json({ error: "Failed to execute command" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    if (!isAdmin(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const history = getCommandHistory()
    return NextResponse.json({ history })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch command history" }, { status: 500 })
  }
}
