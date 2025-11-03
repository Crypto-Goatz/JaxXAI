import type { BaseExchange } from "./base-exchange"
import { BinanceExchange } from "./binance"
import type { ExchangeType } from "@/types/integration.types"

export class ExchangeFactory {
  static createExchange(type: ExchangeType, apiKey: string, apiSecret: string): BaseExchange {
    switch (type) {
      case "binance":
        return new BinanceExchange(apiKey, apiSecret)
      case "coinbase":
        // Placeholder for Coinbase implementation
        throw new Error("Coinbase integration coming soon")
      case "kraken":
        // Placeholder for Kraken implementation
        throw new Error("Kraken integration coming soon")
      case "bybit":
        // Placeholder for Bybit implementation
        throw new Error("Bybit integration coming soon")
      case "okx":
        // Placeholder for OKX implementation
        throw new Error("OKX integration coming soon")
      default:
        throw new Error(`Unsupported exchange: ${type}`)
    }
  }
}
