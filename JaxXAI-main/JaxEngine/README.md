# JaxEngine Core

JaxEngine is the authenticated control center for the JaxXAI platform. It is a Next.js 14 application that ships the trading dashboards, automation workflows, AI assistants, and supporting APIs exposed under `/app/api`.

## Structure

- `app/` – primary routes, including `/dashboard`, `/YOLO`, `/HeyJax`, and `/jaxbot`.
- `modules/` – pluggable consoles that live alongside the engine.
  - `jaxbot/` – the JaxBot strategy console, now colocated with the engine for shared credentials.
- `lib/`, `utils/`, `components/`, `styles/` – shared logic and UI primitives.
- `openai-evals/`, `scripts/` – supporting research and tooling used by the automation flows.

## Getting Started

```bash
pnpm install   # or npm install
pnpm dev       # runs the Next.js dev server at http://localhost:3000
```

You will need the Firebase, Stripe, OKX, LunarCrush, and Gemini credentials defined in `.env.local`. See `next_steps.txt` for a checklist of production setup tasks.

### Working with Modules

Each module is an isolated application that shares services with the engine.

```bash
cd modules/jaxbot
pnpm install
pnpm dev
```

Keep module-specific env files inside the module directory so they remain decoupled from the parent build.

Available modules:

- `modules/jaxbot` – strategy console (Next.js).
- `modules/apex-mods` – Apex automation workspace (Next.js).
- `modules/jax-okx` – OKX trading assistant (Vite).

## Deployment

Deploy JaxEngine and its modules through Vercel. Point the root project (`JaxEngine/`) at the engine and create additional Vercel projects for modules when you need dedicated scaling or custom domains.

## Secret Manager

The dashboard settings page now ships with a lightweight secret manager so administrators can capture API keys without touching the filesystem.

- Set `ADMIN_SECRET_KEY` (for request authentication) and `SECRET_MANAGER_KEY` (32+ character passphrase used for AES‑256 encryption) in your environment.
- Navigate to **Dashboard → Settings → API Keys**, unlock the manager with the admin key, and save credentials. Values are encrypted in-memory and only revealed when an admin copies them.
- A `DELETE /api/secrets/:id` endpoint is available if you need to revoke a stored secret programmatically.
