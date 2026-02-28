"""Smoke tests: verify fixture site pages load without errors."""

import re

import pytest
from playwright.sync_api import Page, expect

FIXTURE_PAGES = [
    pytest.param("", id="index"),
    pytest.param("/dashboard/overview.html", id="dashboard-overview"),
    pytest.param("/requirements/sample.html", id="requirements-sample"),
    pytest.param("/design/sample.html", id="design-sample"),
    pytest.param("/guide/content.html", id="guide-content"),
]


def test_index_loads(page: Page, base_url: str) -> None:
    """Index page loads and has the expected title."""
    page.goto(base_url)
    expect(page).to_have_title(re.compile(r"Theme Test Fixture"))


@pytest.mark.parametrize("path", FIXTURE_PAGES)
def test_page_loads(page: Page, base_url: str, path: str) -> None:
    """Each fixture page returns 200 and has content."""
    resp = page.goto(f"{base_url}{path}")
    assert resp is not None and resp.ok
    expect(page.locator(".wy-nav-content")).to_be_visible()


def test_no_console_errors_on_index(page: Page, base_url: str) -> None:
    """Index page does not produce JavaScript console errors."""
    errors: list[str] = []

    def _on_console(msg):
        if msg.type == "error":
            text = msg.text
            if "Failed to load resource" not in text:
                errors.append(text)

    page.on("console", _on_console)
    page.goto(base_url)
    page.wait_for_load_state("networkidle")
    assert errors == [], f"Console errors: {errors}"
