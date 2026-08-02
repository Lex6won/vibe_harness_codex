# Codex Adapter

The root `AGENTS.md` is the Codex source of truth.

Use this adapter only as a short compatibility note when copying adapter-specific files into another project. Read `AGENTS.md`, `shared/harness.yaml`, `shared/institution-profile.yaml`, `shared/references/permission-model.yaml`, and `shared/references/harness-enforcement-contract.yaml` first.

Keep code inside the agency-approved Track, runtime, DBMS, plugin, and library policy. Do not introduce external CDN, Supabase/Firebase direct dependencies, or unapproved runtimes. Do not push, deploy, or write to external systems unless the user explicitly asks. Produce the official output package.

Implement functional code only in Python or JavaScript. For package decisions, call `vibecode-checker/gvskb` and enforce its registry-backed verdict; do not call the package registry directly from the harness.
