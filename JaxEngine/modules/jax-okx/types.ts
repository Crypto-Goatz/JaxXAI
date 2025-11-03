
export interface User {
  uid: string;
  email: string | null;
}

export interface Subscription {
    status: 'trialing' | 'active' | 'canceled';
    trialEnd: Date | null;
}

export interface Trade {
  id: string;
  coin: string;
  entryPrice: number;
  exitPrice: number | null;
  pnl: number | null;
  strategy: string;
  status: 'open' | 'closed';
  timestamp: Date;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
}

export interface BacktestResult {
  id: string;
  strategyId: string;
  period: string;
  pnl: number;
  winRate: number;
  totalTrades: number;
  timestamp: Date;
}
