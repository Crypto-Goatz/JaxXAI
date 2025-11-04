import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import TrialClock from '../TrialClock';
import { Strategy, Trade, BacktestResult } from '../../types';
import { GoogleGenAI } from '@google/genai';
import ChatBot from '../ChatBot';

// Mock Data
const mockStrategies: Strategy[] = [
  { id: 'WHALE_FOLLOWER_V1', name: 'Whale Follower v1', description: "Follows a curated list of 'smart money' wallets and buys when they add liquidity to new memecoins." },
  { id: 'PUMP_FUN_SNIPER_V1', name: 'Pump.fun Sniper v1', description: "Scans for new coins on pump.fun with high initial liquidity and volume." },
];

const mockTrades: Trade[] = [
  { id: '1', coin: 'WIF', entryPrice: 0.8, exitPrice: 2.5, pnl: 1700, strategy: 'WHALE_FOLLOWER_V1', status: 'closed', timestamp: new Date(Date.now() - 86400000 * 2) },
  { id: '2', coin: 'PEPE', entryPrice: 0.000006, exitPrice: 0.000009, pnl: 500, strategy: 'WHALE_FOLLOWER_V1', status: 'closed', timestamp: new Date(Date.now() - 86400000) },
  { id: '3', coin: 'BONK', entryPrice: 0.00002, exitPrice: null, pnl: null, strategy: 'PUMP_FUN_SNIPER_V1', status: 'open', timestamp: new Date() },
];

const mockBacktestResults: BacktestResult[] = [
    { id: 'bt1', strategyId: 'WHALE_FOLLOWER_V1', period: 'Last 30 Days', pnl: 12500, winRate: 0.72, totalTrades: 45, timestamp: new Date() },
    { id: 'bt2', strategyId: 'PUMP_FUN_SNIPER_V1', period: 'Last 30 Days', pnl: 8900, winRate: 0.65, totalTrades: 88, timestamp: new Date() }
];

const TABS = ['Bot Control', 'Trade History', 'Backtest Results', 'Settings & API'];

const Dashboard: React.FC = () => {
  const { subscription } = useAuth();
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const isTrialing = subscription?.status === 'trialing' && subscription.trialEnd;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {isTrialing && <TrialClock trialEnd={subscription.trialEnd!} />}
      
      <div className="border-b border-slate-700 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div>
        {activeTab === 'Bot Control' && <BotControlTab />}
        {activeTab === 'Trade History' && <TradeHistoryTab />}
        {activeTab === 'Backtest Results' && <BacktestResultsTab />}
        {activeTab === 'Settings & API' && <SettingsTab />}
      </div>

       {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-4 right-4 sm:right-6 lg:right-8 bg-purple-600 text-white rounded-full p-4 shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-purple-500 z-50 transition-transform hover:scale-110"
        aria-label="Toggle Chatbot"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
      
      {/* Chatbot Window */}
      {isChatOpen && <ChatBot onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};


const BotControlTab: React.FC = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [strategy, setStrategy] = useState(mockStrategies[0].id);
    const [log, setLog] = useState<string[]>(['[INFO] Bot initialized. Waiting for instructions.']);
    const [analysis, setAnalysis] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    useEffect(() => {
        let interval: number;
        if (isRunning) {
            interval = window.setInterval(() => {
                const messages = [
                    '[SCAN] Scanning pump.fun for new liquidity pools...',
                    '[TRACK] Wallet 0xABC... just bought $NEWCOIN',
                    '[SIGNAL] Signal received for $NEWCOIN. Checking OKX listing...',
                    '[EXECUTE] BUY order for $NEWCOIN placed successfully.',
                    '[MONITOR] Setting 15% trailing stop loss for $NEWCOIN.',
                    '[INFO] Market conditions stable.'
                ];
                const newMessage = `[${new Date().toLocaleTimeString()}] ${messages[Math.floor(Math.random() * messages.length)]}`;
                setLog(prevLog => [newMessage, ...prevLog.slice(0, 99)]);
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);
    
    const getAnalysis = async () => {
        if (!process.env.API_KEY) {
            setAnalysis("API Key not configured. Gemini analysis is unavailable.");
            return;
        }
        setIsAnalyzing(true);
        setAnalysis('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `You are a crypto trading analyst. Based on the following recent log of a trading bot, provide a brief, one-paragraph summary of the bot's activity and current market sentiment. Be concise and professional. Log:\n\n${log.slice(0, 10).join('\n')}`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            setAnalysis(response.text);
        } catch(e) {
            console.error(e);
            setAnalysis('An error occurred while fetching analysis from Gemini.');
        } finally {
            setIsAnalyzing(false);
        }
    };


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
                 <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Bot Status</h3>
                    <div className="flex items-center justify-between">
                        <span className={`font-bold text-xl ${isRunning ? 'text-lime-400' : 'text-red-500'}`}>
                            {isRunning ? 'RUNNING' : 'STOPPED'}
                        </span>
                        <div onClick={() => setIsRunning(!isRunning)} className={`relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer transition-colors ${isRunning ? 'bg-purple-600' : 'bg-slate-600'}`}>
                            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isRunning ? 'translate-x-6' : 'translate-x-1'}`}/>
                        </div>
                    </div>
                </div>
                 <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Strategy</h3>
                    <select value={strategy} onChange={e => setStrategy(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                        {mockStrategies.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                </div>
                 <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Live P&L</h3>
                    <p className="text-3xl font-bold text-lime-400">+$345.67</p>
                    <p className="text-sm text-gray-400">From 1 open position</p>
                </div>
            </div>
            <div className="lg:col-span-2 bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Live Log</h3>
                <div className="bg-slate-900 h-96 rounded-md p-4 overflow-y-auto flex flex-col-reverse">
                    <div>
                        {log.map((line, i) => <p key={i} className="text-xs text-gray-300 mb-1">{line}</p>)}
                    </div>
                </div>
                 <div className="mt-4">
                    <button onClick={getAnalysis} disabled={isAnalyzing} className="px-4 py-2 bg-purple-600 text-sm font-medium text-white rounded-md hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed">
                        {isAnalyzing ? 'Analyzing...' : 'Get AI Analysis'}
                    </button>
                    {analysis && (
                        <div className="mt-4 p-4 bg-slate-900 rounded-md border border-slate-700">
                            <h4 className="font-bold text-purple-400">Gemini Analysis:</h4>
                            <p className="text-sm text-gray-300 mt-2">{analysis}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const TradeHistoryTab: React.FC = () => {
    return (
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 overflow-x-auto">
            <table className="w-full min-w-max text-left">
                <thead>
                    <tr className="border-b border-slate-600">
                        <th className="p-4 text-sm font-semibold text-gray-300">Coin</th>
                        <th className="p-4 text-sm font-semibold text-gray-300">Entry Price</th>
                        <th className="p-4 text-sm font-semibold text-gray-300">Exit Price</th>
                        <th className="p-4 text-sm font-semibold text-gray-300">P&L ($)</th>
                        <th className="p-4 text-sm font-semibold text-gray-300">Status</th>
                        <th className="p-4 text-sm font-semibold text-gray-300">Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {mockTrades.map(trade => (
                        <tr key={trade.id} className="border-b border-slate-700 hover:bg-slate-800">
                            <td className="p-4 font-bold text-white">{trade.coin}</td>
                            <td className="p-4 text-gray-300">{trade.entryPrice.toLocaleString()}</td>
                            <td className="p-4 text-gray-300">{trade.exitPrice?.toLocaleString() ?? 'N/A'}</td>
                            <td className={`p-4 font-semibold ${trade.pnl === null ? 'text-gray-400' : trade.pnl > 0 ? 'text-lime-400' : 'text-red-500'}`}>
                                {trade.pnl?.toLocaleString() ?? 'N/A'}
                            </td>
                            <td className="p-4">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${trade.status === 'open' ? 'bg-blue-500/20 text-blue-300' : 'bg-gray-500/20 text-gray-300'}`}>
                                    {trade.status}
                                </span>
                            </td>
                            <td className="p-4 text-gray-400 text-sm">{trade.timestamp.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const BacktestResultsTab: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockBacktestResults.map(result => (
                <div key={result.id} className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                    <h3 className="text-xl font-bold text-purple-400">{result.strategyId}</h3>
                    <p className="text-sm text-gray-400 mb-4">{result.period}</p>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-sm text-gray-400">Total P&L</p>
                            <p className="text-2xl font-semibold text-lime-400">${result.pnl.toLocaleString()}</p>
                        </div>
                         <div>
                            <p className="text-sm text-gray-400">Win Rate</p>
                            <p className="text-2xl font-semibold text-white">{(result.winRate * 100).toFixed(0)}%</p>
                        </div>
                         <div>
                            <p className="text-sm text-gray-400">Total Trades</p>
                            <p className="text-2xl font-semibold text-white">{result.totalTrades}</p>
                        </div>
                         <div>
                            <p className="text-sm text-gray-400">Last Run</p>
                            <p className="text-xl font-semibold text-white">{result.timestamp.toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const SettingsTab: React.FC = () => {
    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    const [passphrase, setPassphrase] = useState('');

    const handleSave = () => {
        if (!apiKey || !apiSecret || !passphrase) {
            alert('Please fill in all API fields.');
            return;
        }
        // In a real app, this would call a secure Firebase Function
        alert('API Keys saved securely! (Mocked)');
        setApiKey('');
        setApiSecret('');
        setPassphrase('');
    };

    return (
         <div className="max-w-xl mx-auto">
             <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">OKX API Settings</h3>
                <p className="text-sm text-gray-400 mb-6">Your API keys are encrypted and stored securely. They are only used to execute trades on your behalf.
                <a href="#" className="text-purple-400 hover:underline ml-1">How to get your OKX API keys.</a>
                </p>
                <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">API Key</label>
                        <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">API Secret</label>
                        <input type="password" value={apiSecret} onChange={e => setApiSecret(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Passphrase</label>
                        <input type="password" value={passphrase} onChange={e => setPassphrase(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                </div>
                <div className="mt-6">
                    <button onClick={handleSave} className="w-full py-2 px-4 bg-purple-600 text-sm font-medium text-white rounded-md hover:bg-purple-700">
                        Save API Keys
                    </button>
                </div>
             </div>
         </div>
    );
};

export default Dashboard;