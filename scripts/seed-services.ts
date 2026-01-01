import { getSupabaseServerClient, normalizeSupabaseError } from '../lib/supabase';

type SeedService = {
  title: string;
  description: string;
  category: string;
  is_active: boolean;
  is_coming_soon: boolean;
  is_bookable: boolean;
  sort_order: number;
};

const services: SeedService[] = [
  {
    title: 'Hair plaiting (all styles)',
    description: 'Protective braids and plaits tailored to your preferred style and length.',
    category: 'Hair',
    is_active: true,
    is_coming_soon: false,
    is_bookable: true,
    sort_order: 1,
  },
  {
    title: 'Loc installation',
    description: 'Professional loc installation for new or starter locs.',
    category: 'Hair',
    is_active: true,
    is_coming_soon: false,
    is_bookable: true,
    sort_order: 2,
  },
  {
    title: 'Loc styling',
    description: 'Maintenance and styling for existing locs.',
    category: 'Hair',
    is_active: true,
    is_coming_soon: false,
    is_bookable: true,
    sort_order: 3,
  },
  {
    title: 'Manicure',
    description: 'Clean, shape, and polish with premium nail care.',
    category: 'Nails',
    is_active: true,
    is_coming_soon: false,
    is_bookable: true,
    sort_order: 4,
  },
  {
    title: 'Pedicure',
    description: 'Relaxing pedicure service for healthy, polished feet.',
    category: 'Nails',
    is_active: true,
    is_coming_soon: false,
    is_bookable: true,
    sort_order: 5,
  },
  {
    title: 'Eyebrow shaping',
    description: 'Precise shaping for clean, defined brows.',
    category: 'Brows/Lashes',
    is_active: true,
    is_coming_soon: false,
    is_bookable: true,
    sort_order: 6,
  },
  {
    title: 'Eyebrow tinting',
    description: 'Tinting to enhance brow definition and fullness.',
    category: 'Brows/Lashes',
    is_active: true,
    is_coming_soon: false,
    is_bookable: true,
    sort_order: 7,
  },
  {
    title: 'Lash installation',
    description: 'Flawless lash installation for a bold, effortless look.',
    category: 'Brows/Lashes',
    is_active: true,
    is_coming_soon: false,
    is_bookable: true,
    sort_order: 8,
  },
  {
    title: 'Makeup',
    description: 'Professional makeup services coming soon.',
    category: 'Coming Soon',
    is_active: true,
    is_coming_soon: true,
    is_bookable: false,
    sort_order: 9,
  },
  {
    title: 'Wig installation',
    description: 'Wig installation services coming soon.',
    category: 'Coming Soon',
    is_active: true,
    is_coming_soon: true,
    is_bookable: false,
    sort_order: 10,
  },
];

const seed = async () => {
  const supabaseServer = getSupabaseServerClient();
  const { error } = await supabaseServer
    .from('services')
    .upsert(services, { onConflict: 'title' });

  if (error) {
    const normalized = normalizeSupabaseError(error, 'Supabase seed failed');
    console.error('Seed failed:', normalized);
    process.exit(1);
  }

  console.log('Services seeded (title upsert).');
};

seed();
