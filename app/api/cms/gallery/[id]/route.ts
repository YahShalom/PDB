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

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabaseServer = getSupabaseServerClient();
  const { id } = await params;
  const body = await req.json();
  const tableCandidates = ['galleryImages', 'gallery', 'gallery_images'];
  let error: { message?: string } | null = null;

  for (const table of tableCandidates) {
    let result = await supabaseServer.from(table).update(body).eq('id', id);
    error = result.error as { message?: string } | null;

    if (error && isMissingColumn(error)) {
      const mapped = mapGalleryPayload(body);
      result = await supabaseServer.from(table).update(mapped).eq('id', id);
      error = result.error as { message?: string } | null;
    }

    if (!error || !isMissingRelation(error)) break;
  }

  if (error) {
    return NextResponse.json(
      { error: normalizeSupabaseError(error, 'Supabase gallery update failed').message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabaseServer = getSupabaseServerClient();
  const { id } = await params;
  const tableCandidates = ['galleryImages', 'gallery', 'gallery_images'];
  let error: { message?: string } | null = null;

  for (const table of tableCandidates) {
    const result = await supabaseServer.from(table).delete().eq('id', id);
    error = result.error as { message?: string } | null;
    if (!error || !isMissingRelation(error)) break;
  }

  if (error) {
    return NextResponse.json(
      { error: normalizeSupabaseError(error, 'Supabase gallery delete failed').message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
