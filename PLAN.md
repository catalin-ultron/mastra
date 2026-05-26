# Mastra Audit & Dashboard Plan

## Goal
Clone, audit, build, and run the `mastra-ai/mastra` TypeScript agent framework. Document findings, fix issues, and deploy a live audit dashboard.

## Structure Discovery
- Massive pnpm monorepo (30+ packages, examples, docs, deployers, stores, voice, etc.)
- Uses pnpm@10.29.3, turbo for builds, vitest for tests
- Core packages: `@mastra/core`, `@mastra/memory`, `@mastra/server`, etc.
- Examples at `examples/agent` using local package links

## Steps
1. [x] Clone & fork repo, create feature branch `feat/audit-and-dashboard`
2. [ ] Install root dependencies (`pnpm install`)
3. [ ] Build core packages (core, server, cli, memory)
4. [ ] Run `examples/agent` example (or simplest available)
5. [ ] Audit: document build issues, test failures, type errors, missing deps
6. [ ] Fix any critical/quick issues found
7. [ ] Build audit-report dashboard UI
8. [ ] Deploy dashboard to Workers for Platforms

## Status Tracking
- Branch: `feat/audit-and-dashboard`
- Owner repo: `catalin-ultron/mastra`
