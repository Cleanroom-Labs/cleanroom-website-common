/**
 * Cleanroom Design System - Design Tokens
 *
 * Single source of truth for all colors used across:
 * - Main website (via Tailwind preset)
 * - Sphinx documentation (via generated CSS)
 *
 * DO NOT duplicate these values elsewhere.
 * Run `npm run build:sphinx-css` after making changes.
 */

module.exports = {
  colors: {
    // ==========================================================================
    // Backgrounds
    // ==========================================================================
    'slate-950': '#030712',  // Deepest background (hero, cards)
    'slate-900': '#111827',  // Primary dark / sidebar search
    'slate-800': '#1f2937',  // Sidebar / nav / footer
    'slate-700': '#374151',  // Borders, dividers
    'slate-600': '#4b5563',  // Muted elements

    // Content-specific backgrounds (website - dark)
    'content-bg': '#0f172a',  // Main content area (website)
    'code-bg': '#1e293b',     // Code blocks and inline code (website)

    // Documentation content (light theme for readability)
    'docs-content-bg': '#ffffff',     // White background for docs
    'docs-code-bg': '#f8fafc',        // Light gray for code blocks (slate-50)
    'docs-text-primary': '#1e293b',   // Dark headings (slate-800)
    'docs-text-secondary': '#334155', // Dark body text (slate-700)
    'docs-text-muted': '#64748b',     // Muted text (slate-500)
    'docs-code-text': '#1e293b',      // Dark code text (slate-800)
    'docs-border': '#e2e8f0',         // Light borders (slate-200)

    // ==========================================================================
    // Text Colors
    // ==========================================================================
    'text-primary': '#f9fafb',    // High contrast headings (gray-50)
    'text-secondary': '#d1d5db',  // Body text (gray-300)
    'text-muted': '#9ca3af',      // Secondary text (gray-400)
    'code-text': '#e2e8f0',       // Code/monospace text (slate-200)

    // ==========================================================================
    // Accent Colors - Emerald
    // ==========================================================================
    'emerald': '#10b981',         // Primary accent (emerald-500)
    'emerald-light': '#34d399',   // Hover states (emerald-400)
    'emerald-dark': '#059669',    // Pressed states (emerald-600)
    'emerald-glow': '#10b98133',  // For glows/shadows (20% opacity)

    // ==========================================================================
    // Semantic Colors
    // ==========================================================================
    'warning': '#f59e0b',   // Amber - warnings
    'danger': '#ef4444',    // Red - errors, danger
    'info': '#3b82f6',      // Blue - information
    'success': '#10b981',   // Emerald - success (same as accent)

    // ==========================================================================
    // Additional UI Colors
    // ==========================================================================
    'purple': '#8b5cf6',    // Violet-500 - implementations
    'yellow': '#eab308',    // Yellow-500 - specs
    'orange': '#f97316',    // Orange-500 - requirements
    'blue': '#60a5fa',      // Blue-400 - functions, use cases
    'violet': '#a78bfa',    // Violet-400 - lighter purple for dark theme

    // ==========================================================================
    // Syntax Highlighting
    // ==========================================================================
    'syntax-comment': '#6b7280',   // Gray - comments
    'syntax-keyword': '#c084fc',   // Purple - keywords
    'syntax-string': '#34d399',    // Emerald - strings
    'syntax-function': '#60a5fa',  // Blue - function names
    'syntax-number': '#fbbf24',    // Amber - numbers
    'syntax-name': '#e2e8f0',      // Light - names/variables
    'syntax-operator': '#d1d5db',  // Gray - operators, punctuation
  },

  fonts: {
    sans: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ],
    mono: [
      'Monaco',
      'Menlo',
      'Ubuntu Mono',
      'Consolas',
      'source-code-pro',
      'monospace',
    ],
  },
};
