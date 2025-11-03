import { NextResponse } from "next/server"
import { listSecrets, saveSecret } from "@/lib/secret-manager"

function verifyAdmin(request: Request): boolean {
  const adminKey = process.env.ADMIN_SECRET_KEY
  if (!adminKey) {
    console.warn("ADMIN_SECRET_KEY is not configured. Refusing secret manager access.")
    return false
  }
  const provided = request.headers.get("x-admin-key")
  return Boolean(provided && provided === adminKey)
}

export async function GET(request: Request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const secrets = listSecrets()
    return NextResponse.json({ secrets })
  } catch (error: any) {
    console.error("Failed to list secrets:", error)
    return NextResponse.json({ error: error?.message || "Failed to list secrets" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { name, value, provider } = body || {}

    if (!name || !value) {
      return NextResponse.json({ error: "Name and value are required" }, { status: 400 })
    }

    const secret = saveSecret({
      name,
      value,
      provider,
      createdBy: "dashboard",
    })

    return NextResponse.json({ secret }, { status: 201 })
  } catch (error: any) {
    console.error("Failed to store secret:", error)
    return NextResponse.json({ error: error?.message || "Failed to store secret" }, { status: 500 })
  }
}
