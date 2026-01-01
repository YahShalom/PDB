import type { SupabaseClient, User } from '@supabase/supabase-js';

export type UserRole = 'visitor' | 'editor' | 'admin' | 'owner' | 'tech';

const roleRank: Record<UserRole, number> = {
  visitor: 0,
  editor: 1,
  admin: 2,
  owner: 3,
  tech: 4,
};

const techEmail = 'caraiagency@gmail.com';
const ownerEmail = 'perrydbeautystudio@gmail.com';

const normalizeRole = (role?: string | null): UserRole => {
  const value = (role ?? '').toLowerCase();
  if (value in roleRank) return value as UserRole;
  return 'visitor';
};

export const hasRole = (role: UserRole, minimum: UserRole) => roleRank[role] >= roleRank[minimum];

export const fetchUserRole = async (client: SupabaseClient, user: User): Promise<UserRole> => {
  const email = user.email?.toLowerCase();
  if (email === techEmail) return 'tech';
  if (email === ownerEmail) return 'owner';

  const { data: profile, error } = await client
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (!error && profile?.role) {
    return normalizeRole(profile.role);
  }

  if (error) {
    const message = error.message.toLowerCase();
    const missingProfiles = message.includes('profiles') && message.includes('relation');
    if (!missingProfiles) {
      console.warn('Profiles lookup failed, falling back to metadata:', error.message);
    }
  }

  const metaRole = (user.app_metadata?.role || user.user_metadata?.role) as string | undefined;
  return normalizeRole(metaRole);
};
