// Schneller Supabase Connection Test
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://ygqtfexddddemobykfmz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlncXRmZXhkZGRkZW1vYnlrZm16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MDUyOTgsImV4cCI6MjA3NjA4MTI5OH0.NJBwKgi4bj5ZFEtYUk9yEwyZwXehehTxVjQ0kh3Ulvs';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testConnection() {
  console.log('🧪 Teste Supabase Verbindung...\n');

  try {
    // Test 1: Verbindung testen
    console.log('1️⃣  Teste Verbindung...');
    const { data, error } = await supabase.from('profiles').select('count');
    
    if (error) {
      console.log('❌ Fehler:', error.message);
      if (error.message.includes('relation "public.profiles" does not exist')) {
        console.log('\n⚠️  Die Tabelle "profiles" existiert noch nicht!');
        console.log('📋 Bitte führe das SQL aus SUPABASE_SETUP.md im SQL Editor aus.\n');
      }
    } else {
      console.log('✅ Verbindung erfolgreich!\n');
    }

    // Test 2: Auth Status
    console.log('2️⃣  Teste Auth Status...');
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      console.log('✅ Session gefunden:', session.user.email);
    } else {
      console.log('ℹ️  Keine aktive Session (normal für ersten Start)');
    }

    console.log('\n✅ Supabase ist bereit!');
    console.log('📱 Du kannst jetzt die App testen:\n');
    console.log('   1. Registriere einen Test-User');
    console.log('   2. Melde dich an');
    console.log('   3. Prüfe im Supabase Dashboard: Authentication → Users\n');

  } catch (error) {
    console.log('❌ Fehler:', error.message);
  }
}

testConnection();


