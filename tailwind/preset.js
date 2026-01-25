/**
 * Cleanroom Design System - Tailwind Preset
 *
 * This preset provides the design tokens for the main website.
 * Import and use in your tailwind.config.js:
 *
 *   const designPreset = require('./cleanroom-design-system/tailwind/preset');
 *   module.exports = {
 *     presets: [designPreset],
 *     // ... rest of your config
 *   };
 */

const tokens = require('../tokens/colors');

module.exports = {
  theme: {
    extend: {
      colors: {
        // Slate scale
        slate: {
          600: tokens.colors['slate-600'],
          700: tokens.colors['slate-700'],
          800: tokens.colors['slate-800'],
          900: tokens.colors['slate-900'],
          950: tokens.colors['slate-950'],
        },

        // Emerald accent
        emerald: {
          DEFAULT: tokens.colors['emerald'],
          light: tokens.colors['emerald-light'],
          dark: tokens.colors['emerald-dark'],
          glow: tokens.colors['emerald-glow'],
        },

        // Text colors (for utility classes like text-text-primary)
        text: {
          primary: tokens.colors['text-primary'],
          secondary: tokens.colors['text-secondary'],
          muted: tokens.colors['text-muted'],
        },

        // Semantic content backgrounds
        'content-bg': tokens.colors['content-bg'],
        'code-bg': tokens.colors['code-bg'],
        'code-text': tokens.colors['code-text'],

        // Semantic status colors
        warning: tokens.colors['warning'],
        danger: tokens.colors['danger'],
        info: tokens.colors['info'],
        success: tokens.colors['success'],
      },

      fontFamily: {
        sans: tokens.fonts.sans,
        mono: tokens.fonts.mono,
      },
    },
  },
};
