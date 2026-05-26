# Mastra TS Agent Framework — Audit & Build Plan

## Goal
Clone, audit, build, run an example, fix issues, and deploy a live UI for the Mastra AI agent framework.

## Repo
- Fork: catalin-ultron/mastra
- Upstream: mastra-ai/mastra
- Branch: feat/audit-build-deploy

## Environment
- Node: v22.13.0 (meets >= 22.13.0 requirement)
- pnpm: 10.29.3 (meets >= 10.18.0 requirement)
- Package manager: pnpm monorepo with turbo

## Steps
- [x] Fork and clone the repository
- [ ] Install dependencies (`pnpm install`)
- [ ] Build core packages (`pnpm build:packages` or full `pnpm build`)
- [ ] Explore repo structure: packages/core, packages/cli, examples/agent, packages/playground-ui
- [ ] Run example agent (`examples/agent` via `pnpm mastra:dev`)
- [ ] Audit: document build issues, missing deps, broken examples, type errors
- [ ] Fix critical issues
- [ ] Build and deploy a live UI (playground-ui or a custom Next.js app)
- [ ] Write final audit report and commit

## Key Packages to Audit
- `packages/core` — agent primitives, LLM routing, tools, workflows, memory
- `packages/cli` — CLI and dev server
- `packages/playground-ui` — web UI for debugging agents
- `examples/agent` — canonical example for testing changes
- `packages/deployer` — deployment adapters
- `packages/rag`, `packages/memory`, `packages/evals` — supporting primitives

## Notes
- Full build (`pnpm build`) may OOM; use `--max-old-space-size=4096` if needed
- `examples/agent` needs `--ignore-workspace` for its own deps
- Some tests need Docker services; skip if unavailable
- If key service missing (e.g. OpenAI key), stub/mock and continue
