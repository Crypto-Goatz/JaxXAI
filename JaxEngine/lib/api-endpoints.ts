export interface APIEndpoint {
  id: string
  name: string
  category: "price" | "onchain" | "social" | "news" | "defi" | "technical" | "exchange"
  description: string
  baseUrl: string
  requiresAuth: boolean
  rateLimit: string
  metrics: string[]
}

export const API_ENDPOINTS: APIEndpoint[] = [
  // Price Data APIs
  {
    id: "coingecko",
    name: "CoinGecko",
    category: "price",
    description: "Real-time crypto prices, market caps, and volume data",
    baseUrl: "https://api.coingecko.com/api/v3",
    requiresAuth: true,
    rateLimit: "10-30 calls/minute",
    metrics: ["price", "market_cap", "volume", "24h_change", "ath", "atl"],
  },
  {
    id: "coinmarketcap",
    name: "CoinMarketCap",
    category: "price",
    description: "Comprehensive cryptocurrency market data",
    baseUrl: "https://pro-api.coinmarketcap.com/v1",
    requiresAuth: true,
    rateLimit: "333 calls/day (free tier)",
    metrics: ["price", "market_cap", "volume", "dominance", "circulating_supply"],
  },
  {
    id: "coinlayer",
    name: "CoinLayer",
    category: "price",
    description: "Real-time and historical cryptocurrency rates",
    baseUrl: "https://api.coinlayer.com",
    requiresAuth: true,
    rateLimit: "100 calls/month (free tier)",
    metrics: ["price", "historical_rates", "conversion"],
  },
  {
    id: "coinglass",
    name: "CoinGlass",
    category: "price",
    description: "Crypto derivatives and futures data",
    baseUrl: "https://open-api.coinglass.com/public/v2",
    requiresAuth: true,
    rateLimit: "Varies by tier",
    metrics: ["funding_rate", "open_interest", "liquidations", "long_short_ratio"],
  },

  // Exchange APIs
  {
    id: "binance",
    name: "Binance",
    category: "exchange",
    description: "Binance exchange data and trading",
    baseUrl: "https://api.binance.com/api/v3",
    requiresAuth: true,
    rateLimit: "1200 requests/minute",
    metrics: ["price", "orderbook", "trades", "klines", "ticker"],
  },
  {
    id: "coinbase",
    name: "Coinbase Pro",
    category: "exchange",
    description: "Coinbase exchange data and trading",
    baseUrl: "https://api.exchange.coinbase.com",
    requiresAuth: true,
    rateLimit: "10 requests/second",
    metrics: ["price", "orderbook", "trades", "candles", "stats"],
  },
  {
    id: "kraken",
    name: "Kraken",
    category: "exchange",
    description: "Kraken exchange data and trading",
    baseUrl: "https://api.kraken.com/0",
    requiresAuth: true,
    rateLimit: "15-20 calls/second",
    metrics: ["price", "orderbook", "trades", "ohlc", "spread"],
  },
  {
    id: "okx",
    name: "OKX",
    category: "exchange",
    description: "OKX exchange data and trading",
    baseUrl: "https://www.okx.com/api/v5",
    requiresAuth: true,
    rateLimit: "20 requests/2 seconds",
    metrics: ["price", "orderbook", "trades", "klines", "ticker", "funding_rate"],
  },

  // On-Chain Data APIs
  {
    id: "glassnode",
    name: "Glassnode",
    category: "onchain",
    description: "Advanced on-chain metrics and analytics",
    baseUrl: "https://api.glassnode.com/v1",
    requiresAuth: true,
    rateLimit: "Varies by tier",
    metrics: ["active_addresses", "transaction_volume", "exchange_flows", "whale_activity", "miner_revenue"],
  },
  {
    id: "intotheblock",
    name: "IntoTheBlock",
    category: "onchain",
    description: "On-chain intelligence and market indicators",
    baseUrl: "https://api.intotheblock.com/v1",
    requiresAuth: true,
    rateLimit: "Varies by tier",
    metrics: ["in_out_money", "large_transactions", "concentration", "ownership"],
  },
  {
    id: "etherscan",
    name: "Etherscan",
    category: "onchain",
    description: "Ethereum blockchain data and analytics",
    baseUrl: "https://api.etherscan.io/api",
    requiresAuth: true,
    rateLimit: "5 calls/second",
    metrics: ["gas_price", "transactions", "token_transfers", "contract_data"],
  },
  {
    id: "debank",
    name: "DeBank",
    category: "onchain",
    description: "Multi-chain DeFi portfolio tracking",
    baseUrl: "https://pro-openapi.debank.com/v1",
    requiresAuth: true,
    rateLimit: "Varies by tier",
    metrics: ["portfolio", "protocols", "nft_holdings", "transaction_history"],
  },
  {
    id: "flipside",
    name: "Flipside Crypto",
    category: "onchain",
    description: "Blockchain analytics and data",
    baseUrl: "https://api-v2.flipsidecrypto.xyz",
    requiresAuth: true,
    rateLimit: "Varies by tier",
    metrics: ["sql_queries", "chain_metrics", "protocol_data"],
  },
  {
    id: "wallet_tracker",
    name: "Crypto Wallet Tracker",
    category: "onchain",
    description: "Track wallet addresses and transactions",
    baseUrl: "https://api.cryptowallet.com/v1",
    requiresAuth: true,
    rateLimit: "Varies by tier",
    metrics: ["wallet_balance", "transactions", "token_holdings"],
  },

  // Social Sentiment APIs
  {
    id: "lunarcrush",
    name: "LunarCrush",
    category: "social",
    description: "Social media analytics and sentiment",
    baseUrl: "https://api.lunarcrush.com/v2",
    requiresAuth: true,
    rateLimit: "50 calls/day (free tier)",
    metrics: ["social_volume", "sentiment", "galaxy_score", "alt_rank", "social_dominance"],
  },
  {
    id: "santiment",
    name: "Santiment",
    category: "social",
    description: "Crypto social and on-chain metrics",
    baseUrl: "https://api.santiment.net/graphql",
    requiresAuth: true,
    rateLimit: "Varies by tier",
    metrics: ["social_volume", "dev_activity", "network_growth", "token_age"],
  },
  {
    id: "cryptometer",
    name: "Cryptometer",
    category: "social",
    description: "Real-time crypto market sentiment",
    baseUrl: "https://cryptometer.io/api/v1",
    requiresAuth: true,
    rateLimit: "Varies by tier",
    metrics: ["sentiment_score", "trending_coins", "social_signals"],
  },

  // News APIs
  {
    id: "cryptopanic",
    name: "CryptoPanic",
    category: "news",
    description: "Aggregated crypto news and sentiment",
    baseUrl: "https://cryptopanic.com/api/v1",
    requiresAuth: true,
    rateLimit: "Varies by tier",
    metrics: ["news_feed", "sentiment", "votes", "trending"],
  },
  {
    id: "newsapi",
    name: "NewsAPI",
    category: "news",
    description: "Global news articles and headlines",
    baseUrl: "https://newsapi.org/v2",
    requiresAuth: true,
    rateLimit: "1000 requests/day (free tier)",
    metrics: ["headlines", "articles", "sources"],
  },

  // DeFi APIs
  {
    id: "defillama",
    name: "DefiLlama",
    category: "defi",
    description: "DeFi TVL and protocol analytics",
    baseUrl: "https://api.llama.fi",
    requiresAuth: false,
    rateLimit: "No strict limit",
    metrics: ["tvl", "protocol_data", "chain_tvl", "yields"],
  },
  {
    id: "dexscreener",
    name: "DexScreener",
    category: "defi",
    description: "DEX trading data and analytics",
    baseUrl: "https://api.dexscreener.com/latest",
    requiresAuth: false,
    rateLimit: "300 requests/minute",
    metrics: ["pair_data", "token_profiles", "liquidity", "volume"],
  },
  {
    id: "dextools",
    name: "DexTools",
    category: "defi",
    description: "DEX trading tools and analytics",
    baseUrl: "https://api.dextools.io/v1",
    requiresAuth: true,
    rateLimit: "Varies by tier",
    metrics: ["pair_explorer", "token_info", "pool_info", "hot_pairs"],
  },

  // Technical Analysis APIs
  {
    id: "tradingview",
    name: "TradingView",
    category: "technical",
    description: "Technical indicators and charting",
    baseUrl: "https://scanner.tradingview.com",
    requiresAuth: false,
    rateLimit: "Varies",
    metrics: ["rsi", "macd", "moving_averages", "bollinger_bands", "fibonacci"],
  },
  {
    id: "taapi",
    name: "TAAPI",
    category: "technical",
    description: "Technical analysis indicators API",
    baseUrl: "https://api.taapi.io",
    requiresAuth: true,
    rateLimit: "Varies by tier",
    metrics: ["rsi", "macd", "ema", "sma", "stoch", "adx", "cci"],
  },
  {
    id: "cryptocompare",
    name: "CryptoCompare",
    category: "technical",
    description: "Crypto market data and analysis",
    baseUrl: "https://min-api.cryptocompare.com/data",
    requiresAuth: true,
    rateLimit: "Varies by tier",
    metrics: ["price", "historical", "social_stats", "mining_data"],
  },

  // Whale & Large Transaction Tracking
  {
    id: "whale_alert",
    name: "Whale Alert",
    category: "onchain",
    description: "Large cryptocurrency transaction tracking",
    baseUrl: "https://api.whale-alert.io/v1",
    requiresAuth: true,
    rateLimit: "60 calls/minute",
    metrics: ["large_transactions", "exchange_flows", "whale_movements"],
  },

  // Gas & Network Fees
  {
    id: "ethgasstation",
    name: "ETH Gas Station",
    category: "onchain",
    description: "Ethereum gas price predictions",
    baseUrl: "https://ethgasstation.info/api",
    requiresAuth: false,
    rateLimit: "No strict limit",
    metrics: ["gas_price", "wait_time", "gas_used"],
  },
]

export const getEndpointsByCategory = (category: APIEndpoint["category"]) => {
  return API_ENDPOINTS.filter((endpoint) => endpoint.category === category)
}

export const getEndpointById = (id: string) => {
  return API_ENDPOINTS.find((endpoint) => endpoint.id === id)
}

export const getAllCategories = () => {
  return Array.from(new Set(API_ENDPOINTS.map((e) => e.category)))
}
