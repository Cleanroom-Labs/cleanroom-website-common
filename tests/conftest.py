"""Shared fixtures for theme E2E tests.

Builds the fixture Sphinx site (if not already built), starts a local HTTP
server to serve it, and provides a ``base_url`` fixture for all tests.
"""

import os
import signal
import socket
import subprocess
import time

import pytest

# Port for the local HTTP server (override with DOCS_TEST_PORT env var).
PORT = int(os.environ.get("DOCS_TEST_PORT", "8766"))

# Paths relative to this file.
_HERE = os.path.dirname(os.path.abspath(__file__))
_COMMON_ROOT = os.path.dirname(_HERE)
_SOURCE_DIR = os.path.join(_HERE, "fixture-site", "source")
_BUILD_DIR = os.path.join(_HERE, "fixture-site", "_build", "html")


def _wait_for_server(host: str, port: int, timeout: float = 10.0) -> None:
    """Block until the HTTP server is accepting connections."""
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        try:
            with socket.create_connection((host, port), timeout=1):
                return
        except OSError:
            time.sleep(0.2)
    raise RuntimeError(f"Server on {host}:{port} did not start within {timeout}s")


@pytest.fixture(scope="session")
def _docs_build():
    """Build the fixture site with Sphinx (once per session)."""
    if os.path.isdir(_BUILD_DIR) and os.listdir(_BUILD_DIR):
        return  # Already built (e.g. by Makefile or previous run)

    result = subprocess.run(
        [
            "sphinx-build", "-b", "html",
            _SOURCE_DIR, _BUILD_DIR, "-W",
        ],
        capture_output=True,
        text=True,
        cwd=_COMMON_ROOT,
    )
    if result.returncode != 0:
        pytest.fail(
            f"Sphinx build failed:\nstdout: {result.stdout}\nstderr: {result.stderr}"
        )


@pytest.fixture(scope="session")
def _docs_server(_docs_build):
    """Start a local HTTP server serving the built fixture site."""
    html_dir = os.path.abspath(_BUILD_DIR)
    if not os.path.isdir(html_dir):
        pytest.skip(f"Built docs not found at {html_dir}")

    proc = subprocess.Popen(
        ["python3", "-m", "http.server", str(PORT), "--directory", html_dir],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    _wait_for_server("localhost", PORT)
    yield proc
    proc.send_signal(signal.SIGTERM)
    proc.wait(timeout=5)


@pytest.fixture(scope="session")
def base_url(_docs_server):
    """Base URL for all page navigations."""
    return f"http://localhost:{PORT}"
