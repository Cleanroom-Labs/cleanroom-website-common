#!/usr/bin/env bash
# Check a Sphinx build log for errors and warnings.
# Exits non-zero if actionable errors or warnings are found.
# Intersphinx inventory fetch warnings are ignored (expected offline).
#
# Usage: check-sphinx-warnings.sh <build.log>

BUILD_LOG="${1:?Usage: check-sphinx-warnings.sh <build.log>}"

if [ ! -f "$BUILD_LOG" ]; then
  echo "ERROR: Build log not found: $BUILD_LOG"
  exit 1
fi

ERRORS="$(grep -E 'ERROR:' "$BUILD_LOG" || true)"
WARNINGS="$(grep -E 'WARNING:' "$BUILD_LOG" || true)"
NON_IGNORED="$(echo "$WARNINGS" | grep -viE 'failed to reach any of the inventories|intersphinx inventory|needs_extra_options.*deprecated|needs_extra_links.*deprecated' || true)"

if [ -n "$ERRORS" ]; then
  echo "❌ Build completed with errors:"
  echo "$ERRORS"
  exit 1
fi
if [ -n "$NON_IGNORED" ]; then
  echo "❌ Build completed with warnings:"
  echo "$NON_IGNORED"
  exit 1
fi
if [ -n "$WARNINGS" ]; then
  IGNORED_COUNT="$(echo "$WARNINGS" | wc -l | tr -d ' ')"
  echo "✓ No warnings found ($IGNORED_COUNT intersphinx inventory warning(s) ignored)"
else
  echo "✓ No warnings found"
fi
