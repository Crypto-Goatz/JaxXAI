import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PaperTrade, StrategyPerformance } from '../types';

const TOKENS = ['SOL', 'JUP', 'WEN', 'PYTH', 'GME', 'BONK'];

const usePaperTrader = (strategy: StrategyPerformance) => {
    const [liveTrades, setLiveTrades] = useState<PaperTrade[]>([]);
    const [stats, setStats] = useState({
        totalProfitLoss: 0,
        winRate: 0,
        totalTrades: 0,
        wins: 0,
        losses: 0,
    });

    const closeTrade = useCallback((trade: PaperTrade, isWin: boolean) => {
        setLiveTrades(prev => prev.filter(t => t.id !== trade.id));
        setStats(prev => {
            const newTotalTrades = prev.totalTrades + 1;
            const newWins = prev.wins + (isWin ? 1 : 0);
            const newLosses = prev.losses + (isWin ? 0 : 1);
            return {
                totalProfitLoss: prev.totalProfitLoss + (trade.currentPrice - trade.entryPrice),
                totalTrades: newTotalTrades,
                wins: newWins,
                losses: newLosses,
                winRate: newWins / newTotalTrades,
            };
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            // Update existing trades
            setLiveTrades(prevTrades => 
                prevTrades.map(trade => {
                    const priceChange = (Math.random() - 0.49) * 0.05; // -2.5% to +2.5% change
                    const currentPrice = trade.currentPrice * (1 + priceChange);
                    const pnlPercent = ((currentPrice - trade.entryPrice) / trade.entryPrice) * 100;
                    const age = (Date.now() - trade.entryTime) / (1000 * 60); // age in minutes
                    
                    // Auto-close logic
                    if (pnlPercent > 15 || pnlPercent < -7.5 || age > strategy.optimalHoldTime) {
                        closeTrade(trade, pnlPercent > 0);
                        return null; // will be filtered out
                    }

                    return { ...trade, currentPrice, pnlPercent, age };
                }).filter((t): t is PaperTrade => t !== null)
            );

            // Potentially open a new trade
            if (Math.random() < 0.1) { // 10% chance to open a trade each tick
                const shouldOpen = Math.random() < strategy.winRate && liveTrades.length < 10;
                if (shouldOpen) {
                    const tokenSymbol = TOKENS[Math.floor(Math.random() * TOKENS.length)];
                    const entryPrice = Math.random() * 100;
                    const newTrade: PaperTrade = {
                        id: uuidv4(),
                        tokenSymbol,
                        entryPrice,
                        currentPrice: entryPrice,
                        pnlPercent: 0,
                        age: 0,
                        entryTime: Date.now(),
                    };
                    setLiveTrades(prev => [...prev, newTrade]);
                }
            }

        }, 2000); // Update every 2 seconds

        return () => clearInterval(interval);
    }, [strategy, liveTrades.length, closeTrade]);

    return { liveTrades, stats };
};

export default usePaperTrader;
