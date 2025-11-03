import { BaseExchange, type OrderParams, type Order, type Balance, type Ticker } from "./base-exchange"
import crypto from "crypto"

export class BinanceExchange extends BaseExchange {
  private baseUrl = "https://api.binance.com"

  constructor(apiKey: string, apiSecret: string) {
    super(apiKey, apiSecret, "Binance")
  }

  private sign(queryString: string): string {
    return crypto.createHmac("sha256", this.apiSecret).update(queryString).digest("hex")
  }

  private getHeaders(): Record<string, string> {
    return {
      "X-MBX-APIKEY": this.apiKey,
      "Content-Type": "application/json",
    }
  }

  async fetchBalance(): Promise<Balance[]> {
    const timestamp = Date.now()
    const queryString = `timestamp=${timestamp}`
    const signature = this.sign(queryString)

    const data = (await this.makeRequest(`${this.baseUrl}/api/v3/account?${queryString}&signature=${signature}`, {
      headers: this.getHeaders(),
    })) as { balances: Array<{ asset: string; free: string; locked: string }> }

    return data.balances
      .filter((b) => Number.parseFloat(b.free) > 0 || Number.parseFloat(b.locked) > 0)
      .map((b) => ({
        currency: b.asset,
        free: Number.parseFloat(b.free),
        used: Number.parseFloat(b.locked),
        total: Number.parseFloat(b.free) + Number.parseFloat(b.locked),
      }))
  }

  async fetchTicker(symbol: string): Promise<Ticker> {
    const data = (await this.makeRequest(`${this.baseUrl}/api/v3/ticker/24hr?symbol=${symbol}`)) as {
      symbol: string
      bidPrice: string
      askPrice: string
      lastPrice: string
      highPrice: string
      lowPrice: string
      volume: string
    }

    return {
      symbol: data.symbol,
      bid: Number.parseFloat(data.bidPrice),
      ask: Number.parseFloat(data.askPrice),
      last: Number.parseFloat(data.lastPrice),
      high: Number.parseFloat(data.highPrice),
      low: Number.parseFloat(data.lowPrice),
      volume: Number.parseFloat(data.volume),
      timestamp: Date.now(),
    }
  }

  async createOrder(params: OrderParams): Promise<Order> {
    const timestamp = Date.now()
    const orderParams: Record<string, string> = {
      symbol: params.symbol,
      side: params.side.toUpperCase(),
      type: params.type.toUpperCase(),
      quantity: params.amount.toString(),
      timestamp: timestamp.toString(),
    }

    if (params.type === "limit" && params.price) {
      orderParams.price = params.price.toString()
      orderParams.timeInForce = "GTC"
    }

    const queryString = new URLSearchParams(orderParams).toString()
    const signature = this.sign(queryString)

    const data = (await this.makeRequest(`${this.baseUrl}/api/v3/order?${queryString}&signature=${signature}`, {
      method: "POST",
      headers: this.getHeaders(),
    })) as {
      orderId: number
      symbol: string
      side: string
      type: string
      origQty: string
      price: string
      status: string
      transactTime: number
    }

    return {
      id: data.orderId.toString(),
      symbol: data.symbol,
      side: data.side.toLowerCase() as "buy" | "sell",
      type: data.type.toLowerCase() as "market" | "limit",
      amount: Number.parseFloat(data.origQty),
      price: Number.parseFloat(data.price),
      status: data.status.toLowerCase() as "open" | "closed" | "canceled",
      timestamp: data.transactTime,
    }
  }

  async cancelOrder(orderId: string, symbol: string): Promise<boolean> {
    const timestamp = Date.now()
    const queryString = `symbol=${symbol}&orderId=${orderId}&timestamp=${timestamp}`
    const signature = this.sign(queryString)

    await this.makeRequest(`${this.baseUrl}/api/v3/order?${queryString}&signature=${signature}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    })

    return true
  }

  async fetchOrder(orderId: string, symbol: string): Promise<Order> {
    const timestamp = Date.now()
    const queryString = `symbol=${symbol}&orderId=${orderId}&timestamp=${timestamp}`
    const signature = this.sign(queryString)

    const data = (await this.makeRequest(`${this.baseUrl}/api/v3/order?${queryString}&signature=${signature}`, {
      headers: this.getHeaders(),
    })) as {
      orderId: number
      symbol: string
      side: string
      type: string
      origQty: string
      price: string
      status: string
      time: number
    }

    return {
      id: data.orderId.toString(),
      symbol: data.symbol,
      side: data.side.toLowerCase() as "buy" | "sell",
      type: data.type.toLowerCase() as "market" | "limit",
      amount: Number.parseFloat(data.origQty),
      price: Number.parseFloat(data.price),
      status: data.status.toLowerCase() as "open" | "closed" | "canceled",
      timestamp: data.time,
    }
  }

  async fetchOpenOrders(symbol?: string): Promise<Order[]> {
    const timestamp = Date.now()
    const queryString = symbol ? `symbol=${symbol}&timestamp=${timestamp}` : `timestamp=${timestamp}`
    const signature = this.sign(queryString)

    const data = (await this.makeRequest(`${this.baseUrl}/api/v3/openOrders?${queryString}&signature=${signature}`, {
      headers: this.getHeaders(),
    })) as Array<{
      orderId: number
      symbol: string
      side: string
      type: string
      origQty: string
      price: string
      status: string
      time: number
    }>

    return data.map((order) => ({
      id: order.orderId.toString(),
      symbol: order.symbol,
      side: order.side.toLowerCase() as "buy" | "sell",
      type: order.type.toLowerCase() as "market" | "limit",
      amount: Number.parseFloat(order.origQty),
      price: Number.parseFloat(order.price),
      status: order.status.toLowerCase() as "open" | "closed" | "canceled",
      timestamp: order.time,
    }))
  }
}
