"""
Shared Sphinx theme configuration for all AirGap project documentation.

This module provides common theme settings that are imported by individual
project conf.py files to ensure consistent branding and styling.

Usage in conf.py:
    import sys
    import os
    sys.path.insert(0, os.path.abspath('sphinx-theme'))
    from theme_config import *
"""

# -- Theme configuration -----------------------------------------------------

html_theme = 'sphinx_rtd_theme'

html_theme_options = {
    'navigation_depth': 4,
    'collapse_navigation': False,
    'sticky_navigation': True,
    'includehidden': True,
    'titles_only': False,
    'logo_only': False,
    'prev_next_buttons_location': 'bottom',
    'style_external_links': True,
    'style_nav_header_background': '#2980B9',
}

# -- Extensions --------------------------------------------------------------

extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.intersphinx',
    'sphinx.ext.todo',
    'sphinx.ext.viewcode',
    'sphinx.ext.graphviz',
    'sphinx_needs',
    'myst_parser',
]

# -- Static files and CSS ----------------------------------------------------

# Path relative to conf.py location (sphinx-theme is a subdirectory)
html_static_path = ['sphinx-theme/_static']
html_css_files = ['custom.css']

# -- Common settings ---------------------------------------------------------

language = 'en'
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store', '.venv', 'sphinx-theme']

source_suffix = {
    '.rst': 'restructuredtext',
    '.md': 'markdown',
}

master_doc = 'index'

# -- HTML output options -----------------------------------------------------

html_show_sourcelink = True
html_show_sphinx = False
html_show_copyright = True

# -- Common intersphinx mapping ----------------------------------------------

intersphinx_mapping = {
    'python': ('https://docs.python.org/3', None),
}

# -- Base sphinx-needs configuration -----------------------------------------

needs_build_needflow = True
needs_flow_show_links = True
needs_flow_engine = 'graphviz'
needs_id_regex = '^[A-Z0-9_-]{3,}'
needs_extra_options = ['priority']

# Base extra links (can be extended by projects)
needs_extra_links = [
    {
        'option': 'tests',
        'incoming': 'is tested by',
        'outgoing': 'tests',
        'copy': False,
        'color': '#84B39D'
    },
    {
        'option': 'implements',
        'incoming': 'is implemented by',
        'outgoing': 'implements',
        'copy': False,
        'color': '#00A8B5'
    },
    {
        'option': 'satisfies',
        'incoming': 'is satisfied by',
        'outgoing': 'satisfies',
        'copy': False,
        'color': '#FEDCD2'
    },
    {
        'option': 'derives',
        'incoming': 'is derived from',
        'outgoing': 'derives from',
        'copy': False,
        'color': '#BFD8D2'
    },
]

needs_flow_link_types = ['links', 'tests', 'implements', 'satisfies']
