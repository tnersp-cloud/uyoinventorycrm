-- Uyo Project Management & Inventory System - Supabase SQL Schema

-- 1. Enable pgcrypto for UUIDs if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create Uyo Inventory Table
CREATE TABLE public.uyo_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  date DATE NOT NULL,
  recorded_by TEXT,
  weather TEXT,
  item_no INTEGER,
  description TEXT NOT NULL,
  unit TEXT,
  opening_stock NUMERIC DEFAULT 0,
  received_today NUMERIC DEFAULT 0,
  used_today NUMERIC DEFAULT 0,
  closing_stock NUMERIC DEFAULT 0,
  location TEXT,
  remarks TEXT
);

-- 3. Create Uyo Program of Works Table
CREATE TABLE public.uyo_program_of_works (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  activity_no INTEGER,
  activity_name TEXT NOT NULL,
  duration_months INTEGER,
  start_month TEXT,
  m1 TEXT,
  m2 TEXT,
  m3 TEXT,
  m4 TEXT,
  m5 TEXT,
  m6 TEXT,
  m7 TEXT,
  m8 TEXT,
  m9 TEXT,
  m10 TEXT,
  m11 TEXT,
  m12 TEXT,
  m13 TEXT,
  m14 TEXT,
  m15 TEXT
);

-- 4. Enable RLS for Uyo Tables
ALTER TABLE public.uyo_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uyo_program_of_works ENABLE ROW LEVEL SECURITY;

-- 5. Uyo RLS Policies
CREATE POLICY "Enable all access for authenticated users on uyo_inventory" 
ON public.uyo_inventory FOR ALL 
TO authenticated 
USING (true);

CREATE POLICY "Enable insert for anonymous users on uyo_inventory" 
ON public.uyo_inventory FOR INSERT 
TO anon
WITH CHECK (true);

CREATE POLICY "Enable all access for authenticated users on uyo_program_of_works" 
ON public.uyo_program_of_works FOR ALL 
TO authenticated 
USING (true);
