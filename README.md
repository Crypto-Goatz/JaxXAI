# JaxXAI Frontend Workspace

This repository contains the active trading dashboard built with Vite + React 19, alongside the **JaxEngine** core and its bundled **JaxBot** module. The top-level app is the lightweight client you can ship quickly, while the Next.js-powered JaxEngine manages deeper automation flows and authenticated dashboards.

## Repository Layout

- `/` – Vite application published as `jaxxai-crypto-dashboard` (see `package.json` for scripts).
- `/JaxEngine` – full Next.js core that powers enterprise dashboards, APIs, and internal tools.
  - `/JaxEngine/modules/jaxbot` – standalone JaxBot strategy console that runs inside the engine.
- `/services`, `/api`, `requirements.txt` – utility scripts and service connectors that support the broader stack.

## Run the Vite Dashboard (root app)

```bash
npm install
npm run dev
```

Build for production with `npm run build`; output is written to `dist/`.

### Deploy to Firebase Hosting

Firebase Hosting is pre-configured to use the `jaxengine` project:

1. Install the CLI if you do not have it yet:
   ```bash
   npm install -g firebase-tools
   ```
2. Authenticate and select the project:
   ```bash
   firebase login
   firebase use jaxengine
   ```
3. Build and deploy the Vite app:
   ```bash
   npm run deploy
   # or run the steps manually:
   npm run build
   firebase deploy --only hosting
   ```

Environment variables in `.env.local` already match the Firebase project:
```
Auth Domain:     jaxengine.firebaseapp.com
Project ID:      jaxengine
Storage Bucket:  jaxengine.firebasestorage.app
App ID:          1:442431325644:web:7fb18bb27b9ea9ecf4c969
Measurement ID:  G-PYEE8KRWCQ
```
Ensure the JaxEngine sub-project keeps these values aligned (`JaxEngine/.env.local`) and mirror them in any deployment platform (e.g. Vercel).

## Work Inside JaxEngine

The engine is a standard Next.js 14 project with Tailwind and Firebase integrations.

```bash
cd JaxEngine
pnpm install   # or npm install
pnpm dev       # runs the Next.js dev server
```

Environment variables are loaded from `.env.local`; see `JaxEngine/next_steps.txt` for the full list of required services.

### Launch JaxBot From the Engine

JaxBot now lives under `JaxEngine/modules/jaxbot` so it can share credentials, UI tokens, and build tooling with the core.

```bash
cd JaxEngine/modules/jaxbot
pnpm install
pnpm dev
```

Keep the `modules` directory structure if you add more specialised consoles in the future.

## Contributing

1. Make changes in a feature branch.
2. Run the relevant build (`npm run build` at the root or `pnpm build` within subprojects).
3. Verify lint/tests where available.
4. Open a pull request summarising the affected app(s).
