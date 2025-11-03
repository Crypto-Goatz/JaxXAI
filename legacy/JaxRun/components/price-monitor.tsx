"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PriceTicker } from "./price-ticker"
import { useBatchPriceData } from "@/hooks/use-price-data"

const DEFAULT_SYMBOLS = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"]

export function PriceMonitor() {
  const { prices, isLoading } = useBatchPriceData(DEFAULT_SYMBOLS, 5000)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Prices</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {DEFAULT_SYMBOLS.map((symbol) => (
              <div key={symbol} className="flex items-center justify-between animate-pulse">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-4 w-32 bg-muted rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {prices.map((price) => (
              <div key={price.symbol} className="flex items-center justify-between">
                <div className="text-sm font-medium">{price.symbol.replace("USDT", "/USDT")}</div>
                <PriceTicker symbol={price.symbol} />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
