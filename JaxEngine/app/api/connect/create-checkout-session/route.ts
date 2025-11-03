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
  const productId = typeof payload.productId === "string" ? payload.productId : "";
  const quantityRaw = typeof payload.quantity === "number" ? payload.quantity : Number(payload.quantity ?? 1);
  const quantity = Number.isFinite(quantityRaw) && quantityRaw > 0 ? Math.floor(quantityRaw) : 1;

  if (!accountId || !productId) {
    return jsonError("Provide accountId and productId in the request body.");
  }

  const successBaseUrl = process.env.STRIPE_SUCCESS_URL_BASE;
  if (!successBaseUrl) {
    return jsonError(
      "STRIPE_SUCCESS_URL_BASE is not configured. Provide a base URL for Checkout success and cancel pages.",
      500,
    );
  }

  const feeInput = process.env.STRIPE_PLATFORM_FEE_AMOUNT ?? "0";
  const feeAmount = Number(feeInput);
  if (!Number.isFinite(feeAmount) || feeAmount < 0) {
    return jsonError(
      "STRIPE_PLATFORM_FEE_AMOUNT must be a non-negative number (in cents). Example: set STRIPE_PLATFORM_FEE_AMOUNT=200 for a $2 fee.",
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
    const product = await stripe.products.retrieve(
      productId,
      {
        expand: ["default_price"],
      },
      {
        stripeAccount: accountId,
      },
    );

    const defaultPrice = product.default_price;
    if (!defaultPrice || typeof defaultPrice !== "object") {
      return jsonError(
        "The selected product does not include a default price. Create products with default_price_data to use this sample.",
        400,
      );
    }

    const session = await stripe.checkout.sessions.create(
      {
        line_items: [
          {
            price: defaultPrice.id,
            quantity,
          },
        ],
        mode: "payment",
        payment_intent_data: {
          application_fee_amount: feeAmount,
        },
        success_url: `${successBaseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${successBaseUrl}/storefront/${accountId}?canceled=true`,
      },
      {
        stripeAccount: accountId,
      },
    );

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create checkout session.";
    return jsonError(message, 500);
  }
}
