# Claude Code Compatibility

This repository may contain a root `.claude/` directory for Claude Code compatibility.

For this Codex-centered harness, `.claude/` is not the source of truth. It is a tool-specific compatibility copy generated from or aligned with the shared harness core.

Canonical shared files:

- `shared/harness.yaml`
- `shared/institution-profile.yaml`
- `shared/references/permission-model.yaml`
- `shared/templates/`
- `shared/golden-templates/`

If Claude Code maintains a separate harness repository, keep that work separate and use this adapter only as a compatibility bridge.
