import type { CryptoEquationType, CryptoEquation } from "@/types/crypto-equations.types"

export const COMMON_PHRASES: Record<string, Omit<CryptoEquation, "id" | "enabled" | "config">> = {
  wait_for_strong_buy: {
    type: "wait_for_strong_buy" as CryptoEquationType,
    name: "Wait for Strong Buy Signal",
    description: "Wait until RSI is below 30 and volume is above average",
    formula: "RSI < 30 AND Volume > Avg Volume × 1.5",
    category: "strategy",
    inputs: [
      { name: "rsi", description: "Current RSI value", type: "number" },
      { name: "volume", description: "Current volume", type: "number" },
      { name: "avg_volume", description: "Average volume", type: "number" },
    ],
  },
  sell_when_price_drops: {
    type: "sell_when_price_drops" as CryptoEquationType,
    name: "Sell When Price Drops",
    description: "Trigger sell when price drops below a certain percentage",
    formula: "((Current Price - Entry Price) / Entry Price) × 100 <= -Threshold",
    category: "strategy",
    inputs: [
      { name: "current_price", description: "Current price", type: "price" },
      { name: "entry_price", description: "Entry price", type: "price" },
      { name: "threshold", description: "Drop threshold %", type: "percentage", defaultValue: 5 },
    ],
  },
  take_profit_target: {
    type: "take_profit_target" as CryptoEquationType,
    name: "Take Profit at Target",
    description: "Sell when price reaches profit target percentage",
    formula: "((Current Price - Entry Price) / Entry Price) × 100 >= Target %",
    category: "strategy",
    inputs: [
      { name: "current_price", description: "Current price", type: "price" },
      { name: "entry_price", description: "Entry price", type: "price" },
      { name: "target_percent", description: "Profit target %", type: "percentage", defaultValue: 20 },
    ],
  },
  buy_the_dip: {
    type: "buy_the_dip" as CryptoEquationType,
    name: "Buy the Dip",
    description: "Buy when price drops significantly from recent high",
    formula: "((Current Price - Recent High) / Recent High) × 100 <= -Dip %",
    category: "strategy",
    inputs: [
      { name: "current_price", description: "Current price", type: "price" },
      { name: "recent_high", description: "Recent high price", type: "price" },
      { name: "dip_percent", description: "Dip threshold %", type: "percentage", defaultValue: 10 },
    ],
  },
  momentum_breakout: {
    type: "momentum_breakout" as CryptoEquationType,
    name: "Momentum Breakout",
    description: "Detect when price breaks resistance with high volume",
    formula: "Price > Resistance AND Volume > Avg Volume × 2",
    category: "strategy",
    inputs: [
      { name: "current_price", description: "Current price", type: "price" },
      { name: "resistance", description: "Resistance level", type: "price" },
      { name: "volume", description: "Current volume", type: "number" },
      { name: "avg_volume", description: "Average volume", type: "number" },
    ],
  },
  wait_strong_buy: {
    type: "wait_strong_buy" as CryptoEquationType,
    name: "Wait for Strong Buy Signal",
    description: "Wait until RSI is below 30 and volume is above average",
    formula: "RSI < 30 AND Volume > Avg Volume × 1.5",
    category: "strategy",
    inputs: [
      { name: "rsi", description: "Current RSI value", type: "number" },
      { name: "volume", description: "Current volume", type: "number" },
      { name: "avg_volume", description: "Average volume", type: "number" },
    ],
  },
  sell_on_drop: {
    type: "sell_on_drop" as CryptoEquationType,
    name: "Sell When Price Drops",
    description: "Sell when price drops below a certain percentage from peak",
    formula: "((Peak Price - Current Price) / Peak Price) × 100 >= Threshold",
    category: "strategy",
    inputs: [
      { name: "peak_price", description: "Peak price", type: "price" },
      { name: "current_price", description: "Current price", type: "price" },
      { name: "threshold", description: "Drop threshold %", type: "percentage", defaultValue: 5 },
    ],
  },
  take_profit: {
    type: "take_profit" as CryptoEquationType,
    name: "Take Profit at Target",
    description: "Sell when profit reaches target percentage",
    formula: "((Current Price - Entry Price) / Entry Price) × 100 >= Target %",
    category: "strategy",
    inputs: [
      { name: "entry_price", description: "Entry price", type: "price" },
      { name: "current_price", description: "Current price", type: "price" },
      { name: "target_percent", description: "Target profit %", type: "percentage", defaultValue: 20 },
    ],
  },
  stop_loss: {
    type: "stop_loss" as CryptoEquationType,
    name: "Stop Loss Trigger",
    description: "Sell when loss exceeds maximum acceptable loss",
    formula: "((Entry Price - Current Price) / Entry Price) × 100 >= Max Loss %",
    category: "strategy",
    inputs: [
      { name: "entry_price", description: "Entry price", type: "price" },
      { name: "current_price", description: "Current price", type: "price" },
      { name: "max_loss_percent", description: "Maximum loss %", type: "percentage", defaultValue: 5 },
    ],
  },
}

export const CRYPTO_EQUATIONS: Record<CryptoEquationType, Omit<CryptoEquation, "id" | "enabled" | "config">> = {
  market_cap_prediction: {
    type: "market_cap_prediction",
    name: "Market Cap Prediction",
    description: "Calculate predicted market cap based on circulating supply and target price",
    formula: "Market Cap = Circulating Supply × Target Price",
    category: "prediction",
    inputs: [
      {
        name: "circulating_supply",
        description: "Current circulating supply of the token",
        type: "number",
      },
      {
        name: "target_price",
        description: "Target price per token",
        type: "price",
      },
    ],
  },
  price_change_percent: {
    type: "price_change_percent",
    name: "Price Change %",
    description: "Calculate percentage change between two prices",
    formula: "Change % = ((New Price - Old Price) / Old Price) × 100",
    category: "calculation",
    inputs: [
      {
        name: "old_price",
        description: "Starting price",
        type: "price",
      },
      {
        name: "new_price",
        description: "Current price",
        type: "price",
      },
    ],
  },
  price_gain_1h: {
    type: "price_gain_1h",
    name: "5%+ Gain in 1 Hour",
    description: "Detect when a coin gains 5% or more in the last hour",
    formula: "((Current Price - Price 1h Ago) / Price 1h Ago) × 100 >= 5",
    category: "detection",
    inputs: [
      {
        name: "current_price",
        description: "Current price",
        type: "price",
      },
      {
        name: "price_1h_ago",
        description: "Price 1 hour ago",
        type: "price",
      },
      {
        name: "threshold",
        description: "Gain threshold percentage",
        type: "percentage",
        defaultValue: 5,
      },
    ],
  },
  price_gain_24h: {
    type: "price_gain_24h",
    name: "Price Gain 24h",
    description: "Detect significant price gains over 24 hours",
    formula: "((Current Price - Price 24h Ago) / Price 24h Ago) × 100 >= Threshold",
    category: "detection",
    inputs: [
      {
        name: "current_price",
        description: "Current price",
        type: "price",
      },
      {
        name: "price_24h_ago",
        description: "Price 24 hours ago",
        type: "price",
      },
      {
        name: "threshold",
        description: "Gain threshold percentage",
        type: "percentage",
        defaultValue: 10,
      },
    ],
  },
  volume_spike: {
    type: "volume_spike",
    name: "Volume Spike Detection",
    description: "Detect when volume exceeds average by a certain multiplier",
    formula: "Current Volume >= Average Volume × Multiplier",
    category: "detection",
    inputs: [
      {
        name: "current_volume",
        description: "Current trading volume",
        type: "number",
      },
      {
        name: "average_volume",
        description: "Average volume (e.g., 24h average)",
        type: "number",
      },
      {
        name: "multiplier",
        description: "Volume spike multiplier",
        type: "number",
        defaultValue: 2,
      },
    ],
  },
  rsi_calculation: {
    type: "rsi_calculation",
    name: "RSI Calculation",
    description: "Calculate Relative Strength Index",
    formula: "RSI = 100 - (100 / (1 + (Avg Gain / Avg Loss)))",
    category: "indicator",
    inputs: [
      {
        name: "avg_gain",
        description: "Average gain over period",
        type: "number",
      },
      {
        name: "avg_loss",
        description: "Average loss over period",
        type: "number",
      },
    ],
  },
  moving_average: {
    type: "moving_average",
    name: "Moving Average",
    description: "Calculate simple moving average",
    formula: "MA = Sum of Prices / Number of Periods",
    category: "indicator",
    inputs: [
      {
        name: "prices",
        description: "Array of prices",
        type: "number",
      },
      {
        name: "period",
        description: "Number of periods",
        type: "number",
        defaultValue: 20,
      },
    ],
  },
  support_resistance: {
    type: "support_resistance",
    name: "Support/Resistance Level",
    description: "Detect when price crosses support or resistance levels",
    formula: "Price >= Resistance OR Price <= Support",
    category: "detection",
    inputs: [
      {
        name: "current_price",
        description: "Current price",
        type: "price",
      },
      {
        name: "support_level",
        description: "Support price level",
        type: "price",
      },
      {
        name: "resistance_level",
        description: "Resistance price level",
        type: "price",
      },
    ],
  },
  profit_loss_percent: {
    type: "profit_loss_percent",
    name: "Profit/Loss %",
    description: "Calculate profit or loss percentage on a position",
    formula: "P/L % = ((Exit Price - Entry Price) / Entry Price) × 100",
    category: "calculation",
    inputs: [
      {
        name: "entry_price",
        description: "Entry price of position",
        type: "price",
      },
      {
        name: "exit_price",
        description: "Exit price or current price",
        type: "price",
      },
    ],
  },
  position_size: {
    type: "position_size",
    name: "Position Size Calculator",
    description: "Calculate position size based on risk percentage",
    formula: "Position Size = (Account Balance × Risk %) / (Entry Price - Stop Loss)",
    category: "calculation",
    inputs: [
      {
        name: "account_balance",
        description: "Total account balance",
        type: "number",
      },
      {
        name: "risk_percent",
        description: "Risk percentage per trade",
        type: "percentage",
        defaultValue: 2,
      },
      {
        name: "entry_price",
        description: "Entry price",
        type: "price",
      },
      {
        name: "stop_loss",
        description: "Stop loss price",
        type: "price",
      },
    ],
  },
}
