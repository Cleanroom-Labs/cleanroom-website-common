See AGENTS.md for full project context, commands, and coding guidance.

@AGENTS.md

## Critical Workflow Invariants

If the above include is not processed, these are the essential rules:

- **Always run `npm run build` after changing tokens or CSS generation scripts** — generated files must stay in sync
- **Commit both source and generated files** — CI checks for staleness
- **Use Playwright for visual verification** — build fixture site, start HTTP server, screenshot to verify CSS/layout changes
- **Run `make test-e2e` before finishing** — full Playwright E2E suite must pass
- **Never edit `sphinx/_static/custom.css` or `sphinx/_templates/layout.html` directly** — edit the source scripts in `scripts/` and regenerate
