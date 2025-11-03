import type { CryptoVariableType } from "@/types/integration.types"

interface CryptoDataResult {
  value: number | string | boolean
  timestamp: Date
  source: string
}

export class CryptoDataService {
  private cache: Map<string, { data: CryptoDataResult; expiresAt: number }> = new Map()

  async fetchVariable(variableType: CryptoVariableType, symbol: string, apiKey?: string): Promise<CryptoDataResult> {
    const cacheKey = `${variableType}_${symbol}`
    const cached = this.cache.get(cacheKey)

    if (cached && cached.expiresAt > Date.now()) {
      console.log(`[v0] Using cached data for ${cacheKey}`)
      return cached.data
    }

    console.log(`[v0] Fetching fresh data for ${variableType} - ${symbol}`)

    // In a real implementation, this would call actual APIs
    // For now, we'll return mock data based on the variable type
    const result = await this.getMockData(variableType, symbol)

    // Cache the result (5 minutes default)
    this.cache.set(cacheKey, {
      data: result,
      expiresAt: Date.now() + 5 * 60 * 1000,
    })

    return result
  }

  private async getMockData(variableType: CryptoVariableType, symbol: string): Promise<CryptoDataResult> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    const timestamp = new Date()

    switch (variableType) {
      case "price":
        return {
          value: this.getMockPrice(symbol),
          timestamp,
          source: "exchange",
        }

      case "volume":
        return {
          value: Math.random() * 1000000000,
          timestamp,
          source: "exchange",
        }

      case "volume_change_24h":
        return {
          value: (Math.random() - 0.5) * 100,
          timestamp,
          source: "exchange",
        }

      case "price_change_24h":
        return {
          value: (Math.random() - 0.5) * 20,
          timestamp,
          source: "exchange",
        }

      case "price_change_7d":
        return {
          value: (Math.random() - 0.5) * 40,
          timestamp,
          source: "coingecko",
        }

      case "market_cap":
        return {
          value: Math.random() * 100000000000,
          timestamp,
          source: "coingecko",
        }

      case "market_cap_rank":
        return {
          value: Math.floor(Math.random() * 100) + 1,
          timestamp,
          source: "coingecko",
        }

      case "social_sentiment":
        return {
          value: (Math.random() - 0.5) * 2, // -1 to 1
          timestamp,
          source: "social",
        }

      case "social_mentions":
        return {
          value: Math.floor(Math.random() * 10000),
          timestamp,
          source: "social",
        }

      case "fear_greed_index":
        return {
          value: Math.floor(Math.random() * 100),
          timestamp,
          source: "social",
        }

      case "rsi":
        return {
          value: Math.random() * 100,
          timestamp,
          source: "calculated",
        }

      case "volatility":
        return {
          value: Math.random() * 50,
          timestamp,
          source: "calculated",
        }

      case "whale_transactions":
        return {
          value: Math.floor(Math.random() * 50),
          timestamp,
          source: "onchain",
        }

      case "exchange_inflow":
        return {
          value: Math.random() * 10000,
          timestamp,
          source: "onchain",
        }

      case "exchange_outflow":
        return {
          value: Math.random() * 10000,
          timestamp,
          source: "onchain",
        }

      case "active_addresses":
        return {
          value: Math.floor(Math.random() * 100000),
          timestamp,
          source: "onchain",
        }

      case "gas_price":
        return {
          value: Math.random() * 100,
          timestamp,
          source: "onchain",
        }

      case "tvl":
        return {
          value: Math.random() * 1000000000,
          timestamp,
          source: "coingecko",
        }

      case "apy":
        return {
          value: Math.random() * 100,
          timestamp,
          source: "coingecko",
        }

      case "funding_rate":
        return {
          value: (Math.random() - 0.5) * 0.1,
          timestamp,
          source: "exchange",
        }

      case "open_interest":
        return {
          value: Math.random() * 1000000000,
          timestamp,
          source: "exchange",
        }

      case "liquidations_24h":
        return {
          value: Math.random() * 100000000,
          timestamp,
          source: "exchange",
        }

      default:
        return {
          value: Math.random() * 1000,
          timestamp,
          source: "unknown",
        }
    }
  }

  private getMockPrice(symbol: string): number {
    const basePrices: Record<string, number> = {
      BTC: 95000,
      ETH: 3500,
      SOL: 180,
      BNB: 650,
      XRP: 2.5,
      ADA: 1.2,
      DOGE: 0.35,
      MATIC: 0.95,
      DOT: 8.5,
      AVAX: 42,
    }

    const basePrice = basePrices[symbol.toUpperCase()] || 100
    const variation = (Math.random() - 0.5) * 0.1 // ±5% variation
    return basePrice * (1 + variation)
  }

  clearCache(): void {
    this.cache.clear()
  }
}

export const cryptoDataService = new CryptoDataService()
