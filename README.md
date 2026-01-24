# Sphinx Theme

Unified Sphinx documentation theme for AirGap project documentation.

## Overview

This repository provides a single source of truth for Sphinx configuration and styling across all AirGap project documentation. Each project includes this as a git submodule.

## Contents

- `theme_config.py` - Complete Sphinx configuration including theme, extensions, and sphinx-needs settings
- `_static/custom.css` - Custom CSS styling for IEEE-compliant technical documentation
- `requirements.txt` - Python dependencies for Sphinx documentation

## Usage

### Adding to a Project

Add this repository as a submodule in your project's `source/` directory:

```bash
cd your-project/source
git submodule add <repository-url> sphinx-theme
```

### Configuring conf.py

In your project's `conf.py`, import the shared configuration:

```python
import sys
import os

# Add sphinx-theme submodule to path (local to this repo)
sys.path.insert(0, os.path.abspath('sphinx-theme'))
from theme_config import *

# -- Project information -----------------------------------------------------
project = 'Your Project Name'
copyright = '2024, Cleanroom Labs'
author = 'Cleanroom Labs'
version = '0.1.0'
release = '0.1.0'

# -- Project-specific sphinx-needs types -------------------------------------
needs_types = [
    {'directive': 'usecase', 'title': 'Use Case', 'prefix': 'UC-PROJECT-', 'color': '#BFD8D2', 'style': 'node'},
    {'directive': 'req', 'title': 'Requirement', 'prefix': 'FR-PROJECT-', 'color': '#FEDCD2', 'style': 'node'},
    # ... add your project-specific types
]

# -- Project-specific intersphinx mapping ------------------------------------
intersphinx_mapping.update({
    'other-project': ('https://cleanroomlabs.dev/docs/other-project/', None),
})

# -- Project-specific HTML context -------------------------------------------
html_title = 'Your Project Documentation'
html_context = {
    'display_github': True,
    'github_user': 'cleanroom-labs',
    'github_repo': 'your-project-docs',
    'github_version': 'main',
    'conf_py_path': '/source/',
}
```

### Updating the Theme

To update to the latest theme version:

```bash
cd your-project
git submodule update --remote sphinx-theme
git add sphinx-theme
git commit -m "Update sphinx-theme submodule"
```

## Provided Configuration

### Theme
- `sphinx_rtd_theme` with navigation depth 4
- Sticky navigation, external link styling
- Blue header background (#2980B9)

### Extensions
- `sphinx.ext.autodoc` - API documentation
- `sphinx.ext.intersphinx` - Cross-project references
- `sphinx.ext.todo` - TODO directives
- `sphinx.ext.viewcode` - Source code links
- `sphinx.ext.graphviz` - Diagram generation
- `sphinx_needs` - Requirements traceability
- `myst_parser` - Markdown support

### Sphinx-Needs Base Configuration
- Flow diagram generation enabled (graphviz engine)
- ID regex: `^[A-Z0-9_-]{3,}`
- Extra options: `priority`
- Link types: `tests`, `implements`, `satisfies`, `derives`

### CSS Styling
- Professional IEEE-compliant styling
- Colored left borders for sphinx-needs directives:
  - Use cases: Blue (#3b82c4)
  - Requirements: Orange (#f97316)
  - Tests: Green (#10b981)
  - Implementations: Purple (#8b5cf6)
  - Specifications: Yellow (#eab308)
- Gradient table headers
- Mobile responsive
- Print-friendly styles
