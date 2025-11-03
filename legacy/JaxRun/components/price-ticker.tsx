"use client"

import { usePriceData } from "@/hooks/use-price-data"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface PriceTickerProps {
  symbol: string
  className?: string
}

export function PriceTicker({ symbol, className }: PriceTickerProps) {
  const { priceData, isLoading, error } = usePriceData(symbol, 5000)

  if (isLoading) {
    return (
      <div className={cn("flex items-center gap-2 animate-pulse", className)}>
        <div className="h-4 w-20 bg-muted rounded" />
        <div className="h-4 w-16 bg-muted rounded" />
      </div>
    )
  }

  if (error || !priceData) {
    return <div className={cn("text-sm text-muted-foreground", className)}>Price unavailable</div>
  }

  const isPositive = priceData.changePercent24h >= 0

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="font-mono font-medium">${priceData.price.toLocaleString()}</div>
      <div className={cn("flex items-center gap-1 text-sm", isPositive ? "text-green-600" : "text-red-600")}>
        {isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
        <span>
          {isPositive ? "+" : ""}
          {priceData.changePercent24h.toFixed(2)}%
        </span>
      </div>
    </div>
  )
}
