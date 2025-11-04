import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = Math.min(Number.parseInt(searchParams.get("limit") || "10"), 10) // Max 10 coins

  try {
    // Use Binance for live pricing (no rate limits for public endpoints)
    const symbols = [
      "BTCUSDT",
      "ETHUSDT",
      "SOLUSDT",
      "BNBUSDT",
      "XRPUSDT",
      "ADAUSDT",
      "AVAXUSDT",
      "DOGEUSDT",
      "MATICUSDT",
      "DOTUSDT",
    ]

    const metadata: Record<
      string,
      { id: string; name: string; displaySymbol: string }
    > = {
      BTCUSDT: { id: "bitcoin", name: "Bitcoin", displaySymbol: "BTC" },
      ETHUSDT: { id: "ethereum", name: "Ethereum", displaySymbol: "ETH" },
      SOLUSDT: { id: "solana", name: "Solana", displaySymbol: "SOL" },
      BNBUSDT: { id: "binancecoin", name: "BNB", displaySymbol: "BNB" },
      XRPUSDT: { id: "ripple", name: "XRP", displaySymbol: "XRP" },
      ADAUSDT: { id: "cardano", name: "Cardano", displaySymbol: "ADA" },
      AVAXUSDT: { id: "avalanche-2", name: "Avalanche", displaySymbol: "AVAX" },
      DOGEUSDT: { id: "dogecoin", name: "Dogecoin", displaySymbol: "DOGE" },
      MATICUSDT: { id: "matic-network", name: "Polygon", displaySymbol: "MATIC" },
      DOTUSDT: { id: "polkadot", name: "Polkadot", displaySymbol: "DOT" },
    }

    const pricePromises = symbols.slice(0, limit).map(async (symbol) => {
      try {
        const [tickerRes, tradesRes] = await Promise.all([
          fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`),
          fetch(`https://api.binance.com/api/v3/trades?symbol=${symbol}&limit=100`),
        ])

        if (!tickerRes.ok) {
          throw new Error(`Ticker request failed for ${symbol} (${tickerRes.status})`)
        }
        if (!tradesRes.ok) {
          throw new Error(`Trades request failed for ${symbol} (${tradesRes.status})`)
        }

        const ticker24h = await tickerRes.json()
        const trades = await tradesRes.json()

        // Calculate 5-minute volume from recent trades
        const fiveMinAgo = Date.now() - 5 * 60 * 1000
        const recentTrades = trades.filter((t: any) => t.time > fiveMinAgo)
        const volume5min = recentTrades.reduce(
          (sum: number, t: any) => sum + Number.parseFloat(t.qty) * Number.parseFloat(t.price),
          0,
        )

        const info = metadata[symbol] ?? {
          id: symbol.toLowerCase(),
          name: symbol.replace("USDT", ""),
          displaySymbol: symbol.replace("USDT", ""),
        }

        const lastPrice = Number.parseFloat(ticker24h.lastPrice)
        const priceChangePercent = Number.parseFloat(ticker24h.priceChangePercent)
        const quoteVolume = Number.parseFloat(ticker24h.quoteVolume ?? ticker24h.volume ?? "0")

        return {
          id: info.id,
          symbol: info.displaySymbol,
          name: info.name,
          price: lastPrice,
          change24h: priceChangePercent,
          volume: quoteVolume,
          volume24h: quoteVolume,
          volume5min,
          high24h: Number.parseFloat(ticker24h.highPrice),
          low24h: Number.parseFloat(ticker24h.lowPrice),
          trades24h: Number.parseInt(String(ticker24h.count ?? 0)),
          marketCap: null,
        }
      } catch (error) {
        console.error(`Error fetching live price for ${symbol}:`, error)
        return null
      }
    })

    const resolved = await Promise.all(pricePromises)
    const data = resolved.filter((item): item is Exclude<typeof item, null> => item !== null)

    if (data.length === 0) {
      throw new Error("No live price data available")
    }

    return NextResponse.json({
      data,
      source: "binance",
      timestamp: Date.now(),
      nextUpdate: Date.now() + 2 * 60 * 1000, // 2 minutes
    })
  } catch (error) {
    console.error("Error fetching live prices:", error)
    return NextResponse.json({ error: "Failed to fetch live prices" }, { status: 500 })
  }
}
