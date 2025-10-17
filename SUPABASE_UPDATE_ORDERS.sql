-- SQL Script zum Updaten der orders Tabelle
-- Führe dieses Script in Supabase SQL Editor aus

-- 1. Alte Tabelle löschen (falls vorhanden)
DROP TABLE IF EXISTS public.orders CASCADE;

-- 2. Neue Tabelle mit allen benötigten Spalten erstellen
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  order_number TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  pickup_date TIMESTAMP WITH TIME ZONE NOT NULL,
  pickup_time TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_intent_id TEXT,
  items JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Row Level Security aktivieren
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 4. Policy: User kann nur eigene Bestellungen sehen
CREATE POLICY "Users can view own orders"
  ON public.orders
  FOR SELECT
  USING (auth.uid() = user_id);

-- 5. Policy: Jeder kann Bestellungen erstellen (für Gast-Bestellungen)
CREATE POLICY "Anyone can create orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (true);

-- Fertig! 🎉

