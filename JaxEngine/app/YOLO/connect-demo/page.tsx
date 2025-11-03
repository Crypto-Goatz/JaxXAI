"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type AccountStatus = {
  accountId: string;
  email: string | null;
  country: string | null;
  detailsSubmitted: boolean;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
};

type ProductSummary = {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  currency: string | null;
};

/**
 * A lightweight Stripe Connect control panel that demonstrates how to:
 * 1. Create connected accounts
 * 2. Onboard them via hosted Account Links
 * 3. Create products on behalf of the connected business
 * 4. Direct the operator to the simple storefront view
 */
export default function ConnectDemoPage() {
  const [creating, setCreating] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("US");
  const [status, setStatus] = useState<AccountStatus | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCurrency, setProductCurrency] = useState("usd");
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [productLoading, setProductLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const hasAccount = useMemo(() => accountId.trim().length > 0, [accountId]);

  const handleCreateAccount = async () => {
    setCreating(true);
    setMessage(null);
    try {
      const response = await fetch("/api/connect/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email || undefined, country }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to create connected account.");
      }

      setAccountId(data.accountId);
      setMessage(`Connected account ${data.accountId} created. Continue with onboarding below.`);
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setCreating(false);
    }
  };

  const refreshStatus = async (id: string) => {
    setStatusLoading(true);
    setMessage(null);
    try {
      const response = await fetch(`/api/connect/account-status?accountId=${encodeURIComponent(id)}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Unable to load account status.");
      }
      setStatus(data);
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setStatusLoading(false);
    }
  };

  const startOnboarding = async () => {
    if (!hasAccount) {
      setMessage("Create or paste a connected account ID before starting onboarding.");
      return;
    }
    setMessage(null);
    try {
      const response = await fetch("/api/connect/create-account-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to start onboarding.");
      }
      window.location.href = data.url;
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  const loadProducts = async (id: string) => {
    setProductLoading(true);
    setMessage(null);
    try {
      const response = await fetch(`/api/connect/products?accountId=${encodeURIComponent(id)}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Unable to load products.");
      }
      setProducts(data.data || []);
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setProductLoading(false);
    }
  };

  const handleCreateProduct = async () => {
    if (!hasAccount) {
      setMessage("Create or paste a connected account ID before creating products.");
      return;
    }
    setMessage(null);
    try {
      const response = await fetch("/api/connect/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId,
          name: productName,
          description: productDescription,
          price: Number(productPrice),
          currency: productCurrency,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Failed to create product.");
      }

      setMessage(`Product "${data.name}" created.`);
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      await loadProducts(accountId);
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    if (hasAccount) {
      refreshStatus(accountId);
      loadProducts(accountId);
    } else {
      setStatus(null);
      setProducts([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAccount]);

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-emerald-500/10">
          <h1 className="text-2xl font-semibold text-slate-100">Stripe Connect Sample</h1>
          <p className="mt-3 text-sm text-slate-400">
            This sandbox walks through account creation, onboarding, product creation, and a basic storefront backed by
            Stripe Checkout. Replace any placeholder values (noted below) with your real keys before moving to
            production.
          </p>
        </header>

        {message && (
          <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            {message}
          </div>
        )}

        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-lg font-semibold text-slate-100">1. Create a connected account</h2>
          <p className="mt-1 text-sm text-slate-400">
            Only the controller properties are provided so you can layer on additional business details later. Fees are
            paid by the connected account and Stripe handles disputes/losses.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col text-sm text-slate-300">
              Email (optional)
              <input
                className="mt-2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="trader@example.com"
              />
            </label>
            <label className="flex flex-col text-sm text-slate-300">
              Country
              <input
                className="mt-2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
                value={country}
                onChange={(event) => setCountry(event.target.value.toUpperCase())}
                placeholder="US"
              />
            </label>
          </div>
          <button
            type="button"
            onClick={handleCreateAccount}
            disabled={creating}
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {creating ? "Creating..." : "Create Connected Account"}
          </button>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-lg font-semibold text-slate-100">2. Onboard to collect payments</h2>
          <p className="mt-1 text-sm text-slate-400">
            Paste an existing account ID or use the one created above. Status is pulled directly from Stripe so it always
            reflects the latest onboarding requirements.
          </p>
          <div className="mt-4 flex flex-col gap-3 md:flex-row">
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-emerald-500 focus:outline-none"
              value={accountId}
              onChange={(event) => setAccountId(event.target.value)}
              placeholder="acct_123..."
            />
            <button
              type="button"
              onClick={() => hasAccount && refreshStatus(accountId)}
              className="rounded-xl border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-emerald-500 hover:text-emerald-300"
            >
              Refresh status
            </button>
            <button
              type="button"
              onClick={startOnboarding}
              className="rounded-xl bg-emerald-500 px-5 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
            >
              Onboard to collect payments
            </button>
          </div>
          <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm">
            {statusLoading && <p className="text-slate-400">Loading account status…</p>}
            {!statusLoading && status ? (
              <dl className="grid grid-cols-1 gap-2 text-slate-300 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-500">Account ID</dt>
                  <dd className="font-mono text-slate-200">{status.accountId}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-500">Email</dt>
                  <dd>{status.email || "Not provided"}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-500">Details Submitted</dt>
                  <dd>{status.detailsSubmitted ? "Yes" : "No"}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-500">Charges Enabled</dt>
                  <dd>{status.chargesEnabled ? "Yes" : "No"}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-500">Payouts Enabled</dt>
                  <dd>{status.payoutsEnabled ? "Yes" : "No"}</dd>
                </div>
              </dl>
            ) : (
              !statusLoading && <p className="text-slate-500">Status will display once a connected account is selected.</p>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-lg font-semibold text-slate-100">3. Create products on the connected account</h2>
          <p className="mt-1 text-sm text-slate-400">
            Products are created with the <code className="rounded bg-slate-800 px-1 py-0.5 text-xs">Stripe-Account</code>{" "}
            header so pricing lives on the connected account. Currency defaults to USD.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col text-sm text-slate-300">
              Name
              <input
                className="mt-2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
                placeholder="JaxDex Signals"
              />
            </label>
            <label className="flex flex-col text-sm text-slate-300">
              Price (major units)
              <input
                className="mt-2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
                value={productPrice}
                onChange={(event) => setProductPrice(event.target.value)}
                placeholder="49.99"
              />
            </label>
            <label className="flex flex-col text-sm text-slate-300 md:col-span-2">
              Description
              <textarea
                className="mt-2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
                rows={3}
                value={productDescription}
                onChange={(event) => setProductDescription(event.target.value)}
                placeholder="Quant-driven trade signals and execution automations."
              />
            </label>
            <label className="flex flex-col text-sm text-slate-300">
              Currency
              <input
                className="mt-2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none"
                value={productCurrency}
                onChange={(event) => setProductCurrency(event.target.value.toLowerCase())}
                placeholder="usd"
              />
            </label>
          </div>
          <button
            type="button"
            onClick={handleCreateProduct}
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
          >
            Create product in connected account
          </button>
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <header className="mb-3 flex items-center justify-between text-sm text-slate-400">
              <span>Existing products ({products.length})</span>
              <button
                type="button"
                onClick={() => hasAccount && loadProducts(accountId)}
                className="rounded-lg border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-300 transition hover:border-emerald-500 hover:text-emerald-300"
              >
                Refresh list
              </button>
            </header>
            {productLoading ? (
              <p className="text-sm text-slate-500">Loading products…</p>
            ) : products.length === 0 ? (
              <p className="text-sm text-slate-500">No products found. Create one above to populate the storefront.</p>
            ) : (
              <ul className="space-y-3 text-sm text-slate-200">
                {products.map((product) => (
                  <li key={product.id} className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
                    <p className="font-semibold text-slate-100">{product.name}</p>
                    {product.description && <p className="mt-1 text-xs text-slate-400">{product.description}</p>}
                    <p className="mt-2 text-xs uppercase tracking-wide text-emerald-300">
                      {product.price ? (product.price / 100).toFixed(2) : "N/A"} {product.currency?.toUpperCase()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {hasAccount && (
          <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-lg font-semibold text-slate-100">4. Preview the storefront</h2>
            <p className="mt-1 text-sm text-slate-400">
              Each connected account can have its own storefront. For demo purposes we pass the account ID directly in
              the URL. <strong className="text-slate-200">In production, use an internal identifier</strong> so the ID
              is not exposed to customers.
            </p>
            <Link
              href={`/YOLO/connect-demo/storefront/${encodeURIComponent(accountId)}`}
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
            >
              Open storefront
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}

