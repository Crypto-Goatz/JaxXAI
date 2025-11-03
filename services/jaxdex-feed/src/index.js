import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 8080;

/**
 * ENVIRONMENT VARIABLES (pull from Secret Manager in production)
 * - CMC_KEYS: comma separated CoinMarketCap API keys.
 * - OKX_API_KEY / OKX_API_SECRET / OKX_API_PASSPHRASE: optional for OKX data.
 * - HELIUS_API_KEY: optional for Solana on-chain metrics.
 *
 * The Cloud Run service should mount these securely – the frontend never sees them.
 */
const cmcKeys = (process.env.CMC_KEYS || '').split(',').map((key) => key.trim()).filter(Boolean);

function pickKey() {
  if (!cmcKeys.length) return null;
  const index = Math.floor(Math.random() * cmcKeys.length);
  return cmcKeys[index];
}

async function fetchCoinMarketCap() {
  const key = pickKey();
  if (!key) throw new Error('Missing CoinMarketCap API key');

  const response = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=40', {
    headers: {
      'X-CMC_PRO_API_KEY': key,
    },
  });

  if (!response.ok) {
    throw new Error(`CoinMarketCap error ${response.status}`);
  }

  const json = await response.json();
  return json?.data ?? [];
}

function normaliseListings(listings) {
  const assets = listings.map((coin) => ({
    id: coin.id?.toString() ?? coin.slug ?? coin.symbol,
    ticker: `${coin.symbol}/USD`,
    price: coin.quote?.USD?.price ?? 0,
    change24h: coin.quote?.USD?.percent_change_24h ?? 0,
    metrics: {
      Rank: coin.cmc_rank,
      Volume24h: coin.quote?.USD?.volume_24h ?? 0,
      MarketCap: coin.quote?.USD?.market_cap ?? 0,
    },
  }));

  return [
    { title: 'LIVE FEED', assets: assets.slice(0, 10) },
    { title: 'MOMENTUM BOARD', assets: assets.slice(10, 20) },
    { title: 'ROTATION WATCH', assets: assets.slice(20, 30) },
    { title: 'LONG TAIL RADAR', assets: assets.slice(30, 40) },
  ].filter((stage) => stage.assets.length);
}

app.get('/feed', async (req, res) => {
  try {
    const listings = await fetchCoinMarketCap();
    const stages = normaliseListings(listings);

    res.set('Access-Control-Allow-Origin', '*');
    res.json({
      generatedAt: new Date().toISOString(),
      source: 'coinmarketcap',
      stages,
    });
  } catch (error) {
    console.error('[jaxdex-feed] error:', error);
    res.status(500).json({ error: 'Failed to fetch live pricing' });
  }
});

app.get('/', (_, res) => {
  res.json({
    message: 'JaxDex unified feed. Hit /feed for live data. Intended for internal use only.',
  });
});

app.listen(PORT, () => {
  console.log(`[jaxdex-feed] listening on port ${PORT}`);
});
