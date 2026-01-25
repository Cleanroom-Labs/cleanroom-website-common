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
function generateTailwindConfig(colors) {
  const tailwindColors = {
    'text-secondary': colors['text-secondary'],
    'emerald': colors['emerald'],
    'emerald-light': colors['emerald-light'],
    'slate-700': colors['slate-700'],
    'slate-800': colors['slate-800'],
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
        `            <a href="${link.href}" class="text-text-secondary hover:text-emerald-light no-underline transition-colors">${link.text}</a>`
    )
    .join('\n');

  return `        <div class="flex gap-6">\n${linkElements}\n        </div>`;
}

// Main template generator
function generateTemplate(nav, tokens) {
  const tailwindConfig = generateTailwindConfig(tokens.colors);
  const navLinks = generateNavLinks(nav.links);

  return `{# ============================================================================
   Cleanroom Design System - Sphinx Layout Template
   Auto-generated from design tokens - DO NOT EDIT DIRECTLY
   Edit tokens/navigation.js and run: npm run build:sphinx-nav
   ============================================================================ #}
{# Extends the Read the Docs theme layout to add a top navigation bar #}
{% extends "!layout.html" %}

{% block extrahead %}
{{ super() }}
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
    <div class="container mx-auto px-4 py-4 flex items-center gap-8">
        <a href="${nav.brand.href}" class="nav-brand font-bold text-lg text-white hover:text-emerald-light no-underline transition-colors">${nav.brand.text}</a>
${navLinks}
    </div>
</nav>
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
