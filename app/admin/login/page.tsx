'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { getSupabaseClient } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const supabaseClient = getSupabaseClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabaseClient.auth.getSession();
      if (data.session?.user) {
        router.replace('/admin/services');
      }
    };
    checkSession();
  }, [router]);

  return (
    <div className="min-h-screen bg-cream dark:bg-charcoal flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white dark:bg-charcoal-900 rounded-2xl border border-charcoal-100 dark:border-charcoal-700 p-8 shadow-xl">
        <h1 className="text-2xl font-serif font-bold text-charcoal dark:text-cream mb-2">Admin Login</h1>
        <p className="text-sm text-charcoal-600 dark:text-cream-300 mb-6">
          Sign in to manage services.
        </p>
        <Auth
          supabaseClient={supabaseClient}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          redirectTo={`${typeof window !== 'undefined' ? window.location.origin : ''}/admin/services`}
        />
      </div>
    </div>
  );
}
