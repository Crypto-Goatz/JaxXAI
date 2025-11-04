# Apex Mods Module

The Apex Mods console is a Next.js module that ships beside the JaxEngine core. It is colocated under `JaxEngine/modules/apex-mods` so it can share Firebase credentials, admin tooling, and deployment workflows with the rest of the stack.

## Quick Start

```bash
cd JaxEngine/modules/apex-mods
pnpm install        # or npm install
pnpm dev            # runs the dev server
```

Copy `.env.example` to `.env.local` and populate the Firebase block with the shared web app values (already provided in the example file). Add any additional API keys needed by the module UI.

## Deployment

Deploy Apex Mods on Vercel or another platform exactly like the other modules:

- Build command: `npm run build`
- Output directory: `.next`
- Environment: the `NEXT_PUBLIC_FIREBASE_*` block plus admin keys if you want secret-manager integration.

Add `apex-mods` as a subdomain or route once deployed (for example `mods.jaxxai.com`).

## Notes

All assets extracted from the provided ZIP live untouched under this directory so the UI can be iterated without affecting other modules.
