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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("accountId");

  if (!accountId) {
    return jsonError("Provide an accountId so the API can target the connected account.");
  }

  let stripe;
  try {
    stripe = getStripeClient();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stripe client initialisation failed.";
    return jsonError(message, 500);
  }

  try {
    const products = await stripe.products.list(
      {
        limit: 20,
        expand: ["data.default_price"],
      },
      {
        stripeAccount: accountId,
      },
    );

    return NextResponse.json({
      data: products.data.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: typeof product.default_price === "object" ? product.default_price.unit_amount : null,
        currency:
          typeof product.default_price === "object" ? product.default_price.currency : product.default_currency,
      })),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to list products.";
    return jsonError(message, 500);
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
    return jsonError("Provide an accountId so the API can target the connected account.");
  }

  const name = typeof payload.name === "string" ? payload.name : "";
  const description = typeof payload.description === "string" ? payload.description : undefined;
  const currency =
    typeof payload.currency === "string" && payload.currency.length > 0
      ? payload.currency.toLowerCase()
      : "usd";

  const priceInput = typeof payload.price === "number" ? payload.price : Number(payload.price);
  const priceInCents = Math.round(priceInput * 100);

  if (!name || !Number.isFinite(priceInCents) || priceInCents <= 0) {
    return jsonError("Provide name and a positive price when creating a product.");
  }

  let stripe;
  try {
    stripe = getStripeClient();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stripe client initialisation failed.";
    return jsonError(message, 500);
  }

  try {
    const product = await stripe.products.create(
      {
        name,
        description,
        default_price_data: {
          unit_amount: priceInCents,
          currency,
        },
      },
      {
        stripeAccount: accountId,
      },
    );

    return NextResponse.json({
      id: product.id,
      name: product.name,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create product.";
    return jsonError(message, 500);
  }
}
