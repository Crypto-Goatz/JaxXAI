"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SuccessPageProps {
  searchParams: Record<string, string | undefined>;
}

/**
 * Shows the Checkout session identifier so developers can inspect the payment in the Stripe dashboard.
 */
export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof searchParams.session_id === "string") {
      setSessionId(searchParams.session_id);
    }
  }, [searchParams.session_id]);

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mx-auto flex max-w-xl flex-col gap-6">
        <header className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-emerald-500/10">
          <h1 className="text-2xl font-semibold text-slate-100">Payment successful</h1>
          <p className="mt-2 text-sm text-slate-400">
            The direct charge completed on the connected account. Review the session in your Stripe dashboard to inspect
            the application fee and payout destination.
          </p>
        </header>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-sm text-slate-300">
          {sessionId ? (
            <>
              <p className="text-slate-400">Checkout session ID</p>
              <code className="mt-2 block overflow-hidden text-ellipsis rounded-lg bg-slate-950 px-3 py-2 text-xs text-emerald-300">
                {sessionId}
              </code>
            </>
          ) : (
            <p>No session ID was supplied. Ensure success_url includes <code>{`{CHECKOUT_SESSION_ID}`}</code>.</p>
          )}
        </div>

        <Link
          href="/YOLO/connect-demo"
          className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
        >
          Return to console
        </Link>
      </div>
    </div>
  );
}

