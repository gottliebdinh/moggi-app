# Supabase Setup für MOGGI App

## 1. Supabase Account erstellen

1. Gehe zu https://supabase.com
2. Klicke auf "Start your project"
3. Registriere dich mit GitHub oder Email

## 2. Neues Projekt erstellen

1. Klicke auf "New Project"
2. Name: `moggi-app`
3. Database Password: Wähle ein sicheres Passwort
4. Region: `Europe (Frankfurt)` oder am nächsten zu dir
5. Klicke "Create new project"
6. Warte 2-3 Minuten bis das Projekt bereit ist

## 3. API Keys kopieren

1. Gehe zu: **Settings** → **API**
2. Kopiere:
   - **Project URL** (z.B. `https://xxxxx.supabase.co`)
   - **anon public** Key

## 4. Keys in .env.local einfügen

Füge diese Zeilen in deine `.env.local` Datei hinzu:

```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 5. Datenbank-Tabellen erstellen

Gehe zu: **SQL Editor** und führe dieses SQL aus:

```sql
-- Users Tabelle (erweitert die Auth-Tabelle)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  birth_date DATE,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security aktivieren
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: User kann nur eigenes Profil sehen/bearbeiten
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Bestellungen Tabelle
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  guest_email TEXT,
  guest_first_name TEXT,
  guest_last_name TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  pickup_date DATE NOT NULL,
  pickup_time TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_intent_id TEXT,
  items JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security für Orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON public.orders
  FOR SELECT
  USING (auth.uid() = user_id);

-- Trigger: Erstelle Profil automatisch bei Registrierung
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, birth_date)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    (NEW.raw_user_meta_data->>'birth_date')::DATE
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 6. Email Authentication konfigurieren

1. Gehe zu: **Authentication** → **Providers**
2. **Email** sollte bereits aktiviert sein
3. Optional: Aktiviere **Confirm email** (empfohlen für Production)

## 7. Keys in Code einfügen

Die Keys werden automatisch aus `.env.local` geladen!

## 8. Testen

1. Starte die App neu
2. Registriere einen Test-User
3. Prüfe in Supabase Dashboard: **Authentication** → **Users**

## Nächste Schritte

- [ ] Supabase Account erstellen
- [ ] Projekt erstellen
- [ ] API Keys kopieren
- [ ] Keys in .env.local einfügen
- [ ] SQL Tabellen erstellen
- [ ] App testen

## Support

- Supabase Docs: https://supabase.com/docs
- React Native Guide: https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native


