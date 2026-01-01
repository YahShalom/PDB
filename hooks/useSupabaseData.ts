'use client';

import { useState, useEffect } from 'react';
import { getSupabaseClient, normalizeSupabaseError } from '@/lib/supabase';
import { Service as AppService } from '../types';

export interface ServiceCategory {
  id: string;
  name: string;
  sort_order: number;
  services: AppService[];
}

export function useSupabaseServices() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
          .from('categories')
          .select(`
            id,
            name,
            sort_order,
            services (*)
          `)
          .order('sort_order', { ascending: true });

        if (error) {
          const normalized = normalizeSupabaseError(error, 'Supabase services fetch failed');
          console.error(normalized);
          setError(normalized);
          return;
        }
        
        const harmonizedData = (data || []).map(cat => ({
          ...cat,
          services: cat.services
            .map((s: any) => ({
              id: s.id,
              title: s.name || s.title, // Handle potential DB naming variations
              description: s.description,
              price: s.price_label || s.price,
              duration_mins: s.duration_mins,
              is_featured: s.is_featured,
              is_active: s.is_active ?? true,
              category: cat.name as any,
              sort_order: s.sort_order
            }))
            .sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
        }));

        setCategories(harmonizedData);
      } catch (err) {
        const normalized = normalizeSupabaseError(err, 'Supabase services fetch failed');
        console.error(normalized);
        setError(normalized);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const services = categories.flatMap(cat => cat.services);

  return { categories, services, loading };
}

export function useSupabaseGallery() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          const normalized = normalizeSupabaseError(error, 'Supabase gallery fetch failed');
          console.error(normalized);
          setError(normalized);
          return;
        }
        setImages(data?.map(img => ({
          id: img.id,
          src: img.url,
          category: img.category
        })) || []);
      } catch (err) {
        const normalized = normalizeSupabaseError(err, 'Supabase gallery fetch failed');
        console.error(normalized);
        setError(normalized);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { images, loading };
}

export function useSupabaseBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('published_at', { ascending: false });

        if (error) {
          const normalized = normalizeSupabaseError(error, 'Supabase blog fetch failed');
          console.error(normalized);
          setError(normalized);
          return;
        }
        setPosts(data?.map(post => ({
          id: post.id,
          title: post.title,
          date: post.published_at ? new Date(post.published_at).toLocaleDateString() : '',
          excerpt: post.excerpt,
          image: post.image_url,
          slug: post.slug
        })) || []);
      } catch (err) {
        const normalized = normalizeSupabaseError(err, 'Supabase blog fetch failed');
        console.error(normalized);
        setError(normalized);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { posts, loading };
}
