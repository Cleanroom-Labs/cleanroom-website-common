#!/usr/bin/env node

/**
 * Cleanroom Design System - Favicon Generator
 *
 * Generates per-project favicon sets (SVG, PNG, ICO) from source SVG icons.
 * Requires: rsvg-convert (librsvg), magick (ImageMagick)
 *
 * Run: npm run build:favicons
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const SVG_DIR = path.join(ASSETS_DIR, 'svg');
const FAVICONS_DIR = path.join(ASSETS_DIR, 'favicons');

const BG_COLOR = '#111827';
const ICON_COLOR = '#10b981';

// Project → source SVG file mapping
const PROJECTS = {
  'cleanroom-labs': { svg: 'shield.svg', filled: true },
  'deploy':         { svg: 'deploy.svg', filled: false },
  'grove':          { svg: 'grove.svg',  filled: false },
  'transfer':       { svg: 'transfer.svg', filled: false },
  'whisper':        { svg: 'whisper.svg', filled: false },
};

// PNG sizes to generate
const PNG_SIZES = [
  { name: 'favicon-96x96.png', size: 96 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'web-app-manifest-192x192.png', size: 192 },
  { name: 'web-app-manifest-512x512.png', size: 512 },
];

function buildFaviconSvg(projectName, config) {
  const sourceSvg = fs.readFileSync(path.join(SVG_DIR, config.svg), 'utf8');

  if (config.filled) {
    // Shield icon: embed the filled path from 48x48 viewBox into 64x64 canvas
    const pathMatch = sourceSvg.match(/<path[^>]*d="([^"]+)"[^>]*\/>/);
    if (!pathMatch) throw new Error(`No path found in ${config.svg}`);
    return [
      '<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">',
      `  <rect width="64" height="64" rx="12" fill="${BG_COLOR}"/>`,
      `  <g transform="translate(8, 8)" fill="none">`,
      `    <path d="${pathMatch[1]}" fill="${ICON_COLOR}"/>`,
      `  </g>`,
      '</svg>',
    ].join('\n');
  }

  // Line-art icons: extract inner elements, replace currentColor, embed in 64x64 canvas
  // Source icons use viewBox="0 0 48 48", offset by 8px to center in 64x64
  let inner = sourceSvg
    .replace(/<\/?svg[^>]*>/g, '')
    .replace(/currentColor/g, ICON_COLOR)
    .trim();

  return [
    '<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">',
    `  <rect width="64" height="64" rx="12" fill="${BG_COLOR}"/>`,
    `  <g transform="translate(8, 8)" fill="none">`,
    `    ${inner}`,
    `  </g>`,
    '</svg>',
  ].join('\n');
}

function generatePngs(projectDir, svgPath) {
  for (const { name, size } of PNG_SIZES) {
    const outPath = path.join(projectDir, name);
    execFileSync('rsvg-convert', [
      '-w', String(size), '-h', String(size), svgPath, '-o', outPath,
    ]);
  }
}

function generateIco(projectDir, svgPath) {
  const tmpDir = path.join(projectDir, '.tmp');
  fs.mkdirSync(tmpDir, { recursive: true });

  const png16 = path.join(tmpDir, '16.png');
  const png32 = path.join(tmpDir, '32.png');
  execFileSync('rsvg-convert', ['-w', '16', '-h', '16', svgPath, '-o', png16]);
  execFileSync('rsvg-convert', ['-w', '32', '-h', '32', svgPath, '-o', png32]);

  const icoPath = path.join(projectDir, 'favicon.ico');
  execFileSync('magick', [png16, png32, icoPath]);

  fs.rmSync(tmpDir, { recursive: true });
}

// Main
console.log('Generating per-project favicons...\n');

for (const [project, config] of Object.entries(PROJECTS)) {
  const projectDir = path.join(FAVICONS_DIR, project);
  fs.mkdirSync(projectDir, { recursive: true });

  // 1. Generate favicon SVG
  const svgContent = buildFaviconSvg(project, config);
  const svgPath = path.join(projectDir, 'favicon.svg');
  fs.writeFileSync(svgPath, svgContent);

  // 2. Generate PNG rasters
  generatePngs(projectDir, svgPath);

  // 3. Generate ICO
  generateIco(projectDir, svgPath);

  const files = fs.readdirSync(projectDir);
  console.log(`  ${project}/  (${files.length} files)`);
}

console.log('\nDone.');
