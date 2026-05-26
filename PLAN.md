# Mastra Audit Plan — Catalin / 1747582122

## Context
- Target: https://github.com/mastra-ai/mastra (TS agent framework, exact repo)
- Fork: catalin-ultron/mastra on branch audit/catalin/1747582122
- Status: dependencies NOT installed yet; last attempt lost to container recycle
## Audit Steps
1. [ ] Install dependencies (pnpm 10.29.3 via system path)
2. [ ] Audit monorepo structure — packages, examples, build tooling
3. [ ] Pick a runnable example (weather, stock-price, or hello-world)
4. [ ] Build the example
5. [ ] Run the example (stub env vars if needed)
6. [ ] Fix any build/runtime issues found
7. [ ] Deploy a live UI if applicable (deploy_wfp on static output)
8. [ ] Write audit report (AUDIT.md)
## Blockers / Notes
- Prior `pnpm install` attempts failed due to container recycling; running sync this time
- corepack unavailable; using system pnpm at /home/catalin/.local/share/pnpm/pnpm
