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
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '2.5rem',
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
        heading: ["Poppins", "Inter", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        brand: {
          50: '#f0f6ff',
          100: '#dbeaff',
          200: '#b6d4ff',
          300: '#88b7ff',
          400: '#5496f2',
          500: '#217dde',
          600: '#0078d7',
          700: '#0062b0',
          800: '#004c88',
          900: '#003866',
          950: '#002746',
        },
        accent: {
          50: '#e6fff7',
          100: '#b8ffe7',
          200: '#7affe0',
          300: '#3dffd0',
          400: '#07e2b6',
          500: '#00c896',
          600: '#00a67d',
          700: '#008063',
          800: '#00634e',
          900: '#004d3d',
        },
        canvas: {
          50: '#f8fafc',
          100: '#eef2f6',
          200: '#e2e8f0',
        },
        surface: {
          50: '#ffffff',
          100: '#f8fafc',
          200: '#edf2f7',
        },
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(2, 6, 23, 0.1)',
        card: '0 8px 32px -8px rgba(2, 6, 23, 0.15)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],  // Add Tailwind plugins here (forms, typography, etc.)
};
