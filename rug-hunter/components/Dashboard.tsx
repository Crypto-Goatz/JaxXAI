import React from 'react';
import useMockData from '../hooks/useMockData';
import RecentLaunches from './RecentLaunches';
import TopWalletsOnLaunch from './TopWalletsOnLaunch';
import AIPaperTrader from './AIPaperTrader';
import WalletPerformance from './WalletPerformance';

const Dashboard: React.FC = () => {
    const { recentLaunches, hotWalletsOnLaunch } = useMockData();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400">Your AI-powered market overview.</p>
            </div>
            
            <AIPaperTrader />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RecentLaunches data={recentLaunches} />
                <TopWalletsOnLaunch data={hotWalletsOnLaunch} />
            </div>

            <WalletPerformance />
        </div>
    );
};

export default Dashboard;
