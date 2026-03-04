"""
Shared Sphinx theme configuration for all AirGap project documentation.

This module provides common theme settings that are imported by individual
project conf.py files to ensure consistent branding and styling.

Usage in conf.py:
    import sys
    import os
    sys.path.insert(0, os.path.abspath('../common'))
    from theme_config import *
"""

import os


def get_docs_version():
    """Read documentation version from DOCS_VERSION env var.

    CI sets this from the git tag (e.g., '1.0.0', '1.0.0-rc.1').
    Defaults to 'dev' for local builds and main-branch CI.
    """
    return os.environ.get('DOCS_VERSION', 'dev')


def get_version_stage(version=None):
    """Determine the release stage from a version string.

    Returns one of: 'dev', 'beta', 'rc', 'stable'.
    """
    if version is None:
        version = get_docs_version()
    if version == 'dev':
        return 'dev'
    if '-beta.' in version:
        return 'beta'
    if '-rc.' in version:
        return 'rc'
    return 'stable'


def setup_version_context(html_context_dict):
    """Add version and stage info to html_context for Jinja templates.

    Call from each project's conf.py after defining html_context:
        setup_version_context(html_context)
    """
    ver = get_docs_version()
    stage = get_version_stage(ver)
    html_context_dict['docs_version'] = ver
    html_context_dict['docs_version_stage'] = stage

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

# Path relative to conf.py location (common is one level up from source/)
html_static_path = ['../common/sphinx/_static']

# Templates path for custom layout (includes top navigation bar)
templates_path = ['../common/sphinx/_templates']

# Custom CSS
html_css_files = [
    'custom.css',
]

html_js_files = [
    'needflow-fix.js',
]

# Favicon (shared across all docs - path relative to conf.py)
html_favicon = '../common/sphinx/_static/favicon.ico'

# -- MyST-Parser configuration -----------------------------------------------

myst_enable_extensions = [
    "tasklist",  # Enable checkbox rendering for - [ ] and - [x]
]

# -- Common settings ---------------------------------------------------------

language = 'en'
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store', 'common']

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

# -- Sphinx-needs type colors (single source of truth) ----------------------

NEEDS_COLORS = {
    'usecase': '#BFDBFE',  # blue-200 (tokens: blue #60a5fa)
    'req':     '#FED7AA',  # orange-200 (tokens: orange #f97316)
    'nfreq':   '#FDBA74',  # orange-300 (distinguishable from req)
    'ifreq':      '#93C5FD',  # blue-300 (boundary/interface)
    'convention': '#FEF08A',  # yellow-200 (tokens: yellow #eab308)
    'test':    '#A7F3D0',  # emerald-200 (tokens: emerald #10b981)
    'impl':    '#DDD6FE',  # violet-200 (tokens: purple #8b5cf6)
}


def make_needs_types(prefix=''):
    """Generate needs_types with project-specific prefix.

    Args:
        prefix: Project prefix to prepend to each type prefix (e.g., 'WHISPER-')

    Returns:
        List of needs_types configuration dictionaries
    """
    return [
        {'directive': 'usecase', 'title': 'Use Case', 'prefix': f'{prefix}UC-', 'color': NEEDS_COLORS['usecase'], 'style': 'node'},
        {'directive': 'req', 'title': 'Requirement', 'prefix': f'{prefix}FR-', 'color': NEEDS_COLORS['req'], 'style': 'node'},
        {'directive': 'nfreq', 'title': 'Non-Functional Requirement', 'prefix': f'{prefix}NFR-', 'color': NEEDS_COLORS['nfreq'], 'style': 'node'},
        {'directive': 'ifreq', 'title': 'Interface Requirement', 'prefix': f'{prefix}IR-', 'color': NEEDS_COLORS['ifreq'], 'style': 'node'},
        {'directive': 'convention', 'title': 'Design Convention', 'prefix': f'{prefix}DC-', 'color': NEEDS_COLORS['convention'], 'style': 'node'},
        {'directive': 'test', 'title': 'Test Case', 'prefix': f'{prefix}TC-', 'color': NEEDS_COLORS['test'], 'style': 'node'},
        {'directive': 'impl', 'title': 'Implementation', 'prefix': f'{prefix}IMPL-', 'color': NEEDS_COLORS['impl'], 'style': 'node'},
    ]


# -- Base sphinx-needs configuration -----------------------------------------

needs_build_json = True
needs_build_needflow = True
needs_flow_show_links = False
needs_flow_engine = 'graphviz'
needs_id_regex = '^[A-Z0-9_-]{3,}'
needs_extra_options = ['priority', 'release', 'deprecated']

# Base extra links (can be extended by projects)
needs_extra_links = [
    {
        'option': 'tests',
        'incoming': 'is tested by',
        'outgoing': 'tests',
        'copy': False,
        'color': '#10b981'
    },
    {
        'option': 'implements',
        'incoming': 'is implemented by',
        'outgoing': 'implements',
        'copy': False,
        'color': '#8b5cf6'
    },
    {
        'option': 'satisfies',
        'incoming': 'is satisfied by',
        'outgoing': 'satisfies',
        'copy': False,
        'color': '#f97316'
    },
    {
        'option': 'derives',
        'incoming': 'is derived from',
        'outgoing': 'derives from',
        'copy': False,
        'color': '#60a5fa'
    },
    {
        'option': 'supersedes',
        'incoming': 'is superseded by',
        'outgoing': 'supersedes',
        'copy': False,
        'color': '#94a3b8'
    },
    {
        'option': 'specifies',
        'incoming': 'is specified by',
        'outgoing': 'specifies',
        'copy': False,
        'color': '#3b82f6'
    },
    {
        'option': 'verified_by',
        'incoming': 'verifies',
        'outgoing': 'is verified by',
        'copy': False,
        'color': '#10b981'
    },
    {
        'option': 'realized_by',
        'incoming': 'realizes',
        'outgoing': 'is realized by',
        'copy': False,
        'color': '#8b5cf6'
    },
]

needs_flow_link_types = ['links', 'tests', 'implements', 'satisfies', 'supersedes',
                         'specifies', 'verified_by', 'realized_by']

# -- RST Substitutions for Status Badges -------------------------------------


# -- Per-project home icon setup ---------------------------------------------

def setup_project_icon(project_name, html_context_dict):
    """Set up per-project home icon SVGs in html_context for Jinja templates.

    Call from each project's conf.py after defining html_context:
        setup_project_icon(project, html_context)
    """
    import importlib
    icons_mod = importlib.import_module('icons.index')

    project_map = {
        'Technical Documentation': 'meta',
        'AirGap Transfer': 'airgap-transfer',
        'AirGap Deploy': 'airgap-deploy',
        'Cleanroom Whisper': 'cleanroom-whisper',
    }
    icon_id = project_map.get(project_name, 'meta')

    sidebar_svg = icons_mod.get_project_icon_svg(icon_id, color='#10b981', size=18)
    breadcrumb_svg = icons_mod.get_project_icon_svg(icon_id, color='#059669', size=16)

    # Flatten to single line for safe Jinja/JS embedding
    html_context_dict['project_home_icon_sidebar'] = sidebar_svg.replace('\n', ' ').strip()
    html_context_dict['project_home_icon_breadcrumb'] = breadcrumb_svg.replace('\n', ' ').strip()


def setup_standalone_docs(project_name, html_context_dict):
    """Configure standalone mode — project-branded header, no website nav links.

    Call from conf.py when building docs outside the Cleanroom Labs website:
        setup_standalone_docs('AirGap Transfer', html_context)

    Sets html_context variables that the shared layout template uses to render
    a project-specific header instead of the Cleanroom Labs website header.
    """
    import importlib
    icons_mod = importlib.import_module('icons.index')

    project_map = {
        'Technical Documentation': 'meta',
        'AirGap Transfer': 'airgap-transfer',
        'AirGap Deploy': 'airgap-deploy',
        'Cleanroom Whisper': 'cleanroom-whisper',
    }
    icon_id = project_map.get(project_name, 'meta')
    nav_logo_svg = icons_mod.get_project_icon_svg(icon_id, color='#10b981', size=32)

    html_context_dict['standalone_docs'] = True
    html_context_dict['nav_brand_text'] = project_name
    html_context_dict['nav_brand_logo'] = nav_logo_svg.replace('\n', ' ').strip()


rst_prolog = """
.. |status-active| raw:: html

   <span class="status-badge status-active">Active Development</span>

.. |status-planned| raw:: html

   <span class="status-badge status-planned">Planned</span>
"""
