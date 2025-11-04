import React from 'react';
import { JaxIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="p-4 md:px-8 border-b border-purple-900/50 flex justify-between items-center bg-[#100624]/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <JaxIcon className="h-8 w-8 text-[#00f5d4]" />
        <h1 className="text-xl md:text-2xl font-bold text-white">
          Rug Hunter <span className="text-[#00f5d4]">by JAX</span>
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm text-gray-400">4Ever Learning Pts</p>
          <p className="text-lg font-bold text-[#00f5d4]">1,337</p>
        </div>
        <div className="w-10 h-10 bg-purple-900 rounded-full border-2 border-[#00f5d4]">
            <img src="https://picsum.photos/40/40" className="rounded-full" alt="User Avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;