/**
 * DATABASE MIGRATION #1: Initial Schema Setup
 * 
 * This creates the foundation of our subscription system.
 * 
 * TABLES CREATED:
 * 
 * 1. subscription_plans
 *    - Defines our three pricing tiers (Starter, Pro, Advanced)
 *    - Stores plan details: name, price, features, device limits
 *    - Pre-populated with our current offerings
 * 
 * 2. user_subscriptions
 *    - Links users to their chosen plan
 *    - Tracks usage: how many devices they've used this month
 *    - Monitors status: active, cancelled, expired
 * 
 * HOW IT WORKS:
 * - When user signs up, they get FREE Starter plan automatically
 * - When they upgrade, a new row is created in user_subscriptions
 * - devices_used increments when they request data erasure
 * - Resets monthly (handled by cron job - to be implemented)
 * 
 * SEED DATA:
 * We insert 3 default plans so users can subscribe immediately:
 * - Starter: ₹0, 5 devices/month (perfect for trying the service)
 * - Pro: ₹299, 50 devices/month (for growing businesses)
 * - Advanced: ₹699, unlimited devices (for enterprises)
 * 
 * TO APPLY THIS MIGRATION:
 * Local: npx wrangler d1 execute DB --local --file=./migrations/1.sql
 * Production: npx wrangler d1 execute DB --file=./migrations/1.sql
 * 
 * TO ROLLBACK:
 * Run: npx wrangler d1 execute DB --file=./migrations/1/down.sql
 */

-- Table: subscription_plans
-- Stores the different subscription tiers we offer
CREATE TABLE subscription_plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,                      -- Plan name: "Starter", "Pro", "Advanced"
  price INTEGER NOT NULL,                  -- Monthly cost in INR (0 for free tier)
  currency TEXT DEFAULT 'INR',             -- Currency code
  billing_cycle TEXT DEFAULT 'monthly',    -- monthly, yearly, etc.
  features TEXT,                           -- Comma-separated feature list
  devices_limit INTEGER DEFAULT 0,         -- Max devices per month (-1 = unlimited)
  is_active BOOLEAN DEFAULT 1,             -- Can users subscribe to this plan?
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table: user_subscriptions
-- Connects users to their subscription plans and tracks usage
CREATE TABLE user_subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,                   -- User ID from Mocha Users Service
  plan_id INTEGER NOT NULL,                -- Which plan they're on (FK to subscription_plans)
  status TEXT DEFAULT 'active',            -- active, cancelled, expired
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- When they subscribed
  expires_at DATETIME,                     -- When subscription ends (null = doesn't expire)
  devices_used INTEGER DEFAULT 0,          -- How many device credits used this month
  devices_limit INTEGER DEFAULT 0,         -- Cached limit from plan (for performance)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed data: Insert our 3 subscription tiers
INSERT INTO subscription_plans (name, price, features, devices_limit) VALUES
('Starter', 0, 'Up to 5 device erasures per month, Basic compliance reporting, Email support, Standard erasure methods, Mobile device support, Basic audit trail', 5),
('Pro', 299, 'Up to 50 device erasures per month, Advanced compliance reporting, Priority support, Military-grade algorithms, Server decommissioning, Forensic verification, GDPR & HIPAA compliance, Custom certificates, 24/7 emergency response', 50),
('Advanced', 699, 'Unlimited device erasures, Enterprise compliance suite, Dedicated account manager, On-site services, Custom integration, Real-time monitoring, All compliance standards, White-label certificates, SLA guarantee, API access, Bulk processing, Chain of custody documentation', -1);
