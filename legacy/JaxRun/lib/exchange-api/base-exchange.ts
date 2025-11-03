export interface OrderParams {
  symbol: string
  side: "buy" | "sell"
  type: "market" | "limit"
  amount: number
  price?: number
}

export interface Order {
  id: string
  symbol: string
  side: "buy" | "sell"
  type: "market" | "limit"
  amount: number
  price?: number
  status: "open" | "closed" | "canceled"
  timestamp: number
}

export interface Balance {
  currency: string
  free: number
  used: number
  total: number
}

export interface Ticker {
  symbol: string
  bid: number
  ask: number
  last: number
  high: number
  low: number
  volume: number
  timestamp: number
}

export abstract class BaseExchange {
  protected apiKey: string
  protected apiSecret: string
  protected name: string

  constructor(apiKey: string, apiSecret: string, name: string) {
    this.apiKey = apiKey
    this.apiSecret = apiSecret
    this.name = name
  }

  abstract fetchBalance(): Promise<Balance[]>
  abstract fetchTicker(symbol: string): Promise<Ticker>
  abstract createOrder(params: OrderParams): Promise<Order>
  abstract cancelOrder(orderId: string, symbol: string): Promise<boolean>
  abstract fetchOrder(orderId: string, symbol: string): Promise<Order>
  abstract fetchOpenOrders(symbol?: string): Promise<Order[]>

  protected async makeRequest(url: string, options: RequestInit = {}): Promise<unknown> {
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`[v0] ${this.name} API error:`, error)
      throw error
    }
  }
}
