
-- Insert default subscription plans if they don't exist
INSERT OR IGNORE INTO subscription_plans (id, name, price, devices_limit, features) VALUES 
(1, 'Starter', 0, 5, 'Up to 5 device erasures per month,Basic compliance reporting,Email support,Standard erasure methods,Mobile device support,Basic audit trail'),
(2, 'Pro', 299, 50, 'Up to 50 device erasures per month,Advanced compliance reporting,Priority email & phone support,Military-grade erasure algorithms,Server decommissioning support,Detailed forensic verification,GDPR & HIPAA compliance,Custom certificates,24/7 emergency response'),
(3, 'Advanced', 699, -1, 'Unlimited device erasures,Enterprise compliance suite,Dedicated account manager,On-site erasure services,Custom integration support,Real-time monitoring dashboard,All compliance standards,White-label certificates,SLA guarantee (99.9% uptime),API access,Bulk processing capabilities,Chain of custody documentation');
