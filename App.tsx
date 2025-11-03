
import React, { useState } from 'react';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import MemeWhaleWatch from './components/MemeWhaleWatch';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<'dashboard' | 'whale-watch'>('dashboard');

  return (
    <div className="relative min-h-screen w-full flex flex-col p-4 md:p-6 lg:p-8">
      {/* Background Grid and Glow Effect */}
      <div 
        className="fixed inset-0 z-[-1] bg-slate-purple-dark"
        style={{
          backgroundImage: `
            radial-gradient(circle at 70% 30%, rgba(0, 191, 255, 0.1), transparent 30%),
            linear-gradient(to right, rgba(0, 191, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 191, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 50px 50px, 50px 50px'
        }}
      ></div>

      <Header activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-grow mt-6">
        {activePage === 'dashboard' ? <KanbanBoard /> : <MemeWhaleWatch />}
      </main>
    </div>
  );
};

export default App;
