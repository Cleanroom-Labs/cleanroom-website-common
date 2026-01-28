"""
Project icons - single source of truth for Cleanroom Labs.

This module provides access to canonical SVG icons for all projects,
used by both the PDF generator and website.
"""

from pathlib import Path
from typing import Optional

ICONS_DIR = Path(__file__).parent

# Map project identifiers to icon filenames
PROJECT_TO_ICON = {
    'airgap-transfer': 'transfer',
    'airgap-deploy': 'deploy',
    'cleanroom-whisper': 'whisper',
    'meta': 'shield',
}


def get_icon_svg(icon_name: str) -> str:
    """
    Get raw SVG content for an icon by name.

    Args:
        icon_name: One of 'transfer', 'deploy', 'whisper', 'document'

    Returns:
        SVG content as string, or empty string if not found
    """
    filepath = ICONS_DIR / f"{icon_name}.svg"

    if not filepath.exists():
        return ''

    return filepath.read_text()


def get_project_icon_svg(
    project: str,
    color: str = "#10b981",
    size: Optional[int] = None,
) -> str:
    """
    Get SVG for a project with customized color and optional size.

    Args:
        project: Project identifier (e.g., 'airgap-transfer', 'cleanroom-whisper')
        color: Color to use for the icon (replaces 'currentColor')
        size: Optional size in pixels (adds width/height attributes)

    Returns:
        Customized SVG content as string
    """
    icon_key = PROJECT_TO_ICON.get(project, 'document')
    svg = get_icon_svg(icon_key)

    if not svg:
        return ''

    # Replace currentColor with the specified color
    svg = svg.replace('currentColor', color)

    # Add size attributes if specified
    if size:
        svg = svg.replace('viewBox=', f'width="{size}" height="{size}" viewBox=')

    return svg


def get_all_icons() -> dict[str, str]:
    """
    Get all available icons as a dictionary.

    Returns:
        Dict mapping icon names to their SVG content
    """
    icons = {}
    for svg_file in ICONS_DIR.glob("*.svg"):
        icons[svg_file.stem] = svg_file.read_text()
    return icons


def list_icons() -> list[str]:
    """
    List all available icon names.

    Returns:
        List of icon names (without .svg extension)
    """
    return [f.stem for f in ICONS_DIR.glob("*.svg")]
