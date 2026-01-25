/**
 * Cleanroom Design System - Tailwind Preset
 *
 * This preset provides design tokens, typography, and animations.
 * Import and use in your tailwind.config.js:
 *
 *   const designPreset = require('./cleanroom-design-system/tailwind/preset');
 *   module.exports = {
 *     presets: [designPreset],
 *     content: [...],
 *     plugins: [require('@tailwindcss/typography')],
 *   };
 *
 * Also import the base CSS in your globals.css:
 *   @import '../cleanroom-design-system/css/base.css';
 */

const tokens = require('../tokens/colors');

module.exports = {
  theme: {
    extend: {
      // =======================================================================
      // Colors
      // =======================================================================
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

      // =======================================================================
      // Typography
      // =======================================================================
      fontFamily: {
        sans: tokens.fonts.sans,
        mono: tokens.fonts.mono,
      },

      typography: {
        DEFAULT: {
          css: {
            color: tokens.colors['text-secondary'],
            h1: { color: tokens.colors['text-primary'] },
            h2: { color: tokens.colors['text-primary'] },
            h3: { color: tokens.colors['text-primary'] },
            h4: { color: tokens.colors['text-primary'] },
            strong: { color: tokens.colors['text-primary'] },
            a: {
              color: tokens.colors['emerald'],
              textDecoration: 'underline',
              '&:hover': {
                color: tokens.colors['emerald-light'],
              },
            },
            code: {
              color: tokens.colors['code-text'],
              '&::before': { content: 'none' },
              '&::after': { content: 'none' },
            },
            blockquote: {
              color: tokens.colors['text-muted'],
              borderLeftColor: tokens.colors['emerald'],
            },
            hr: { borderColor: tokens.colors['slate-700'] },
            'ul > li::marker': { color: tokens.colors['emerald'] },
            'ol > li::marker': { color: tokens.colors['emerald'] },
          },
        },
      },

      // =======================================================================
      // Animations
      // =======================================================================
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 3s',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
};
