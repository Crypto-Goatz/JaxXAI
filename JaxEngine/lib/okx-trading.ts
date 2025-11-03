import crypto from "crypto"

interface OKXConfig {
  apiKey: string
  secretKey: string
  passphrase: string
  baseUrl: string
}

interface OKXOrderParams {
  instId: string // Trading pair (e.g., "BTC-USDT")
  tdMode: "cash" | "cross" | "isolated" // Trade mode
  side: "buy" | "sell"
  ordType: "market" | "limit" | "post_only" | "fok" | "ioc"
  sz: string // Quantity
  px?: string // Price (for limit orders)
}

export class OKXTrading {
  private config: OKXConfig

  constructor() {
    this.config = {
      apiKey: process.env.OKX_API_KEY || "",
      secretKey: process.env.OKX_SECRET_KEY || "",
      passphrase: process.env.OKX_PASSPHRASE || "",
      baseUrl: "https://www.okx.com",
    }
  }

  private generateSignature(timestamp: string, method: string, requestPath: string, body = ""): string {
    const message = timestamp + method + requestPath + body
    return crypto.createHmac("sha256", this.config.secretKey).update(message).digest("base64")
  }

  private getHeaders(method: string, requestPath: string, body = "") {
    const timestamp = new Date().toISOString()
    const signature = this.generateSignature(timestamp, method, requestPath, body)

    return {
      "OK-ACCESS-KEY": this.config.apiKey,
      "OK-ACCESS-SIGN": signature,
      "OK-ACCESS-TIMESTAMP": timestamp,
      "OK-ACCESS-PASSPHRASE": this.config.passphrase,
      "Content-Type": "application/json",
    }
  }

  async placeOrder(params: OKXOrderParams) {
    const requestPath = "/api/v5/trade/order"
    const body = JSON.stringify(params)

    const response = await fetch(`${this.config.baseUrl}${requestPath}`, {
      method: "POST",
      headers: this.getHeaders("POST", requestPath, body),
      body,
    })

    return response.json()
  }

  async getAccountBalance() {
    const requestPath = "/api/v5/account/balance"

    const response = await fetch(`${this.config.baseUrl}${requestPath}`, {
      method: "GET",
      headers: this.getHeaders("GET", requestPath),
    })

    return response.json()
  }

  async getOrderBook(instId: string, sz = 20) {
    const requestPath = `/api/v5/market/books?instId=${instId}&sz=${sz}`

    const response = await fetch(`${this.config.baseUrl}${requestPath}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    return response.json()
  }

  async getTicker(instId: string) {
    const requestPath = `/api/v5/market/ticker?instId=${instId}`

    const response = await fetch(`${this.config.baseUrl}${requestPath}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    return response.json()
  }

  async get5MinVolume(instId: string) {
    const requestPath = `/api/v5/market/candles?instId=${instId}&bar=5m&limit=1`

    const response = await fetch(`${this.config.baseUrl}${requestPath}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (data.code === "0" && data.data && data.data.length > 0) {
      // OKX candle format: [timestamp, open, high, low, close, volume, volumeCcy]
      return {
        volume: Number.parseFloat(data.data[0][5]),
        volumeUSD: Number.parseFloat(data.data[0][6]),
        timestamp: data.data[0][0],
      }
    }

    return null
  }

  async cancelOrder(ordId: string, instId: string) {
    const requestPath = "/api/v5/trade/cancel-order"
    const body = JSON.stringify({ ordId, instId })

    const response = await fetch(`${this.config.baseUrl}${requestPath}`, {
      method: "POST",
      headers: this.getHeaders("POST", requestPath, body),
      body,
    })

    return response.json()
  }

  async getOpenOrders(instId?: string) {
    const requestPath = instId ? `/api/v5/trade/orders-pending?instId=${instId}` : "/api/v5/trade/orders-pending"

    const response = await fetch(`${this.config.baseUrl}${requestPath}`, {
      method: "GET",
      headers: this.getHeaders("GET", requestPath),
    })

    return response.json()
  }
}

export const okxTrading = new OKXTrading()
