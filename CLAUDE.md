# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

cleanroom-website-common is the shared design system, Sphinx configuration, and build toolkit for all Cleanroom Labs projects. It provides:
- Design tokens (colors, typography, spacing, navigation) as a single source of truth
- Tailwind preset for the main Next.js website
- Sphinx theme configuration, CSS, and templates for documentation
- Product icons (SVG, JS, and Python exports)
- Build and validation scripts (CSS generation, staleness checking, Sphinx warning validation)

## Key Files

| File | Purpose |
|------|---------|
| `tokens/colors.js` | Single source of truth for design tokens |
| `theme_config.py` | Sphinx theme configuration (imported by docs) |
| `sphinx/_static/custom.css` | Generated CSS for Sphinx docs |
| `sphinx/_templates/layout.html` | Generated Sphinx layout template (top nav, sidebar toggle, icons) |
| `scripts/check-staleness.js` | Validates generated files are up-to-date |
| `scripts/build-sphinx-css.js` | Generates CSS from tokens |
| `scripts/build-sphinx-nav.js` | Generates Sphinx layout template from tokens |

## Build Commands

| Command | Purpose |
|---------|---------|
| `npm run build` | Regenerate all CSS and nav files from tokens |
| `npm run check-staleness` | Check if generated files need rebuilding |
| `npm run fix-staleness` | Auto-regenerate stale files |

## Working in This Repo

### After Changing Tokens

When you modify `tokens/colors.js` or other token files:

1. Run `npm run build` to regenerate outputs
2. Run `npm run check-staleness` to verify files are up-to-date
3. Commit all changes (both source and generated files)

### Syncing to Other Repos

This repo is a submodule in multiple locations. After making changes:

1. Commit and push changes in this repo
2. In the parent website repo, run `./scripts/sync-common.py` to propagate
3. The sync script updates all 5 submodule locations

### Important Notes

- **Always run `npm run build` after token changes** - generated files must stay in sync
- **CI checks for staleness** - PRs will warn if generated files are out of date
- **This repo is shared** - changes affect the website and all documentation sites
- **Test locally** - build docs with `node scripts/build-docs.mjs` in parent repo to verify

## Directory Structure

```
cleanroom-website-common/
├── tokens/              # Source of truth for design system
│   └── colors.js        # Color palette, semantic colors
├── css/                 # Generated CSS files
│   └── base.css
├── sphinx/              # Generated Sphinx assets
│   ├── _static/
│   │   └── custom.css
│   └── _templates/
│       └── layout.html
├── tailwind/            # Tailwind CSS configuration
├── icons/               # Icon assets
├── scripts/             # Build and validation scripts
├── theme_config.py      # Sphinx configuration module
└── package.json         # npm scripts and metadata
```
