"""Sphinx configuration for the theme test fixture site.

This minimal project exercises all Cleanroom Labs theme features so that
theme-level E2E tests can run against stable, representative content.
"""

import os
import sys

# Add common root to sys.path so we can import theme_config.
COMMON_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
sys.path.insert(0, COMMON_ROOT)
sys.path.insert(0, os.path.join(COMMON_ROOT, 'icons'))

from theme_config import *  # noqa: E402, F403, F401

# -- Project information -----------------------------------------------------

project = 'Theme Test Fixture'
copyright = '2025, Cleanroom Labs'
author = 'Cleanroom Labs'

# -- Override paths for fixture site location --------------------------------
# theme_config.py sets these relative to a typical project layout (source/ is
# one level below common/).  Here common is three levels up from source/.

html_static_path = [os.path.join(COMMON_ROOT, 'sphinx', '_static')]
templates_path = [os.path.join(COMMON_ROOT, 'sphinx', '_templates')]
html_favicon = setup_project_favicon('Technical Documentation', COMMON_ROOT)  # noqa: F405

# -- Sphinx-needs types with TEST- prefix ------------------------------------

needs_types = make_needs_types('TEST-')  # noqa: F405

# -- Standalone docs branding ------------------------------------------------

html_context = {}
setup_standalone_docs('Technical Documentation', html_context)  # noqa: F405
setup_version_context(html_context)  # noqa: F405
setup_project_icon('Technical Documentation', html_context)  # noqa: F405

# -- Source settings ---------------------------------------------------------

exclude_patterns = ['_build']
