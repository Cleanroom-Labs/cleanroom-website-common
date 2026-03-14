"""Layout tests: content centering, anchor scroll offset, and nav bar styling."""

import pytest
from playwright.sync_api import Page


# ---------------------------------------------------------------------------
# Nav Bar Styling
# ---------------------------------------------------------------------------
class TestNavBarStyling:
    """Nav bar matches main website styling: flush, centered, visible border."""

    def test_no_gap_between_nav_and_sub_bar(
        self, page: Page, base_url: str
    ) -> None:
        """Nav bar bottom edge is flush with version sub-bar top edge."""
        page.goto(base_url)
        page.wait_for_load_state("domcontentloaded")

        gap = page.evaluate("""() => {
            const nav = document.querySelector('.site-nav-bar');
            const sub = document.querySelector('.version-sub-bar');
            if (!nav || !sub) return null;
            return sub.getBoundingClientRect().top - nav.getBoundingClientRect().bottom;
        }""")
        assert gap is not None, ".site-nav-bar or .version-sub-bar not found"
        assert abs(gap) <= 1, (
            f"Gap between nav bar and sub-bar is {gap:.1f}px, expected 0"
        )

    def test_nav_content_vertically_centered(
        self, page: Page, base_url: str
    ) -> None:
        """Nav bar content is vertically centered within the bar."""
        page.goto(base_url)
        page.wait_for_load_state("domcontentloaded")

        offset = page.evaluate("""() => {
            const bar = document.querySelector('.site-nav-bar');
            const inner = document.querySelector('.site-nav-inner');
            if (!bar || !inner) return null;
            const barRect = bar.getBoundingClientRect();
            const innerRect = inner.getBoundingClientRect();
            const barMid = barRect.top + barRect.height / 2;
            const innerMid = innerRect.top + innerRect.height / 2;
            return barMid - innerMid;
        }""")
        assert offset is not None, ".site-nav-bar or .site-nav-inner not found"
        assert abs(offset) <= 2, (
            f"Nav content offset from center is {offset:.1f}px, expected ≤2"
        )

    def test_nav_bar_has_visible_bottom_border(
        self, page: Page, base_url: str
    ) -> None:
        """Nav bar bottom border is visible (not hidden by sub-bar override)."""
        page.goto(base_url)
        page.wait_for_load_state("domcontentloaded")

        colors = page.evaluate("""() => {
            const nav = document.querySelector('.site-nav-bar');
            const sub = document.querySelector('.version-sub-bar');
            if (!nav || !sub) return null;
            const navStyle = getComputedStyle(nav);
            const subStyle = getComputedStyle(sub);
            return {
                borderColor: navStyle.borderBottomColor,
                subBg: subStyle.backgroundColor,
            };
        }""")
        assert colors is not None, ".site-nav-bar or .version-sub-bar not found"
        assert colors["borderColor"] != colors["subBg"], (
            f"Nav border color ({colors['borderColor']}) matches sub-bar "
            f"background ({colors['subBg']}), so border is invisible"
        )


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
