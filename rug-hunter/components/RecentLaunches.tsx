import React from 'react';
import { RecentLaunch } from '../types';

interface Props {
    data: RecentLaunch[];
}

const RecentLaunches: React.FC<Props> = ({ data }) => {
    return (
        <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/30 backdrop-blur-md border border-purple-800/50 rounded-xl p-6 shadow-2xl shadow-black/20">
            <h2 className="text-xl font-bold text-white mb-4">Top Volume Recent Launches</h2>
            <div className="overflow-x-auto max-h-96">
                <table className="w-full text-left">
                    <thead className="border-b border-purple-700 text-xs text-gray-400 uppercase sticky top-0 bg-purple-900/80 backdrop-blur-sm">
                        <tr>
                            <th className="p-3">Token</th>
                            <th className="p-3 text-right">Volume (24h)</th>
                            <th className="p-3 text-right hidden sm:table-cell">Traders</th>
                            <th className="p-3 text-right">Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(token => (
                            <tr key={token.token_address} className="border-b border-purple-800/50 hover:bg-purple-800/20 transition-colors">
                                <td className="p-3">
                                    <p className="font-bold text-white">{token.symbol}</p>
                                    <p className="text-xs text-gray-400 truncate">{token.name}</p>
                                </td>
                                <td className="p-3 text-right text-white">${(token.total_volume_usd / 1000000).toFixed(2)}M</td>
                                <td className="p-3 text-right text-white hidden sm:table-cell">{(token.unique_traders / 1000).toFixed(1)}k</td>
                                <td className="p-3 text-right text-white">{token.days_since_launch}d</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentLaunches;