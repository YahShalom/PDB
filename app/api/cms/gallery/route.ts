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

const normalizeGalleryRow = (row: Record<string, unknown>) => ({
  ...row,
  isHeroFeatured: (row.isHeroFeatured as boolean | undefined) ?? (row.is_hero_featured as boolean | undefined),
  createdAt: (row.createdAt as string | undefined) ?? (row.created_at as string | undefined),
  position: (row.position as number | undefined) ?? (row.sort_order as number | undefined),
});

const mapGalleryPayload = (body: Record<string, unknown>) => {
  const payload = { ...body } as Record<string, unknown>;
  if (payload.isHeroFeatured !== undefined && payload.is_hero_featured === undefined) {
    payload.is_hero_featured = payload.isHeroFeatured;
  }
  if (payload.createdAt !== undefined && payload.created_at === undefined) {
    payload.created_at = payload.createdAt;
  }
  if (payload.position !== undefined && payload.sort_order === undefined) {
    payload.sort_order = payload.position;
  }
  delete payload.isHeroFeatured;
  delete payload.createdAt;
  delete payload.position;
  return payload;
};

export async function GET() {
  const supabaseServer = getSupabaseServerClient();
  const tableCandidates = ['galleryImages', 'gallery', 'gallery_images'];
  let data: unknown[] | null = null;
  let error: { message?: string } | null = null;

  for (const table of tableCandidates) {
    const result = await supabaseServer.from(table).select('*').order('created_at', { ascending: false });
    data = result.data as unknown[] | null;
    error = result.error as { message?: string } | null;

    if (error && isMissingColumn(error)) {
      const fallback = await supabaseServer.from(table).select('*').order('createdAt', { ascending: false });
      data = fallback.data as unknown[] | null;
      error = fallback.error as { message?: string } | null;
    }

    if (!error || !isMissingRelation(error)) break;
  }

  if (error) {
    return NextResponse.json(
      { error: normalizeSupabaseError(error, 'Supabase gallery fetch failed').message },
      { status: 500 }
    );
  }

  const normalized = (data ?? []).map((row) => normalizeGalleryRow(row as Record<string, unknown>));
  return NextResponse.json(normalized);
}

export async function POST(req: NextRequest) {
  const supabaseServer = getSupabaseServerClient();
  const body = await req.json();
  const tableCandidates = ['galleryImages', 'gallery', 'gallery_images'];
  let data: { id?: string } | null = null;
  let error: { message?: string } | null = null;

  for (const table of tableCandidates) {
    let result = await supabaseServer.from(table).insert(body).select('id').single();
    data = result.data as { id?: string } | null;
    error = result.error as { message?: string } | null;

    if (error && isMissingColumn(error)) {
      const mapped = mapGalleryPayload(body);
      result = await supabaseServer.from(table).insert(mapped).select('id').single();
      data = result.data as { id?: string } | null;
      error = result.error as { message?: string } | null;
    }

    if (!error || !isMissingRelation(error)) break;
  }

  if (error) {
    return NextResponse.json(
      { error: normalizeSupabaseError(error, 'Supabase gallery insert failed').message },
      { status: 500 }
    );
  }

  return NextResponse.json({ id: data?.id });
}
