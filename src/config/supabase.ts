import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ygqtfexddddemobykfmz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlncXRmZXhkZGRkZW1vYnlrZm16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MDUyOTgsImV4cCI6MjA3NjA4MTI5OH0.NJBwKgi4bj5ZFEtYUk9yEwyZwXehehTxVjQ0kh3Ulvs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});


