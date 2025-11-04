import { NextResponse } from "next/server";

const API_ENDPOINT = "https://rest.gohighlevel.com/v1/contacts/";

export const runtime = "nodejs";

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

async function parseJsonBody(request: Request) {
  const raw = await request.text();
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    throw new Error("Request body must be valid JSON.");
  }
}

export async function POST(request: Request) {
  const apiKey = process.env.GOHIGHLEVEL_API_KEY;
  if (!apiKey) {
    return jsonError("GOHIGHLEVEL_API_KEY environment variable is not configured.", 500);
  }

  let payload: Record<string, unknown>;
  try {
    payload = await parseJsonBody(request);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid JSON payload.";
    return jsonError(message, 400);
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const name = typeof payload.name === "string" ? payload.name.trim() : "";

  if (!email) {
    return jsonError("Email is required.");
  }

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        name,
        tags: ["JAX Market Alchemist"],
        customField: {},
        source: "JAX Market Alchemist SaaS",
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = (data as { message?: string })?.message ?? "Failed to sync contact with GoHighLevel.";
      return jsonError(message, response.status);
    }

    return NextResponse.json({ success: true, contact: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error while syncing GoHighLevel contact.";
    return jsonError(message, 500);
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405, headers: { Allow: "POST" } });
}
