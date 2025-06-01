import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/auth';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!;

// Cliente para el lado del cliente (browser)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Cliente para el lado del servidor (con permisos de servicio)
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Cliente para operaciones de autenticación en el servidor
export const createServerSupabaseClient = () => {
  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};