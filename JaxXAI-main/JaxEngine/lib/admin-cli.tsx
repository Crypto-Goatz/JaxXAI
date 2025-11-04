export interface CLICommand {
  id: string
  command: string
  provider: "openai" | "gemini"
  timestamp: Date
  status: "pending" | "running" | "success" | "failed"
  output?: string
  error?: string
  executionTime?: number
}

// In-memory storage (in production, use a database)
const commandHistory: CLICommand[] = []

export function addCommandToHistory(command: Omit<CLICommand, "id" | "timestamp">): CLICommand {
  const newCommand: CLICommand = {
    ...command,
    id: `cmd_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(),
  }
  commandHistory.unshift(newCommand)
  return newCommand
}

export function updateCommandStatus(
  id: string,
  updates: Partial<Pick<CLICommand, "status" | "output" | "error" | "executionTime">>,
): void {
  const index = commandHistory.findIndex((cmd) => cmd.id === id)
  if (index !== -1) {
    commandHistory[index] = { ...commandHistory[index], ...updates }
  }
}

export function getCommandHistory(limit = 50): CLICommand[] {
  return commandHistory.slice(0, limit)
}

export function clearCommandHistory(): void {
  commandHistory.length = 0
}

// Security: Command validation
const DANGEROUS_PATTERNS = [
  /rm\s+-rf/i,
  /sudo/i,
  /chmod/i,
  /chown/i,
  /mkfs/i,
  /dd\s+if=/i,
  />\s*\/dev\//i,
  /fork\s*bomb/i,
]

const ALLOWED_COMMANDS = [
  "ls",
  "pwd",
  "cat",
  "echo",
  "date",
  "whoami",
  "node",
  "npm",
  "git",
  "curl",
  "wget",
  "grep",
  "find",
  "ps",
  "top",
  "df",
  "du",
  "tail",
  "head",
]

export function validateCommand(command: string): { valid: boolean; reason?: string } {
  // Check for dangerous patterns
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(command)) {
      return { valid: false, reason: "Command contains dangerous operations" }
    }
  }

  // Check if command starts with allowed command
  const firstWord = command.trim().split(/\s+/)[0]
  if (!ALLOWED_COMMANDS.some((allowed) => firstWord === allowed || firstWord.startsWith(allowed + "."))) {
    return { valid: false, reason: `Command '${firstWord}' is not in the allowed list` }
  }

  return { valid: true }
}

export async function executeWithOpenAI(command: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    throw new Error("OpenAI API key not configured")
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful CLI assistant. Execute the given command and return the output. If the command is dangerous or not allowed, explain why.",
          },
          {
            role: "user",
            content: `Execute this command: ${command}`,
          },
        ],
        temperature: 0.3,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || "No output"
  } catch (error) {
    throw new Error(`OpenAI execution failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export async function executeWithGemini(command: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    throw new Error("Gemini API key not configured")
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a CLI assistant. Execute this command and return the output: ${command}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 2048,
          },
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    return data.candidates[0]?.content?.parts[0]?.text || "No output"
  } catch (error) {
    throw new Error(`Gemini execution failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}
