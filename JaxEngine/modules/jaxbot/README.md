# JaxBot Module

JaxBot is the tactical strategy console that plugs into the `JaxEngine` core. The module remains a standalone Next.js app so it can be deployed independently when needed, but it now lives at `JaxEngine/modules/jaxbot` to share environment variables, UI tokens, and API contracts with the engine.

## Quick Start

```bash
cd JaxEngine/modules/jaxbot
pnpm install        # or npm install
pnpm dev            # launches http://localhost:3001 by default
```

Copy `.env.template` to `.env.local` and fill in the Firebase, Stripe, and webhook secrets that match the engine deployment.

## Deploying

Create a dedicated Vercel project that points to `JaxEngine/modules/jaxbot`. The module inherits shared secrets from the engine, so keep the environment settings in sync across both projects.

## Included Features

- Market overview and price charting
- Prediction and MMG analysis panels
- Pattern recognition surface fed by your strategy data sources

Extend the UI by dropping new components under `components/` and wiring them into `app/page.tsx`.
