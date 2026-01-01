import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient, normalizeSupabaseError } from '@/lib/supabase';

const isMissingColumn = (error?: { message?: string }) => {
  const message = error?.message?.toLowerCase() ?? '';
  return message.includes('column') && message.includes('does not exist');
};

const mapServicePayload = (body: Record<string, unknown>) => {
  const payload = { ...body } as Record<string, unknown>;
  if (payload.position !== undefined && payload.sort_order === undefined) {
    payload.sort_order = payload.position;
  }
  delete payload.position;
  return payload;
};

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabaseServer = getSupabaseServerClient();
  const { id } = await params;
  const body = await req.json();
  let { error } = await supabaseServer.from('services').update(body).eq('id', id);

  if (error && isMissingColumn(error)) {
    const mapped = mapServicePayload(body);
    ({ error } = await supabaseServer.from('services').update(mapped).eq('id', id));
  }

  if (error) {
    return NextResponse.json(
      { error: normalizeSupabaseError(error, 'Supabase service update failed').message },
      { status: 500 }
    );
  }
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabaseServer = getSupabaseServerClient();
  const { id } = await params;
  const { error } = await supabaseServer.from('services').delete().eq('id', id);
  if (error) {
    return NextResponse.json(
      { error: normalizeSupabaseError(error, 'Supabase service delete failed').message },
      { status: 500 }
    );
  }
  return NextResponse.json({ success: true });
}
