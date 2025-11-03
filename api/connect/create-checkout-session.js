/**
 * Creates a hosted Checkout Session that charges on behalf of the connected account.
 * The platform adds a sample application fee to demonstrate monetisation via direct charges.
 */

const Stripe = require('stripe');

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      'Missing STRIPE_SECRET_KEY. Add your Stripe secret key to the environment before creating checkout sessions.'
    );
  }

  return new Stripe.Stripe(secretKey, { apiVersion: '2025-10-29.clover' });
}

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch (error) {
      throw new Error('Request body must be valid JSON.');
    }
  }
  return req.body;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed. Use POST to create a checkout session.' });
  }

  let body;
  try {
    body = parseBody(req);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  const { accountId, productId, quantity = 1 } = body;

  if (!accountId || !productId) {
    return res.status(400).json({
      error: 'Provide accountId and productId in the request body.',
    });
  }

  const successBaseUrl = process.env.STRIPE_SUCCESS_URL_BASE;
  const feeAmount = Number(process.env.STRIPE_PLATFORM_FEE_AMOUNT || 0);

  if (!successBaseUrl) {
    return res.status(500).json({
      error: 'STRIPE_SUCCESS_URL_BASE is not configured. Provide a base URL for Checkout success and cancel pages.',
    });
  }

  if (!Number.isFinite(feeAmount) || feeAmount < 0) {
    return res.status(500).json({
      error:
        'STRIPE_PLATFORM_FEE_AMOUNT must be a non-negative number (in cents). Example: set STRIPE_PLATFORM_FEE_AMOUNT=200 for a $2 fee.',
    });
  }

  let stripe;
  try {
    stripe = getStripe();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  try {
    // Retrieve the product to identify the default price to bill in Checkout.
    const product = await stripe.products.retrieve(
      productId,
      {
        expand: ['default_price'],
      },
      {
        stripeAccount: accountId,
      }
    );

    const defaultPrice = product.default_price;

    if (!defaultPrice || typeof defaultPrice !== 'object') {
      throw new Error(
        'The selected product does not include a default price. Create products with default_price_data to use this sample.'
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
        mode: 'payment',
        payment_intent_data: {
          application_fee_amount: feeAmount,
        },
        success_url: `${successBaseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${successBaseUrl}/storefront/${accountId}?canceled=true`,
      },
      {
        stripeAccount: accountId,
      }
    );

    return res.status(200).json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

