import type { Asset, StageData } from '../types';

const COINGECKO_FALLBACK = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false';

type LivePricingResult = {
  stages?: StageData[];
  assets?: Asset[];
  data?: StageData[] | Asset[];
};

function mapAssetsToStage(title: string, assets: Asset[]): StageData {
  return { title, assets };
}

function normaliseResponse(payload: unknown): StageData[] | null {
  if (!payload) return null;

  const candidate = payload as LivePricingResult | StageData[] | Asset[];

  if (Array.isArray(candidate)) {
    if (candidate.length === 0) return [];
    const sample = candidate[0] as StageData;
    if (sample && Array.isArray(sample.assets)) {
      return candidate as StageData[];
    }
    return [mapAssetsToStage('LIVE FEED', candidate as Asset[])];
  }

  if ('stages' in (candidate as LivePricingResult) && Array.isArray((candidate as LivePricingResult).stages)) {
    return (candidate as LivePricingResult).stages ?? null;
  }
  if ('data' in (candidate as LivePricingResult)) {
    const data = (candidate as LivePricingResult).data;
    if (Array.isArray(data)) {
      const sample = data[0] as StageData;
      if (sample && Array.isArray((sample as StageData).assets)) {
        return data as StageData[];
      }
      return [mapAssetsToStage('LIVE FEED', data as Asset[])];
    }
  }
  if ('assets' in (candidate as LivePricingResult) && Array.isArray((candidate as LivePricingResult).assets)) {
    return [mapAssetsToStage('LIVE FEED', (candidate as LivePricingResult).assets!)];
  }

  return null;
}

async function fetchWithJaxdex(): Promise<StageData[] | null> {
  const endpoint = import.meta.env.VITE_JAXDEX_DATA_ENDPOINT || import.meta.env.VITE_PRICE_FEED_URL;
  if (!endpoint) return null;

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const apiKeys = import.meta.env.VITE_JAXDEX_API_KEYS || import.meta.env.VITE_PRICE_FEED_KEY;
  if (apiKeys) {
    const key = apiKeys.split(',')[0]?.trim();
    if (key) headers['Authorization'] = `Bearer ${key}`;
  }

  const response = await fetch(endpoint, { headers });
  if (!response.ok) {
    throw new Error(`Live pricing request failed (${response.status})`);
  }
  const payload = await response.json();
  const normalised = normaliseResponse(payload);
  if (!normalised) {
    throw new Error('Live pricing response did not match expected format');
  }
  return normalised;
}

async function fetchWithCoingecko(): Promise<StageData[]> {
  const response = await fetch(COINGECKO_FALLBACK);
  if (!response.ok) {
    throw new Error(`Coingecko fallback failed (${response.status})`);
  }
  const data = (await response.json()) as Array<{
    id: string;
    symbol: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap_rank: number;
  }>;

  const assets: Asset[] = data.slice(0, 12).map((coin) => ({
    id: coin.id,
    ticker: `${coin.symbol.toUpperCase()}/USD`,
    price: coin.current_price,
    change24h: coin.price_change_percentage_24h,
    metrics: {
      Rank: coin.market_cap_rank,
    },
  }));

  return [
    mapAssetsToStage('LIVE FEED', assets.slice(0, 4)),
    mapAssetsToStage('MOMENTUM BOARD', assets.slice(4, 8)),
    mapAssetsToStage('TRENDING ROTATION', assets.slice(8, 12)),
  ];
}

export async function fetchLiveStages(): Promise<{ stages: StageData[]; source: 'jaxdex' | 'fallback' }> {
  try {
    const liveStages = await fetchWithJaxdex();
    if (liveStages && liveStages.length > 0) {
      return { stages: liveStages, source: 'jaxdex' };
    }
  } catch (error) {
    console.warn('[LivePricing] Falling back to public feed:', error);
  }

  return { stages: await fetchWithCoingecko(), source: 'fallback' };
}
