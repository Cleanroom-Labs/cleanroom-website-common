#!/usr/bin/env node

/**
 * Cleanroom Design System - Sphinx Navigation Template Generator
 *
 * Generates sphinx/_templates/layout.html from navigation config.
 * Run: npm run build:sphinx-nav
 */

const fs = require('fs');
const path = require('path');
const nav = require('../tokens/navigation');
const tokens = require('../tokens/colors');

// Generate Tailwind config with design system colors
// Uses nested structure required by Tailwind for color variants (e.g., emerald.light for hover:text-emerald-light)
function generateTailwindConfig(colors) {
  const tailwindColors = {
    text: {
      secondary: colors['text-secondary']
    },
    emerald: {
      DEFAULT: colors['emerald'],
      light: colors['emerald-light']
    },
    slate: {
      700: colors['slate-700'],
      800: colors['slate-800']
    }
  };

  return `tailwind.config = {
      theme: {
        extend: {
          colors: ${JSON.stringify(tailwindColors, null, 12).replace(/\n/g, '\n        ')}
        }
      }
    }`;
}

// Generate navigation links HTML (wrapped in a semantic container)
function generateNavLinks(links) {
  const linkElements = links
    .map(
      (link) =>
        `                <a href="${link.href}">${link.text}</a>`
    )
    .join('\n');

  return `            <div class="site-nav-menu">\n${linkElements}\n            </div>`;
}

// Generate donate button HTML
function generateDonateButton(donate) {
  return `        <a href="${donate.href}" class="site-nav-donate">${donate.text}</a>`;
}

// Main template generator
function generateTemplate(nav, tokens) {
  const tailwindConfig = generateTailwindConfig(tokens.colors);
  const navLinks = generateNavLinks(nav.links);
  const donateButton = nav.donate ? generateDonateButton(nav.donate) : '';

  return `{# ============================================================================
   Cleanroom Design System - Sphinx Layout Template
   Auto-generated from design tokens - DO NOT EDIT DIRECTLY
   Edit tokens/navigation.js and run: npm run build:sphinx-nav
   ============================================================================ #}
{# Extends the Read the Docs theme layout to add a top navigation bar #}
{% extends "!layout.html" %}

{% block extrahead %}
{{ super() }}
<link rel="icon" type="image/svg+xml" href="{{ pathto('_static/favicon.svg', 1) }}">
<link rel="icon" type="image/png" sizes="96x96" href="{{ pathto('_static/favicon-96x96.png', 1) }}">
<link rel="apple-touch-icon" sizes="180x180" href="{{ pathto('_static/apple-touch-icon.png', 1) }}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<script>
    ${tailwindConfig}
</script>
<script defer src="{{ pathto('_static/version-switcher.js', 1) }}"></script>
<script>
// Early sidebar state restore — runs in <head> before body renders to prevent FOUC.
try { if (localStorage.getItem('sidebar-collapsed') === 'true') document.documentElement.classList.add('sidebar-collapsed'); } catch(e) {}
</script>
{% endblock %}

{% block extrabody %}
{%- set stage = docs_version_stage|default("stable") -%}
{%- set ver = docs_version|default("dev") -%}
<nav class="site-nav-bar">
    <div class="site-nav-inner">
        <div class="site-nav-links">
            {%- if standalone_docs|default(false) -%}
            <a href="{{ pathto('index') }}" class="site-nav-logo">
                {{ nav_brand_logo|safe }}
            </a>
            <a href="{{ pathto('index') }}" class="nav-brand">{{ nav_brand_text }}</a>
            {%- else -%}
            <a href="${nav.brand.href}" class="site-nav-logo">
                <img src="{{ pathto('_static/favicon.svg', 1) }}" alt="Cleanroom Labs home" />
            </a>
            <a href="${nav.brand.href}" class="nav-brand">${nav.brand.text}</a>
${navLinks}
            {%- endif -%}
        </div>
${donateButton ? '        <div class="site-nav-actions">\\n            ' + donateButton.trim() + '\\n        </div>' : ''}
    </div>
</nav>
{%- if stage != "stable" -%}
<div class="version-sub-bar">
    <select id="version-select" data-current-version="{{ docs_version|default('dev') }}" class="version-switcher">
        <option value="">{{ docs_version|default('dev') }}</option>
    </select>
    <span class="version-sub-bar__message version-sub-bar__message--{{ stage }}">
        {%- if stage == "dev" -%}
        Development documentation &mdash; may change at any time
        {%- elif stage == "beta" -%}
        Pre-release documentation for version {{ ver }}
        {%- elif stage == "rc" -%}
        Release candidate ({{ ver }}) &mdash; report issues before final release
        {%- endif -%}
    </span>
</div>
{%- endif -%}
<button class="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle sidebar" title="Toggle sidebar (Alt+S)">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 12h18M3 6h18M3 18h18"/>
    </svg>
</button>
<script>
// Add body class when version sub-bar is present
if (document.querySelector('.version-sub-bar')) {
    document.body.classList.add('has-version-sub-bar');
}

// Replace home icons with per-project SVGs
document.addEventListener('DOMContentLoaded', function() {
    var sidebarSvg = '{{ project_home_icon_sidebar|default("")|safe }}';
    var breadcrumbSvg = '{{ project_home_icon_breadcrumb|default("")|safe }}';
    function injectIcon(selector, svg) {
        if (!svg) return;
        document.querySelectorAll(selector + ' .icon-home').forEach(function(el) {
            var span = document.createElement('span');
            span.className = 'project-home-icon';
            span.innerHTML = svg;
            el.insertBefore(span, el.firstChild);
        });
    }
    injectIcon('.wy-side-nav-search', sidebarSvg);
    injectIcon('.wy-breadcrumbs', breadcrumbSvg);
});

// Sidebar project ordering: Add data attributes for CSS ordering
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.wy-menu-vertical li.toctree-l1 > a').forEach(function(link) {
        var text = link.textContent.toLowerCase();
        var li = link.parentElement;
        if (text.includes('transfer')) li.dataset.project = 'transfer';
        else if (text.includes('deploy')) li.dataset.project = 'deploy';
        else if (text.includes('whisper')) li.dataset.project = 'whisper';
    });
});

// Sidebar toggle functionality
// State restoration is handled by the <head> script to prevent FOUC.
(function() {
    var toggle = document.getElementById('sidebar-toggle');
    var root = document.documentElement;

    toggle.addEventListener('click', function() {
        root.classList.toggle('sidebar-collapsed');
        try { localStorage.setItem('sidebar-collapsed', root.classList.contains('sidebar-collapsed')); } catch(e) {}
    });

    // Keyboard shortcut: Alt+S
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            toggle.click();
        }
    });
})();
</script>
{{ super() }}
{% endblock %}
`;
}

// Main execution
const outputPath = path.join(__dirname, '../sphinx/_templates/layout.html');
const outputDir = path.dirname(outputPath);

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate and write template
const template = generateTemplate(nav, tokens);
fs.writeFileSync(outputPath, template);

console.log(`Generated: ${outputPath}`);
console.log(`  - Brand: "${nav.brand.text}" -> ${nav.brand.href}`);
console.log(`  - ${nav.links.length} navigation links`);
