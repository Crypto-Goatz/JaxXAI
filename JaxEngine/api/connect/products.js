/**
 * Creates and lists products on behalf of a connected account.
 * The Stripe-Account header is supplied via the `stripeAccount` option.
 */

const Stripe = require('stripe');

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      'Missing STRIPE_SECRET_KEY. Add your Stripe secret key to the environment before working with products.'
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
  let accountId;
  let requestBody = {};

  if (req.method === 'GET') {
    accountId = req.query?.accountId;
  } else if (req.method === 'POST') {
    try {
      requestBody = parseBody(req);
    } catch (error) {
      res.status(400).json({ error: error.message });
      return;
    }
    accountId = requestBody.accountId;
  }

  if (!accountId) {
    res.status(400).json({ error: 'Provide an accountId so the API can target the connected account.' });
    return;
  }

  let stripe;
  try {
    stripe = getStripe();
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  if (req.method === 'GET') {
    try {
      const products = await stripe.products.list(
        {
          limit: 20,
          expand: ['data.default_price'],
        },
        {
          stripeAccount: accountId,
        }
      );

      res.status(200).json({
        data: products.data.map((product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: typeof product.default_price === 'object' ? product.default_price.unit_amount : null,
          currency:
            typeof product.default_price === 'object' ? product.default_price.currency : product.default_currency,
        })),
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    return;
  }

  if (req.method === 'POST') {
    const { name, description, price, currency = 'usd' } = requestBody;

    if (!name || typeof price === 'undefined') {
      res.status(400).json({
        error: 'Provide name and price when creating a product.',
      });
      return;
    }

    const priceInCents = Math.round(Number(price) * 100);

    if (!Number.isFinite(priceInCents) || priceInCents <= 0) {
      res.status(400).json({
        error: 'Price must be a positive number. Example: 19.99',
      });
      return;
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
        }
      );

      res.status(200).json({
        id: product.id,
        name: product.name,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    return;
  }

  res.setHeader('Allow', 'GET, POST');
  res.status(405).json({ error: 'Method not allowed. Use GET to list or POST to create products.' });
};
