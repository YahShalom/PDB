import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient, normalizeSupabaseError } from '@/lib/supabase';

const isMissingColumn = (error?: { message?: string }) => {
  const message = error?.message?.toLowerCase() ?? '';
  return message.includes('column') && message.includes('does not exist');
};

const mapFaqPayload = (body: Record<string, unknown>) => {
  const payload = { ...body } as Record<string, unknown>;
  if (payload.position !== undefined && payload.sort_order === undefined) {
    payload.sort_order = payload.position;
  }
  delete payload.position;
  return payload;
};

export async function GET() {
  const supabaseServer = getSupabaseServerClient();
  const orderColumns = ['sort_order', 'position'];
  let data: unknown[] | null = null;
  let error: { message?: string } | null = null;

  for (const column of orderColumns) {
    const result = await supabaseServer.from('faqs').select('*').order(column, { ascending: true });
    data = result.data as unknown[] | null;
    error = result.error as { message?: string } | null;
    if (!error || !isMissingColumn(error)) break;
  }

  if (error) {
    return NextResponse.json(
      { error: normalizeSupabaseError(error, 'Supabase faqs fetch failed').message },
      { status: 500 }
    );
  }

  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const supabaseServer = getSupabaseServerClient();
  const body = await req.json();
  let { data, error } = await supabaseServer.from('faqs').insert(body).select('id').single();

  if (error && isMissingColumn(error)) {
    const mapped = mapFaqPayload(body);
    ({ data, error } = await supabaseServer.from('faqs').insert(mapped).select('id').single());
  }

  if (error) {
    return NextResponse.json(
      { error: normalizeSupabaseError(error, 'Supabase faq insert failed').message },
      { status: 500 }
    );
  }

  return NextResponse.json({ id: data?.id });
}
