'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Trash2, Edit, Plus, Search } from 'lucide-react';
import { getSupabaseClient, normalizeSupabaseError } from '@/lib/supabase';
import { fetchUserRole, hasRole, type UserRole } from '@/lib/adminRole';

type ServiceRow = {
  id: string;
  name: string;
  description?: string | null;
  category?: string | null;
  is_active?: boolean | null;
  is_coming_soon?: boolean | null;
  is_bookable?: boolean | null;
  price_from?: number | null;
  duration_minutes?: number | null;
  sort_order?: number | null;
  created_at?: string | null;
};

const emptyService: ServiceRow = {
  id: '',
  name: '',
  description: '',
  category: '',
  is_active: true,
  is_coming_soon: false,
  is_bookable: true,
  price_from: null,
  duration_minutes: null,
  sort_order: 0,
};

export default function ServicesAdmin() {
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [editing, setEditing] = useState<ServiceRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<UserRole>('visitor');
  const [search, setSearch] = useState('');
  const supabaseClient = getSupabaseClient();

  const loadRole = async () => {
    const { data } = await supabaseClient.auth.getSession();
    if (!data.session?.user) {
      setRole('visitor');
      return;
    }
    const resolvedRole = await fetchUserRole(supabaseClient, data.session.user);
    setRole(resolvedRole);
  };

  const fetchServices = async () => {
    setLoading(true);
    const { data, error } = await supabaseClient
      .from('services')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Services fetch error:', {
        code: error.code,
        message: error.message,
        hint: error.hint,
        details: error.details,
      });
      throw normalizeSupabaseError(error, 'Supabase services fetch failed');
    } else {
      setServices((data ?? []) as ServiceRow[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadRole();
    fetchServices();
  }, []);

  const canEdit = hasRole(role, 'editor');
  const canCrud = hasRole(role, 'admin');

  const filteredServices = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return services;
    return services.filter((service) => service.name.toLowerCase().includes(term));
  }, [search, services]);

  const buildPayload = (service: ServiceRow) => {
    if (canCrud) return service;
    return {
      name: service.name,
      description: service.description,
      sort_order: service.sort_order,
      is_active: service.is_active,
      is_bookable: service.is_bookable,
      is_coming_soon: service.is_coming_soon,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    if (!canEdit) return;

    const payload = buildPayload(editing);

    if (editing.id) {
      const { error } = await supabaseClient.from('services').update(payload).eq('id', editing.id);
      if (error) {
        console.error('Update error:', {
          code: error.code,
          message: error.message,
          hint: error.hint,
          details: error.details,
        });
        throw normalizeSupabaseError(error, 'Supabase service update failed');
      }
    } else if (canCrud) {
      const { error } = await supabaseClient.from('services').insert(payload);
      if (error) {
        console.error('Insert error:', {
          code: error.code,
          message: error.message,
          hint: error.hint,
          details: error.details,
        });
        throw normalizeSupabaseError(error, 'Supabase service insert failed');
      }
    }

    setEditing(null);
    fetchServices();
  };

  const handleDelete = async (id: string) => {
    if (!canCrud) return;
    if (!confirm('Are you sure?')) return;
    const { error } = await supabaseClient.from('services').delete().eq('id', id);
    if (error) {
      console.error('Delete error:', {
        code: error.code,
        message: error.message,
        hint: error.hint,
        details: error.details,
      });
      throw normalizeSupabaseError(error, 'Supabase service delete failed');
    }
    fetchServices();
  };

  if (!canEdit) {
    return (
      <div className="max-w-5xl">
        <h1 className="text-3xl font-serif font-bold mb-4">Services</h1>
        <p className="text-sm text-gray-600">
          You do not have access to manage services. Please contact an admin.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold">Services</h1>
          <p className="text-sm text-gray-500">Manage pricing, availability, and ordering.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              className="pl-9 pr-3 py-2 border rounded-lg text-sm"
              placeholder="Search services"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {canCrud && (
            <button
              onClick={() => setEditing({ ...emptyService, sort_order: services.length + 1 })}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={18} /> Add Service
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Bookable</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-6 text-sm text-gray-500">
                  Loading services...
                </td>
              </tr>
            ) : (
              filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-500">{service.sort_order ?? '-'}</td>
                  <td className="px-6 py-4 font-medium">{service.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">{service.category || 'General'}</span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {service.is_coming_soon ? 'Coming soon' : service.is_active ? 'Active' : 'Inactive'}
                  </td>
                  <td className="px-6 py-4 text-sm">{service.is_bookable ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      onClick={() => setEditing(service)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                    {canCrud && (
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-6">{editing.id ? 'Edit Service' : 'New Service'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    className="w-full border p-2 rounded"
                    value={editing.name || ''}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <input
                    className="w-full border p-2 rounded"
                    value={editing.category || ''}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    disabled={!canCrud}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full border p-2 rounded"
                  rows={3}
                  value={editing.description || ''}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price From (KES)</label>
                  <input
                    type="number"
                    className="w-full border p-2 rounded"
                    value={editing.price_from ?? ''}
                    onChange={(e) => setEditing({ ...editing, price_from: e.target.value === '' ? null : Number(e.target.value) })}
                    disabled={!canCrud}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
                  <input
                    type="number"
                    className="w-full border p-2 rounded"
                    value={editing.duration_minutes ?? ''}
                    onChange={(e) => setEditing({ ...editing, duration_minutes: e.target.value === '' ? null : Number(e.target.value) })}
                    disabled={!canCrud}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Sort Order</label>
                  <input
                    type="number"
                    className="w-full border p-2 rounded"
                    value={editing.sort_order ?? 0}
                    onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={Boolean(editing.is_active)}
                    onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })}
                  />
                  Active
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={Boolean(editing.is_bookable)}
                    onChange={(e) => setEditing({ ...editing, is_bookable: e.target.checked })}
                  />
                  Bookable
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={Boolean(editing.is_coming_soon)}
                    onChange={(e) => setEditing({ ...editing, is_coming_soon: e.target.checked })}
                  />
                  Coming Soon
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-gold text-white font-bold rounded hover:bg-yellow-600">
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
