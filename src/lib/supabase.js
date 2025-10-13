import { createClient } from '@supabase/supabase-js';

// Legge le variabili d'ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Verifica che siano configurate
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Mancano le credenziali Supabase nel file .env.local');
}

// Crea e esporta il client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
