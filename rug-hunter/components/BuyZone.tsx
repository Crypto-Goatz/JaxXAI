import React from 'react';
import useMockData from '../hooks/useMockData';
import { BuyZoneToken, BuyZoneStatus } from '../types';
import { ArrowUpIcon, ArrowDownIcon, CheckCircleIcon, XCircleIcon, BuyZoneIcon } from './icons';

const getStatusStyles = (status: BuyZoneStatus) => {
    switch (status) {
        case 'ACTIVE':
            return 'bg-teal-500/20 text-teal-300 border-teal-500/50';
        case 'ENTERING':
            return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
        case 'EXITING':
            return 'bg-pink-500/20 text-pink-300 border-pink-500/50';
        case 'EXPIRED':
            return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
};

const CriteriaScoreGauge: React.FC<{ score: number }> = ({ score }) => {
    const circumference = 2 * Math.PI * 30; // r = 30
    const strokeDashoffset = circumference - (score / 100) * circumference;
    const color = score > 80 ? '#00f5d4' : score > 60 ? '#ff9f1c' : '#ff6b6b';

    return (
        <div className="relative h-20 w-20">
            <svg className="transform -rotate-90" width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="30" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="8" fill="transparent" />
                <circle
                    cx="40"
                    cy="40"
                    r="30"
                    stroke={color}
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{score}</span>
            </div>
        </div>
    );
};


const BuyZoneCard: React.FC<{ token: BuyZoneToken }> = ({ token }) => {
    const isProfit = token.priceChange >= 0;

    return (
        <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/30 backdrop-blur-md border border-purple-800/50 rounded-xl p-5 space-y-4 shadow-2xl shadow-black/20 hover:border-purple-600/80 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-white">{token.tokenSymbol}</h3>
                    <p className="text-sm text-gray-400">{token.tokenName}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusStyles(token.buyZoneStatus)}`}>
                    {token.buyZoneStatus}
                </span>
            </div>

            <div className="flex items-center justify-between">
                <CriteriaScoreGauge score={token.criteriaScore} />
                <div className="text-right">
                    <p className="text-sm text-gray-400">Price Change</p>
                    <p className={`text-3xl font-bold flex items-center justify-end ${isProfit ? 'text-teal-400' : 'text-red-400'}`}>
                        {isProfit ? <ArrowUpIcon className="h-6 w-6 mr-1" /> : <ArrowDownIcon className="h-6 w-6 mr-1" />}
                        {token.priceChange.toFixed(1)}%
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-xs text-gray-400">Hot Wallets</p>
                    <p className="font-bold text-white">{token.hotWalletsActive.length}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-400">HW Volume</p>
                    <p className="font-bold text-white">${(token.totalHotWalletVolume / 1000).toFixed(1)}k</p>
                </div>
                <div>
                    <p className="text-xs text-gray-400">Token Age</p>
                    <p className="font-bold text-white">{token.tokenAge.toFixed(1)}h</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                    {token.bullishSignals.map((signal, i) => (
                        <div key={i} className="flex items-center text-teal-300">
                            <CheckCircleIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>{signal}</span>
                        </div>
                    ))}
                </div>
                 <div className="space-y-2">
                    {token.bearishSignals.map((signal, i) => (
                        <div key={i} className="flex items-center text-pink-300">
                            <XCircleIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>{signal}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

const BuyZone: React.FC = () => {
    const { buyZoneTokens } = useMockData();

    return (
        <div className="space-y-8">
            <div className="flex items-center space-x-3">
                 <BuyZoneIcon className="h-8 w-8 text-teal-400" />
                <div>
                    <h1 className="text-3xl font-bold text-white">Real-Time Buy Zone</h1>
                    <p className="text-gray-400">Tokens meeting AI-defined criteria for potential entry.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {buyZoneTokens.map(token => <BuyZoneCard key={token.tokenAddress} token={token} />)}
            </div>
        </div>
    );
};

export default BuyZone;
