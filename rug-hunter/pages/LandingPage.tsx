import React from 'react';
import { JaxIcon, CheckCircleIcon } from '../components/icons';

interface LandingPageProps {
  onLogin: () => void;
}

const PricingCard: React.FC<{ title: string; price: string; description: string; features: string[]; isFeatured?: boolean; onLogin: () => void }> = ({ title, price, description, features, isFeatured, onLogin }) => (
  <div className={`border-2 rounded-xl p-8 flex flex-col transition-all duration-300 transform hover:-translate-y-2 ${isFeatured ? 'border-teal-400 bg-purple-900/50 shadow-2xl shadow-teal-500/10' : 'border-purple-800 bg-purple-900/20'}`}>
    <h3 className={`text-2xl font-bold ${isFeatured ? 'text-teal-300' : 'text-white'}`}>{title}</h3>
    <p className="mt-2 text-gray-400">{description}</p>
    <div className="mt-6">
      <span className="text-5xl font-extrabold text-white">{price}</span>
      <span className="text-gray-400">{price !== 'Free' && '/ month'}</span>
    </div>
    <ul className="mt-8 space-y-4 flex-grow">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <CheckCircleIcon className="h-6 w-6 text-teal-400 mr-3 flex-shrink-0" />
          <span className="text-gray-300">{feature}</span>
        </li>
      ))}
    </ul>
    <button onClick={onLogin} className={`w-full mt-8 font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 ${isFeatured ? 'bg-teal-400 text-black hover:bg-teal-300' : 'bg-purple-800 text-white hover:bg-purple-700'}`}>
      Get Started
    </button>
  </div>
);


const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-[#100624] text-gray-300 overflow-x-hidden">
      {/* Header */}
      <header className="p-4 md:px-8 flex justify-between items-center border-b border-purple-900">
        <div className="flex items-center space-x-3">
          <JaxIcon className="h-8 w-8 text-teal-400" />
          <h1 className="text-xl md:text-2xl font-bold text-white">
            Rug Hunter <span className="text-teal-400">by JAX</span>
          </h1>
        </div>
        <button onClick={onLogin} className="font-bold py-2 px-5 rounded-lg border-2 border-purple-700 hover:bg-purple-800 transition-colors">
          Login
        </button>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Stop Guessing. <br /> Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-pink-500">Hunting Rug-Proof Gems</span>.
        </h2>
        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
          Rug Hunter by JAX uses a 4Ever Learning Loop to track hot wallets, analyze on-chain data, and adapt its strategy 24/7. Your personal AI alpha hunter is here.
        </p>
        <button onClick={onLogin} className="mt-10 bg-teal-400 text-black font-bold py-4 px-8 rounded-lg text-lg hover:bg-teal-300 transition-transform transform hover:scale-105">
          Start Hunting
        </button>
      </main>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Choose Your Weapon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PricingCard
              title="Scout"
              price="Free"
              description="Basic tools to get a feel for the market."
              features={[
                "Limited Hot Wallet Alerts",
                "Basic On-Chain Metrics",
                "Community Access"
              ]}
              onLogin={onLogin}
            />
            <PricingCard
              title="Hunter"
              price="$99"
              description="For the active trader who needs an edge."
              features={[
                "All Scout Features",
                "Unlimited Hot Wallet Tracking",
                "AI Strategy Backtesting",
                "Personalized Performance Dashboards"
              ]}
              isFeatured={true}
              onLogin={onLogin}
            />
            <PricingCard
              title="Alchemist"
              price="$249"
              description="Unleash the full power of the 4Ever Learning Loop."
              features={[
                "All Hunter Features",
                "AI Paper Trading Order Book",
                "Deep Dive AI Strategy Analysis",
                "API Access for Custom Bots"
              ]}
              onLogin={onLogin}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-900 py-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Rug Hunter by JAX. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;