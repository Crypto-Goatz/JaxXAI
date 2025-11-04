import { API_ENDPOINTS } from "./api-endpoints"

export interface AggregatedSignal {
  coin: string
  pair: string
  signal: "STRONG_BUY" | "BUY" | "HOLD" | "SELL" | "STRONG_SELL"
  confidence: number
  sources: SignalSource[]
  metrics: SignalMetrics
  timestamp: Date
  expiresAt: Date
}

export interface SignalSource {
  name: string
  weight: number
  signal: string
  confidence: number
  data: any
}

export interface SignalMetrics {
  priceScore: number
  volumeScore: number
  socialScore: number
  onChainScore: number
  technicalScore: number
  derivativesScore: number
}

const API_ROTATION_CONFIG = {
  price: ["coingecko", "coinmarketcap", "coinlayer"],
  exchange: ["binance", "okx", "coinbase", "kraken"],
  onchain: ["glassnode", "debank", "flipside"],
  social: ["lunarcrush", "cryptometer"],
  technical: ["cryptocompare", "taapi"],
}

async function fetchWithRotation(
  category: keyof typeof API_ROTATION_CONFIG,
  endpoint: string,
  params: Record<string, any> = {},
): Promise<any> {
  const sources = API_ROTATION_CONFIG[category]

  for (const sourceId of sources) {
    try {
      const apiConfig = API_ENDPOINTS.find((e) => e.id === sourceId)
      if (!apiConfig) continue

      const url = new URL(`${apiConfig.baseUrl}${endpoint}`)
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })

      // Add API key from environment
      const apiKey = getApiKey(sourceId)
      if (apiKey) {
        url.searchParams.append("apikey", apiKey)
      }

      console.log(`[v0] Fetching from ${sourceId}: ${url.toString()}`)

      const response = await fetch(url.toString(), {
        headers: getAuthHeaders(sourceId),
        next: { revalidate: 60 }, // Cache for 1 minute
      })

      if (response.ok) {
        const data = await response.json()
        console.log(`[v0] Successfully fetched from ${sourceId}`)
        return { data, source: sourceId }
      }

      console.log(`[v0] Failed to fetch from ${sourceId}: ${response.status}`)
    } catch (error) {
      console.log(`[v0] Error fetching from ${sourceId}:`, error)
      continue
    }
  }

  throw new Error(`All sources failed for category: ${category}`)
}

function getApiKey(sourceId: string): string | null {
  const keyMap: Record<string, string> = {
    coingecko: process.env.COINGECKO_API_KEY || "",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY || "",
    coinlayer: process.env.COINLAYER_API_KEY || "",
    coinglass: process.env.COINGLASS_API_KEY || "",
    binance: process.env.BINANCE_API_KEY || "",
    coinbase: process.env.COINBASE_API_KEY || "",
    kraken: process.env.KRAKEN_API_KEY || "",
    okx: process.env.OKX_API_KEY || "",
    lunarcrush: process.env.LUNARCRUSH_API_KEY || "",
    debank: process.env.DEBANK_API_KEY || "",
    dextools: process.env.DEXTOOLS_API_KEY || "",
    flipside: process.env.FLIPSIDE_API_KEY || "",
    wallet_tracker: process.env.CRYPTO_WALLET_TRACKER_API_KEY || "",
    cryptometer: process.env.CRYPTOMETER_API_KEY || "",
    cryptocompare: process.env.CRYPTOCOMPARE_API_KEY || "",
  }

  return keyMap[sourceId] || null
}

function getAuthHeaders(sourceId: string): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  const apiKey = getApiKey(sourceId)
  if (!apiKey) return headers

  // Different APIs use different auth header formats
  switch (sourceId) {
    case "coinmarketcap":
      headers["X-CMC_PRO_API_KEY"] = apiKey
      break
    case "coingecko":
      headers["x-cg-pro-api-key"] = apiKey
      break
    case "lunarcrush":
      headers["Authorization"] = `Bearer ${apiKey}`
      break
    case "okx":
      // OKX requires special signature - handled separately
      break
    default:
      headers["Authorization"] = `Bearer ${apiKey}`
  }

  return headers
}

export async function generateAggregatedSignal(coin: string, pair: string): Promise<AggregatedSignal> {
  const sources: SignalSource[] = []

  // Fetch price data
  try {
    const priceData = await fetchWithRotation("price", `/coins/${coin.toLowerCase()}`, {
      localization: false,
      tickers: false,
      market_data: true,
    })
    const priceScore = calculatePriceScore(priceData.data)
    sources.push({
      name: priceData.source,
      weight: 0.2,
      signal: priceScore > 70 ? "BUY" : priceScore < 30 ? "SELL" : "HOLD",
      confidence: priceScore,
      data: priceData.data,
    })
  } catch (error) {
    console.log("[v0] Price data fetch failed:", error)
  }

  // Fetch exchange data
  try {
    const exchangeData = await fetchWithRotation("exchange", `/ticker/24hr`, { symbol: pair })
    const volumeScore = calculateVolumeScore(exchangeData.data)
    sources.push({
      name: exchangeData.source,
      weight: 0.15,
      signal: volumeScore > 70 ? "BUY" : volumeScore < 30 ? "SELL" : "HOLD",
      confidence: volumeScore,
      data: exchangeData.data,
    })
  } catch (error) {
    console.log("[v0] Exchange data fetch failed:", error)
  }

  // Fetch social sentiment
  try {
    const socialData = await fetchWithRotation("social", `/assets`, { symbol: coin })
    const socialScore = calculateSocialScore(socialData.data)
    sources.push({
      name: socialData.source,
      weight: 0.2,
      signal: socialScore > 70 ? "BUY" : socialScore < 30 ? "SELL" : "HOLD",
      confidence: socialScore,
      data: socialData.data,
    })
  } catch (error) {
    console.log("[v0] Social data fetch failed:", error)
  }

  // Fetch on-chain data
  try {
    const onChainData = await fetchWithRotation("onchain", `/user/total_balance`, { id: coin.toLowerCase() })
    const onChainScore = calculateOnChainScore(onChainData.data)
    sources.push({
      name: onChainData.source,
      weight: 0.25,
      signal: onChainScore > 70 ? "BUY" : onChainScore < 30 ? "SELL" : "HOLD",
      confidence: onChainScore,
      data: onChainData.data,
    })
  } catch (error) {
    console.log("[v0] On-chain data fetch failed:", error)
  }

  // Fetch technical indicators
  try {
    const technicalData = await fetchWithRotation("technical", `/v2/histoday`, {
      fsym: coin,
      tsym: "USD",
      limit: 30,
    })
    const technicalScore = calculateTechnicalScore(technicalData.data)
    sources.push({
      name: technicalData.source,
      weight: 0.2,
      signal: technicalScore > 70 ? "BUY" : technicalScore < 30 ? "SELL" : "HOLD",
      confidence: technicalScore,
      data: technicalData.data,
    })
  } catch (error) {
    console.log("[v0] Technical data fetch failed:", error)
  }

  // Calculate weighted average confidence
  const totalWeight = sources.reduce((sum, s) => sum + s.weight, 0)
  const weightedConfidence = sources.reduce((sum, s) => sum + s.confidence * s.weight, 0) / totalWeight

  // Determine final signal
  let signal: AggregatedSignal["signal"] = "HOLD"
  if (weightedConfidence >= 80) signal = "STRONG_BUY"
  else if (weightedConfidence >= 60) signal = "BUY"
  else if (weightedConfidence <= 20) signal = "STRONG_SELL"
  else if (weightedConfidence <= 40) signal = "SELL"

  const metrics: SignalMetrics = {
    priceScore: sources.find((s) => s.name.includes("coin"))?.confidence || 50,
    volumeScore: sources.find((s) => s.name.includes("binance") || s.name.includes("okx"))?.confidence || 50,
    socialScore: sources.find((s) => s.name.includes("lunar") || s.name.includes("crypto"))?.confidence || 50,
    onChainScore: sources.find((s) => s.name.includes("debank") || s.name.includes("glass"))?.confidence || 50,
    technicalScore: sources.find((s) => s.name.includes("compare") || s.name.includes("taapi"))?.confidence || 50,
    derivativesScore: 50, // Placeholder
  }

  return {
    coin,
    pair,
    signal,
    confidence: weightedConfidence,
    sources,
    metrics,
    timestamp: new Date(),
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // Expires in 5 minutes
  }
}

// Helper scoring functions
function calculatePriceScore(data: any): number {
  try {
    const change24h = data?.market_data?.price_change_percentage_24h || 0
    const change7d = data?.market_data?.price_change_percentage_7d || 0
    const volume = data?.market_data?.total_volume?.usd || 0
    const marketCap = data?.market_data?.market_cap?.usd || 0

    let score = 50
    score += change24h > 0 ? Math.min(20, change24h) : Math.max(-20, change24h)
    score += change7d > 0 ? Math.min(15, change7d / 2) : Math.max(-15, change7d / 2)
    score += volume > 1000000000 ? 10 : volume > 100000000 ? 5 : 0

    return Math.max(0, Math.min(100, score))
  } catch {
    return 50
  }
}

function calculateVolumeScore(data: any): number {
  try {
    const volume = Number.parseFloat(data?.volume || data?.quoteVolume || "0")
    const priceChange = Number.parseFloat(data?.priceChangePercent || "0")

    let score = 50
    score += volume > 1000000000 ? 20 : volume > 100000000 ? 10 : 0
    score += priceChange > 0 ? Math.min(20, priceChange) : Math.max(-20, priceChange)

    return Math.max(0, Math.min(100, score))
  } catch {
    return 50
  }
}

function calculateSocialScore(data: any): number {
  try {
    const sentiment = data?.sentiment || data?.galaxy_score || 50
    const socialVolume = data?.social_volume || 0
    const altRank = data?.alt_rank || 500

    let score = sentiment
    score += socialVolume > 10000 ? 15 : socialVolume > 1000 ? 10 : 5
    score += altRank < 50 ? 15 : altRank < 100 ? 10 : 5

    return Math.max(0, Math.min(100, score))
  } catch {
    return 50
  }
}

function calculateOnChainScore(data: any): number {
  try {
    const activeAddresses = data?.active_addresses || 0
    const transactionVolume = data?.transaction_volume || 0
    const whaleActivity = data?.whale_activity || 0

    let score = 50
    score += activeAddresses > 100000 ? 15 : activeAddresses > 10000 ? 10 : 5
    score += transactionVolume > 1000000000 ? 15 : transactionVolume > 100000000 ? 10 : 5
    score += whaleActivity > 50 ? 10 : whaleActivity > 20 ? 5 : 0

    return Math.max(0, Math.min(100, score))
  } catch {
    return 50
  }
}

function calculateTechnicalScore(data: any): number {
  try {
    const prices = data?.Data?.map((d: any) => d.close) || []
    if (prices.length < 14) return 50

    // Simple RSI calculation
    const gains = []
    const losses = []
    for (let i = 1; i < prices.length; i++) {
      const diff = prices[i] - prices[i - 1]
      gains.push(diff > 0 ? diff : 0)
      losses.push(diff < 0 ? Math.abs(diff) : 0)
    }

    const avgGain = gains.reduce((a, b) => a + b, 0) / gains.length
    const avgLoss = losses.reduce((a, b) => a + b, 0) / losses.length
    const rs = avgGain / (avgLoss || 1)
    const rsi = 100 - 100 / (1 + rs)

    // RSI interpretation
    if (rsi < 30) return 80 // Oversold - buy signal
    if (rsi > 70) return 20 // Overbought - sell signal
    return 50 + (50 - rsi) / 2 // Neutral zone
  } catch {
    return 50
  }
}
