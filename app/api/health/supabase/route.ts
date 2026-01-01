import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';

export async function GET() {
  const supabaseServer = getSupabaseServerClient();
  let canReachSupabase = false;
  let error: string | undefined;

  try {
    const { error: queryError } = await supabaseServer
      .from('services')
      .select('id')
      .limit(1);

    if (queryError) {
      console.error('Supabase health check failed:', {
        code: queryError.code,
        message: queryError.message,
        hint: queryError.hint,
        details: queryError.details,
      });
      error = queryError.message;
    } else {
      canReachSupabase = true;
    }
  } catch (err) {
    error = err instanceof Error ? err.message : String(err);
  }

  return NextResponse.json({
    ok: canReachSupabase,
    canReachSupabase,
    error,
  });
}
