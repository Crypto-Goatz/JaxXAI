import {
  calculateRSI,
  calculateMACD,
  calculateBollingerBands,
  analyzeVolume,
  calculateMomentum,
  type IndicatorResult,
} from "./technical-indicators"

export interface SignalInput {
  symbol: string
  prices: number[] // Historical close prices
  volumes: number[] // Historical volumes
  currentPrice: number
  priceChange24h: number
  marketCap: number
  volume24h: number
}

export interface TradingSignal {
  symbol: string
  signal: "STRONG_BUY" | "BUY" | "HOLD" | "SELL" | "STRONG_SELL"
  confidence: number // 0-100
  indicators: {
    rsi: IndicatorResult
    macd: IndicatorResult
    bollinger: ReturnType<typeof calculateBollingerBands>
    volume: IndicatorResult
    momentum: IndicatorResult
  }
  reasoning: string[]
  timestamp: number
}

export function calculateTradingSignal(input: SignalInput): TradingSignal {
  const { symbol, prices, volumes, currentPrice, priceChange24h } = input

  // Calculate all indicators
  const rsi = calculateRSI(prices, 14)
  const macd = calculateMACD(prices, 12, 26, 9)
  const bollinger = calculateBollingerBands(prices, 20, 2)
  const volume = analyzeVolume(volumes, prices)
  const momentum = calculateMomentum(prices, 10)

  // Aggregate signals
  const signals = [rsi, macd, bollinger, volume, momentum]
  const buySignals = signals.filter((s) => s.signal === "BUY").length
  const sellSignals = signals.filter((s) => s.signal === "SELL").length

  // Calculate weighted confidence
  const totalStrength = signals.reduce((sum, s) => sum + s.strength, 0)
  const avgStrength = totalStrength / signals.length

  // Determine final signal
  let finalSignal: TradingSignal["signal"] = "HOLD"
  let confidence = avgStrength

  if (buySignals >= 4) {
    finalSignal = "STRONG_BUY"
    confidence = Math.min(100, avgStrength + 10)
  } else if (buySignals >= 3) {
    finalSignal = "BUY"
    confidence = avgStrength
  } else if (sellSignals >= 4) {
    finalSignal = "STRONG_SELL"
    confidence = Math.min(100, avgStrength + 10)
  } else if (sellSignals >= 3) {
    finalSignal = "SELL"
    confidence = avgStrength
  } else {
    confidence = Math.max(30, avgStrength - 20)
  }

  // Generate reasoning
  const reasoning: string[] = []
  if (rsi.signal === "BUY") reasoning.push(`RSI oversold (${rsi.value.toFixed(1)})`)
  if (rsi.signal === "SELL") reasoning.push(`RSI overbought (${rsi.value.toFixed(1)})`)
  if (macd.signal === "BUY") reasoning.push("MACD bullish crossover")
  if (macd.signal === "SELL") reasoning.push("MACD bearish crossover")
  if (bollinger.signal === "BUY") reasoning.push("Price at lower Bollinger Band")
  if (bollinger.signal === "SELL") reasoning.push("Price at upper Bollinger Band")
  if (volume.signal !== "HOLD") reasoning.push(`High volume ${volume.signal.toLowerCase()} pressure`)
  if (momentum.signal !== "HOLD") reasoning.push(`Strong ${momentum.signal.toLowerCase()} momentum`)
  if (priceChange24h > 10) reasoning.push("Strong 24h uptrend")
  if (priceChange24h < -10) reasoning.push("Strong 24h downtrend")

  return {
    symbol,
    signal: finalSignal,
    confidence: Math.round(confidence),
    indicators: { rsi, macd, bollinger, volume, momentum },
    reasoning,
    timestamp: Date.now(),
  }
}

// Batch calculate signals for multiple coins
export function calculateBatchSignals(inputs: SignalInput[]): TradingSignal[] {
  return inputs.map(calculateTradingSignal).sort((a, b) => b.confidence - a.confidence)
}
