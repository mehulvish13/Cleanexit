# Package Dependencies Explained

This file explains every dependency in `package.json` and what it does.

## Production Dependencies (Runtime)

These packages are included in the deployed application and needed for it to run.

### **@hono/zod-validator** (^0.5.0)
- **Purpose:** Validates API inputs using Zod schemas
- **Why we need it:** Ensures API requests have correct data structure before processing
- **Used in:** Worker API routes for input validation

### **hono** (4.7.7)
- **Purpose:** Lightweight web framework for Cloudflare Workers
- **Why we need it:** Powers our backend API (routing, middleware, request/response handling)
- **Used in:** `src/worker/index.ts` - entire backend
- **Alternative to:** Express.js (but much smaller and faster on edge)

### **lucide-react** (^0.510.0)
- **Purpose:** Beautiful, consistent icon library
- **Why we need it:** Provides icons for UI (Shield, User, LogOut, etc.)
- **Used in:** All React components
- **Size:** Only 16KB gzipped (tree-shaken)

### **react** (19.0.0)
- **Purpose:** UI library for building interactive interfaces
- **Why we need it:** Core library for our frontend
- **Used in:** All `.tsx` components

### **react-dom** (19.0.0)
- **Purpose:** React renderer for web browsers
- **Why we need it:** Renders React components to actual HTML DOM
- **Used in:** `src/react-app/main.tsx`

### **react-router** (^7.5.3)
- **Purpose:** Client-side routing for single-page apps
- **Why we need it:** Handles navigation between pages (/, /login, /dashboard)
- **Used in:** `src/react-app/App.tsx`
- **Features:** URL-based routing, nested routes, navigation hooks

### **zod** (^3.24.3)
- **Purpose:** TypeScript-first schema validation
- **Why we need it:** Runtime type checking and validation
- **Used in:** API input validation, form validation
- **Example:** Validate subscription data, user inputs

---

## Development Dependencies (Build Time)

These packages are only used during development and building. They're not included in the final deployed app.

### **@cloudflare/vite-plugin** (^1.12.0)
- **Purpose:** Runs Cloudflare Worker alongside Vite dev server
- **Why we need it:** Lets us test API routes locally without deploying
- **Used in:** `vite.config.ts`
- **Magic:** Combines frontend dev server + backend Worker in one process

### **@eslint/js** (9.25.1)
- **Purpose:** JavaScript linting rules (core ESLint)
- **Why we need it:** Catches common coding mistakes and enforces style
- **Used in:** `eslint.config.js`

### **@getmocha/vite-plugins** (latest)
- **Purpose:** Mocha platform integration for Vite
- **Why we need it:** Connects our app to Mocha's infrastructure
- **Used in:** `vite.config.ts`

### **@getmocha/users-service** (^0.0.4)
- **Purpose:** Google OAuth authentication service
- **Why we need it:** Handles user login/logout via Google
- **Used in:** Worker for auth API, React for useAuth() hook
- **Provides:** Session management, OAuth flow, user data

### **@types/node** (22.14.1)
- **Purpose:** TypeScript type definitions for Node.js APIs
- **Why we need it:** Enables autocomplete for Node.js functions (path, fs, etc.)
- **Used in:** Build scripts, configuration files

### **@types/react** (19.0.10)
- **Purpose:** TypeScript types for React
- **Why we need it:** Type checking for React components and hooks
- **Used in:** All `.tsx` files

### **@types/react-dom** (19.0.4)
- **Purpose:** TypeScript types for ReactDOM
- **Why we need it:** Type checking for ReactDOM methods
- **Used in:** `main.tsx`

### **@vitejs/plugin-react** (4.4.1)
- **Purpose:** Official React plugin for Vite
- **Why we need it:** Enables Fast Refresh (instant UI updates without losing state)
- **Used in:** `vite.config.ts`
- **Magic:** Changes appear instantly without full page reload

### **autoprefixer** (^10.4.21)
- **Purpose:** Adds vendor prefixes to CSS
- **Why we need it:** Ensures CSS works in all browsers (-webkit-, -moz-, etc.)
- **Used in:** PostCSS pipeline (automatically)
- **Example:** `display: flex` → `-webkit-box-flex`, `display: -ms-flexbox`, `display: flex`

### **eslint** (9.25.1)
- **Purpose:** JavaScript/TypeScript linter
- **Why we need it:** Finds bugs and enforces code quality
- **Used in:** `npm run lint`
- **Catches:** Unused variables, missing imports, type errors, etc.

### **eslint-plugin-react-hooks** (5.2.0)
- **Purpose:** Lint rules for React Hooks
- **Why we need it:** Enforces Rules of Hooks (dependencies arrays, etc.)
- **Used in:** ESLint configuration
- **Prevents:** Common Hook mistakes like missing dependencies

### **eslint-plugin-react-refresh** (0.4.19)
- **Purpose:** Lint rules for React Fast Refresh
- **Why we need it:** Ensures components can hot-reload properly
- **Used in:** ESLint configuration

### **globals** (15.15.0)
- **Purpose:** Global variable definitions
- **Why we need it:** Tells ESLint about browser globals (window, document, etc.)
- **Used in:** ESLint configuration

### **postcss** (^8.5.3)
- **Purpose:** CSS transformation tool
- **Why we need it:** Processes CSS with plugins (Tailwind, Autoprefixer)
- **Used in:** Build pipeline (automatically)
- **Chain:** Tailwind → PostCSS → Autoprefixer → Output CSS

### **tailwindcss** (^3.4.17)
- **Purpose:** Utility-first CSS framework
- **Why we need it:** Rapid UI development with utility classes
- **Used in:** All React components (`className="flex items-center gap-4"`)
- **Output:** Generates optimized CSS file with only used classes

### **typescript** (5.8.3)
- **Purpose:** TypeScript compiler
- **Why we need it:** Compiles TypeScript → JavaScript, checks types
- **Used in:** `npm run build`, `tsc` command
- **Benefits:** Catches errors before runtime, better autocomplete

### **typescript-eslint** (8.31.0)
- **Purpose:** ESLint rules for TypeScript
- **Why we need it:** Lint TypeScript code, catch TS-specific issues
- **Used in:** ESLint configuration

### **vite** (^6.4.1)
- **Purpose:** Frontend build tool and dev server
- **Why we need it:** Fast dev server, optimized production builds
- **Used in:** `npm run dev`, `npm run build`
- **Features:**
  - Instant server start (no bundling in dev)
  - Hot Module Reload (HMR)
  - Optimized production builds
  - Tree-shaking (removes unused code)

### **wrangler** (^4.33.0)
- **Purpose:** Cloudflare CLI for Workers
- **Why we need it:** Deploy to Cloudflare, manage D1 database, run migrations
- **Used in:** `npx wrangler deploy`, D1 commands
- **Commands:**
  - `wrangler deploy` - Deploy to production
  - `wrangler d1 execute` - Run SQL migrations
  - `wrangler types` - Generate TypeScript types
  - `wrangler tail` - Stream production logs

---

## NPM Scripts Explained

### `npm run build`
**Command:** `tsc -b && vite build`

1. `tsc -b` - TypeScript incremental build (checks types, compiles)
2. `vite build` - Bundle app for production (minified, optimized)

**Output:** `dist/` folder with optimized HTML, CSS, JS

---

### `npm run cf-typegen`
**Command:** `wrangler types`

**Purpose:** Generate TypeScript types for Cloudflare Worker environment

**Output:** Type definitions for `Env`, `DB`, etc.

---

### `npm run check`
**Command:** `tsc && vite build && wrangler deploy --dry-run`

**Purpose:** Full validation before deploying

1. `tsc` - Check TypeScript types
2. `vite build` - Test production build
3. `wrangler deploy --dry-run` - Simulate deployment

**Use case:** Run before pushing to production

---

### `npm run dev`
**Command:** `vite`

**Purpose:** Start development server

**What it does:**
- Starts Vite dev server on http://localhost:5173
- Runs Cloudflare Worker locally (via @cloudflare/vite-plugin)
- Enables Hot Module Reload
- Watches for file changes

**Perfect for:** Local development, testing features

---

### `npm run lint`
**Command:** `eslint .`

**Purpose:** Check code for errors and style issues

**What it checks:**
- TypeScript type errors
- Unused variables
- Missing imports
- React Hook rules
- Code style consistency

**Fix issues:** `npm run lint --fix` (auto-fix some issues)

---

## Dependency Version Strategy

### **Exact versions** (no ^ or ~)
- `hono`: `4.7.7` - Locked to specific version for stability
- `react`: `19.0.0` - Major version locked

### **Caret (^) versions**
- `^0.5.0` - Allow minor and patch updates (0.5.x, 0.6.x)
- `^3.4.17` - Allow minor and patch updates (3.4.x, 3.5.x, 3.6.x)
- **Why:** Get bug fixes and features automatically

### **Latest**
- `@getmocha/vite-plugins`: `latest` - Always use newest version
- **Why:** Tight integration with Mocha platform

---

## How to Update Dependencies

### Update all to latest compatible versions:
```bash
npm update
```

### Update specific package:
```bash
npm install package-name@latest
```

### Check for outdated packages:
```bash
npm outdated
```

### Audit for security vulnerabilities:
```bash
npm audit
npm audit fix
```

---

## Adding New Dependencies

### Production dependency (needed at runtime):
```bash
npm install package-name
```

### Development dependency (only needed for building):
```bash
npm install -D package-name
```

### Example - Adding a date library:
```bash
npm install date-fns
```

### Example - Adding a testing library:
```bash
npm install -D vitest
```

---

## Removing Dependencies

```bash
npm uninstall package-name
```

**Always remove unused packages to:**
- Reduce bundle size
- Improve install speed
- Reduce security surface area
- Keep dependencies clean
