# AGENTS.md

Comprehensive guide for LLM agents working on this repository.

## Overview

cleanroom-website-common is the shared design system, Sphinx configuration, and build toolkit for all Cleanroom Labs projects. It is a git submodule consumed by the main website and all documentation sites. Changes here propagate to every downstream project.

## Setup and Verification

```bash
npm install                              # Install Node dependencies
npm run build                            # Regenerate all CSS and nav from tokens
npm run check-staleness                  # Verify generated files are up-to-date
pip install -r requirements.txt          # Sphinx + theme dependencies
pip install -r tests/requirements.txt    # Playwright + pytest
python3 -m playwright install chromium   # Install browser for E2E tests
make test-e2e                            # Run full E2E test suite
```

## Project Structure

```
tokens/colors.js              # Source of truth: color palette, semantic colors, fonts
scripts/build-sphinx-css.js   # Generates sphinx/_static/custom.css from tokens
scripts/build-sphinx-nav.js   # Generates sphinx/_templates/layout.html from tokens
scripts/check-staleness.js    # Validates generated files match source
theme_config.py               # Sphinx theme config (needs types, colors, extensions)
sphinx/_static/custom.css     # GENERATED - do not edit directly
sphinx/_templates/layout.html # GENERATED - do not edit directly
icons/                        # Product icon assets (SVG, JS, Python exports)
tailwind/                     # Tailwind CSS preset for the Next.js website
css/base.css                  # Generated base CSS
tests/                        # Playwright E2E tests
tests/fixture-site/           # Sphinx fixture site for testing
tests/conftest.py             # Session fixtures: auto-build, HTTP server, base_url
Makefile                      # test-e2e, build-fixture, clean-fixture targets
```

## Build Pipeline

The build pipeline flows in one direction:

```
tokens/colors.js ──→ scripts/build-sphinx-css.js ──→ sphinx/_static/custom.css
                 ──→ scripts/build-sphinx-nav.js ──→ sphinx/_templates/layout.html
```

**Critical:** Never edit `custom.css` or `layout.html` directly. Edit the source (`build-sphinx-css.js`, `build-sphinx-nav.js`, or `tokens/colors.js`) and run `npm run build`.

## Workflow Invariants

- **Always run `npm run build` after changing tokens or CSS generation scripts** — generated files must stay in sync with source
- **Commit both source and generated files** — CI checks for staleness and will fail if they diverge
- **This repo is shared** — changes affect the main website and all documentation sites
- **Use Playwright for visual verification** — when making CSS/layout changes, build the fixture site, start a local server, and take screenshots to verify before committing
- **Add E2E tests for visual fixes** — every visual bug fix should include a regression test

## Visual Inspection with Playwright

When making CSS or layout changes:

1. `make build-fixture` — build the test fixture site
2. `python3 -m http.server 8766 --directory tests/fixture-site/_build/html` — start local server
3. Use Playwright MCP tools (`browser_navigate`, `browser_take_screenshot`) to inspect
4. Compare against https://cleanroomlabs.dev/ when matching main website styling
5. Iterate until the result looks right, then add an E2E test

## E2E Test Patterns

Tests use Playwright with Chromium. Session fixtures in `conftest.py` handle build and server setup.

```python
# Layout measurement via getBoundingClientRect()
gap = page.evaluate("""() => {
    const a = document.querySelector('.element-a');
    const b = document.querySelector('.element-b');
    return b.getBoundingClientRect().top - a.getBoundingClientRect().bottom;
}""")

# CSS verification via getComputedStyle()
color = page.evaluate("""() => {
    const el = document.querySelector('.element');
    return getComputedStyle(el).borderBottomColor;
}""")
```

Key test files:
- `test_layout.py` — nav bar styling, content centering, scroll offset
- `test_theme.py` — branding, icons, sidebar, word spacing
- `test_responsive.py` — overflow, touch targets, viewport sizes
- `test_navigation.py` — sidebar, breadcrumbs, search, collapse toggle
- `test_smoke.py` — page loading, console errors
- `test_links.py` — internal links, images, diagrams
- `test_needflow.py` — needflow diagram interaction

## Coding Guidance

- Match existing style in `build-sphinx-css.js` — CSS is generated via JS template literals with `${variable}` interpolation
- `theme_config.py` uses `make_needs_types(prefix)` to generate sphinx-needs type definitions — add new types there
- Layout constants (`NAV_HEIGHT`, `VERSION_BAR_HEIGHT`, `COMBINED_HEIGHT`) are defined at the top of `build-sphinx-css.js` — all positioning depends on them
- Keep `!important` on nav bar properties — they must override the RTD base theme

## High-Risk Areas

- **Generated file sync** — forgetting `npm run build` after changes will break CI
- **Shared submodule** — this repo is embedded in 5+ locations; breaking changes affect all documentation sites
- **Nav height constants** — `NAV_HEIGHT = 77` is used for sidebar positioning, content margin, scroll offset, and version sub-bar placement; changing it requires updating all dependents
- **RTD theme overrides** — the Read the Docs base theme applies its own styles; custom CSS needs high specificity or `!important` to win

## Before Finishing

1. Run `npm run build` if you changed tokens or CSS generation scripts
2. Run `npm run check-staleness` to confirm generated files are current
3. Run `make clean-fixture && make test-e2e` to verify all tests pass
4. Take a Playwright screenshot to visually verify CSS/layout changes
