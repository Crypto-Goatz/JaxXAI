
import React from 'react';
import type { Asset } from '../types';
import PriceChart from './PriceChart';

interface AssetCardProps {
  asset: Asset;
  stageTitle: string;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, stageTitle }) => {
  const isBuyZone = stageTitle.includes('BUY ZONE');

  const renderMetric = (key: string, value: number) => (
    <div key={key} className="text-xs">
      <span className="text-lavender-gray/70">{key}: </span>
      <span className="font-semibold">{value}</span>
    </div>
  );

  return (
    <div className={`
      bg-slate-purple-medium/80 backdrop-blur-sm rounded-lg p-4 border transition-all duration-300
      ${isBuyZone 
        ? 'border-glow-magenta/60 shadow-glow-magenta' 
        : 'border-electric-blue/20 hover:border-electric-blue/50 hover:shadow-glow-blue'
      }
    `}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{asset.ticker}</h3>
          <p className="text-2xl font-semibold">${asset.price.toLocaleString()}</p>
        </div>
        {asset.change24h && (
          <p className={`font-semibold text-lime-green ${asset.change24h > 0 ? 'text-lime-green' : 'text-red-500'}`}>
            {asset.change24h > 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
          </p>
        )}
      </div>
      
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
        {Object.entries(asset.metrics).map(([key, value]) => renderMetric(key.toUpperCase(), value))}
      </div>

      {isBuyZone && asset.chartData && (
        <div className="mt-4">
          <div className="h-20 -mx-4">
            <PriceChart data={asset.chartData} />
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-lavender-gray/80">Prediction Confidence:</span>
              <span className="text-lime-green font-bold">{asset.predictionConfidence}%</span>
            </div>
             {asset.profitTargets && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-lavender-gray/80">Profit Targets:</span>
                <div className="flex gap-2">
                  {asset.profitTargets.map(target => (
                    <span key={target} className="bg-lime-green/10 text-lime-green px-2 py-0.5 rounded text-xs font-semibold">
                      ${target.toLocaleString()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetCard;
