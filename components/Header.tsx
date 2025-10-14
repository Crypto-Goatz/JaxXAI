
import React, { useState } from 'react';
import { JaxXAiLogo } from './icons/JaxXAiLogo';
import { BlueLightFilterIcon } from './icons/BlueLightFilterIcon';

const Header: React.FC = () => {
  const [blueLightFilter, setBlueLightFilter] = useState(false);

  return (
    <header className="w-full flex justify-between items-center">
      <JaxXAiLogo />
      <div className="flex items-center gap-4 md:gap-6">
        <div className="flex items-center gap-2 bg-lime-green/10 border border-lime-green/50 rounded-md px-3 py-1 text-xs md:text-sm shadow-glow-green">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-green"></span>
          </span>
          <span className="text-lime-green font-bold tracking-wider">LIVE ACCURACY: 94.7%</span>
        </div>
        <button 
          onClick={() => setBlueLightFilter(!blueLightFilter)}
          className={`p-2 rounded-full transition-colors duration-300 ${blueLightFilter ? 'bg-electric-blue/20 text-electric-blue' : 'bg-slate-purple-medium/50 text-lavender-gray hover:bg-slate-purple-medium'}`}
          aria-label="Toggle blue light filter"
        >
          <BlueLightFilterIcon className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
