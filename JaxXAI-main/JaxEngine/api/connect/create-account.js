/**
 * Creates a Stripe Connect account using the controller configuration described in the spec.
 * This sample keeps the payload intentionally small so that platform developers can bolt on
 * their own metadata or business profile when they move to production.
 */

const Stripe = require('stripe');

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      'Missing STRIPE_SECRET_KEY. Add your Stripe secret key to the environment before creating accounts.'
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
    return res.status(405).json({ error: 'Method not allowed. Use POST to create a connected account.' });
  }

  let stripe;
  try {
    stripe = getStripe();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  let body;
  try {
    body = parseBody(req);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  // Optional helper fields – supply defaults if the demo left them blank.
  const { email, country = 'US' } = body;

  try {
    const account = await stripe.accounts.create({
      country,
      email,
      controller: {
        fees: {
          payer: 'account',
        },
        losses: {
          payments: 'stripe',
        },
        stripe_dashboard: {
          type: 'full',
        },
      },
    });

    return res.status(200).json({
      accountId: account.id,
      email: account.email,
      country: account.country,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

