
import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Trade, StrategyPerformance, WalletPerformance, RecentLaunch, HotWalletOnLaunch, TrackedWallet, BuyZoneToken } from '../types';

const generateMockTrades = (count: number): Trade[] => {
  const trades: Trade[] = [];
  const tokens = [
      { symbol: 'SOL', name: 'Solana' },
      { symbol: 'JUP', name: 'Jupiter' },
      { symbol: 'WEN', name: 'Wen' },
      { symbol: 'PYTH', name: 'Pyth Network' }
  ];
  for (let i = 0; i < count; i++) {
    const isWin = Math.random() > 0.4;
    const isClosed = Math.random() > 0.1;
    const token = tokens[Math.floor(Math.random() * tokens.length)];
    trades.push({
      tradeId: uuidv4(),
      tokenSymbol: token.symbol,
      tokenName: token.name,
      entryDecision: Math.random() > 0.5 ? 'YES' : 'NO',
      confidenceScore: Math.floor(Math.random() * 40) + 60,
      status: isClosed ? 'CLOSED' : 'OPEN',
      actualOutcome: isClosed ? (isWin ? 'WIN' : 'LOSS') : undefined,
      profitLossPercent: isClosed ? (isWin ? Math.random() * 100 : -Math.random() * 50) : undefined,
      pointsEarned: isClosed ? (isWin ? Math.floor(Math.random() * 100) : 0) : undefined,
    });
  }
  return trades;
};

const mockStrategyPerformance: StrategyPerformance = {
  winRate: 0.68,
  totalProfitLoss: 12450.75,
  totalPoints: 1337,
  streak: 4,
  correctYesDecisions: 120,
  correctNoDecisions: 85,
  incorrectYesDecisions: 45,
  incorrectNoDecisions: 30,
  optimalConfidenceThreshold: 75,
  optimalTokenAge: 2.5,
  optimalClusterSize: 5,
  optimalHoldTime: 45,
};

const generateMockWalletPerformance = (count: number): WalletPerformance[] => {
    const wallets: WalletPerformance[] = [];
    const names = ['Alpha Predator', 'Sol Sniper', 'Diamond Hands', 'Rug Pull Ric', 'Ape Lord', 'Chad Trader'];
    for (let i = 0; i < count; i++) {
        wallets.push({
            wallet: `WALLET_${i.toString().padStart(4, '0')}`,
            walletName: names[i % names.length],
            trendDirection: ['IMPROVING', 'DECLINING', 'STABLE'][Math.floor(Math.random() * 3)] as any,
            winRate: Math.random() * 0.5 + 0.4, // 40-90%
            currentTrustScore: Math.floor(Math.random() * 60) + 40, // 40-100
            totalProfitLoss: (Math.random() - 0.3) * 100, // can be negative
            youFollowed: Math.floor(Math.random() * 50),
            wins: Math.floor(Math.random() * 100) + 20,
        });
    }
    return wallets.sort((a,b) => b.currentTrustScore - a.currentTrustScore);
}

const generateMockRecentLaunches = (count: number): RecentLaunch[] => {
    const launches: RecentLaunch[] = [];
    const symbols = ['GME', 'AMC', 'BB', 'NOK', 'DOGE', 'SHIB', 'PEPE'];
    for (let i = 0; i < count; i++) {
        launches.push({
            token_address: `TOKEN_ADDR_${i}`,
            symbol: symbols[i % symbols.length] + `_${i}`,
            name: `${symbols[i % symbols.length]} Token`,
            total_volume_usd: Math.random() * 5000000 + 1000000,
            unique_traders: Math.floor(Math.random() * 10000) + 1000,
            days_since_launch: Math.floor(Math.random() * 30) + 1,
        });
    }
    return launches.sort((a, b) => b.total_volume_usd - a.total_volume_usd);
}

const generateMockHotWalletsOnLaunch = (count: number): HotWalletOnLaunch[] => {
    const wallets: HotWalletOnLaunch[] = [];
    for(let i=0; i<count; i++) {
        wallets.push({
            walletAddress: `0x...${Math.random().toString(16).substr(2, 4)}`,
            walletTier: Math.floor(Math.random() * 3) + 1,
            tokenSymbol: ['MOG', 'PONKE', 'TRUMP', 'BODEN'][Math.floor(Math.random() * 4)],
            investmentUSD: Math.random() * 20000 + 5000,
            ageAtInvestmentHours: Math.random() * 3,
        });
    }
    return wallets.sort((a, b) => b.investmentUSD - a.investmentUSD);
}


const generateMockTrackedWallets = (count: number): TrackedWallet[] => {
    const wallets: TrackedWallet[] = [];
    const names = ['The Ruggit Rabbits', 'The Solana Surfers', 'The Pump Pandas', 'The Diamond Doges Syndicate'];
    for (let i = 0; i < count; i++) {
        wallets.push({
            address: `0x...${Math.random().toString(16).substr(2, 4)}`,
            name: names[i % names.length],
            pnl: (Math.random() - 0.2) * 50000,
            winRate: Math.random() * 0.4 + 0.5,
            trades: Math.floor(Math.random() * 100) + 10,
            topTokens: [
                { symbol: 'WIF', pnl: Math.random() * 10000 },
                { symbol: 'BONK', pnl: Math.random() * 5000 },
            ],
            recentActivity: [
                { hash: '0xabc...', timestamp: new Date().toISOString(), tokenSymbol: 'WIF', type: 'BUY', amountUsd: 1500 },
                { hash: '0xdef...', timestamp: new Date().toISOString(), tokenSymbol: 'BONK', type: 'SELL', amountUsd: 2500, pnlUsd: 1000 },
            ]
        });
    }
    return wallets;
};

const generateMockBuyZoneTokens = (count: number): BuyZoneToken[] => {
    const tokens: BuyZoneToken[] = [];
    const symbols = ['CAT', 'BEER', 'MANEKI', 'PONKE', 'POPCAT', 'WIF', 'BONK'];
    const statuses: any[] = ['ACTIVE', 'ENTERING', 'EXITING'];
    for (let i = 0; i < count; i++) {
        const score = Math.floor(Math.random() * 40) + 60; // 60-100
        tokens.push({
            tokenAddress: `BUY_ZONE_${i}`,
            tokenSymbol: symbols[i % symbols.length],
            tokenName: `${symbols[i % symbols.length]} Cat`,
            hotWalletsActive: ['0xabc...', '0xdef...', '0x123...'],
            totalHotWalletVolume: Math.random() * 5000 + 500,
            currentPrice: Math.random() * 0.01,
            priceChange: (Math.random() - 0.2) * 50,
            liquidityUSD: Math.random() * 50000 + 10000,
            meetsCriteria: score > 60,
            criteriaScore: score,
            tokenAge: Math.random() * 5 + 1,
            buyZoneStatus: statuses[i % statuses.length],
            bullishSignals: [
                `${Math.floor(Math.random() * 5) + 2} hot wallets active`,
                `Strong net flow: +$${(Math.random() * 5000).toFixed(0)}`,
                `Very early (${(Math.random() * 2).toFixed(1)}h old)`,
            ],
            bearishSignals: [
                `Low liquidity: $${(Math.random() * 5000 + 5000).toFixed(0)}`,
            ],
            lastUpdated: new Date(),
        });
    }
    const sortedTokens = tokens.sort((a, b) => b.criteriaScore - a.criteriaScore);
    if (sortedTokens.length > 0) {
        sortedTokens[0].bullishSignals.push("Price >5% in last hour");
    }
    return sortedTokens;
};


const useMockData = () => {
  const data = useMemo(() => ({
    trades: generateMockTrades(50),
    strategyPerformance: mockStrategyPerformance,
    walletPerformance: generateMockWalletPerformance(6),
    recentLaunches: generateMockRecentLaunches(20),
    hotWalletsOnLaunch: generateMockHotWalletsOnLaunch(20),
    trackedWallets: generateMockTrackedWallets(4),
    buyZoneTokens: generateMockBuyZoneTokens(10),
  }), []);

  return data;
};

export default useMockData;
