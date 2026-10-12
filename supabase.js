import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn('LoadGuard: Supabase-Verbindungsdaten fehlen.');
}

export const supabase = createClient(
  SUPABASE_URL || 'https://example.supabase.co',
  SUPABASE_KEY || 'placeholder-key'
);