/**
 * Version Switcher for Sphinx Documentation
 *
 * Fetches versions.json and populates the version dropdown.
 * Navigates to the same page path under the selected version directory.
 */
(function() {
    'use strict';

    var VERSIONS_JSON_PATH = '/docs/versions.json';
    var select = document.getElementById('version-select');
    if (!select) return;

    var currentVersion = select.getAttribute('data-current-version') || 'dev';

    // Only fetch versions.json when served under /docs/ (not standalone)
    if (!window.location.pathname.startsWith('/docs/')) return;

    fetch(VERSIONS_JSON_PATH)
        .then(function(response) {
            if (!response.ok) throw new Error('versions.json not found');
            return response.json();
        })
        .then(function(versions) {
            if (!versions.length) return;

            // Clear placeholder and populate with all versions
            select.innerHTML = '';

            versions.forEach(function(entry) {
                var option = document.createElement('option');
                option.value = entry.url;
                option.textContent = entry.version;
                if (entry.stable) option.textContent += ' (stable)';
                if (entry.dev) option.textContent += ' (dev)';
                if (entry.version === currentVersion) option.selected = true;
                select.appendChild(option);
            });
        })
        .catch(function() {
            // versions.json not available (local build) — keep showing current version only
        });

    select.addEventListener('change', function() {
        var targetBase = select.value;
        // Try to navigate to the same page under the new version
        var currentPath = window.location.pathname;
        // Extract the page path after the version directory
        // Pattern: /docs/<version>/rest/of/path
        var match = currentPath.match(/^\/docs\/[^/]+\/(.*)$/);
        var pagePath = match ? match[1] : 'index.html';
        window.location.href = targetBase + pagePath;
    });
})();
