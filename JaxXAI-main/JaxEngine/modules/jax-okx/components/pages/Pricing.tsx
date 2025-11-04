
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Pricing: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleStartTrial = () => {
        if(user) {
            // This would ideally trigger a checkout session or function
            // For now, we just inform the user their trial is over.
            alert("Your trial has ended. Please subscribe to continue.");
        } else {
            navigate('/register');
        }
    }
  
    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    AlphaHunter Pricing
                </h2>
                <p className="mt-4 text-xl text-gray-400">
                    Choose the plan that's right for you. Start with a free 1-hour trial.
                </p>
            </div>

            <div className="mt-10 max-w-lg mx-auto">
                <div className="rounded-lg shadow-lg bg-slate-800 border border-purple-500/50 overflow-hidden">
                    <div className="px-6 py-8">
                        <h3 className="text-2xl font-extrabold text-white text-center">
                            Pro Trader
                        </h3>
                        <div className="mt-4 flex items-center justify-center">
                            <span className="text-5xl font-extrabold text-white">$199</span>
                            <span className="ml-2 text-xl font-medium text-gray-400">/ month</span>
                        </div>
                    </div>
                    <div className="px-6 pt-6 pb-8 bg-slate-800/50">
                        <ul className="space-y-4">
                            {[
                                '24/7 Automated Trading Bot',
                                'Whale Follower v1 Strategy',
                                'Real-time Trade Monitoring',
                                'Trailing Stop Loss & Profit Taking',
                                'Full Trade History',
                                'Access to Backtest Results',
                                'Secure API Key Management'
                            ].map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-lime-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="ml-3 text-base text-gray-300">
                                        {feature}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-6 bg-slate-800">
                         <button onClick={handleStartTrial} className="w-full py-3 px-6 border border-transparent rounded-md text-lg font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-slate-900 transition-colors">
                            Start 1-Hour Free Trial
                        </button>
                    </div>
                </div>
            </div>
            
             <div className="mt-8 text-center">
                <p className="text-gray-400">
                    Logged in but seeing this page? Your subscription or trial has ended.
                </p>
                <p className="text-gray-400 mt-2">
                   Please contact support or re-subscribe to continue using AlphaHunter.
                </p>
             </div>
        </div>
    );
};

export default Pricing;
