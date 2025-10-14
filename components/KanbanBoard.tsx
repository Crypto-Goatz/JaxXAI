import React from 'react';
import { mockStages } from '../services/mockData';
import KanbanColumn from './KanbanColumn';

const KanbanBoard: React.FC = () => {
  return (
    <div className="lg:grid lg:grid-cols-5 lg:gap-6 flex gap-4 overflow-x-auto snap-x snap-mandatory">
      {mockStages.map((stage) => (
        <KanbanColumn key={stage.title} title={stage.title} assets={stage.assets} />
      ))}
    </div>
  );
};

export default KanbanBoard;