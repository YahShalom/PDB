import { createClient, type SupabaseClient } from '@supabase/supabase-js';

type SupabaseEnv = {
  url: string;
  anonKey: string;
};

type SupabaseErrorLike = {
  message?: string;
  details?: string;
  hint?: string;
  code?: string;
};

const readSupabaseEnv = (): SupabaseEnv => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  return { url, anonKey };
};

const buildAuthOptions = (isBrowser: boolean) => ({
  persistSession: isBrowser,
  autoRefreshToken: isBrowser,
  detectSessionInUrl: isBrowser,
});

let browserClient: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient => {
  if (!browserClient) {
    const { url, anonKey } = readSupabaseEnv();
    const isBrowser = typeof window !== 'undefined';
    browserClient = createClient(url, anonKey, {
      auth: buildAuthOptions(isBrowser),
    });
  }

  return browserClient;
};

export const getSupabaseServerClient = (): SupabaseClient => {
  const { url, anonKey } = readSupabaseEnv();
  return createClient(url, anonKey, {
    auth: buildAuthOptions(false),
  });
};

export const normalizeSupabaseError = (error: unknown, context?: string): Error => {
  if (error instanceof Error) {
    if (context && !error.message.includes(context)) {
      return new Error(`${context}: ${error.message}`);
    }
    return error;
  }

  const supabaseError = error as SupabaseErrorLike | null;
  const message = supabaseError?.message ?? '';
  const details = supabaseError?.details ?? '';
  const hint = supabaseError?.hint ?? '';
  const code = supabaseError?.code ?? '';

  const parts = [message, details, hint].filter(Boolean);
  const base = parts.length ? parts.join(' | ') : JSON.stringify(error) || 'Unknown Supabase error';
  const suffix = code ? ` (code ${code})` : '';
  const finalMessage = `${base}${suffix}`;

  return new Error(context ? `${context}: ${finalMessage}` : finalMessage);
};
