<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Jax OKX Module

This zip has been unpacked into `JaxEngine/modules/jax-okx` so it functions as another plugin within the engine. It is a Vite + React 19 application.

## Run Locally

```bash
cd JaxEngine/modules/jax-okx
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and provide the Firebase/Gemini credentials needed by the bot UI.

## Deploy

Deploy like any Vite project (e.g. Vercel, Netlify). Hook it into the JaxEngine ecosystem by routing the desired domain/subdomain to this module.
