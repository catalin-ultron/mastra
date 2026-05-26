# Mastra Codebase Audit Report

## Repo Info
- Repository: mastra-ai/mastra
- Branch audited: feat/audit-and-build
- Commit: 777fdf5cfb (Add audit plan)
- Clone date: 2025-05-26

## Structure Overview

### Packages (31 dirs under packages/)
Core packages:
- `core` — main agent framework primitives (agents, workflows, memory, tools)
- `cli` — CLI tooling (`mastra` command)
- `server` — server adapters and routing
- `deployer` — deployment abstraction
- `evals` — evaluation framework (scorers, judges, metrics)
- `memory` — memory/storage primitives
- `rag` — RAG / vector search primitives
- `mcp` — Model Context Protocol integration
- `auth` — auth adapters (auth0, better-auth, okta, workos, cloud, studio)
- `playground` / `playground-ui` — dev UI
- `client-js` / `client-sdks/react` — client SDKs
- `loggers`, `observability`, `fastembed`, `rag`, `evals`, `vector-stores/*`
- Stores: `libsql`, `duckdb`, `postgres`, `upstash`, `lancedb`, `milvus`, `pgvector`

### Examples
- `examples/agent` — runnable agent example with linked workspace packages
- `examples/agent-v6` — ai-sdk-v6 example
- `examples/evals-with-memory` — eval + memory example
- `examples/durable-agents` — durable agent example
- `examples/inngest` — inngest workflow example
- `examples/voice` — voice examples

### Build System
- **Package manager**: pnpm 10.29.3 with workspaces (143 packages)
- **Monorepo orchestration**: Turbo v2.9.6
- **Build tool**: tsup (patches applied), Vite 7.3.1
- **TypeScript**: 6.0.3
- **Tests**: Vitest 4.1.5
- **Lint**: ESLint 10.3.0 + Prettier 3.8.3

### Key Scripts
- `pnpm build` — builds all non-example packages via Turbo
- `pnpm dev:playground` — dev mode for playground UI
- `pnpm test` — vitest run across workspace
- `pnpm setup` — install + build

### Issues Noted
1. **Patch warnings**: changesets patch failed to apply on install.
2. **Binary stubs**: `create-mastra` bin stub missing (`dist/index.js` not found) — expected until CLI is built.
3. **Build scripts ignored**: many native deps (esbuild, sharp, swc, etc.) had build scripts skipped. Run `pnpm approve-builds` if full build is needed.
4. **Example setup**: examples are NOT part of the pnpm workspace — each has its own `package.json` and `pnpm-lock.yaml`, and uses `link:` overrides to local packages.

## Next Steps
1. Run `pnpm build:packages` to compile core packages.
2. Navigate to `examples/agent` and run with `pnpm install --ignore-workspace` then `pnpm start`.
3. Verify built artifacts run correctly.
