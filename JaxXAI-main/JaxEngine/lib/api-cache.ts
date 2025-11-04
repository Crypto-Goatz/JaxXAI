// Enhanced caching system with TTL and source rotation

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
  source: string
}

class APICache {
  private cache: Map<string, CacheEntry<any>> = new Map()
  private requestQueue: Map<string, Promise<any>> = new Map()

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    const now = Date.now()
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  set<T>(key: string, data: T, ttl: number, source = "default"): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
      source,
    })
  }

  // Deduplicate concurrent requests
  async dedupe<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    // Check if request is already in flight
    if (this.requestQueue.has(key)) {
      return this.requestQueue.get(key)!
    }

    // Start new request
    const promise = fetcher().finally(() => {
      this.requestQueue.delete(key)
    })

    this.requestQueue.set(key, promise)
    return promise
  }

  clear(pattern?: string): void {
    if (!pattern) {
      this.cache.clear()
      return
    }

    const keys = Array.from(this.cache.keys())
    keys.forEach((key) => {
      if (key.includes(pattern)) {
        this.cache.delete(key)
      }
    })
  }

  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      sources: Array.from(new Set(Array.from(this.cache.values()).map((e) => e.source))),
    }
  }
}

export const apiCache = new APICache()

// API source rotation for reliability
export const API_SOURCES = {
  prices: [
    { name: "coingecko", priority: 1, rateLimit: 30 }, // 30 calls/min
    { name: "coinmarketcap", priority: 2, rateLimit: 30 },
    { name: "coinbase", priority: 3, rateLimit: 10 },
  ],
  onchain: [
    { name: "glassnode", priority: 1, rateLimit: 10 },
    { name: "debank", priority: 2, rateLimit: 20 },
  ],
  social: [
    { name: "lunarcrush", priority: 1, rateLimit: 60 },
    { name: "cryptometer", priority: 2, rateLimit: 30 },
  ],
}

export function getNextSource(category: keyof typeof API_SOURCES, failedSources: string[] = []) {
  const sources = API_SOURCES[category]
  const available = sources.filter((s) => !failedSources.includes(s.name))
  return available.sort((a, b) => a.priority - b.priority)[0] || sources[0]
}
