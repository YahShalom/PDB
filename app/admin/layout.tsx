'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, FileText, Scissors, MessageSquare, HelpCircle, Image as ImageIcon, LogOut, Sparkles } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';
import { fetchUserRole, hasRole, type UserRole } from '@/lib/adminRole';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('visitor');
  const [loading, setLoading] = useState(true);
  const isLoginRoute = pathname === '/admin/login';
  const supabaseClient = getSupabaseClient();

  useEffect(() => {
    if (isLoginRoute) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const init = async () => {
      const { data } = await supabaseClient.auth.getSession();
      const user = data.session?.user;

      if (!user) {
        if (isMounted) setLoading(false);
        router.replace('/admin/login');
        return;
      }

      const resolvedRole = await fetchUserRole(supabaseClient, user);
      if (isMounted) {
        setRole(resolvedRole);
        setLoading(false);
      }

      if (!hasRole(resolvedRole, 'editor')) {
        router.replace('/admin/login');
      }
    };

    init();

    const { data: authListener } = supabaseClient.auth.onAuthStateChange(async (_event, session) => {
      if (!session?.user) {
        setRole('visitor');
        router.replace('/admin/login');
        return;
      }
      const resolvedRole = await fetchUserRole(supabaseClient, session.user);
      setRole(resolvedRole);
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [isLoginRoute, router]);

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'AI Assistant', path: '/admin/assistant', icon: Sparkles },
    { label: 'Text Content', path: '/admin/content', icon: FileText },
    { label: 'Services', path: '/admin/services', icon: Scissors },
    { label: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
    { label: 'FAQs', path: '/admin/faqs', icon: HelpCircle },
    { label: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
  ];

  const canSignOut = useMemo(() => hasRole(role, 'editor'), [role]);
  const handleSignOut = () => {
    supabaseClient.auth.signOut();
  };

  if (isLoginRoute) {
    return <>{children}</>;
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">Loading Admin...</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold font-serif text-gray-800">Perry D Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-gold/10 text-yellow-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleSignOut}
            className={`flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg transition-colors ${
              canSignOut ? 'text-red-600 hover:bg-red-50' : 'text-gray-400 cursor-not-allowed'
            }`}
            disabled={!canSignOut}
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
           {children}
        </div>
      </main>
    </div>
  );
}
