import { cachedFetch } from "./cache-manager"
import { requestBatcher } from "./performance-utils"
import { perfMonitor } from "./performance-utils"

interface APIClientOptions {
  cache?: boolean
  cacheTTL?: number
  batch?: boolean
  monitor?: boolean
}

export class APIClient {
  private baseURL: string

  constructor(baseURL = "") {
    this.baseURL = baseURL
  }

  async get<T>(endpoint: string, options: APIClientOptions = {}): Promise<T> {
    const { cache = true, cacheTTL, batch = false, monitor = true } = options

    const url = `${this.baseURL}${endpoint}`

    const endMonitoring = monitor ? perfMonitor.start(`api:${endpoint}`) : null

    try {
      let data: T

      if (batch) {
        data = await requestBatcher.add(url)
      } else if (cache) {
        data = await cachedFetch<T>(url, undefined, cacheTTL)
      } else {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        data = await response.json()
      }

      return data
    } finally {
      if (endMonitoring) endMonitoring()
    }
  }

  async post<T>(endpoint: string, body: any, options: APIClientOptions = {}): Promise<T> {
    const { monitor = true } = options
    const url = `${this.baseURL}${endpoint}`

    const endMonitoring = monitor ? perfMonitor.start(`api:${endpoint}`) : null

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } finally {
      if (endMonitoring) endMonitoring()
    }
  }
}

export const apiClient = new APIClient()
