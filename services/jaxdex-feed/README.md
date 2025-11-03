## JaxDex Unified Feed

This Cloud Run microservice is the single source of truth for JaxXAI market data.  
It sits behind every dashboard, bot, and training loop so the entire ecosystem consumes the same payload.

### How it works

1. Pulls live listings from CoinMarketCap (additional sources can be stitched in here later: OKX, Helius, custom analytics, etc.).
2. Normalises the response into `StageData[]` (the same format consumed by the Vite frontend and downstream services).
3. Exposes a single `GET /feed` endpoint with CORS enabled.
4. Rotates API keys automatically when you supply multiple `CMC_KEYS`.

### Environment variables (in Secret Manager)

| Key                    | Description                                         |
| ---------------------- | --------------------------------------------------- |
| `CMC_KEYS`             | Comma-separated list of CoinMarketCap API keys.     |
| `OKX_API_KEY`          | _(optional)_ Use when enriching with OKX order flow |
| `OKX_API_SECRET`       | _(optional)_                                         |
| `OKX_API_PASSPHRASE`   | _(optional)_                                         |
| `HELIUS_API_KEY`       | _(optional)_ Solana on-chain augmentation.          |

Only `CMC_KEYS` is required for the basic feed. Add more secrets as you expand sources.

### Local development

```bash
cd services/jaxdex-feed
CMC_KEYS=your-key npm install
CMC_KEYS=your-key npm run dev
# curl http://localhost:8080/feed
```

### Deploy to Cloud Run

```bash
# From the repo root:
gcloud run deploy jaxdex-feed \
  --source ./services/jaxdex-feed \
  --region us-west1 \
  --allow-unauthenticated \
  --set-secrets CMC_KEYS=projects/YOUR_PROJECT/secrets/cmc-keys:latest
```

**Make sure** the Cloud Run service account has `Secret Manager Secret Accessor`.

### Wiring the frontend / bots

Once deployed, set the Vite env variables before you build the dashboard:

```
VITE_JAXDEX_DATA_ENDPOINT=https://jaxdex-feed-xyz.us-west1.run.app/feed
VITE_JAXDEX_API_KEYS=public-placeholder
```

Every other service (bots, training jobs, reporting) should read from the same endpoint.  
This guarantees that “4everTrain”, paper trading, and the public teasers all reference identical data snapshots.

### Extending the feed

Add more enrichment inside `src/index.js`:

- Merge OKX tick data for execution-ready quotes.
- Stitch in Helius whale events for meme coin monitoring.
- Persist snapshots to BigQuery for backtesting (`4everTrain`).

As long as the response remains `StageData[]`, the rest of the ecosystem continues to work without change.
