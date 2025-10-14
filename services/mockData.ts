
import type { StageData } from '../types';

export const mockStages: StageData[] = [
  {
    title: 'STAGE 1: PRE-PUMP SCAN',
    assets: [
      { id: 'ada', ticker: 'ADA/USD', price: 0.45, change24h: 1.2, metrics: { RSI: 61, NSI: 83, VOL: 120 } },
      { id: 'link', ticker: 'LINK/USD', price: 18.75, change24h: 2.5, metrics: { RSI: 65, NSI: 78, VOL: 95 } },
      { id: 'sol', ticker: 'SOL/USD', price: 172.10, change24h: 0.8, metrics: { RSI: 58, NSI: 88, VOL: 150 } },
    ],
  },
  {
    title: 'STAGE 2: PUMP WATCH',
    assets: [
      { id: 'doge', ticker: 'DOGE/USD', price: 0.16, change24h: 4.1, metrics: { Momentum: 76, Whales: 68 } },
      { id: 'matic', ticker: 'MATIC/USD', price: 0.73, change24h: 3.2, metrics: { Momentum: 81, Whales: 72 } },
    ],
  },
  {
    title: 'STAGE 3: SPOT LAYER',
    assets: [
      { id: 'eth', ticker: 'ETH/USD', price: 3805.50, change24h: 1.5, metrics: { 'Support': 3750, 'Resistance': 3900 } },
      { id: 'xrp', ticker: 'XRP/USD', price: 0.52, change24h: 0.5, metrics: { 'Support': 0.50, 'Resistance': 0.55 } },
      { id: 'avax', ticker: 'AVAX/USD', price: 37.80, change24h: 2.8, metrics: { 'Support': 35, 'Resistance': 40 } },
      { id: 'dot', ticker: 'DOT/USD', price: 7.20, change24h: 1.9, metrics: { 'Support': 6.8, 'Resistance': 7.5 } },
    ],
  },
  {
    title: 'STAGE 4: BUY ZONE',
    assets: [
      {
        id: 'btc',
        ticker: 'BTC/USD',
        price: 69420.69,
        change24h: 3.7,
        metrics: { RSI: 72, MACD: 0.8 },
        predictionConfidence: 92,
        profitTargets: [72000, 75000],
        chartData: [
          { name: 'T-4', value: 68100 },
          { name: 'T-3', value: 68500 },
          { name: 'T-2', value: 68300 },
          { name: 'T-1', value: 69000 },
          { name: 'Now', value: 69420 },
        ],
      },
       {
        id: 'rndr',
        ticker: 'RNDR/USD',
        price: 10.55,
        change24h: 8.9,
        metrics: { RSI: 78, MACD: 1.2 },
        predictionConfidence: 88,
        profitTargets: [11.50, 12.75],
        chartData: [
          { name: 'T-4', value: 9.80 },
          { name: 'T-3', value: 10.10 },
          { name: 'T-2', value: 10.05 },
          { name: 'T-1', value: 10.40 },
          { name: 'Now', value: 10.55 },
        ],
      },
    ],
  },
  {
    title: 'STAGE 5: PROFIT TAKING',
    assets: [
      { id: 'shib', ticker: 'SHIB/USD', price: 0.000025, change24h: 15.6, metrics: { 'Profit': 25.8, 'Stop Loss': 0.000022 } },
    ],
  },
];
