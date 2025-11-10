import React, { useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import useMockData from '../hooks/useMockData';
import { StrategyPerformance as StrategyPerformanceType } from '../types';

const StatCard: React.FC<{ title: string; value: string | number; change?: string; }> = ({ title, value, change }) => (
    <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-800/50">
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
        {change && <p className="text-sm text-teal-400">{change}</p>}
    </div>
);

const StrategyPerformance: React.FC = () => {
    const { strategyPerformance, trades } = useMockData();
    const performance = strategyPerformance as StrategyPerformanceType; // Assume we have one for now

    const decisionData = [
        { name: 'Correct YES', value: performance.correctYesDecisions },
        { name: 'Correct NO', value: performance.correctNoDecisions },
        { name: 'Incorrect YES', value: performance.incorrectYesDecisions },
        { name: 'Incorrect NO', value: performance.incorrectNoDecisions },
    ];
    const COLORS = ['#00f5d4', '#00a39e', '#ff6b6b', '#c9184a'];
    
    const profitData = [
      { name: 'Jan', profit: 400 },
      { name: 'Feb', profit: 300 },
      { name: 'Mar', profit: 500 },
      { name: 'Apr', profit: 280 },
      { name: 'May', profit: 450 },
      { name: 'Jun', profit: 600 },
    ];
    
    const histogramData = useMemo(() => {
        const closedTrades = trades.filter(t => t.status === 'CLOSED' && typeof t.profitLossPercent === 'number');
        const bins: { [key: string]: number } = {
            "<-50%": 0,
            "-50% to -25%": 0,
            "-25% to 0%": 0,
            "0% to 25%": 0,
            "25% to 50%": 0,
            ">50%": 0,
        };

        closedTrades.forEach(trade => {
            const pnl = trade.profitLossPercent!;
            if (pnl < -50) bins["<-50%"]++;
            else if (pnl < -25) bins["-50% to -25%"]++;
            else if (pnl < 0) bins["-25% to 0%"]++;
            else if (pnl < 25) bins["0% to 25%"]++;
            else if (pnl < 50) bins["25% to 50%"]++;
            else bins[">50%"]++;
        });

        return Object.entries(bins).map(([name, count]) => ({ name, count }));
    }, [trades]);


    if (!performance) {
        return <div>Loading performance data...</div>;
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Strategy Performance</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard title="Overall Win Rate" value={`${(performance.winRate * 100).toFixed(1)}%`} />
                <StatCard title="Total P/L (SOL)" value={performance.totalProfitLoss.toFixed(2)} />
                <StatCard title="4Ever Learning Pts" value={performance.totalPoints} />
                <StatCard title="Current Streak" value={`${performance.streak} Wins`} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/30 backdrop-blur-md border border-purple-800/50 rounded-xl p-6 h-96 shadow-2xl shadow-black/20">
                    <h3 className="text-xl font-bold text-white mb-4">P/L Over Time</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={profitData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 90, 213, 0.3)" />
                            <XAxis dataKey="name" stroke="#a78bfa" />
                            <YAxis stroke="#a78bfa" />
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(26, 16, 60, 0.8)', border: '1px solid #4c1d95', backdropFilter: 'blur(4px)' }}/>
                            <Legend />
                            <Line type="monotone" dataKey="profit" stroke="#00f5d4" strokeWidth={2} activeDot={{ r: 8, fill: '#00f5d4' }} dot={{ stroke: '#00f5d4', strokeWidth: 1, r: 4, fill: '#100624' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/30 backdrop-blur-md border border-purple-800/50 rounded-xl p-6 h-96 shadow-2xl shadow-black/20">
                    <h3 className="text-xl font-bold text-white mb-4">Decision Quality</h3>
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={decisionData} cx="50%" cy="50%" labelLine={false} outerRadius={120} fill="#8884d8" dataKey="value" nameKey="name" >
                                {decisionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(26, 16, 60, 0.8)', border: '1px solid #4c1d95', backdropFilter: 'blur(4px)' }}/>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/30 backdrop-blur-md border border-purple-800/50 rounded-xl p-6 h-96 shadow-2xl shadow-black/20">
                <h3 className="text-xl font-bold text-white mb-4">P/L % Distribution of Closed Trades</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={histogramData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 90, 213, 0.3)" />
                        <XAxis dataKey="name" stroke="#a78bfa" tick={{ fontSize: 12 }} />
                        <YAxis stroke="#a78bfa" allowDecimals={false} />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(26, 16, 60, 0.8)', border: '1px solid #4c1d95', backdropFilter: 'blur(4px)' }} cursor={{ fill: 'rgba(0, 245, 212, 0.1)' }} />
                        <Bar dataKey="count" name="Number of Trades">
                            {histogramData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.name.includes('-') ? '#ff6b6b' : '#00f5d4'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/30 backdrop-blur-md border border-purple-800/50 rounded-xl p-6 shadow-2xl shadow-black/20">
                <h3 className="text-xl font-bold text-white mb-4">Adaptive Rules (AI Suggestions)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-sm text-gray-400">Optimal Confidence</p>
                        <p className="text-2xl font-bold text-[#00f5d4]">&gt; {performance.optimalConfidenceThreshold}</p>
                    </div>
                     <div>
                        <p className="text-sm text-gray-400">Optimal Token Age (H)</p>
                        <p className="text-2xl font-bold text-[#00f5d4]">{performance.optimalTokenAge.toFixed(1)}</p>
                    </div>
                     <div>
                        <p className="text-sm text-gray-400">Optimal Cluster Size</p>
                        <p className="text-2xl font-bold text-[#00f5d4]">{performance.optimalClusterSize}</p>
                    </div>
                     <div>
                        <p className="text-sm text-gray-400">Optimal Hold Time (M)</p>
                        <p className="text-2xl font-bold text-[#00f5d4]">{performance.optimalHoldTime}</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default StrategyPerformance;