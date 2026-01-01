import { getSupabaseServerClient } from '@/lib/supabase';

if (typeof window !== 'undefined') {
  throw new Error('lib/services.ts must only be used on the server');
}

export type ServiceRecord = {
  id: string;
  title?: string | null;
  name?: string | null;
  description?: string | null;
  category?: string | null;
  is_active?: boolean | null;
  is_coming_soon?: boolean | null;
  is_bookable?: boolean | null;
  price_from?: number | null;
  price?: string | null;
  price_label?: string | null;
  duration_minutes?: number | null;
  sort_order?: number | null;
  created_at?: string | null;
};

export type ServiceCard = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  is_active: boolean;
  is_coming_soon: boolean;
  is_bookable: boolean;
};

const tableName = 'services';

const toServiceCard = (row: ServiceRecord): ServiceCard => {
  const title = row.title ?? row.name ?? 'Service';
  const description = row.description ?? 'Details coming soon.';
  const category = row.category ?? 'General';
  const isActive = row.is_active ?? (row.is_coming_soon ? false : true);
  const isComingSoon = row.is_coming_soon ?? !isActive;
  const isBookable = row.is_bookable ?? isActive;
  const price =
    row.price_label ??
    row.price ??
    (typeof row.price_from === 'number' ? `From KES ${row.price_from}` : 'Request Quote');

  return {
    id: row.id,
    title,
    description,
    category,
    price,
    is_active: Boolean(isActive),
    is_coming_soon: Boolean(isComingSoon),
    is_bookable: Boolean(isBookable),
  };
};

const fetchServices = async (): Promise<ServiceRecord[]> => {
  try {
    const supabaseServer = getSupabaseServerClient();
    const { data, error } = await supabaseServer
      .schema('public')
      .from(tableName)
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase services fetch error:', {
        code: error.code,
        message: error.message,
        hint: error.hint,
        details: error.details,
      });
      throw new Error(`Supabase services fetch error: ${error.message}`);
    }

    if (!data) {
      throw new Error('Supabase services fetch returned no data');
    }

    return data as ServiceRecord[];
  } catch (error) {
    console.error('Supabase services fetch failed:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    throw error;
  }
};

export const getActiveServices = async (): Promise<ServiceCard[]> => {
  const rows = await fetchServices();
  return rows
    .map(toServiceCard)
    .filter((service) => service.is_active && !service.is_coming_soon);
};

export const getComingSoonServices = async (): Promise<ServiceCard[]> => {
  const rows = await fetchServices();
  return rows
    .map(toServiceCard)
    .filter((service) => service.is_coming_soon || !service.is_active);
};

export const getFeaturedServices = async (limit = 6): Promise<ServiceCard[]> => {
  const rows = await fetchServices();
  return rows
    .map(toServiceCard)
    .filter((service) => service.is_active && service.is_bookable)
    .slice(0, limit);
};
