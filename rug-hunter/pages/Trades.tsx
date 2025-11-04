import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar, { View } from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import StrategyPerformance from '../components/StrategyPerformance';
import WalletPerformance from '../components/WalletPerformance';
import AITools from '../components/AITools';
import ChatBot from '../components/ChatBot';
import WalletIntelligence from '../components/WalletIntelligence';
import BuyZone from '../components/BuyZone';


const Trades: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>('dashboard');

    const renderContent = () => {
        switch (currentView) {
            case 'dashboard':
                return <Dashboard />;
            case 'performance':
                return <StrategyPerformance />;
            case 'wallets':
                return <WalletPerformance />;
            case 'mmg':
                return <WalletIntelligence />;
            case 'buy-zone':
                return <BuyZone />;
            case 'aitools':
                return <AITools />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="min-h-screen bg-[#100624] text-gray-300">
            <Header />
            <div className="flex">
                <Sidebar currentView={currentView} onSetView={setCurrentView} />
                <main className="flex-1 p-4 md:p-8 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 72px)' }}>
                    {renderContent()}
                </main>
            </div>
            <ChatBot />
        </div>
    );
};

export default Trades;
