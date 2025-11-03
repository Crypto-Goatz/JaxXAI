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

  const accountId = typeof payload.accountId === "string" ? payload.accountId : "";
  if (!accountId) {
    return jsonError("Provide the connected accountId in the request body.");
  }

  const refreshUrl = process.env.STRIPE_ONBOARDING_REFRESH_URL;
  const returnUrl = process.env.STRIPE_ONBOARDING_RETURN_URL;

  if (!refreshUrl || !returnUrl) {
    return jsonError(
      "Configure STRIPE_ONBOARDING_REFRESH_URL and STRIPE_ONBOARDING_RETURN_URL so Stripe knows where to send the user after onboarding.",
      500,
    );
  }

  let stripe;
  try {
    stripe = getStripeClient();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stripe client initialisation failed.";
    return jsonError(message, 500);
  }

  try {
    const link = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: refreshUrl,
      return_url: returnUrl,
      type: "account_onboarding",
    });

    return NextResponse.json({
      url: link.url,
      expiresAt: link.expires_at,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to generate onboarding link.";
    return jsonError(message, 500);
  }
}
