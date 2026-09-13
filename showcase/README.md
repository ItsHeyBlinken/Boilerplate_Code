# Boilerplate Use Cases Showcase

Vite + React UI for browsing ranked project ideas from `PROJECT_USE_CASES.md`, with **per-template ZIP downloads**.

## Recommended: Docker on your VPS (git pull → compose)

ZIPs stay **out of git**. The image builds them during `docker compose build`.

From the **repo root** on the VPS (deploy branch checked out):

```bash
git pull
docker compose up -d --build
```

Site: `http://YOUR_VPS:8080` (override with `SHOWCASE_PORT=80` or put a reverse proxy in front).

```bash
# optional port
SHOWCASE_PORT=80 docker compose up -d --build
```

Rebuild after you change templates or `PROJECT_USE_CASES.md`.

### Files
- [`Dockerfile`](../Dockerfile) — Node build (sync + pack + vite) → nginx Alpine
- [`docker-compose.yml`](../docker-compose.yml) — `showcase` service
- [`nginx.conf`](./nginx.conf) — SPA + `/downloads/` ZIP routes

## Local development (no Docker)

1. From the **repo root**: `npm run showcase:install`
2. `npm run showcase:dev` (sync + pack + Vite)
3. Optional production build without Docker: `npm run showcase:build` → serve `showcase/dist`

## Scripts (repo root)

| Script | Purpose |
|--------|---------|
| `npm run sync:use-cases` | Parse MD → `showcase/src/data/*.json` |
| `npm run pack:templates` | Zip each `boilerplate-library/*` → `public/downloads` |
| `npm run showcase:dev` | Sync + pack + Vite dev |
| `npm run showcase:build` | Sync + pack + production build |
| `npm run showcase:docker` | `docker compose up -d --build` |

ZIPs are gitignored; Docker (or `pack:templates`) creates them where the site is built.

## License

MIT (same as library)
