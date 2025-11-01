/**
 * VITE CONFIGURATION
 * 
 * This file configures Vite, our blazing-fast build tool.
 * 
 * PLUGINS:
 * - react() - Enables React Fast Refresh (instant updates during dev)
 * 
 * FEATURES:
 * - Hot Module Reload: Changes appear instantly without full page refresh
 * - Path Aliases: Use @/ instead of ../../../ for imports
 * - Optimized Builds: Production builds are minified and optimized
 * - Code Splitting: Automatic chunk splitting for better performance
 * 
 * SERVER CONFIG:
 * - Port: 5176 for local development
 * - allowedHosts: Accept connections from any host
 * 
 * BUILD CONFIG:
 * - chunkSizeWarningLimit: 5MB (for feature-rich bundles)
 * - Rollup optimizations for production
 */

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 5176,
    host: true,  // Listen on all addresses for network access
  },
  
  build: {
    outDir: 'dist',
    sourcemap: false,  // Disable source maps in production for smaller bundle
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router'],
          'vendor-ui': ['framer-motion', 'lucide-react'],
          'vendor-pdf': ['jspdf'],
        },
      },
    },
  },
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
