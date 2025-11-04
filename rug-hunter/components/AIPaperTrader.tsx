import React from 'react';
import useMockData from '../hooks/useMockData';
import usePaperTrader from '../hooks/usePaperTrader';
import { PaperTrade } from '../types';
import { RobotIcon } from './icons';

const StatCard: React.FC<{ title: string; value: string | number; }> = ({ title, value }) => (
    <div className="bg-purple-900/30 p-3 rounded-lg text-center border border-purple-800/50">
        <p className="text-xs text-gray-400 uppercase">{title}</p>
        <p className="text-xl font-bold text-white">{value}</p>
    </div>
);

const PaperTradeRow: React.FC<{ trade: PaperTrade }> = ({ trade }) => {
    const isProfit = trade.pnlPercent >= 0;
    const pnlColor = isProfit ? 'text-teal-400' : 'text-red-400';

    return (
        <tr className="border-b border-purple-800/50">
            <td className="p-3">
                <p className="font-bold text-white">{trade.tokenSymbol}</p>
            </td>
            <td className="p-3 text-right hidden sm:table-cell">{trade.entryPrice.toFixed(4)}</td>
            <td className="p-3 text-right">{trade.currentPrice.toFixed(4)}</td>
            <td className={`p-3 text-right font-bold ${pnlColor}`}>
                {isProfit ? '+' : ''}{trade.pnlPercent.toFixed(2)}%
            </td>
            <td className="p-3 text-right hidden md:table-cell">{trade.age.toFixed(0)}m</td>
        </tr>
    );
};

const AIPaperTrader: React.FC = () => {
    const { strategyPerformance } = useMockData();
    const { liveTrades, stats } = usePaperTrader(strategyPerformance);

    return (
        <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/30 backdrop-blur-md border border-purple-800/50 rounded-xl p-6 shadow-2xl shadow-black/20">
            <div className="flex items-center space-x-3 mb-4">
                <RobotIcon className="h-7 w-7 text-teal-400" />
                <h2 className="text-2xl font-bold text-white">AI Paper Trading Order Book</h2>
                <span className="px-3 py-1 text-sm font-bold text-black bg-teal-400 rounded-full animate-pulse">24/7 LIVE</span>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">All-Time AI Strategy Stats</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <StatCard title="P/L (USD Sim)" value={`$${stats.totalProfitLoss.toFixed(2)}`} />
                    <StatCard title="Win Rate" value={`${(stats.winRate * 100).toFixed(1)}%`} />
                    <StatCard title="Total Trades" value={stats.totalTrades} />
                    <StatCard title="Wins" value={stats.wins} />
                    <StatCard title="Losses" value={stats.losses} />
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Live Paper Trades</h3>
                 <div className="overflow-x-auto max-h-96">
                    <table className="w-full text-left">
                        <thead className="border-b border-purple-700 text-xs text-gray-400 uppercase sticky top-0 bg-purple-900/80 backdrop-blur-sm">
                            <tr>
                                <th className="p-3">Token</th>
                                <th className="p-3 text-right hidden sm:table-cell">Entry Price</th>
                                <th className="p-3 text-right">Current Price</th>
                                <th className="p-3 text-right">P/L %</th>
                                <th className="p-3 text-right hidden md:table-cell">Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {liveTrades.length > 0 ? (
                                liveTrades.map(trade => <PaperTradeRow key={trade.id} trade={trade} />)
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-8 text-gray-500">
                                        AI is waiting for a high-confidence opportunity...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AIPaperTrader;