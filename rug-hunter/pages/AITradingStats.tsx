import React from 'react';
import StrategyPerformance from '../components/StrategyPerformance';
import WalletPerformance from '../components/WalletPerformance';

const AITradingStats: React.FC = () => {
    return (
        <div className="space-y-8">
            <StrategyPerformance />
            <WalletPerformance />
        </div>
    );
};

export default AITradingStats;
