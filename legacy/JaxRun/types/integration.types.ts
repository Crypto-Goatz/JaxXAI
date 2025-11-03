export type ExchangeType = "binance" | "coinbase" | "kraken" | "bybit" | "okx"

export interface ExchangeIntegration {
  id: string
  exchange: ExchangeType
  name: string
  apiKey: string
  apiSecret: string
  isActive: boolean
  createdAt: Date
  lastUsed?: Date
}

export interface WebhookConfig {
  id: string
  name: string
  url: string
  secret: string
  isActive: boolean
  createdAt: Date
}

export interface NotificationConfig {
  email?: {
    enabled: boolean
    address: string
  }
  discord?: {
    enabled: boolean
    webhookUrl: string
  }
  telegram?: {
    enabled: boolean
    botToken: string
    chatId: string
  }
}

export type GoogleSheetsAuthType = "oauth" | "apiKey"

export interface GoogleSheetsIntegration {
  id: string
  name: string
  authType: GoogleSheetsAuthType
  accessToken?: string
  refreshToken?: string
  expiresAt?: Date
  apiKey?: string
  spreadsheetId?: string
  scriptId?: string
  isActive: boolean
  createdAt: Date
  lastUsed?: Date
}

export type CryptoVariableType =
  | "price"
  | "volume"
  | "volume_change_24h"
  | "price_change_24h"
  | "price_change_7d"
  | "market_cap"
  | "market_cap_rank"
  | "circulating_supply"
  | "total_supply"
  | "ath"
  | "ath_change_percentage"
  | "atl"
  | "atl_change_percentage"
  | "social_sentiment"
  | "social_mentions"
  | "social_engagement"
  | "fear_greed_index"
  | "trading_volume_24h"
  | "bid_ask_spread"
  | "order_book_depth"
  | "funding_rate"
  | "open_interest"
  | "liquidations_24h"
  | "whale_transactions"
  | "exchange_inflow"
  | "exchange_outflow"
  | "active_addresses"
  | "network_hash_rate"
  | "gas_price"
  | "tvl"
  | "apy"
  | "volatility"
  | "rsi"
  | "macd"
  | "bollinger_bands"
  | "moving_average_50"
  | "moving_average_200"

export interface CryptoVariable {
  id: string
  name: string
  type: CryptoVariableType
  description: string
  category: "price" | "volume" | "market" | "social" | "onchain" | "defi" | "technical"
  symbol?: string
  unit?: string
  source: "exchange" | "coingecko" | "social" | "onchain" | "calculated"
  refreshInterval?: number
}

export const CRYPTO_VARIABLES: Record<CryptoVariableType, Omit<CryptoVariable, "id" | "symbol">> = {
  price: {
    name: "Current Price",
    type: "price",
    description: "Real-time asset price",
    category: "price",
    unit: "USD",
    source: "exchange",
    refreshInterval: 1,
  },
  volume: {
    name: "24h Volume",
    type: "volume",
    description: "Total trading volume in last 24 hours",
    category: "volume",
    unit: "USD",
    source: "exchange",
    refreshInterval: 60,
  },
  volume_change_24h: {
    name: "Volume Change 24h",
    type: "volume_change_24h",
    description: "Percentage change in volume over 24 hours",
    category: "volume",
    unit: "%",
    source: "exchange",
    refreshInterval: 60,
  },
  price_change_24h: {
    name: "Price Change 24h",
    type: "price_change_24h",
    description: "Percentage change in price over 24 hours",
    category: "price",
    unit: "%",
    source: "exchange",
    refreshInterval: 60,
  },
  price_change_7d: {
    name: "Price Change 7d",
    type: "price_change_7d",
    description: "Percentage change in price over 7 days",
    category: "price",
    unit: "%",
    source: "coingecko",
    refreshInterval: 300,
  },
  market_cap: {
    name: "Market Cap",
    type: "market_cap",
    description: "Total market capitalization",
    category: "market",
    unit: "USD",
    source: "coingecko",
    refreshInterval: 300,
  },
  market_cap_rank: {
    name: "Market Cap Rank",
    type: "market_cap_rank",
    description: "Ranking by market capitalization",
    category: "market",
    source: "coingecko",
    refreshInterval: 300,
  },
  circulating_supply: {
    name: "Circulating Supply",
    type: "circulating_supply",
    description: "Amount of coins in circulation",
    category: "market",
    source: "coingecko",
    refreshInterval: 3600,
  },
  total_supply: {
    name: "Total Supply",
    type: "total_supply",
    description: "Total amount of coins that exist",
    category: "market",
    source: "coingecko",
    refreshInterval: 3600,
  },
  ath: {
    name: "All-Time High",
    type: "ath",
    description: "Highest price ever reached",
    category: "price",
    unit: "USD",
    source: "coingecko",
    refreshInterval: 3600,
  },
  ath_change_percentage: {
    name: "ATH Change %",
    type: "ath_change_percentage",
    description: "Percentage from all-time high",
    category: "price",
    unit: "%",
    source: "coingecko",
    refreshInterval: 300,
  },
  atl: {
    name: "All-Time Low",
    type: "atl",
    description: "Lowest price ever reached",
    category: "price",
    unit: "USD",
    source: "coingecko",
    refreshInterval: 3600,
  },
  atl_change_percentage: {
    name: "ATL Change %",
    type: "atl_change_percentage",
    description: "Percentage from all-time low",
    category: "price",
    unit: "%",
    source: "coingecko",
    refreshInterval: 300,
  },
  social_sentiment: {
    name: "Social Sentiment",
    type: "social_sentiment",
    description: "Overall sentiment from social media (-1 to 1)",
    category: "social",
    source: "social",
    refreshInterval: 300,
  },
  social_mentions: {
    name: "Social Mentions",
    type: "social_mentions",
    description: "Number of mentions across social platforms",
    category: "social",
    source: "social",
    refreshInterval: 300,
  },
  social_engagement: {
    name: "Social Engagement",
    type: "social_engagement",
    description: "Total engagement (likes, shares, comments)",
    category: "social",
    source: "social",
    refreshInterval: 300,
  },
  fear_greed_index: {
    name: "Fear & Greed Index",
    type: "fear_greed_index",
    description: "Market sentiment indicator (0-100)",
    category: "social",
    source: "social",
    refreshInterval: 3600,
  },
  trading_volume_24h: {
    name: "Trading Volume 24h",
    type: "trading_volume_24h",
    description: "Total trading volume across all exchanges",
    category: "volume",
    unit: "USD",
    source: "coingecko",
    refreshInterval: 60,
  },
  bid_ask_spread: {
    name: "Bid-Ask Spread",
    type: "bid_ask_spread",
    description: "Difference between highest bid and lowest ask",
    category: "market",
    unit: "%",
    source: "exchange",
    refreshInterval: 1,
  },
  order_book_depth: {
    name: "Order Book Depth",
    type: "order_book_depth",
    description: "Total liquidity in order book",
    category: "market",
    unit: "USD",
    source: "exchange",
    refreshInterval: 5,
  },
  funding_rate: {
    name: "Funding Rate",
    type: "funding_rate",
    description: "Perpetual futures funding rate",
    category: "market",
    unit: "%",
    source: "exchange",
    refreshInterval: 60,
  },
  open_interest: {
    name: "Open Interest",
    type: "open_interest",
    description: "Total open futures/options contracts",
    category: "market",
    unit: "USD",
    source: "exchange",
    refreshInterval: 300,
  },
  liquidations_24h: {
    name: "Liquidations 24h",
    type: "liquidations_24h",
    description: "Total liquidations in last 24 hours",
    category: "market",
    unit: "USD",
    source: "exchange",
    refreshInterval: 300,
  },
  whale_transactions: {
    name: "Whale Transactions",
    type: "whale_transactions",
    description: "Number of large transactions (>$100k)",
    category: "onchain",
    source: "onchain",
    refreshInterval: 300,
  },
  exchange_inflow: {
    name: "Exchange Inflow",
    type: "exchange_inflow",
    description: "Amount flowing into exchanges",
    category: "onchain",
    source: "onchain",
    refreshInterval: 300,
  },
  exchange_outflow: {
    name: "Exchange Outflow",
    type: "exchange_outflow",
    description: "Amount flowing out of exchanges",
    category: "onchain",
    source: "onchain",
    refreshInterval: 300,
  },
  active_addresses: {
    name: "Active Addresses",
    type: "active_addresses",
    description: "Number of active wallet addresses",
    category: "onchain",
    source: "onchain",
    refreshInterval: 3600,
  },
  network_hash_rate: {
    name: "Network Hash Rate",
    type: "network_hash_rate",
    description: "Total network mining power",
    category: "onchain",
    source: "onchain",
    refreshInterval: 3600,
  },
  gas_price: {
    name: "Gas Price",
    type: "gas_price",
    description: "Current network gas price",
    category: "onchain",
    unit: "Gwei",
    source: "onchain",
    refreshInterval: 10,
  },
  tvl: {
    name: "Total Value Locked",
    type: "tvl",
    description: "Total value locked in DeFi protocol",
    category: "defi",
    unit: "USD",
    source: "coingecko",
    refreshInterval: 300,
  },
  apy: {
    name: "APY",
    type: "apy",
    description: "Annual percentage yield",
    category: "defi",
    unit: "%",
    source: "coingecko",
    refreshInterval: 300,
  },
  volatility: {
    name: "Volatility",
    type: "volatility",
    description: "Price volatility indicator",
    category: "technical",
    unit: "%",
    source: "calculated",
    refreshInterval: 300,
  },
  rsi: {
    name: "RSI (14)",
    type: "rsi",
    description: "Relative Strength Index",
    category: "technical",
    source: "calculated",
    refreshInterval: 60,
  },
  macd: {
    name: "MACD",
    type: "macd",
    description: "Moving Average Convergence Divergence",
    category: "technical",
    source: "calculated",
    refreshInterval: 60,
  },
  bollinger_bands: {
    name: "Bollinger Bands",
    type: "bollinger_bands",
    description: "Bollinger Bands indicator",
    category: "technical",
    source: "calculated",
    refreshInterval: 60,
  },
  moving_average_50: {
    name: "MA 50",
    type: "moving_average_50",
    description: "50-period moving average",
    category: "technical",
    unit: "USD",
    source: "calculated",
    refreshInterval: 300,
  },
  moving_average_200: {
    name: "MA 200",
    type: "moving_average_200",
    description: "200-period moving average",
    category: "technical",
    unit: "USD",
    source: "calculated",
    refreshInterval: 300,
  },
}

export interface DataSourceIntegration {
  id: string
  name: string
  type: "coingecko" | "lunarcrush" | "glassnode" | "santiment" | "messari" | "dune" | "custom"
  apiKey?: string
  isActive: boolean
  createdAt: Date
  lastUsed?: Date
  availableVariables: CryptoVariableType[]
  capabilities?: LunarCrushCapability[]
  isVerified?: boolean
  tier?: "free" | "pro" | "enterprise"
  rateLimit?: {
    requestsPerDay: number
    requestsRemaining: number
    resetAt?: Date
  }
}

export interface LunarCrushCapability {
  id: string
  name: string
  description: string
  category: "social" | "market" | "influencer" | "nft" | "galaxy"
  enabled: boolean
  nodeType?: "marketMonitor" | "priceAlert" | "technicalIndicator" | "notification"
  propertyType?: "trigger" | "condition" | "action"
  variables: CryptoVariableType[]
  endpoint?: string
}
