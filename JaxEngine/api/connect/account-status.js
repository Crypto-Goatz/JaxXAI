/**
 * Retrieves the latest account status straight from Stripe. The sample avoids any database
 * caching so the dashboard always reflects the canonical state.
 */

const Stripe = require('stripe');

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      'Missing STRIPE_SECRET_KEY. Add your Stripe secret key to the environment before retrieving accounts.'
    );
  }

  return new Stripe.Stripe(secretKey, { apiVersion: '2025-10-29.clover' });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed. Use GET to retrieve account status.' });
  }

  const { accountId } = req.query || {};

  if (!accountId) {
    return res.status(400).json({ error: 'Provide an accountId query parameter to check status.' });
  }

  let stripe;
  try {
    stripe = getStripe();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  try {
    const account = await stripe.accounts.retrieve(accountId);
    return res.status(200).json({
      accountId: account.id,
      email: account.email,
      country: account.country,
      detailsSubmitted: account.details_submitted,
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
      requirements: account.requirements,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

