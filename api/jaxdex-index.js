/**
 * JaxDex Index endpoint
 * Rotates through API keys and enriches feed data with AI-generated filters.
 */

const DEFAULT_TICKERS = [
  { symbol: 'BTC/USDT', price: 0, change: 0 },
  { symbol: 'ETH/USDT', price: 0, change: 0 },
  { symbol: 'SOL/USDT', price: 0, change: 0 }
];

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const keys = (process.env.JAXDEX_API_KEYS || '')
    .split(',')
    .map((key) => key.trim())
    .filter(Boolean);
  const dataEndpoint = process.env.JAXDEX_DATA_ENDPOINT;
  const aiEndpoint = process.env.JAXAI_FILTERS_URL;
  const aiKey = process.env.JAXAI_FILTERS_API_KEY;

  const selectedKey = selectKey(keys);
  const headers = selectedKey
    ? {
        Authorization: `Bearer ${selectedKey}`
      }
    : {};

  let tickers = DEFAULT_TICKERS;

  if (dataEndpoint) {
    try {
      const response = await fetch(dataEndpoint, { headers });
      if (!response.ok) {
        throw new Error(`Data endpoint error: ${response.status}`);
      }
      const payload = await response.json();
      tickers = Array.isArray(payload?.tickers)
        ? payload.tickers
        : Array.isArray(payload)
        ? payload
        : tickers;
    } catch (error) {
      console.warn('JaxDex data fetch failed', error);
    }
  }

  const meta = await resolveMeta({ aiEndpoint, aiKey, tickers });

  return res.status(200).json({
    tickers,
    meta,
    source: dataEndpoint ? 'remote' : 'default',
    rotatedKeyApplied: Boolean(selectedKey)
  });
};

function selectKey(keys) {
  if (!keys.length) {
    return null;
  }
  const now = Date.now();
  const windowSizeMs = parseInt(process.env.JAXDEX_KEY_WINDOW_MS || '60000', 10);
  const slot = Math.floor(now / windowSizeMs);
  return keys[slot % keys.length];
}

async function resolveMeta({ aiEndpoint, aiKey, tickers }) {
  if (!aiEndpoint) {
    return buildFallbackMeta(tickers);
  }

  try {
    const response = await fetch(aiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(aiKey ? { Authorization: `Bearer ${aiKey}` } : {})
      },
      body: JSON.stringify({ tickers })
    });

    if (!response.ok) {
      throw new Error(`AI filters endpoint error: ${response.status}`);
    }

    const data = await response.json();
    return {
      stage: data.stage || 'Discovery',
      confidence: data.confidence ?? 0.5,
      filters: Array.isArray(data.filters) ? data.filters : buildFallbackMeta(tickers).filters,
      generatedAt: data.generatedAt || new Date().toISOString(),
      source: 'ai-endpoint'
    };
  } catch (error) {
    console.warn('JaxAI filter fetch failed', error);
    return buildFallbackMeta(tickers);
  }
}

function buildFallbackMeta(tickers) {
  const marketLeaders = tickers
    .filter((t) => Number.isFinite(t.price))
    .sort((a, b) => (b.price || 0) - (a.price || 0))
    .slice(0, 3)
    .map((t) => t.symbol || 'Unknown');

  return {
    stage: 'Discovery',
    confidence: 0.62,
    filters: [
      { label: 'Market Leaders', value: marketLeaders.join(', ') || 'N/A' },
      { label: 'Volatility Window', value: '15m adaptive' },
      { label: 'Signal Strength', value: 'Moderate' }
    ],
    generatedAt: new Date().toISOString(),
    source: 'fallback'
  };
}

