import React from 'react';
import { HeliusWallet } from '../types';

const HOT_WALLETS: HeliusWallet[] = [
  {
    address: 'HV1KXxWFaSeriyFvXyx48FqG9BoFbfinB8njCJonqP7K',
    alias: '#1 Whale Market Maker',
    persona: 'Controls early liquidity, blesses only a handful of launches each quarter.',
  },
  {
    address: '69yhtoJR4JYPPABZcSNkzuqbaFbwHsCkja1sP1Q2aVT5',
    alias: '#2 OG Survivor',
    persona: 'Cycles in and out, rarely misses a rotation.',
  },
  {
    address: 'HU23r7UoZbqTUuh3vA7emAGztFtqwTeVips789vqxxBw',
    alias: '#3 The Twin',
    persona: 'Runs mirrored entries across burner wallets within minutes.',
  },
  {
    address: '6TYDxGmVxkBPBmEfnmLXx6jVff9LknsjRHqdTjVyZmG8',
    alias: '#4 Whale Accumulator',
    persona: 'Quietly scales a position across multiple pools before making noise.',
  },
  {
    address: 'YpnnUu1ZPHpAzy4xggEd5pBTbu1aDayXuARsYsavNs9',
    alias: '#5 Reformed Dumper',
    persona: 'Used to nuke tops, now leads rotations into higher-liquidity meme baskets.',
  },
  {
    address: '2YXoERyevAJgRm2bnxcgdhbPmHcgDK4KnDqAvfeh51ae',
    alias: '#6 Consistent Performer',
    persona: 'Keeps weekly volume, rarely holds longer than 48 hours.',
  },
  {
    address: 'Bi3DVZzKSMfh5gyMePgxnRNeQyinuyWpyxGqLyBChaUG',
    alias: '#7 Conviction Whale',
    persona: 'Adds to winners multiple times; signals a crossover from hype to trend.',
  },
  {
    address: 'J5TGA3sgMwKPaqTKo2WSB2cWz8MPNMFcnCd4smt3FZfj',
    alias: '#8 Late Whale',
    persona: 'Arrives once retail is buzzing—great for timing exits.',
  },
  {
    address: '4BcBRnNDZeNDECnKBk4ok7ZhY1iuwBrGxdM5Dq8wrBxP',
    alias: '#9 Steady Holder',
    persona: 'Stakes and sits. Only moves when the table is about to flip.',
  },
];

const MemeWhaleWatch: React.FC = () => {
  return (
    <section className="space-y-8 pb-12">
      <div className="rounded-3xl border border-electric-blue/40 bg-slate-purple-medium/40 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-electric-blue/20">
        <h1 className="text-2xl sm:text-3xl font-bold text-electric-blue">Meme Whale Watch</h1>
        <p className="mt-3 text-sm md:text-base text-lavender-gray leading-relaxed max-w-3xl">
          These are the wallets we mirror, fade, or front-run. Every swap hits our private webhook first,
          processed through Helius Enhanced APIs before it reaches clients. Publicly we tease the wins—retainer
          partners get the live stream with execution-ready calls.
        </p>
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {HOT_WALLETS.map((wallet) => (
          <article
            key={wallet.address}
            className="rounded-2xl border border-slate-purple-light/50 bg-slate-purple-dark/60 p-5 shadow-glow-blue hover:border-electric-blue/70 transition-colors"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-lavender-gray">{wallet.alias}</h2>
              <span className="text-[10px] uppercase tracking-widest text-electric-blue/80 bg-electric-blue/10 px-2 py-1 rounded-full">
                Whale Intel
              </span>
            </div>
            <p className="mt-3 text-sm text-silver-gray leading-relaxed">{wallet.persona}</p>
            <div className="mt-4">
              <p className="text-[10px] uppercase tracking-wider text-lavender-gray/70">Solana Address</p>
              <code className="mt-1 block break-all text-xs text-electric-blue bg-slate-purple-medium/50 rounded-md px-3 py-2 border border-electric-blue/40">
                {wallet.address}
              </code>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-3xl border border-lime-green/40 bg-lime-green/10 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-lime-green mb-3">Deploy the Tracker</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-slate-100/80">
          <li>
            Add <code className="px-1 py-0.5 bg-slate-purple-medium/60 border border-slate-purple-light/40 rounded">HELIUS_API_KEY</code> and{' '}
            <code className="px-1 py-0.5 bg-slate-purple-medium/60 border border-slate-purple-light/40 rounded">WEBHOOK_SECRET</code> to your
            environment (placeholders live in <code className="px-1 py-0.5 bg-slate-purple-medium/60 border border-slate-purple-light/40 rounded">.env.example</code>).
          </li>
          <li>
            Deploy <code className="px-1 py-0.5 bg-slate-purple-medium/60 border border-slate-purple-light/40 rounded">services/helius-tracker.ts</code>{' '}
            to your private infrastructure (Render, Railway, Functions, etc.).
          </li>
          <li>Run <code className="px-1 py-0.5 bg-slate-purple-medium/60 border border-slate-purple-light/40 rounded">setupWalletWebhook()</code> once to register the Helius enhanced webhook.</li>
          <li>
            Route the payloads into JaxEngine dashboards to convert alpha into retainers. Public site only gets sanitized snapshots.
          </li>
        </ol>
      </div>
    </section>
  );
};

export default MemeWhaleWatch;
