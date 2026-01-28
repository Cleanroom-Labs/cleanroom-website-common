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

// Generate navigation links HTML (wrapped in a flex container)
function generateNavLinks(links) {
  const linkElements = links
    .map(
      (link) =>
        `                <a href="${link.href}" class="text-text-secondary hover:text-emerald-light no-underline transition-colors">${link.text}</a>`
    )
    .join('\n');

  return `            <div class="flex gap-4 md:gap-6">\n${linkElements}\n            </div>`;
}

// Generate donate button HTML
function generateDonateButton(donate) {
  return `        <a href="${donate.href}" class="bg-emerald hover:bg-emerald-light text-white px-4 py-2 rounded-md font-semibold no-underline transition-colors">${donate.text}</a>`;
}

// Main template generator
function generateTemplate(nav, tokens) {
  const tailwindConfig = generateTailwindConfig(tokens.colors);
  const navLinks = generateNavLinks(nav.links);
  const donateButton = generateDonateButton(nav.donate);

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
{% endblock %}

{% block extrabody %}
<nav class="site-nav-bar bg-slate-800 border-b border-slate-700 text-white fixed top-0 left-0 right-0 z-[300]">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-6 md:gap-8">
            <a href="${nav.brand.href}" class="hover:opacity-80 transition-opacity">
                <img src="{{ pathto('_static/favicon.svg', 1) }}" alt="Cleanroom Labs home" class="w-8 h-8" />
            </a>
            <a href="${nav.brand.href}" class="nav-brand hidden md:block font-bold text-lg text-white hover:text-emerald-light no-underline transition-colors">${nav.brand.text}</a>
${navLinks}
        </div>
${donateButton}
    </div>
</nav>
<button class="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle sidebar" title="Toggle sidebar (Alt+S)">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 12h18M3 6h18M3 18h18"/>
    </svg>
</button>
<script>
// Replace home icons with per-project SVGs
(function() {
    var sidebarSvg = '{{ project_home_icon_sidebar|default("")|e }}';
    var breadcrumbSvg = '{{ project_home_icon_breadcrumb|default("")|e }}';
    function injectIcon(selector, svg) {
        if (!svg) return;
        var tmp = document.createElement('div');
        tmp.innerHTML = svg;
        var decoded = tmp.innerHTML;
        document.querySelectorAll(selector + ' .icon-home').forEach(function(el) {
            var span = document.createElement('span');
            span.className = 'project-home-icon';
            span.innerHTML = decoded;
            el.insertBefore(span, el.firstChild);
        });
    }
    injectIcon('.wy-side-nav-search', sidebarSvg);
    injectIcon('.wy-breadcrumbs', breadcrumbSvg);
})();

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
(function() {
    var toggle = document.getElementById('sidebar-toggle');
    var body = document.body;

    // Load saved state
    if (localStorage.getItem('sidebar-collapsed') === 'true') {
        body.classList.add('sidebar-collapsed');
    }

    toggle.addEventListener('click', function() {
        body.classList.toggle('sidebar-collapsed');
        localStorage.setItem('sidebar-collapsed', body.classList.contains('sidebar-collapsed'));
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
