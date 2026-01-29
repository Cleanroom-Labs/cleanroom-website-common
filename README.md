# Cleanroom Theme

Unified theme for Cleanroom Labs - the single source of truth for design tokens used across the main website and Sphinx documentation.

## Overview

This repository provides:
- **Design Tokens**: Centralized color, font, and spacing definitions
- **Tailwind Preset**: Ready-to-use preset for the main Next.js website
- **Sphinx Theme**: Auto-generated CSS and templates for documentation

## Repository Structure

```
cleanroom-theme/
├── tokens/
│   └── colors.js           # Single source of truth for all design tokens
├── tailwind/
│   └── preset.js           # Tailwind preset that imports tokens
├── sphinx/
│   ├── _static/
│   │   └── custom.css      # Generated CSS for Sphinx docs
│   └── _templates/
│       └── layout.html     # Sphinx layout with navigation bar
├── scripts/
│   ├── build-sphinx-css.js # Script to generate CSS from tokens
│   └── build-sphinx-nav.js # Script to generate Sphinx layout template from tokens
├── theme_config.py         # Sphinx configuration (extensions, theme settings)
├── package.json            # npm scripts
└── requirements.txt        # Python dependencies for Sphinx
```

## Usage

### Main Website (Tailwind)

Add as a submodule and use the preset in your `tailwind.config.js`:

```javascript
const themePreset = require('./cleanroom-theme/tailwind/preset');

module.exports = {
  presets: [themePreset],
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  // ... rest of your config
};
```

### Sphinx Documentation

Add as a submodule to your docs `source/` directory:

```bash
git submodule add <repo-url> source/cleanroom-theme
```

In your `conf.py`:

```python
import sys
import os

sys.path.insert(0, os.path.abspath('cleanroom-theme'))
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

To update the theme in a project:

```bash
cd your-project
git submodule update --remote cleanroom-theme
git add cleanroom-theme
git commit -m "Update theme"
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
