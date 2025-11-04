# JaxBot Module

JaxBot is the tactical strategy console that plugs into the `JaxEngine` core. The module remains a standalone Next.js app so it can be deployed independently when needed, but it now lives at `JaxEngine/modules/jaxbot` to share environment variables, UI tokens, and API contracts with the engine.

## Quick Start

```bash
cd JaxEngine/modules/jaxbot
pnpm install        # or npm install
pnpm dev            # launches http://localhost:3001 by default
```

Copy `.env.example` to `.env.local` and keep the Firebase block aligned with the shared project:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAeBkVeIOlpuJT-Q6IS00Y4C86poHa7TGQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=jaxengine.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=jaxengine
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=jaxengine.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=442431325644
NEXT_PUBLIC_FIREBASE_APP_ID=1:442431325644:web:631aa1a3cd2f3375f4c969
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-YG0CC084GL
```

Add Stripe, webhook, and other secrets as needed for the module.

## Deploying

Create a dedicated Vercel project that points to `JaxEngine/modules/jaxbot`. The module inherits shared secrets from the engine, so keep the environment settings in sync across both projects.

## Included Features

- Market overview and price charting
- Prediction and MMG analysis panels
- Pattern recognition surface fed by your strategy data sources

Extend the UI by dropping new components under `components/` and wiring them into `app/page.tsx`.
