import React, { useMemo, useState } from 'react';
import { JaxXAiLogo } from './icons/JaxXAiLogo';
import { BlueLightFilterIcon } from './icons/BlueLightFilterIcon';

type HeaderPage = 'dashboard' | 'whale-watch';

interface HeaderProps {
  activePage: HeaderPage;
  onNavigate: (page: HeaderPage) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  const [blueLightFilter, setBlueLightFilter] = useState(false);
  const navItems = useMemo(
    () => [
      { id: 'dashboard' as HeaderPage, label: 'Pipeline' },
      { id: 'whale-watch' as HeaderPage, label: 'Meme Whale Watch' },
    ],
    []
  );

  return (
    <header className="w-full flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <JaxXAiLogo className="h-8 w-auto" />
        <nav className="flex items-center gap-2 bg-slate-purple-medium/40 backdrop-blur-sm border border-slate-purple-light/40 rounded-full px-2 py-1">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 text-xs md:text-sm font-semibold rounded-full transition-colors duration-300 ${
                  isActive
                    ? 'bg-electric-blue text-slate-purple-dark shadow-glow-blue'
                    : 'text-lavender-gray hover:text-electric-blue'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="flex items-center gap-4 md:gap-6 justify-between md:justify-end">
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
