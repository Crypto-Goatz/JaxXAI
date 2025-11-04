/**
 * Vercel Node.js Serverless Function
 * Syncs newly authenticated users into GoHighLevel CRM.
 */

const API_ENDPOINT = 'https://rest.gohighlevel.com/v1/contacts/';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GOHIGHLEVEL_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GOHIGHLEVEL_API_KEY environment variable is not configured.' });
  }

  const payload = typeof req.body === 'string' ? safeParse(req.body) : req.body;
  const { email, name } = payload || {};

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        email,
        name,
        tags: ['JAX Market Alchemist'],
        customField: {},
        source: 'JAX Market Alchemist SaaS'
      })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = data?.message || 'Failed to sync contact with GoHighLevel.';
      return res.status(response.status).json({ error: message });
    }

    return res.status(200).json({ success: true, contact: data });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Unexpected error while syncing GoHighLevel contact.' });
  }
};

function safeParse(body) {
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
}

