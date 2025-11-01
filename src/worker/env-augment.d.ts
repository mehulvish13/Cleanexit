/**
 * Type augmentation for Cloudflare Worker Env bindings used by auth demo mode.
 * Wrangler's generated types include DB, but secrets/vars aren't declared by default.
 * We extend the Env interface with optional keys so TypeScript recognizes them.
 */
interface Env {
  MOCHA_USERS_SERVICE_API_URL?: string;
  MOCHA_USERS_SERVICE_API_KEY?: string;
}
