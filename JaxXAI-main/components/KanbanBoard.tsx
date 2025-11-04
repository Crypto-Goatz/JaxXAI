import React, { useEffect, useMemo, useState } from 'react';
import KanbanColumn from './KanbanColumn';
import { mockStages } from '../services/mockData';
import { fetchLiveStages } from '../services/livePricing';
import type { StageData } from '../types';

const REFRESH_INTERVAL_MS = 300_000;

const KanbanBoard: React.FC = () => {
  const [stages, setStages] = useState<StageData[]>(mockStages);
  const [status, setStatus] = useState<'loading' | 'live' | 'fallback' | 'error'>('loading');
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchData = useMemo(
    () => async () => {
      try {
        const { stages: liveStages, source } = await fetchLiveStages();
        setStages(liveStages);
        setStatus(source === 'jaxdex' ? 'live' : 'fallback');
        setLastUpdated(Date.now());
        setErrorMessage(null);
      } catch (error) {
        console.error('[LivePricing] Fatal fetch error:', error);
        setStages(mockStages);
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Failed to load live data');
      }
    },
    []
  );

  useEffect(() => {
    fetchData();
    const interval = window.setInterval(fetchData, REFRESH_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [fetchData]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold uppercase tracking-wide ${
              status === 'live'
                ? 'bg-lime-green/15 border border-lime-green/60 text-lime-green'
                : status === 'fallback'
                ? 'bg-electric-blue/10 border border-electric-blue/60 text-electric-blue'
              : 'bg-red-500/10 border border-red-500/60 text-red-200'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
            </span>
            {status === 'live' && 'Live JaxDex Feed'}
            {status === 'fallback' && 'Public Fallback Feed'}
            {status === 'error' && 'Live Feed Unavailable'}
            {status === 'loading' && 'Syncing Feed...'}
          </span>
          {lastUpdated && (
            <span className="text-silver-gray">
              Updated {new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          )}
        </div>
        <p className="text-xs text-lavender-gray/70">
          Refreshes every {Math.round(REFRESH_INTERVAL_MS / 1000)}s — when live keys are present, trades flow straight into the bot.
        </p>
      </div>

      {errorMessage && (
        <div className="rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-xs text-red-200">
          {errorMessage}
        </div>
      )}

      <div className="lg:grid lg:grid-cols-5 lg:gap-6 flex gap-4 overflow-x-auto snap-x snap-mandatory">
        {stages.map((stage) => (
          <KanbanColumn key={stage.title} title={stage.title} assets={stage.assets} />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
