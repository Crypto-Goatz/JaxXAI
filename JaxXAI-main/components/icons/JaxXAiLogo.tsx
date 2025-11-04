import React from 'react';

export const JaxXAiLogo: React.FC<{className?: string}> = ({ className }) => (
  <div className="flex items-center">
    <svg viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00BFFF" />
          <stop offset="100%" stopColor="#9FFF33" />
        </linearGradient>
      </defs>
      <text x="0" y="24" fontFamily="Rajdhani, sans-serif" fontSize="28" fontWeight="700" fill="url(#logo-gradient)">
        JaxX
      </text>
      <text x="58" y="24" fontFamily="Rajdhani, sans-serif" fontSize="28" fontWeight="700" fill="#D0CDE1">
        AI
      </text>
    </svg>
  </div>
);