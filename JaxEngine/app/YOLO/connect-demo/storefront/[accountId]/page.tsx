"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type ProductSummary = {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  currency: string | null;
};

interface StorefrontPageProps {
  params: { accountId: string };
  searchParams: Record<string, string | string[] | undefined>;
}

/**
 * Simple hosted Checkout storefront that fetches product data directly from the connected account.
 */
export default function StorefrontPage({ params, searchParams }: StorefrontPageProps) {
  const { accountId } = params;
  const canceled = searchParams?.canceled === "true";

  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const formattedAccountId = useMemo(() => decodeURIComponent(accountId), [accountId]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setMessage(null);
      try {
        const response = await fetch(
          `/api/connect/products?accountId=${encodeURIComponent(formattedAccountId)}`
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || "Unable to load products.");
        }
        setProducts(data.data || []);
      } catch (error: any) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [formattedAccountId]);

  const handleCheckout = async (productId: string) => {
    setMessage(null);
    try {
      const response = await fetch("/api/connect/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId: formattedAccountId,
          productId,
          quantity: 1,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to start checkout.");
      }
      window.location.href = data.url;
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <header className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-emerald-500/10">
          <p className="text-xs uppercase tracking-wide text-slate-500">Demo storefront</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-100">JaxDex Storefront</h1>
          <p className="mt-2 text-sm text-slate-400">
            Displaying products for <code className="rounded bg-slate-800 px-1 py-0.5 text-xs">{formattedAccountId}</code>.
            For production at scale, swap this raw account ID for a customer-friendly slug or handle.
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <Link
              className="rounded-lg border border-slate-800 px-3 py-1 text-xs font-semibold text-slate-300 transition hover:border-emerald-500 hover:text-emerald-300"
              href="/YOLO/connect-demo"
            >
              Back to console
            </Link>
            {canceled && <span className="text-red-300">Checkout canceled. Pick another product to continue.</span>}
          </div>
        </header>

        {message && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">{message}</div>
        )}

        {loading ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-sm text-slate-400">
            Loading products…
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-sm text-slate-400">
            No products available yet. Return to the console to create one.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {products.map((product) => (
              <article
                key={product.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-inner shadow-emerald-500/5"
              >
                <div>
                  <h2 className="text-lg font-semibold text-slate-100">{product.name}</h2>
                  {product.description && <p className="mt-2 text-sm text-slate-400">{product.description}</p>}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm font-semibold text-emerald-300">
                    {product.price ? (product.price / 100).toFixed(2) : "N/A"}{" "}
                    {product.currency?.toUpperCase() ?? ""}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCheckout(product.id)}
                    className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
                  >
                    Buy now
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

