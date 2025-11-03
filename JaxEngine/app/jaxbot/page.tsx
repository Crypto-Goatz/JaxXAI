"use client";

import Link from "next/link";

export default function JaxbotLandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <header className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-emerald-500/10">
          <p className="text-xs uppercase tracking-wide text-slate-500">JaxBot</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-100">JaxBot Strategy Control Center</h1>
          <p className="mt-3 text-sm text-slate-400">
            This companion workspace lives inside the repository at <code className="rounded bg-slate-800 px-2 py-1">/JaxEngine/modules/jaxbot</code>.
            Deploy it separately (or run locally) when you need the full tactical interface powered by the shared Firebase
            and Stripe credentials configured in this project.
          </p>
        </header>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-sm text-slate-300">
          <p>
            To boot the strategy center locally, run:
          </p>
          <pre className="mt-3 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs text-emerald-300">
{`cd JaxEngine/modules/jaxbot
pnpm install
pnpm dev`}
          </pre>
          <p className="mt-4">
            When you deploy it, point Vercel (or your preferred host) at the <code className="rounded bg-slate-800 px-2 py-1">jaxbot</code> subdirectory so it shares the same service account and env vars.
          </p>
        </div>
        <Link
          href="/YOLO"
          className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
        >
          Return to Market Alchemist
        </Link>
      </div>
    </div>
  );
}
