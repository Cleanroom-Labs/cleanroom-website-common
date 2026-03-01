/**
 * Cleanroom Design System - Navigation Configuration
 *
 * Single source of truth for navigation links used across:
 * - Main website (via direct import in Layout.js)
 * - Sphinx documentation (via generated template)
 *
 * Run `npm run build:sphinx-nav` after making changes.
 */

module.exports = {
  brand: {
    text: 'Cleanroom Labs',
    href: '/',
  },

  links: [
    { text: 'About', href: '/about' },
    { text: 'Blog', href: '/blog' },
    { text: 'Docs', href: '/docs' },
  ],

  // Donate button temporarily hidden — uncomment to re-enable
  // donate: {
  //   text: 'Donate',
  //   href: '/donate',
  // },
};
