import React from 'react';
import { HomeIcon, ChartBarIcon, WalletIcon, SparklesIcon, MMGIcon, BuyZoneIcon } from './icons';

export type View = 'dashboard' | 'performance' | 'wallets' | 'mmg' | 'buy-zone' | 'aitools';

interface SidebarProps {
    currentView: View;
    onSetView: (view: View) => void;
}

const NavItem: React.FC<{
    icon: React.ElementType;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive ? 'bg-purple-800 text-white shadow-lg' : 'text-gray-400 hover:bg-purple-900/50 hover:text-white'
        }`}
    >
        <Icon className="h-6 w-6" />
        <span className="font-semibold">{label}</span>
    </button>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, onSetView }) => {
    return (
        <aside className="w-64 bg-[#100624]/30 p-4 border-r border-purple-900/50 hidden md:block">
            <nav className="space-y-2">
                <NavItem icon={HomeIcon} label="Dashboard" isActive={currentView === 'dashboard'} onClick={() => onSetView('dashboard')} />
                <NavItem icon={ChartBarIcon} label="My Performance" isActive={currentView === 'performance'} onClick={() => onSetView('performance')} />
                <NavItem icon={WalletIcon} label="Hot Wallets" isActive={currentView === 'wallets'} onClick={() => onSetView('wallets')} />
                <NavItem icon={MMGIcon} label="MMG Identifier" isActive={currentView === 'mmg'} onClick={() => onSetView('mmg')} />
                <NavItem icon={BuyZoneIcon} label="Buy Zone" isActive={currentView === 'buy-zone'} onClick={() => onSetView('buy-zone')} />
                <NavItem icon={SparklesIcon} label="AI Toolkit" isActive={currentView === 'aitools'} onClick={() => onSetView('aitools')} />
            </nav>
        </aside>
    );
};

export default Sidebar;
