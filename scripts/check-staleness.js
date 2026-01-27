#!/usr/bin/env node

/**
 * Cleanroom Design System - Staleness Checker
 *
 * Checks if generated Sphinx files match what tokens would produce.
 * Exit 0 if up-to-date, exit 1 if stale.
 *
 * Usage:
 *   node scripts/check-staleness.js          # Check for staleness
 *   node scripts/check-staleness.js --fix    # Auto-regenerate stale files
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Parse arguments
const args = process.argv.slice(2);
const fix = args.includes('--fix');
const quiet = args.includes('--quiet');

// Paths
const scriptDir = __dirname;
const themeDir = path.dirname(scriptDir);

// Files to check (generator script -> output file)
const generatedFiles = [
  {
    name: 'Sphinx layout template',
    generator: 'build-sphinx-nav.js',
    output: 'sphinx/_templates/layout.html',
  },
  {
    name: 'Sphinx CSS',
    generator: 'build-sphinx-css.js',
    output: 'sphinx/_static/custom.css',
  },
];

function log(message) {
  if (!quiet) {
    console.log(message);
  }
}

function logError(message) {
  console.error(message);
}

/**
 * Generate file content to a temp location and compare with committed version.
 * Returns { stale: boolean, outputPath: string, tempPath: string }
 */
function checkFile(fileInfo) {
  const generatorPath = path.join(scriptDir, fileInfo.generator);
  const outputPath = path.join(themeDir, fileInfo.output);
  const tempPath = path.join(themeDir, `.tmp-${path.basename(fileInfo.output)}`);

  // Check if generator exists
  if (!fs.existsSync(generatorPath)) {
    logError(`Error: Generator not found: ${generatorPath}`);
    return { stale: false, error: true };
  }

  // Check if output file exists
  if (!fs.existsSync(outputPath)) {
    logError(`Error: Output file not found: ${outputPath}`);
    return { stale: true, error: false, outputPath, tempPath };
  }

  // Read current committed content
  const currentContent = fs.readFileSync(outputPath, 'utf8');

  // Run generator to produce new content
  // We need to temporarily redirect the output path
  const originalPath = outputPath;

  // Create a wrapper that captures the output
  try {
    // For this to work, we need to run the generators in a way that captures output
    // The simplest approach is to run the generator, then compare
    // Since generators write directly to files, we'll:
    // 1. Save the current content
    // 2. Run the generator
    // 3. Read the new content
    // 4. Restore original if not fixing

    execSync(`node ${generatorPath}`, {
      cwd: themeDir,
      stdio: 'pipe',
    });

    const newContent = fs.readFileSync(outputPath, 'utf8');
    const isStale = currentContent !== newContent;

    if (isStale && !fix) {
      // Restore original content
      fs.writeFileSync(outputPath, currentContent);
    }

    return { stale: isStale, error: false, outputPath };
  } catch (error) {
    logError(`Error running generator ${fileInfo.generator}: ${error.message}`);
    return { stale: false, error: true };
  }
}

function main() {
  log('Checking for stale generated files...');
  log('');

  let staleCount = 0;
  let errorCount = 0;
  const staleFiles = [];

  for (const fileInfo of generatedFiles) {
    const result = checkFile(fileInfo);

    if (result.error) {
      errorCount++;
      logError(`  \u2717 ${fileInfo.name}: error`);
    } else if (result.stale) {
      staleCount++;
      staleFiles.push(fileInfo);
      if (fix) {
        log(`  \u2713 ${fileInfo.name}: regenerated`);
      } else {
        logError(`  \u2717 ${fileInfo.name}: STALE`);
      }
    } else {
      log(`  \u2713 ${fileInfo.name}: up-to-date`);
    }
  }

  log('');

  if (errorCount > 0) {
    logError(`${errorCount} error(s) occurred.`);
    return 1;
  }

  if (staleCount > 0) {
    if (fix) {
      log(`Regenerated ${staleCount} stale file(s).`);
      log('');
      log('Remember to commit the updated files.');
      return 0;
    } else {
      logError(`Found ${staleCount} stale file(s).`);
      logError('');
      logError('The following files need to be regenerated:');
      for (const fileInfo of staleFiles) {
        logError(`  - ${fileInfo.output}`);
      }
      logError('');
      logError('To fix, run one of:');
      logError('  npm run fix-staleness');
      logError('  npm run build');
      logError('');
      logError('Then commit the updated files.');
      return 1;
    }
  }

  log('All generated files are up-to-date.');
  return 0;
}

process.exit(main());
