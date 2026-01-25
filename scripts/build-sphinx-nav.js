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
    'emerald-light': colors['emerald-light'],
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

// Generate navigation links HTML
function generateNavLinks(links) {
  return links
    .map(
      (link) =>
        `        <a href="${link.href}" class="text-text-secondary hover:text-emerald-light no-underline transition-colors">${link.text}</a>`
    )
    .join('\n');
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
<script src="https://cdn.tailwindcss.com"></script>
<script>
    ${tailwindConfig}
</script>
{% endblock %}

{% block extrabody %}
<nav class="site-nav-bar bg-slate-800 text-white p-4 fixed top-0 left-0 right-0 z-[300]">
    <div class="container mx-auto flex gap-6">
        <a href="${nav.brand.href}" class="font-bold text-white hover:text-emerald-light no-underline transition-colors">${nav.brand.text}</a>
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
