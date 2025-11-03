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

Each module is an isolated Next.js application that shares services with the engine.

```bash
cd modules/jaxbot
pnpm install
pnpm dev
```

Keep module-specific env files inside the module directory so they remain decoupled from the parent build.

## Deployment

Deploy JaxEngine and its modules through Vercel. Point the root project (`JaxEngine/`) at the engine and create additional Vercel projects for modules when you need dedicated scaling or custom domains.
