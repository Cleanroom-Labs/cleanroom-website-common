"""Layout tests: content centering and anchor scroll offset."""

import pytest
from playwright.sync_api import Page


# ---------------------------------------------------------------------------
# Anchor Scroll Offset
# ---------------------------------------------------------------------------
class TestAnchorScrollOffset:
    """Anchor targets scroll below the fixed navbar."""

    def test_anchor_scroll_clears_navbar(
        self, page: Page, base_url: str
    ) -> None:
        """Navigating to an anchor positions the element below the navbar."""
        page.goto(f"{base_url}/requirements/sample.html#FR-TEST-001")
        page.wait_for_load_state("networkidle")

        top = page.evaluate("""() => {
            const el = document.getElementById('FR-TEST-001');
            if (!el) return -1;
            return el.getBoundingClientRect().top;
        }""")
        assert top >= 60, (
            f"Anchor target top={top:.0f}px, expected >=60 (below navbar)"
        )


# ---------------------------------------------------------------------------
# Content Layout Balance
# ---------------------------------------------------------------------------
class TestContentBalance:
    """Document content is centered within the content area."""

    VIEWPORTS = [
        pytest.param(1440, id="1440px"),
        pytest.param(1920, id="1920px"),
    ]

    @pytest.mark.parametrize("width", VIEWPORTS)
    def test_content_centered_with_sidebar(
        self, page: Page, base_url: str, width: int,
    ) -> None:
        """With sidebar expanded, .document has equal whitespace on each side.

        At 1920px the .wy-nav-content max-width (1200px) kicks in, so this
        also verifies that .wy-nav-content itself is centered within the
        content-wrap area.
        """
        page.set_viewport_size({"width": width, "height": 900})
        page.goto(base_url)
        page.wait_for_load_state("domcontentloaded")

        gaps = page.evaluate("""() => {
            const doc = document.querySelector('.document');
            const sidebar = document.querySelector('.wy-nav-side');
            if (!doc || !sidebar) return null;
            const docRect = doc.getBoundingClientRect();
            const sidebarRight = sidebar.getBoundingClientRect().right;
            return {
                leftGap: docRect.left - sidebarRight,
                rightGap: window.innerWidth - docRect.right,
            };
        }""")
        assert gaps is not None, ".document or .wy-nav-side not found"
        diff = abs(gaps["leftGap"] - gaps["rightGap"])
        assert diff <= 30, (
            f"Content not centered at {width}px: "
            f"left gap={gaps['leftGap']:.0f}px, "
            f"right gap={gaps['rightGap']:.0f}px (diff={diff:.0f}px)"
        )
