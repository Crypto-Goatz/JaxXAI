"use client"

import { useState, useEffect } from "react"
import useSWR from "swr"

interface PriceData {
  symbol: string
  price: number
  change24h: number
  changePercent24h: number
  high24h: number
  low24h: number
  volume24h: number
  timestamp: number
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function usePriceData(symbol: string, refreshInterval = 5000) {
  const { data, error, isLoading } = useSWR<{ success: boolean; data: PriceData }>(
    symbol ? `/api/prices/${symbol}` : null,
    fetcher,
    {
      refreshInterval,
      revalidateOnFocus: false,
    },
  )

  return {
    priceData: data?.data,
    isLoading,
    error,
  }
}

export function useBatchPriceData(symbols: string[], refreshInterval = 5000) {
  const [prices, setPrices] = useState<PriceData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!symbols || symbols.length === 0) {
      setIsLoading(false)
      return
    }

    const fetchPrices = async () => {
      try {
        const response = await fetch("/api/prices/batch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ symbols }),
        })
        const result = await response.json()
        if (result.success) {
          setPrices(result.data)
        }
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch prices"))
        setIsLoading(false)
      }
    }

    fetchPrices()
    const interval = setInterval(fetchPrices, refreshInterval)

    return () => clearInterval(interval)
  }, [symbols.join(","), refreshInterval])

  return { prices, isLoading, error }
}
