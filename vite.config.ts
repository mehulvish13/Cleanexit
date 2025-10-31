/**
 * VITE CONFIGURATION
 * 
 * This file configures Vite, our blazing-fast build tool.
 * 
 * PLUGINS:
 * 1. mochaPlugins - Mocha platform integration
 * 2. react() - Enables React Fast Refresh (instant updates during dev)
 * 3. cloudflare() - Runs Cloudflare Worker alongside Vite dev server
 * 
 * FEATURES:
 * - Hot Module Reload: Changes appear instantly without full page refresh
 * - Path Aliases: Use @/ instead of ../../../ for imports
 * - Worker Integration: Backend API runs locally during development
 * - Optimized Builds: Production builds are minified and optimized
 * 
 * SERVER CONFIG:
 * - allowedHosts: Accept connections from any host (useful for deployment)
 * 
 * BUILD CONFIG:
 * - chunkSizeWarningLimit: 5MB (increased because we have many features)
 */

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";
import { mochaPlugins } from "@getmocha/vite-plugins";

export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [...mochaPlugins(process.env as any), react(), cloudflare()],
  
  server: {
    allowedHosts: true,  // Allow connections from any hostname
  },
  
  build: {
    chunkSizeWarningLimit: 5000,  // Warn if chunks exceed 5MB
  },
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),  // Use @/path instead of ../../../path
    },
  },
});
