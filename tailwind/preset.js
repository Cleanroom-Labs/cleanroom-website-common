/**
 * Cleanroom Theme - Tailwind Preset
 *
 * This preset provides design tokens, typography, and animations.
 * Import and use in your tailwind.config.js:
 *
 *   const themePreset = require('./cleanroom-theme/tailwind/preset');
 *   module.exports = {
 *     presets: [themePreset],
 *     content: [...],
 *     plugins: [require('@tailwindcss/typography')],
 *   };
 *
 * Also import the base CSS in your globals.css:
 *   @import '../cleanroom-theme/css/base.css';
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
        'wander': 'wander 20s ease-in-out infinite',
        'wander-alt': 'wander-alt 25s ease-in-out infinite',
        'drift': 'drift 15s ease-in-out infinite',
        'drift-reverse': 'drift-reverse 18s ease-in-out infinite',
        'drift-slow': 'drift-slow 30s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 8s ease-in-out infinite',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wander: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(15px, -20px)' },
          '50%': { transform: 'translate(-10px, -35px)' },
          '75%': { transform: 'translate(-20px, -15px)' },
        },
        'wander-alt': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(-25px, -10px)' },
          '40%': { transform: 'translate(-15px, 20px)' },
          '60%': { transform: 'translate(20px, 15px)' },
          '80%': { transform: 'translate(25px, -15px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(30px, -20px)' },
        },
        'drift-reverse': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-30px, -15px)' },
        },
        'drift-slow': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(20px, -25px)' },
          '66%': { transform: 'translate(-15px, -10px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
      },
    },
  },
};
