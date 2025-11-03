import { NextResponse } from "next/server"
import { deleteSecret, getSecret } from "@/lib/secret-manager"

function verifyAdmin(request: Request): boolean {
  const adminKey = process.env.ADMIN_SECRET_KEY
  if (!adminKey) {
    console.warn("ADMIN_SECRET_KEY is not configured. Refusing secret manager access.")
    return false
  }
  const provided = request.headers.get("x-admin-key")
  return Boolean(provided && provided === adminKey)
}

export async function GET(request: Request, context: { params: { id: string } }) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const secret = getSecret(context.params?.id)
    if (!secret) {
      return NextResponse.json({ error: "Secret not found" }, { status: 404 })
    }

    return NextResponse.json({ secret })
  } catch (error: any) {
    console.error("Failed to retrieve secret:", error)
    return NextResponse.json({ error: error?.message || "Failed to retrieve secret" }, { status: 500 })
  }
}

export async function DELETE(request: Request, context: { params: { id: string } }) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const secretId = context.params?.id
  if (!secretId) {
    return NextResponse.json({ error: "Secret ID is required" }, { status: 400 })
  }

  try {
    const removed = deleteSecret(secretId)
    if (!removed) {
      return NextResponse.json({ error: "Secret not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Failed to delete secret:", error)
    return NextResponse.json({ error: error?.message || "Failed to delete secret" }, { status: 500 })
  }
}
