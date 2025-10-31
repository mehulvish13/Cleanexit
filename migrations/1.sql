
CREATE TABLE subscription_plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  currency TEXT DEFAULT 'INR',
  billing_cycle TEXT DEFAULT 'monthly',
  features TEXT,
  devices_limit INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  plan_id INTEGER NOT NULL,
  status TEXT DEFAULT 'active',
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME,
  devices_used INTEGER DEFAULT 0,
  devices_limit INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO subscription_plans (name, price, features, devices_limit) VALUES
('Starter', 0, 'Up to 5 device erasures per month, Basic compliance reporting, Email support, Standard erasure methods, Mobile device support, Basic audit trail', 5),
('Pro', 299, 'Up to 50 device erasures per month, Advanced compliance reporting, Priority support, Military-grade algorithms, Server decommissioning, Forensic verification, GDPR & HIPAA compliance, Custom certificates, 24/7 emergency response', 50),
('Advanced', 699, 'Unlimited device erasures, Enterprise compliance suite, Dedicated account manager, On-site services, Custom integration, Real-time monitoring, All compliance standards, White-label certificates, SLA guarantee, API access, Bulk processing, Chain of custody documentation', -1);
