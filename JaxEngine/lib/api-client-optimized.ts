// Optimized API client with automatic retries and source rotation

interface FetchOptions {
  cache?: boolean
  cacheTTL?: number
  retries?: number
  timeout?: number
}

export class OptimizedAPIClient {
  private baseURL: string
  private defaultOptions: FetchOptions

  constructor(baseURL = "/api", options: FetchOptions = {}) {
    this.baseURL = baseURL
    this.defaultOptions = {
      cache: true,
      cacheTTL: 60000,
      retries: 2,
      timeout: 10000,
      ...options,
    }
  }

  async get<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const opts = { ...this.defaultOptions, ...options }
    const url = `${this.baseURL}${endpoint}`

    for (let attempt = 0; attempt <= (opts.retries || 0); attempt++) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), opts.timeout)

        const response = await fetch(url, {
          signal: controller.signal,
          next: opts.cache ? { revalidate: Math.floor((opts.cacheTTL || 60000) / 1000) } : undefined,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        return await response.json()
      } catch (error) {
        if (attempt === opts.retries) {
          throw error
        }
        // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000))
      }
    }

    throw new Error("Max retries exceeded")
  }

  async post<T>(endpoint: string, data: any, options: FetchOptions = {}): Promise<T> {
    const opts = { ...this.defaultOptions, ...options }
    const url = `${this.baseURL}${endpoint}`

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    return await response.json()
  }
}

export const apiClient = new OptimizedAPIClient()
