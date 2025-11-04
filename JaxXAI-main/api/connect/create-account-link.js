/**
 * Generates an Account Link so the connected account can complete onboarding.
 * Stripe handles redirection and state for the hosted onboarding flow.
 */

const Stripe = require('stripe');

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      'Missing STRIPE_SECRET_KEY. Add your Stripe secret key to the environment before creating onboarding links.'
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
    return res.status(405).json({ error: 'Method not allowed. Use POST to generate an account link.' });
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

  const { accountId } = body;

  if (!accountId) {
    return res.status(400).json({ error: 'Provide the connected accountId in the request body.' });
  }

  const refreshUrl = process.env.STRIPE_ONBOARDING_REFRESH_URL;
  const returnUrl = process.env.STRIPE_ONBOARDING_RETURN_URL;

  if (!refreshUrl || !returnUrl) {
    return res.status(500).json({
      error:
        'Configure STRIPE_ONBOARDING_REFRESH_URL and STRIPE_ONBOARDING_RETURN_URL so Stripe knows where to send the user after onboarding.',
    });
  }

  try {
    const link = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: refreshUrl,
      return_url: returnUrl,
      type: 'account_onboarding',
    });

    return res.status(200).json({
      url: link.url,
      expiresAt: link.expires_at,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

