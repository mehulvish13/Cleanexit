/**
 * TAILWIND CSS CONFIGURATION
 * 
 * Tailwind is our utility-first CSS framework for rapid UI development.
 * 
 * WHAT THIS FILE DOES:
 * - Tells Tailwind which files to scan for class names
 * - Extends default theme with custom colors/fonts/spacing
 * - Configures plugins for additional utilities
 * 
 * CONTENT:
 * We scan all .html, .tsx, and .ts files in src/react-app/ for Tailwind classes.
 * This ensures only used styles are included in production (tree-shaking).
 * 
 * THEME:
 * Currently using Tailwind's excellent defaults:
 * - Color palette: blue-50 through blue-950, etc.
 * - Spacing: 1, 2, 4, 8, 16, etc. (4px base unit)
 * - Responsive breakpoints: sm, md, lg, xl, 2xl
 * - Fonts: System font stack for speed
 * 
 * You can extend the theme here to add:
 * - Custom colors (brand colors)
 * - Custom fonts (load from Google Fonts)
 * - Custom animations
 * - Custom spacing values
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",           // Main HTML file
    "./src/react-app/**/*.{js,ts,jsx,tsx}",  // All React components
  ],
  theme: {
    extend: {},  // Add custom theme extensions here
  },
  plugins: [],  // Add Tailwind plugins here (forms, typography, etc.)
};
