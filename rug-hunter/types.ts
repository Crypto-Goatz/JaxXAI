export interface Trade {
  tradeId: string;
  tokenSymbol: string;
  tokenName: string;
  entryDecision: 'YES' | 'NO';
  confidenceScore: number;
  status: 'OPEN' | 'CLOSED';
  actualOutcome?: 'WIN' | 'LOSS';
  profitLossPercent?: number;
  pointsEarned?: number;
}

export interface StrategyPerformance {
  winRate: number;
  totalProfitLoss: number;
  totalPoints: number;
  streak: number;
  correctYesDecisions: number;
  correctNoDecisions: number;
  incorrectYesDecisions: number;
  incorrectNoDecisions: number;
  optimalConfidenceThreshold: number;
  optimalTokenAge: number;
  optimalClusterSize: number;
  optimalHoldTime: number;
}

export interface WalletPerformance {
  wallet: string;
  walletName: string;
  trendDirection: 'IMPROVING' | 'DECLINING' | 'STABLE';
  winRate: number;
  currentTrustScore: number;
  totalProfitLoss: number;
  youFollowed: number;
  wins: number;
}

export interface RecentLaunch {
    token_address: string;
    symbol: string;
    name: string;
    total_volume_usd: number;
    unique_traders: number;
    days_since_launch: number;
}

export interface HotWalletOnLaunch {
    walletAddress: string;
    walletTier: number;
    tokenSymbol: string;
    investmentUSD: number;
    ageAtInvestmentHours: number;
}

export interface TrackedWallet {
    address: string;
    name: string;
    pnl: number;
    winRate: number;
    trades: number;
    topTokens: { symbol: string; pnl: number }[];
    recentActivity: {
        hash: string;
        timestamp: string;
        tokenSymbol: string;
        type: 'BUY' | 'SELL';
        amountUsd: number;
        pnlUsd?: number;
    }[];
}

export type BuyZoneStatus = 'ACTIVE' | 'ENTERING' | 'EXITING' | 'EXPIRED';

export interface BuyZoneToken {
    tokenAddress: string;
    tokenSymbol: string;
    tokenName: string;
    hotWalletsActive: string[];
    totalHotWalletVolume: number;
    currentPrice: number;
    priceChange: number;
    liquidityUSD: number;
    meetsCriteria: boolean;
    criteriaScore: number;
    tokenAge: number;
    buyZoneStatus: BuyZoneStatus;
    bullishSignals: string[];
    bearishSignals: string[];
    lastUpdated: Date;
}

export interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
}

export interface PaperTrade {
    id: string;
    tokenSymbol: string;
    entryPrice: number;
    currentPrice: number;
    pnlPercent: number;
    age: number; // in minutes
    entryTime: number; // timestamp
}
