import { NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";

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
  let payload: Record<string, unknown>;

  try {
    payload = await parseJsonBody(request);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid JSON payload.";
    return jsonError(message, 400);
  }

  let stripe;
  try {
    stripe = getStripeClient();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stripe client initialisation failed.";
    return jsonError(message, 500);
  }

  const email = typeof payload.email === "string" ? payload.email : undefined;
  const country = typeof payload.country === "string" && payload.country.length > 0 ? payload.country : "US";

  try {
    const account = await stripe.accounts.create({
      country,
      email,
      controller: {
        fees: {
          payer: "account",
        },
        losses: {
          payments: "stripe",
        },
        stripe_dashboard: {
          type: "full",
        },
      },
    });

    return NextResponse.json({
      accountId: account.id,
      email: account.email,
      country: account.country,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create connected account.";
    return jsonError(message, 500);
  }
}
