interface PriceData {
  symbol: string
  price: number
  change24h: number
  changePercent24h: number
  high24h: number
  low24h: number
  volume24h: number
  timestamp: number
}

interface PriceSubscription {
  symbol: string
  callback: (data: PriceData) => void
  interval: NodeJS.Timeout
}

class PriceService {
  private subscriptions: Map<string, PriceSubscription[]> = new Map()
  private cache: Map<string, PriceData> = new Map()
  private readonly CACHE_TTL = 5000 // 5 seconds

  async getPrice(symbol: string): Promise<PriceData> {
    // Check cache first
    const cached = this.cache.get(symbol)
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached
    }

    // Fetch fresh data
    const priceData = await this.fetchPriceData(symbol)
    this.cache.set(symbol, priceData)
    return priceData
  }

  private async fetchPriceData(symbol: string): Promise<PriceData> {
    try {
      // Using Binance public API as default
      const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`)
      const data = await response.json()

      return {
        symbol: data.symbol,
        price: Number.parseFloat(data.lastPrice),
        change24h: Number.parseFloat(data.priceChange),
        changePercent24h: Number.parseFloat(data.priceChangePercent),
        high24h: Number.parseFloat(data.highPrice),
        low24h: Number.parseFloat(data.lowPrice),
        volume24h: Number.parseFloat(data.volume),
        timestamp: Date.now(),
      }
    } catch (error) {
      console.error("[v0] Price fetch error:", error)
      throw new Error(`Failed to fetch price for ${symbol}`)
    }
  }

  subscribe(symbol: string, callback: (data: PriceData) => void, intervalMs = 5000): () => void {
    const subscription: PriceSubscription = {
      symbol,
      callback,
      interval: setInterval(async () => {
        try {
          const priceData = await this.getPrice(symbol)
          callback(priceData)
        } catch (error) {
          console.error("[v0] Price subscription error:", error)
        }
      }, intervalMs),
    }

    const existing = this.subscriptions.get(symbol) || []
    existing.push(subscription)
    this.subscriptions.set(symbol, existing)

    // Initial fetch
    this.getPrice(symbol).then(callback).catch(console.error)

    // Return unsubscribe function
    return () => {
      clearInterval(subscription.interval)
      const subs = this.subscriptions.get(symbol) || []
      const filtered = subs.filter((s) => s !== subscription)
      if (filtered.length === 0) {
        this.subscriptions.delete(symbol)
      } else {
        this.subscriptions.set(symbol, filtered)
      }
    }
  }

  async getMultiplePrices(symbols: string[]): Promise<PriceData[]> {
    return Promise.all(symbols.map((symbol) => this.getPrice(symbol)))
  }

  clearCache() {
    this.cache.clear()
  }
}

export const priceService = new PriceService()
