import React from 'react';
import { HotWalletOnLaunch } from '../types';

interface Props {
    data: HotWalletOnLaunch[];
}

const TopWalletsOnLaunch: React.FC<Props> = ({ data }) => {
    return (
        <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/30 backdrop-blur-md border border-purple-800/50 rounded-xl p-6 shadow-2xl shadow-black/20">
            <h2 className="text-xl font-bold text-white mb-4">Hot Wallets on New Launches</h2>
            <div className="overflow-x-auto max-h-96">
                <table className="w-full text-left">
                    <thead className="border-b border-purple-700 text-xs text-gray-400 uppercase sticky top-0 bg-purple-900/80 backdrop-blur-sm">
                        <tr>
                            <th className="p-3">Wallet</th>
                            <th className="p-3">Token</th>
                            <th className="p-3 text-right">Investment</th>
                            <th className="p-3 text-right hidden sm:table-cell">Token Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((bet, index) => (
                            <tr key={index} className="border-b border-purple-800/50 hover:bg-purple-800/20 transition-colors">
                                <td className="p-3">
                                    <p className="font-bold text-white truncate">{bet.walletAddress}</p>
                                    <p className="text-xs text-gray-400">Tier {bet.walletTier}</p>
                                </td>
                                <td className="p-3 font-bold text-white">{bet.tokenSymbol}</td>
                                <td className="p-3 text-right text-teal-400">${(bet.investmentUSD / 1000).toFixed(1)}k</td>
                                <td className="p-3 text-right text-white hidden sm:table-cell">{bet.ageAtInvestmentHours}h</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopWalletsOnLaunch;