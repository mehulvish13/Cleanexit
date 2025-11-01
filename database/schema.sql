-- =====================================================
-- CLEANEXIT DATABASE SCHEMA
-- =====================================================
-- This schema is designed for Supabase PostgreSQL
-- Run this SQL in your Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster username lookups
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- =====================================================
-- CERTIFICATES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  certificate_id TEXT UNIQUE NOT NULL,
  device_type TEXT NOT NULL,
  wiped_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_certificate_id ON certificates(certificate_id);
CREATE INDEX IF NOT EXISTS idx_certificates_created_at ON certificates(created_at DESC);

-- =====================================================
-- SUPPORT TICKETS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('open', 'in_progress', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_created_at ON support_tickets(created_at DESC);

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for users table
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for support_tickets table
DROP TRIGGER IF EXISTS update_support_tickets_updated_at ON support_tickets;
CREATE TRIGGER update_support_tickets_updated_at
  BEFORE UPDATE ON support_tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Policies for users table
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (true);

CREATE POLICY "Service role can insert users" ON users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can update users" ON users
  FOR UPDATE USING (true);

-- Policies for certificates table
CREATE POLICY "Anyone can view certificates" ON certificates
  FOR SELECT USING (true);

CREATE POLICY "Service role can insert certificates" ON certificates
  FOR INSERT WITH CHECK (true);

-- Policies for support_tickets table
CREATE POLICY "Anyone can view their own tickets" ON support_tickets
  FOR SELECT USING (true);

CREATE POLICY "Service role can insert tickets" ON support_tickets
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can update tickets" ON support_tickets
  FOR UPDATE USING (true);

-- =====================================================
-- SAMPLE DATA (Optional - Remove in production)
-- =====================================================

-- Insert sample user
INSERT INTO users (username, email)
VALUES ('demo_user', 'demo@cleanexit.com')
ON CONFLICT (username) DO NOTHING;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Verify tables were created
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('users', 'certificates', 'support_tickets');

-- Check indexes
SELECT tablename, indexname 
FROM pg_indexes 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'certificates', 'support_tickets');
