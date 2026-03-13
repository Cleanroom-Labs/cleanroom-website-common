# Cleanroom Website Common

Shared infrastructure for Cleanroom Labs — design system, Sphinx configuration, product icons, and build tools used across the main website and all documentation projects.

## Overview

This repository provides:
- **Design Tokens**: Centralized color, font, spacing, and navigation definitions
- **Tailwind Preset**: Ready-to-use preset for the main Next.js website
- **Sphinx Configuration**: Shared `theme_config.py` with extensions, theme settings, and intersphinx mappings
- **Sphinx Theme**: Auto-generated CSS and templates for documentation
- **Product Icons**: SVG icons with JS and Python exports for website components and PDF generation
- **Build & Validation Scripts**: CSS/nav generation, staleness checking, and Sphinx warning validation

## Repository Structure

```
cleanroom-website-common/
├── tokens/
│   ├── colors.js              # Single source of truth for all design tokens
│   └── navigation.js          # Navigation links and branding
├── tailwind/
│   └── preset.js              # Tailwind preset that imports tokens
├── sphinx/
│   ├── _static/
│   │   └── custom.css         # Generated CSS for Sphinx docs
│   └── _templates/
│       └── layout.html        # Sphinx layout with navigation bar
├── assets/
│   ├── favicons/              # Favicon files (symlinked from sphinx/_static/)
│   ├── social_preview/        # Social preview cards for all projects
│   ├── standardized/          # Raster icons at 160/320/640px
│   └── svg/                   # Product icon SVGs
├── icons/
│   ├── index.js               # JS icon path exports (website)
│   └── index.py               # Python icon exports (PDF generation)
├── scripts/
│   ├── build-sphinx-css.js    # Generate CSS from tokens
│   ├── build-sphinx-nav.js    # Generate Sphinx layout template from tokens
│   ├── check-staleness.js     # Validate generated files are up-to-date
│   └── check-sphinx-warnings.sh  # Validate Sphinx build logs
├── theme_config.py            # Sphinx configuration (extensions, theme settings)
├── package.json               # npm scripts
└── requirements.txt           # Python dependencies for Sphinx
```

## Usage

### Main Website (Tailwind)

Add as a submodule and use the preset in your `tailwind.config.js`:

```javascript
const themePreset = require('./common/tailwind/preset');

module.exports = {
  presets: [themePreset],
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  // ... rest of your config
};
```

### Sphinx Documentation

Add as a submodule at the repo root:

```bash
git submodule add <repo-url> common
```

In your `source/conf.py`:

```python
import sys
import os

sys.path.insert(0, os.path.abspath('../common'))
from theme_config import *

project = 'Your Project'
# ... rest of your config
```

## Building

### Regenerate Sphinx CSS

After modifying design tokens, regenerate the CSS:

```bash
npm run build:sphinx-css
```

This reads `tokens/colors.js` and generates `sphinx/_static/custom.css`.

## Design Tokens

All colors are defined in `tokens/colors.js`:

| Category | Tokens |
|----------|--------|
| Backgrounds | slate-950, slate-900, slate-800, slate-700, content-bg, code-bg |
| Text | text-primary, text-secondary, text-muted, code-text |
| Accent | emerald, emerald-light, emerald-dark |
| Semantic | warning, danger, info, success |
| UI Colors | purple, yellow, orange, blue, violet |
| Syntax | syntax-comment, syntax-keyword, syntax-string, etc. |

## Updating

To update the common submodule in a project:

```bash
cd your-project
git submodule update --remote common
git add common
git commit -m "Update common submodule"
```

## Sphinx Configuration

### Extensions
- `sphinx.ext.autodoc` - API documentation
- `sphinx.ext.intersphinx` - Cross-project references
- `sphinx.ext.graphviz` - Diagram generation
- `sphinx_needs` - Requirements traceability
- `myst_parser` - Markdown support

### Sphinx-Needs
- Flow diagrams enabled (graphviz engine)
- ID regex: `^[A-Z0-9_-]{3,}`
- Link types: tests, implements, satisfies, derives

### CSS Features
- Dark theme matching main website
- Colored left borders for sphinx-needs directives:
  - Use cases: Blue
  - Requirements: Orange
  - Tests: Emerald
  - Implementations: Purple
  - Specifications: Yellow
- Responsive design
- Print-friendly styles
