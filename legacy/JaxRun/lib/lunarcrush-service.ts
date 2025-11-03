import type { LunarCrushCapability } from "@/types/integration.types"

interface LunarCrushVerificationResult {
  isValid: boolean
  tier: "free" | "pro" | "enterprise"
  rateLimit: {
    requestsPerDay: number
    requestsRemaining: number
    resetAt: Date
  }
  error?: string
}

interface LunarCrushApiResponse {
  data?: unknown
  config?: {
    rate_limit?: {
      limit: number
      remaining: number
      reset: number
    }
  }
  error?: string
}

export class LunarCrushService {
  private baseUrl = "https://lunarcrush.com/api4"

  async verifyApiKey(apiKey: string): Promise<LunarCrushVerificationResult> {
    try {
      console.log("[v0] Verifying LunarCrush API key...")

      // Make a test request to verify the API key
      const response = await fetch(`${this.baseUrl}/public/coins/list?limit=1`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })

      const data: LunarCrushApiResponse = await response.json()

      if (!response.ok) {
        return {
          isValid: false,
          tier: "free",
          rateLimit: {
            requestsPerDay: 0,
            requestsRemaining: 0,
            resetAt: new Date(),
          },
          error: data.error || "Invalid API key",
        }
      }

      // Determine tier based on rate limits
      const rateLimit = data.config?.rate_limit
      let tier: "free" | "pro" | "enterprise" = "free"
      let requestsPerDay = 50

      if (rateLimit) {
        if (rateLimit.limit >= 10000) {
          tier = "enterprise"
          requestsPerDay = rateLimit.limit
        } else if (rateLimit.limit >= 1000) {
          tier = "pro"
          requestsPerDay = rateLimit.limit
        } else {
          tier = "free"
          requestsPerDay = rateLimit.limit
        }
      }

      console.log("[v0] API key verified successfully. Tier:", tier)

      return {
        isValid: true,
        tier,
        rateLimit: {
          requestsPerDay,
          requestsRemaining: rateLimit?.remaining || requestsPerDay,
          resetAt: rateLimit?.reset ? new Date(rateLimit.reset * 1000) : new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      }
    } catch (error) {
      console.error("[v0] LunarCrush API verification failed:", error)
      return {
        isValid: false,
        tier: "free",
        rateLimit: {
          requestsPerDay: 0,
          requestsRemaining: 0,
          resetAt: new Date(),
        },
        error: error instanceof Error ? error.message : "Network error",
      }
    }
  }

  async fetchCapabilityData(apiKey: string, capability: LunarCrushCapability, symbol?: string) {
    try {
      const endpoint = capability.endpoint || "/public/coins/list"
      const url = new URL(`${this.baseUrl}${endpoint}`)

      if (symbol) {
        url.searchParams.set("symbol", symbol)
      }

      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`[v0] Failed to fetch ${capability.name} data:`, error)
      throw error
    }
  }
}

export const lunarCrushService = new LunarCrushService()
