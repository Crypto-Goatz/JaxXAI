import React from 'react';
import useMockData from '../hooks/useMockData';
import { WalletPerformance as WalletPerformanceType } from '../types';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from './icons';

const TrustScoreBar: React.FC<{ score: number }> = ({ score }) => {
    const width = `${score}%`;
    const color = score > 70 ? 'bg-teal-400' : score > 40 ? 'bg-yellow-400' : 'bg-pink-500';
    return (
        <div className="w-full bg-purple-900/50 rounded-full h-2.5">
            <div className={`${color} h-2.5 rounded-full`} style={{ width }}></div>
        </div>
    );
};

const WalletCard: React.FC<{ wallet: WalletPerformanceType }> = ({ wallet }) => {
    const trendIcon = wallet.trendDirection === 'IMPROVING' ? <ArrowUpIcon className="h-5 w-5 text-teal-400" /> :
                      wallet.trendDirection === 'DECLINING' ? <ArrowDownIcon className="h-5 w-5 text-red-400" /> :
                      <MinusIcon className="h-5 w-5 text-gray-400" />;
    
    return (
        <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/30 backdrop-blur-md border border-purple-800/50 rounded-xl p-5 space-y-4 shadow-2xl shadow-black/20 hover:border-purple-600/80 transition-all duration-300">
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-bold text-white text-lg">{wallet.walletName}</p>
                    <p className="text-xs text-gray-400 truncate">{wallet.wallet}</p>
                </div>
                <div className="flex items-center space-x-2">
                    {trendIcon}
                    <span className="text-lg font-bold text-white">{(wallet.winRate * 100).toFixed(0)}%</span>
                </div>
            </div>
            <div>
                <p className="text-sm text-gray-400 mb-1">Trust Score: {wallet.currentTrustScore}</p>
                <TrustScoreBar score={wallet.currentTrustScore} />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                    <p className="text-sm text-gray-400">P/L (SOL)</p>
                    <p className={`font-bold ${wallet.totalProfitLoss >= 0 ? 'text-teal-400' : 'text-red-400'}`}>
                        {wallet.totalProfitLoss.toFixed(2)}
                    </p>
                </div>
                 <div>
                    <p className="text-sm text-gray-400">Followed</p>
                    <p className="font-bold text-white">{wallet.youFollowed}</p>
                </div>
                 <div>
                    <p className="text-sm text-gray-400">Wins</p>
                    <p className="font-bold text-white">{wallet.wins}</p>
                </div>
            </div>
        </div>
    );
};

const WalletPerformance: React.FC = () => {
    const { walletPerformance } = useMockData();

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Hot Wallet Performance</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {walletPerformance.map(wallet => <WalletCard key={wallet.wallet} wallet={wallet} />)}
            </div>
        </div>
    );
};

export default WalletPerformance;