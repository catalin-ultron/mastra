const findings = [
  {
    severity: 'high',
    category: 'Dependencies',
    title: 'Zod dual-version peer dependency is risky',
    description: 'packages/core declares zod peer dep as "^3.25.0 || ^4.0.0". Zod v3 and v4 are majorly incompatible (different schemas, different APIs). A consumer pinning to one version will silently break if transitive deps expect the other. This is a deliberate strategy but creates downstream fragility.',
    file: 'packages/core/package.json',
    fix: 'Split into separate release lines (@mastra/core-v3 and @mastra/core-v4) or pin to v4 and provide a v3 compat shim package.'
  },
  {
    severity: 'high',
    category: 'Build System',
    title: 'Native N-API dependency in devDependencies',
    description: '@ast-grep/napi (^0.40.5) is a native N-API module used in devDependencies. Cross-platform builds (ARM64, musl, Windows) may fail if prebuilt binaries are unavailable or if the sandbox cannot compile native extensions.',
    file: 'packages/core/package.json',
    fix: 'Add @ast-grep/napi to optionalDependencies or provide a pure-JS fallback for platforms without prebuilt binaries.'
  },
  {
    severity: 'high',
    category: 'Developer Experience',
    title: 'Examples require bun but do not declare it',
    description: 'The agent and agent-v6 examples use "npx bun" in npm scripts, but bun is not listed in devDependencies, engines, or packageManager. Developers without bun installed will get a cryptic runtime error at example startup.',
    file: 'examples/agent/package.json, examples/agent-v6/package.json',
    fix: 'Replace "npx bun" with "tsx" (already a devDependency) or add bun as an explicit engine/devDependency with an install hint.'
  },
  {
    severity: 'medium',
    category: 'Build System',
    title: 'onSuccess hooks do filesystem mutations that may fail in sandboxes',
    description: 'packages/core tsup.config.ts has a heavy onSuccess hook that runs Babel transforms, type generation via @internal/types-builder, and copies files. packages/cli onSuccess resolves @internal/playground via import.meta.resolve and copies dist/. These will break in read-only or permission-restricted environments.',
    file: 'packages/core/tsup.config.ts, packages/cli/tsup.config.ts',
    fix: 'Make onSuccess hooks idempotent and graceful-fallback (warn + continue if copy fails). Document environment requirements.'
  },
  {
    severity: 'medium',
    category: 'Developer Experience',
    title: 'Orphaned voice example with no documentation',
    description: 'examples/voice/ has no package.json, no README, and no build/run instructions. It contains two subdirectories (voice-memo-app, interactive-story) that are completely undocumented. New contributors cannot discover or run this example.',
    file: 'examples/voice/',
    fix: 'Add a package.json with runnable scripts, a README.md explaining setup, or remove the directory if it is no longer maintained.'
  },
  {
    severity: 'medium',
    category: 'Developer Experience',
    title: 'Most examples lack .env.example files',
    description: 'Only examples/agent has a .env.example (and it is only 15 bytes, likely empty). The other 5 example directories have no environment documentation, making it impossible for developers to know required API keys (OpenAI, Inngest, Redis, etc.).',
    file: 'examples/*/',
    fix: 'Add a comprehensive .env.example to every example directory listing all required and optional environment variables.'
  },
  {
    severity: 'medium',
    category: 'Dependencies',
    title: 'Redundant resolutions field alongside pnpm.overrides',
    description: 'Root package.json contains both Yarn-style "resolutions" and pnpm-style "pnpm.overrides". pnpm ignores resolutions, but this indicates a migration artifact that could confuse contributors or tooling.',
    file: 'package.json',
    fix: 'Remove the resolutions field if the project is exclusively pnpm-based.'
  },
  {
    severity: 'medium',
    category: 'Build System',
    title: 'Sandbox-hostile lifecycle scripts',
    description: 'Root package.json has prepare (husky), preinstall (only-allow pnpm), dev:services:up/down (docker compose), and setup (pnpm install + build). These will fail in CI sandboxes, containerized builds, or locked-down environments.',
    file: 'package.json',
    fix: 'Guard prepare/preinstall scripts with environment checks (e.g., CI=true skip husky). Move docker-dependent scripts to a separate compose-local.yaml or makefile.'
  },
  {
    severity: 'medium',
    category: 'Code Quality',
    title: 'Missing error handling in Mastra async registration flows',
    description: 'Mastra class register methods (addAgent, addWorkflow, etc.) do not consistently wrap async side effects (processor registration, workspace registration, scorer registration) in try/catch. Failures are logged at debug level, which is invisible in production default WARN level.',
    file: 'packages/core/src/mastra/index.ts:1781-1813',
    fix: 'Surface registration failures at warn or error level, or collect them into a startup health check report.'
  },
  {
    severity: 'low',
    category: 'Dependencies',
    title: 'No .npmrc or .pnpmrc for CI reproducibility',
    description: 'The monorepo relies entirely on pnpm-workspace.yaml defaults. No .npmrc sets strict-peer-dependencies, resolution-mode, or registry configuration. This can lead to non-deterministic installs across environments.',
    file: '(repo root)',
    fix: 'Add .npmrc with strict-peer-dependencies=true, auto-install-peers=false, and any registry overrides.'
  },
  {
    severity: 'low',
    category: 'Build System',
    title: 'tsconfig lacks composite: true for incremental builds',
    description: 'tsconfig.node.json has composite commented out. Without composite, TypeScript project references are not enforced, meaning incremental builds and --build mode do not work for the monorepo.',
    file: 'tsconfig.node.json',
    fix: 'Enable "composite": true in the base tsconfig and ensure all package tsconfigs extend it correctly.'
  },
  {
    severity: 'low',
    category: 'Developer Experience',
    title: 'Inconsistent example versioning strategy',
    description: 'examples/agent uses "latest" tags, examples/agent-v6 uses "beta" tags, and examples/durable-agents uses exact beta versions. This inconsistency makes it unclear which example is the canonical reference.',
    file: 'examples/*/package.json',
    fix: 'Standardize on workspace:* links for all examples so they always run against the local source.'
  },
  {
    severity: 'low',
    category: 'Code Quality',
    title: 'TODO comment in license validation',
    description: 'packages/core/src/auth/ee/license.ts:53 has a TODO: "Implement actual license validation". This indicates a stubbed enterprise feature that may silently fail or allow unrestricted access.',
    file: 'packages/core/src/auth/ee/license.ts:53',
    fix: 'Implement the license validation or return a hard-error when the EE module is invoked without a valid license.'
  },
  {
    severity: 'info',
    category: 'Architecture',
    title: 'Well-organized monorepo with strong supply-chain posture',
    description: 'pnpm-workspace.yaml uses blockExoticSubdeps: true, trustPolicy: no-downgrade, and minimumReleaseAge gating. These are strong security practices that protect against supply-chain attacks.',
    file: 'pnpm-workspace.yaml'
  },
  {
    severity: 'info',
    category: 'Architecture',
    title: 'Clean turbo pipeline without cyclic dependencies',
    description: 'turbo.json defines a sensible build graph with typecheck depending on build. No cyclic task dependencies detected.',
    file: 'turbo.json'
  },
  {
    severity: 'info',
    category: 'Build System',
    title: 'No pre-existing dist directories — clean build state',
    description: 'The repository contains no stale dist/ artifacts, confirming it is built entirely from source on each fresh checkout.',
    file: '(repo-wide)'
  }
];

const recommendations = [
  'Split the zod peer dependency into version-specific release lines or add a runtime version check on startup to warn consumers.',
  'Replace all "npx bun" references in example scripts with "tsx" (which is already a devDependency in agent).',
  'Add .env.example files to every example directory with inline comments explaining each variable.',
  'Delete or document the orphaned examples/voice/ directory to avoid confusing contributors.',
  'Add CI-friendly guards to lifecycle scripts (prepare, preinstall) so they gracefully skip in sandboxed environments.',
  'Promote debug-level registration errors to warn level so production deployments surface startup misconfigurations.',
  'Add an .npmrc file to enforce deterministic pnpm behavior across CI and local environments.'
];
