'use client';

import { useCallback, useEffect, useMemo, useRef, useState, createContext, useContext } from 'react';
import clsx from 'clsx';
import {
  Loader2,
  LogOut,
  Home,
  Boxes,
  Database,
  CreditCard,
  Sparkles,
  ShieldCheck,
  MessageSquare,
  ArrowUpRight,
  Bell
} from 'lucide-react';
import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc
} from 'firebase/firestore';

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

function ensureFirebaseApp() {
  if (!firebaseConfig.apiKey) {
    throw new Error('Firebase configuration is missing NEXT_PUBLIC_FIREBASE_* environment variables.');
  }
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
}

function FirebaseProvider({ children }) {
  const [authLoading, setAuthLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const profileUnsubRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    try {
      ensureFirebaseApp();
    } catch (err) {
      setError(err);
      setAuthLoading(false);
      setProfileLoading(false);
      return () => {};
    }

    const auth = getAuth();
    const db = getFirestore();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    const handleProfileSubscription = (currentUser) => {
      if (profileUnsubRef.current) {
        profileUnsubRef.current();
        profileUnsubRef.current = null;
      }

      if (!currentUser) {
        setProfile(null);
        setProfileLoading(false);
        return;
      }

      const appId = firebaseConfig.appId || firebaseConfig.projectId || 'default';
      const profileRef = doc(db, 'artifacts', appId, 'users', currentUser.uid, 'profile', 'main');

      const bootstrapProfile = async () => {
        const nowIso = new Date().toISOString();
        const snapshot = await getDoc(profileRef);

        if (!snapshot.exists()) {
          const payload = {
            uid: currentUser.uid,
            email: currentUser.email || '',
            displayName: currentUser.displayName || '',
            photoURL: currentUser.photoURL || '',
            createdAt: nowIso,
            lastLogin: nowIso,
            subscription: 'free',
            addon_mods: []
          };
          await setDoc(profileRef, payload);
          try {
            await fetch('/api/sync-ghl-contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: payload.email,
                name: payload.displayName || payload.email
              })
            });
          } catch (syncErr) {
            console.warn('GoHighLevel sync failed', syncErr);
          }
        } else {
          await updateDoc(profileRef, { lastLogin: nowIso });
        }
      };

      bootstrapProfile()
        .then(() => {
          profileUnsubRef.current = onSnapshot(
            profileRef,
            (snapshot) => {
              setProfile(snapshot.data() || null);
              setProfileLoading(false);
            },
            (snapshotError) => {
              setError(snapshotError);
              setProfileLoading(false);
            }
          );
        })
        .catch((bootstrapErr) => {
          setError(bootstrapErr);
          setProfileLoading(false);
        });
    };

    const unsubscribeAuth = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (!isMounted) {
          return;
        }
        setUser(currentUser);
        setAuthLoading(false);
        setProfileLoading(true);
        handleProfileSubscription(currentUser);
      },
      (authErr) => {
        setError(authErr);
        setAuthLoading(false);
        setProfileLoading(false);
      }
    );

    return () => {
      isMounted = false;
      unsubscribeAuth();
      if (profileUnsubRef.current) {
        profileUnsubRef.current();
      }
    };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    await signInWithPopup(auth, provider);
  }, []);

  const logout = useCallback(async () => {
    const auth = getAuth();
    await signOut(auth);
  }, []);

  const value = useMemo(
    () => ({
      user,
      profile,
      error,
      authLoading,
      profileLoading,
      signInWithGoogle,
      logout
    }),
    [user, profile, error, authLoading, profileLoading, signInWithGoogle, logout]
  );

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
}

function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}

function usePermissions() {
  const { profile } = useFirebase();
  const subscription = profile?.subscription || 'free';
  const addonMods = Array.isArray(profile?.addon_mods) ? profile.addon_mods : [];

  const hasTier2 = subscription?.toLowerCase() === 'tier 2' || subscription?.toLowerCase() === 'tier2';
  const hasSolanaSwap = addonMods.includes('solana_swap');

  return {
    subscription,
    addonMods,
    hasTier2,
    hasSolanaSwap
  };
}

function LoadingState({ message }) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-950 text-slate-200">
      <Loader2 className="mb-4 h-10 w-10 animate-spin text-emerald-400" />
      <p className="text-sm font-medium text-slate-400">{message}</p>
    </div>
  );
}

function LoginScreen() {
  const { signInWithGoogle } = useFirebase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || 'Sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/70 p-10 shadow-2xl shadow-emerald-500/10 backdrop-blur">
        <div className="mb-8 flex items-center gap-3">
          <Sparkles className="h-8 w-8 text-emerald-400" />
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Welcome to</p>
            <h1 className="text-xl font-semibold text-slate-100">JAX Market Alchemist</h1>
          </div>
        </div>
        <p className="mb-6 text-sm text-slate-400">
          Sign in with Google to orchestrate MODs, manage subscriptions, and monitor the live market feed.
        </p>
        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Authenticating...
            </>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />
              Sign in with Google
            </>
          )}
        </button>
        {error && <p className="mt-4 text-center text-xs text-red-400">{error}</p>}
      </div>
    </div>
  );
}

function JaxDexIndex() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [entries, setEntries] = useState([]);
  const [meta, setMeta] = useState(null);
  const [feedSource, setFeedSource] = useState(null);

  const feedUrl = '/api/jaxdex-index';

  useEffect(() => {
    let mounted = true;
    let timer;

    const fetchFeed = async () => {
      try {
        const response = await fetch(feedUrl);
        if (!response.ok) {
          throw new Error(`Feed request failed with status ${response.status}`);
        }
        const data = await response.json();
        if (!mounted) return;
        setEntries(Array.isArray(data?.tickers) ? data.tickers : Array.isArray(data) ? data : []);
        setMeta(data?.meta || null);
        setFeedSource(data?.source || null);
        setLoading(false);
        setError(null);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || 'Failed to load market feed');
        setLoading(false);
      }
    };

    fetchFeed();
    timer = setInterval(fetchFeed, 15000);

    return () => {
      mounted = false;
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [feedUrl]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6 text-sm text-slate-400">
        <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
        Loading live market feed...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-300">
        {error}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">JaxDex Market Index</h3>
          <p className="text-xs text-slate-500">
            Auto-rotating API keys and JaxAI filters orchestrate this live pricing composite.
          </p>
        </div>
        <span className="flex h-6 items-center rounded-full bg-emerald-500/10 px-3 text-xs font-medium text-emerald-400">
          Live
        </span>
      </div>
      {meta && (
        <div className="mb-5 grid gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Current Stage</p>
            <p className="mt-1 text-sm font-semibold text-slate-200">{meta.stage}</p>
            <p className="text-[11px] text-slate-500">
              Generated {meta.generatedAt ? new Date(meta.generatedAt).toLocaleTimeString() : 'recently'}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">JaxAI Confidence</p>
            <div className="mt-2">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Stability Vector</span>
                <span className="font-semibold text-slate-200">
                  {Math.round((meta.confidence ?? 0) * 100)}%
                </span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-slate-800">
                <div
                  className="h-2 rounded-full bg-emerald-400"
                  style={{ width: `${Math.min(100, Math.max(0, Math.round((meta.confidence ?? 0) * 100)))}%` }}
                />
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Adaptive Filters</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(meta.filters || []).map((filter, index) => {
                const normalized =
                  typeof filter === 'string'
                    ? { label: `Signal ${index + 1}`, value: filter }
                    : filter || { label: `Signal ${index + 1}`, value: 'N/A' };
                return (
                  <span
                    key={`${normalized.label}-${normalized.value}`}
                    className="inline-flex items-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[11px] font-medium text-emerald-200"
                  >
                    <span className="mr-1 uppercase text-[10px] text-emerald-400">{normalized.label}:</span>
                    {normalized.value}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {feedSource && (
        <p className="mb-4 text-right text-[11px] uppercase tracking-wide text-slate-600">
          Source: {feedSource === 'remote' ? 'JaxDex Stream' : 'Fallback Simulation'}
        </p>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {entries.map((item) => (
          <div
            key={item.symbol || item.ticker || item.id}
            className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 shadow-inner shadow-emerald-500/5"
          >
            <p className="text-xs uppercase tracking-wide text-slate-500">{item.symbol || item.ticker}</p>
            <p className="mt-2 text-lg font-semibold text-slate-100">
              {item.price ? Number(item.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 }) : '--'}
            </p>
            {item.change && (
              <p
                className={clsx(
                  'mt-1 text-xs font-medium',
                  Number(item.change) >= 0 ? 'text-emerald-400' : 'text-red-400'
                )}
              >
                {Number(item.change) >= 0 ? '+' : ''}
                {Number(item.change).toFixed(2)}%
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-8 shadow-2xl shadow-emerald-500/5">
        <h2 className="text-lg font-semibold text-slate-100">Market Control Room</h2>
        <p className="mt-2 text-sm text-slate-400">
          Monitor the JaxDex index, orchestrate MOD activations, and track how JaxAI adaptive filters evolve with the
          market. Streams reflect your current subscription tier in real time.
        </p>
      </div>
      <JaxDexIndex />
    </div>
  );
}

function ModsManagerPage() {
  const { hasTier2, hasSolanaSwap, subscription } = usePermissions();
  const portalUrl = process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL || '#';

  const mods = [
    {
      id: 'ai_model',
      title: 'AI Model (Tier 2)',
      badge: 'Tier 2 Core',
      description:
        'Unlock predictive AI modelling for macro + on-chain signals. Required for advanced automation flows.',
      active: hasTier2
    },
    {
      id: 'solana_swap',
      title: 'Solana Swap Bot (Add-on)',
      badge: 'Add-on',
      description:
        'Leverage Jupiter DEX routing with automated execution parameters and risk throttles for Solana pairs.',
      active: hasSolanaSwap
    }
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-slate-100">MOD Manager</h2>
        <p className="text-sm text-slate-400">
          Control the activation state of each MOD. Status reflects your subscription tier (<span className="font-semibold text-slate-200">{subscription}</span>).
        </p>
      </header>
      <div className="grid gap-5 md:grid-cols-2">
        {mods.map((mod) => (
          <div
            key={mod.id}
            className="relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-emerald-500/10"
          >
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  {mod.badge}
                </span>
                <span
                  className={clsx(
                    'rounded-full px-2 py-1 text-xs font-semibold',
                    mod.active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-300 border border-red-500/20'
                  )}
                >
                  {mod.active ? 'Active' : 'Locked'}
                </span>
              </div>
              <h3 className="text-base font-semibold text-slate-100">{mod.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{mod.description}</p>
            </div>
            {!mod.active && (
              <a
                href={portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
              >
                Upgrade in Stripe
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function VaultPage() {
  const sampleDatasets = [
    { id: 'bq_okx_01', name: 'OKX Derivatives Order Book (1m shards)', updated: '5 min ago' },
    { id: 'bq_macro_03', name: 'Macro Signals v3 (FOMC + CPI blends)', updated: '12 min ago' },
    { id: 'bq_chain_21', name: 'On-chain Solana Liquidity Pools', updated: '27 min ago' }
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
        <h2 className="text-lg font-semibold text-slate-100">Data Vault</h2>
        <p className="mt-2 text-sm text-slate-400">
          Explore curated BigQuery datasets aligned with your active MODs. Access permissions adjust automatically as
          your subscription evolves.
        </p>
      </div>
      <div className="space-y-4">
        {sampleDatasets.map((dataset) => (
          <div
            key={dataset.id}
            className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 sm:flex-row sm:items-center"
          >
            <div>
              <h3 className="text-sm font-semibold text-slate-100">{dataset.name}</h3>
              <p className="text-xs text-slate-500">Dataset ID: {dataset.id}</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>Last updated {dataset.updated}</span>
              <button className="rounded-lg border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-emerald-500 hover:text-emerald-300">
                Request Access
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SubscriptionsPage() {
  const portalUrl = process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL || '#';

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center">
      <h2 className="text-lg font-semibold text-slate-100">Manage Subscription</h2>
      <p className="mt-2 text-sm text-slate-400">
        Use the Stripe Customer Portal to upgrade tiers, activate add-ons, or manage billing preferences. Any changes
        will sync instantly to the dashboard.
      </p>
      <a
        href={portalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
      >
        Manage My Subscription
      </a>
    </div>
  );
}

function Sidebar({ activePage, setActivePage, variant = 'desktop' }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'mods', label: 'MOD Manager', icon: Boxes },
    { id: 'vault', label: 'Data Vault', icon: Database },
    { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard }
  ];

  const appLinks = [
    {
      id: 'heyjax',
      label: 'Hey Jax Console',
      icon: MessageSquare,
      href: '/HeyJax'
    }
  ];

  const isCompact = variant === 'mobile';

  return (
    <nav
      className={clsx(
        'bg-slate-950/90 text-slate-200',
        isCompact
          ? 'flex flex-col gap-6 rounded-3xl border border-slate-900 p-4'
          : 'flex h-full flex-col justify-between border-r border-slate-900 p-6 pt-24'
      )}
    >
      <div>
        <div
          className={clsx(
            'flex items-center gap-3',
            isCompact ? 'mb-4' : 'mb-8'
          )}
        >
          <Sparkles className="h-6 w-6 text-emerald-400" />
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">JAX</p>
            <p className="text-sm font-semibold text-slate-200">Market Alchemist</p>
          </div>
        </div>
        <div className={clsx('space-y-2', isCompact && 'space-y-1')}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={clsx(
                'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition',
                activePage === item.id
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-200'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-6 space-y-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Apps</p>
          <div className="space-y-2">
            {appLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-200"
              >
                <span className="flex items-center gap-2 text-sm">
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <a
          href="https://www.gohighlevel.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-xl border border-emerald-500/30 px-4 py-2 text-xs font-semibold text-emerald-300 transition hover:border-emerald-400 hover:text-emerald-200"
        >
          Community Portal
        </a>
        <UserProfileCard />
      </div>
    </nav>
  );
}

function HeaderBar({ activePage }) {
  const { profile } = useFirebase();

  const pageMeta = {
    dashboard: {
      title: 'Market Control Room',
      lead: 'Active Surface'
    },
    mods: {
      title: 'MOD Manager',
      lead: 'Permission Matrix'
    },
    vault: {
      title: 'Data Vault',
      lead: 'Structured Intelligence'
    },
    subscriptions: {
      title: 'Subscription Center',
      lead: 'Billing Controls'
    }
  };

  const meta = pageMeta[activePage] || pageMeta.dashboard;
  const subscription = profile?.subscription || 'free';
  const addonCount = Array.isArray(profile?.addon_mods) ? profile.addon_mods.length : 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-900/70 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-2 text-emerald-300">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">{meta.lead}</p>
            <h1 className="text-lg font-semibold text-slate-100">{meta.title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-300">
          <div className="hidden flex-col text-right sm:flex">
            <span className="text-xs uppercase tracking-wide text-slate-500">Subscription</span>
            <span className="text-sm font-semibold text-slate-100">
              {subscription.charAt(0).toUpperCase() + subscription.slice(1)}
            </span>
            <span className="text-[11px] text-slate-500">
              {addonCount} add-on{addonCount === 1 ? '' : 's'}
            </span>
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 transition hover:border-emerald-500 hover:text-emerald-300"
            title="System notifications"
          >
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

function UserProfileCard() {
  const { user, profile, logout } = useFirebase();
  const [busy, setBusy] = useState(false);

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    setBusy(true);
    try {
      await logout();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-900/60 bg-slate-900/70 p-4">
      {user.photoURL ? (
        <img
          src={user.photoURL}
          alt={user.displayName || 'User avatar'}
          className="h-10 w-10 rounded-full border border-slate-800 object-cover"
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-800 text-sm font-semibold text-slate-200">
          {(user.displayName || user.email || '?')
            .toUpperCase()
            .slice(0, 2)}
        </div>
      )}
      <div className="flex-1">
        <p className="text-sm font-semibold text-slate-100">{profile?.displayName || user.displayName || 'User'}</p>
        <p className="text-xs text-slate-500">{profile?.email || user.email}</p>
      </div>
      <button
        onClick={handleLogout}
        disabled={busy}
        title="Log out"
        className="rounded-lg border border-slate-800 p-2 text-slate-400 transition hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
      </button>
    </div>
  );
}

function MainArea({ activePage }) {
  const ActiveComponent = useMemo(() => {
    switch (activePage) {
      case 'dashboard':
        return DashboardPage;
      case 'mods':
        return ModsManagerPage;
      case 'vault':
        return VaultPage;
      case 'subscriptions':
        return SubscriptionsPage;
      default:
        return DashboardPage;
    }
  }, [activePage]);

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="flex h-full flex-col gap-6 rounded-3xl border border-slate-900/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 shadow-inner shadow-emerald-500/5 sm:p-8">
        <ActiveComponent />
      </div>
    </main>
  );
}

function RightSidebar() {
  const { profile } = useFirebase();
  const { subscription, addonMods, hasTier2, hasSolanaSwap } = usePermissions();

  const formattedSubscription = subscription.charAt(0).toUpperCase() + subscription.slice(1);
  const lastLogin = profile?.lastLogin ? new Date(profile.lastLogin).toLocaleString() : 'N/A';

  return (
    <aside className="hidden xl:block w-80 shrink-0 text-slate-200">
      <div className="sticky top-28 space-y-6">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-emerald-500/5">
          <h3 className="text-sm font-semibold text-slate-100">Account Snapshot</h3>
          <dl className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="flex items-center justify-between">
              <dt className="text-xs uppercase tracking-wide text-slate-500">Tier</dt>
              <dd className="font-semibold text-emerald-300">{formattedSubscription}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-xs uppercase tracking-wide text-slate-500">Add-ons</dt>
              <dd>{addonMods.length ? addonMods.join(', ') : 'None'}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-xs uppercase tracking-wide text-slate-500">Last Login</dt>
              <dd>{lastLogin}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-inner shadow-emerald-500/10">
          <h3 className="text-sm font-semibold text-slate-100">Automation Signals</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2">
              <span>AI Model Access</span>
              <span className={clsx('text-xs font-semibold uppercase', hasTier2 ? 'text-emerald-300' : 'text-red-300')}>
                {hasTier2 ? 'Active' : 'Locked'}
              </span>
            </li>
            <li className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2">
              <span>Solana Swap Bot</span>
              <span
                className={clsx('text-xs font-semibold uppercase', hasSolanaSwap ? 'text-emerald-300' : 'text-red-300')}
              >
                {hasSolanaSwap ? 'Ready' : 'Add-on'}
              </span>
            </li>
            <li className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2">
              <span>Billing Sync</span>
              <span className="text-xs font-semibold uppercase text-emerald-300">Stripe</span>
            </li>
          </ul>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-emerald-500/5">
          <h3 className="text-sm font-semibold text-slate-100">Quick Launch</h3>
          <div className="mt-4 space-y-3 text-sm">
            <a
              href="/HeyJax"
              className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-200 transition hover:border-emerald-400 hover:bg-emerald-500/20"
            >
              <span>Hey Jax Assistant</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="/YOLO/connect-demo"
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-2 text-slate-300 transition hover:border-emerald-500 hover:text-emerald-200"
            >
              <span>Stripe Connect Lab</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="/jaxbot"
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-2 text-slate-300 transition hover:border-emerald-500 hover:text-emerald-200"
            >
              <span>JaxBot Strategy Center</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </div>
    </aside>
  );
}

function DashboardShell() {
  const { user, authLoading, profileLoading, error } = useFirebase();
  const [activePage, setActivePage] = useState('dashboard');

  useEffect(() => {
    setActivePage('dashboard');
  }, [user]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-center text-red-300">
        <div className="max-w-md space-y-4">
          <h2 className="text-lg font-semibold text-red-200">Authentication Error</h2>
          <p className="text-sm text-red-300/80">{error.message || 'An unexpected error occurred.'}</p>
        </div>
      </div>
    );
  }

  if (authLoading || profileLoading) {
    return <LoadingState message="Booting authenticated dashboard..." />;
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <HeaderBar activePage={activePage} />
      <div className="flex min-h-screen pt-4 sm:pt-6">
        <div className="hidden w-72 shrink-0 border-r border-slate-900 lg:block">
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="px-4 pb-4 pt-6 sm:px-6 lg:hidden">
            <Sidebar activePage={activePage} setActivePage={setActivePage} variant="mobile" />
          </div>
          <div className="flex flex-1 flex-col gap-6 px-4 pb-8 pt-4 sm:px-6 xl:flex-row xl:px-8">
            <MainArea activePage={activePage} />
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JaxSystemDashboard() {
  return (
    <FirebaseProvider>
      <DashboardShell />
    </FirebaseProvider>
  );
}
