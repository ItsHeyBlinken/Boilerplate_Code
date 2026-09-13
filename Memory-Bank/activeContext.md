# Active Context: Current Work Focus

## Current Session Focus
**Date**: 2026-09-13  
**Primary Tasks**:
1. ✅ Pass 1 + Pass 2 templates
2. ✅ PROJECT_USE_CASES coverage + rankings + collapsible MD
3. ✅ Use Cases Showcase site (Vite) with ZIP downloads for VPS hosting

## Recent Changes
- ✅ `showcase/` Vite React UI: filters, accordion, Download ZIP
- ✅ `scripts/sync-use-cases.mjs` + `scripts/pack-templates.mjs`
- ✅ Root `package.json` scripts; zips gitignored; VPS/nginx notes in showcase README

## Active Decisions
1. Showcase deploys via **Docker Compose** on VPS (`git pull` → `docker compose up -d --build`)
2. ZIPs gitignored; packed inside the Docker image build
3. `PROJECT_USE_CASES.md` remains editorial source of truth

## Next Steps
1. On VPS: pull deploy branch, `docker compose up -d --build`, domain internal port **3000**
2. Optional local smoke tests when adopting templates

## Known Gaps
- Full runtime smoke tests not executed in-library (by design)
- `vue-tsc` bump re-verify after install still pending
