// Technical indicator calculations for crypto trading

export interface PriceData {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface IndicatorResult {
  value: number
  signal: "BUY" | "SELL" | "HOLD"
  strength: number // 0-100
}

// Simple Moving Average
export function calculateSMA(prices: number[], period: number): number {
  if (prices.length < period) return prices[prices.length - 1] || 0
  const slice = prices.slice(-period)
  return slice.reduce((sum, price) => sum + price, 0) / period
}

// Exponential Moving Average
export function calculateEMA(prices: number[], period: number): number {
  if (prices.length < period) return prices[prices.length - 1] || 0

  const multiplier = 2 / (period + 1)
  let ema = calculateSMA(prices.slice(0, period), period)

  for (let i = period; i < prices.length; i++) {
    ema = (prices[i] - ema) * multiplier + ema
  }

  return ema
}

// Relative Strength Index
export function calculateRSI(prices: number[], period = 14): IndicatorResult {
  if (prices.length < period + 1) {
    return { value: 50, signal: "HOLD", strength: 0 }
  }

  let gains = 0
  let losses = 0

  for (let i = prices.length - period; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1]
    if (change > 0) gains += change
    else losses -= change
  }

  const avgGain = gains / period
  const avgLoss = losses / period
  const rs = avgGain / avgLoss
  const rsi = 100 - 100 / (1 + rs)

  let signal: "BUY" | "SELL" | "HOLD" = "HOLD"
  let strength = 50

  if (rsi < 30) {
    signal = "BUY"
    strength = Math.min(100, (30 - rsi) * 3 + 50)
  } else if (rsi > 70) {
    signal = "SELL"
    strength = Math.min(100, (rsi - 70) * 3 + 50)
  } else {
    strength = Math.abs(50 - rsi)
  }

  return { value: rsi, signal, strength }
}

// MACD (Moving Average Convergence Divergence)
export function calculateMACD(prices: number[], fastPeriod = 12, slowPeriod = 26, signalPeriod = 9): IndicatorResult {
  if (prices.length < slowPeriod) {
    return { value: 0, signal: "HOLD", strength: 0 }
  }

  const fastEMA = calculateEMA(prices, fastPeriod)
  const slowEMA = calculateEMA(prices, slowPeriod)
  const macdLine = fastEMA - slowEMA

  // For signal line, we'd need historical MACD values
  // Simplified: use the MACD line value directly
  const signal: "BUY" | "SELL" | "HOLD" = macdLine > 0 ? "BUY" : macdLine < 0 ? "SELL" : "HOLD"
  const strength = Math.min(100, Math.abs(macdLine) * 10 + 50)

  return { value: macdLine, signal, strength }
}

// Bollinger Bands
export function calculateBollingerBands(
  prices: number[],
  period = 20,
  stdDev = 2,
): { upper: number; middle: number; lower: number; signal: "BUY" | "SELL" | "HOLD"; strength: number } {
  if (prices.length < period) {
    const current = prices[prices.length - 1] || 0
    return { upper: current, middle: current, lower: current, signal: "HOLD", strength: 0 }
  }

  const sma = calculateSMA(prices, period)
  const slice = prices.slice(-period)
  const variance = slice.reduce((sum, price) => sum + Math.pow(price - sma, 2), 0) / period
  const standardDeviation = Math.sqrt(variance)

  const upper = sma + stdDev * standardDeviation
  const lower = sma - stdDev * standardDeviation
  const current = prices[prices.length - 1]

  let signal: "BUY" | "SELL" | "HOLD" = "HOLD"
  let strength = 50

  if (current <= lower) {
    signal = "BUY"
    strength = Math.min(100, ((lower - current) / lower) * 500 + 60)
  } else if (current >= upper) {
    signal = "SELL"
    strength = Math.min(100, ((current - upper) / upper) * 500 + 60)
  }

  return { upper, middle: sma, lower, signal, strength }
}

// Volume analysis
export function analyzeVolume(volumes: number[], prices: number[]): IndicatorResult {
  if (volumes.length < 2 || prices.length < 2) {
    return { value: 0, signal: "HOLD", strength: 0 }
  }

  const avgVolume = calculateSMA(volumes, Math.min(20, volumes.length))
  const currentVolume = volumes[volumes.length - 1]
  const volumeRatio = currentVolume / avgVolume

  const priceChange = ((prices[prices.length - 1] - prices[prices.length - 2]) / prices[prices.length - 2]) * 100

  let signal: "BUY" | "SELL" | "HOLD" = "HOLD"
  let strength = 50

  if (volumeRatio > 1.5) {
    if (priceChange > 0) {
      signal = "BUY"
      strength = Math.min(100, volumeRatio * 30 + 40)
    } else if (priceChange < 0) {
      signal = "SELL"
      strength = Math.min(100, volumeRatio * 30 + 40)
    }
  }

  return { value: volumeRatio, signal, strength }
}

// Momentum indicator
export function calculateMomentum(prices: number[], period = 10): IndicatorResult {
  if (prices.length < period + 1) {
    return { value: 0, signal: "HOLD", strength: 0 }
  }

  const current = prices[prices.length - 1]
  const past = prices[prices.length - period - 1]
  const momentum = ((current - past) / past) * 100

  let signal: "BUY" | "SELL" | "HOLD" = "HOLD"
  let strength = 50

  if (momentum > 5) {
    signal = "BUY"
    strength = Math.min(100, momentum * 5 + 50)
  } else if (momentum < -5) {
    signal = "SELL"
    strength = Math.min(100, Math.abs(momentum) * 5 + 50)
  }

  return { value: momentum, signal, strength }
}
