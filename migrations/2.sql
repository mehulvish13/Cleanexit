/**
 * DATABASE MIGRATION #2: Update/Refresh Subscription Plans
 * 
 * This migration ensures the default subscription plans are always up-to-date.
 * 
 * WHY WE NEED THIS:
 * - In case migration #1 fails or plans need updating
 * - Uses INSERT OR IGNORE to avoid duplicates
 * - Safe to run multiple times (idempotent)
 * 
 * WHAT IT DOES:
 * Re-inserts the 3 subscription plans with specific IDs:
 * - ID 1: Starter (₹0, 5 devices)
 * - ID 2: Pro (₹299, 50 devices)
 * - ID 3: Advanced (₹699, unlimited)
 * 
 * INSERT OR IGNORE means:
 * - If the plan ID already exists, skip it (no error)
 * - If it doesn't exist, create it
 * - Prevents duplicate plan entries
 * 
 * NOTE: Features are comma-separated for easy parsing in UI
 * 
 * TO APPLY:
 * Local: npx wrangler d1 execute DB --local --file=./migrations/2.sql
 * Production: npx wrangler d1 execute DB --file=./migrations/2.sql
 * 
 * TO ROLLBACK:
 * Run: npx wrangler d1 execute DB --file=./migrations/2/down.sql
 */

-- Insert default subscription plans if they don't exist
-- Using OR IGNORE prevents errors if plans already exist
INSERT OR IGNORE INTO subscription_plans (id, name, price, devices_limit, features) VALUES 
(1, 'Starter', 0, 5, 'Up to 5 device erasures per month,Basic compliance reporting,Email support,Standard erasure methods,Mobile device support,Basic audit trail'),
(2, 'Pro', 299, 50, 'Up to 50 device erasures per month,Advanced compliance reporting,Priority email & phone support,Military-grade erasure algorithms,Server decommissioning support,Detailed forensic verification,GDPR & HIPAA compliance,Custom certificates,24/7 emergency response'),
(3, 'Advanced', 699, -1, 'Unlimited device erasures,Enterprise compliance suite,Dedicated account manager,On-site erasure services,Custom integration support,Real-time monitoring dashboard,All compliance standards,White-label certificates,SLA guarantee (99.9% uptime),API access,Bulk processing capabilities,Chain of custody documentation');
