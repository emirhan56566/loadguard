
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const key = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

if (!url || !key) {
  throw new Error(
    'Supabase-Konfiguration fehlt. Vercel-Umgebungsvariablen prüfen.'
  );
}

const parsed = new URL(url);

if (
  parsed.protocol !== 'https:' ||
  parsed.pathname !== '/' ||
  parsed.search ||
  parsed.hash
) {
  throw new Error(
    'VITE_SUPABASE_URL muss die reine Supabase Project URL sein.'
  );
}

export const supabase = createClient(
  parsed.origin,
  key
);
