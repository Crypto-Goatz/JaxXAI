
import React from 'react';
import { mockStages } from '../services/mockData';
import KanbanColumn from './KanbanColumn';

const KanbanBoard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
      {mockStages.map((stage) => (
        <KanbanColumn key={stage.title} title={stage.title} assets={stage.assets} />
      ))}
    </div>
  );
};

export default KanbanBoard;
