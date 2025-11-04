import { NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";

export const runtime = "nodejs";

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("accountId");

  if (!accountId) {
    return jsonError("Provide an accountId query parameter to check status.");
  }

  let stripe;
  try {
    stripe = getStripeClient();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stripe client initialisation failed.";
    return jsonError(message, 500);
  }

  try {
    const account = await stripe.accounts.retrieve(accountId);
    return NextResponse.json({
      accountId: account.id,
      email: account.email,
      country: account.country,
      detailsSubmitted: account.details_submitted,
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
      requirements: account.requirements,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to retrieve account.";
    return jsonError(message, 500);
  }
}
