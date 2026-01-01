import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient, normalizeSupabaseError } from '@/lib/supabase';

const isMissingColumn = (error?: { message?: string }) => {
  const message = error?.message?.toLowerCase() ?? '';
  return message.includes('column') && message.includes('does not exist');
};

const isMissingRelation = (error?: { message?: string }) => {
  const message = error?.message?.toLowerCase() ?? '';
  return message.includes('relation') && message.includes('does not exist');
};

const normalizeContentBlock = (row: Record<string, unknown>) => ({
  ...row,
  updatedAt: (row.updatedAt as string | undefined) ?? (row.updated_at as string | undefined),
});

export async function GET(req: NextRequest) {
  const supabaseServer = getSupabaseServerClient();
  const { searchParams } = new URL(req.url);
  const prefix = searchParams.get('prefix') || '';
  const tableCandidates = ['contentBlocks', 'content_blocks'];
  let data: unknown[] | null = null;
  let error: { message?: string } | null = null;

  for (const table of tableCandidates) {
    const buildQuery = () => {
      let query = supabaseServer.from(table).select('*');
      if (prefix) {
        query = query.ilike('key', `${prefix}%`);
      }
      return query;
    };

    const result = await buildQuery().order('updated_at', { ascending: false });
    data = result.data as unknown[] | null;
    error = result.error as { message?: string } | null;

    if (!error) break;
    if (isMissingColumn(error)) {
      const fallback = await buildQuery().order('updatedAt', { ascending: false });
      data = fallback.data as unknown[] | null;
      error = fallback.error as { message?: string } | null;
    }
    if (!error || !isMissingRelation(error)) break;
  }

  if (error) {
    return NextResponse.json(
      { error: normalizeSupabaseError(error, 'Supabase content fetch failed').message },
      { status: 500 }
    );
  }

  const normalized = (data ?? []).map((row) => normalizeContentBlock(row as Record<string, unknown>));
  return NextResponse.json(normalized);
}

export async function POST(req: NextRequest) {
  const supabaseServer = getSupabaseServerClient();
  // TODO: Verify Admin Auth here
  const body = await req.json();
  const { key, value } = body;
  if (!key || value === undefined) {
    return NextResponse.json({ error: 'Missing key or value' }, { status: 400 });
  }
  const payload = {
    id: key,
    key,
    value,
    updated_at: new Date().toISOString(),
  };
  const tableCandidates = ['contentBlocks', 'content_blocks'];
  let error: { message?: string } | null = null;

  for (const table of tableCandidates) {
    const result = await supabaseServer.from(table).upsert(payload, { onConflict: 'id' });
    error = result.error as { message?: string } | null;

    if (!error) break;
    if (isMissingColumn(error)) {
      const fallbackPayload = { id: key, key, value, updatedAt: payload.updated_at };
      const fallback = await supabaseServer.from(table).upsert(fallbackPayload, { onConflict: 'id' });
      error = fallback.error as { message?: string } | null;
    }
    if (!error || !isMissingRelation(error)) break;
  }

  if (error) {
    return NextResponse.json(
      { error: normalizeSupabaseError(error, 'Supabase content upsert failed').message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
