import React from 'react';
import useMockData from '../hooks/useMockData';
import { TrackedWallet } from '../types';
import { MMGIcon } from './icons';

const WalletCard: React.FC<{ wallet: TrackedWallet }> = ({ wallet }) => {
    return (
        <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/30 backdrop-blur-md border border-purple-800/50 rounded-xl p-5 space-y-4 shadow-2xl shadow-black/20 hover:border-purple-600/80 transition-all duration-300">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-white text-lg">{wallet.name}</p>
                    <p className="text-xs text-gray-400 truncate">{wallet.address}</p>
                </div>
                <span className="px-2 py-1 text-xs font-bold text-orange-300 bg-orange-900/50 border border-orange-700 rounded">
                    MMG
                </span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                    <p className="text-sm text-gray-400">Total PNL</p>
                    <p className={`font-bold ${wallet.pnl >= 0 ? 'text-teal-400' : 'text-red-400'}`}>
                        ${wallet.pnl.toFixed(2)}
                    </p>
                </div>
                 <div>
                    <p className="text-sm text-gray-400">Win Rate</p>
                    <p className="font-bold text-white">{(wallet.winRate * 100).toFixed(1)}%</p>
                </div>
                 <div>
                    <p className="text-sm text-gray-400">Trades</p>
                    <p className="font-bold text-white">{wallet.trades}</p>
                </div>
            </div>
            <div>
                 <h4 className="text-sm font-semibold text-gray-400 mb-2">Recent Activity</h4>
                 <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                     {wallet.recentActivity.map(tx => (
                        <div key={tx.hash} className="text-xs flex justify-between p-2 bg-black/20 rounded">
                            <span className={`font-bold ${tx.type === 'BUY' ? 'text-teal-400' : 'text-pink-400'}`}>
                                {tx.type} {tx.tokenSymbol}
                            </span>
                             <span className="text-gray-300">${tx.amountUsd.toLocaleString()}</span>
                        </div>
                     ))}
                 </div>
            </div>
        </div>
    );
};

const WalletIntelligence: React.FC = () => {
    const { trackedWallets } = useMockData();

    return (
        <div className="space-y-8">
            <div className="flex items-center space-x-3">
                <MMGIcon className="h-8 w-8 text-teal-400" />
                <div>
                    <h1 className="text-3xl font-bold text-white">MMG Identifier</h1>
                    <p className="text-gray-400">Unsupervised AI model identifying coordinated wallet activity.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {trackedWallets.map(wallet => <WalletCard key={wallet.address} wallet={wallet} />)}
            </div>
        </div>
    );
};

export default WalletIntelligence;