# Mastra Audit Plan

Repo: github.com/mastra-ai/mastra (forked to catalin-ultron/mastra)
Branch: feat/mastra-audit

## Steps
- [ ] Install dependencies (system pnpm, bypass corepack pin if needed)
- [ ] Build the core packages (mastra/core, mastra)
- [ ] Find a runnable example (simplest TS or Next.js)
- [ ] Fix build/runtime issues encountered
- [ ] Build a deployable UI (staffer or next example)
- [ ] Deploy live via deploy_wfp
- [ ] Report: branch, SHA, URL, status

## Blockers noted
- pnpm lockfile is v10 but system has pnpm 11.2.2 — using system pnpm, may need to ignore engines
