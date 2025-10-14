import React from 'react';
import type { Asset } from '../types';
import AssetCard from './AssetCard';

interface KanbanColumnProps {
  title: string;
  assets: Asset[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, assets }) => {
  const isBuyZone = title.includes('BUY ZONE');

  return (
    <div className="flex flex-col gap-4 w-[85vw] md:w-[40vw] lg:w-auto flex-shrink-0 snap-start">
      <div className="px-2">
        <h2
          className={`text-sm font-bold tracking-widest uppercase pb-2 border-b-2 
            ${isBuyZone 
              ? 'text-glow-magenta border-glow-magenta shadow-glow-magenta' 
              : 'text-lavender-gray/80 border-electric-blue/30'
            }`}
        >
          {title}
        </h2>
      </div>
      <div className="flex flex-col gap-4 h-full">
        {assets.map((asset) => (
          <AssetCard key={asset.id} asset={asset} stageTitle={title} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;