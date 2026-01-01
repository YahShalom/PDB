
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Scissors, FileText, Image as ImageIcon, ArrowRight, Sparkles } from 'lucide-react';
import { useContent } from './LanguageContext';
import Link from 'next/link';
import { useSupabaseServices, useSupabaseBlog } from '@/hooks/useSupabaseData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const { content } = useContent();
  const { services: liveServices } = useSupabaseServices();
  const { posts: livePosts } = useSupabaseBlog();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timeout);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const searchLower = query.toLowerCase().trim();
  
  // Combine local and live data
  const combinedServices = liveServices.length > 0 ? liveServices : content.services;
  const combinedPosts = livePosts.length > 0 ? livePosts : content.blogPosts;

  const results = {
    services: combinedServices.filter(s => 
      s.title.toLowerCase().includes(searchLower) || 
      s.description.toLowerCase().includes(searchLower) ||
      (s.category && s.category.toLowerCase().includes(searchLower))
    ),
    blog: combinedPosts.filter(p => 
      p.title.toLowerCase().includes(searchLower) || 
      p.excerpt.toLowerCase().includes(searchLower)
    ),
    gallery: content.galleryImages.filter(g => 
      g.category.toLowerCase().includes(searchLower)
    )
  };

  const hasResults = results.services.length > 0 || results.blog.length > 0 || results.gallery.length > 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-charcoal/95 backdrop-blur-xl animate-fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-charcoal-800 rounded-3xl shadow-2xl border border-charcoal-100 dark:border-charcoal-700 overflow-hidden flex flex-col max-h-[70vh]">
        <div className="p-6 border-b border-charcoal-100 dark:border-charcoal-700 flex items-center gap-4">
          <Search className="text-gold" size={24} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search services, blog, or gallery..."
            className="flex-grow bg-transparent border-none outline-none text-xl font-serif text-charcoal dark:text-cream placeholder-charcoal-300"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="p-2 hover:bg-cream-100 dark:hover:bg-charcoal-700 rounded-full transition-colors">
            <X size={20} className="text-charcoal-400" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-8 custom-scrollbar">
          {query.length < 2 ? (
            <div className="py-12 text-center">
              <Sparkles size={40} className="mx-auto text-gold/20 mb-4" />
              <p className="text-charcoal-400 dark:text-cream-300/50 font-light">Enter at least 2 characters to search the studio...</p>
            </div>
          ) : !hasResults ? (
            <div className="py-12 text-center">
              <p className="text-charcoal-400 dark:text-cream-300/50 font-light">No matches found for "{query}"</p>
            </div>
          ) : (
            <>
              {results.services.length > 0 && (
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4 px-2">Services</h3>
                  <div className="grid gap-2">
                    {results.services.map(s => (
                      <Link key={s.id} href="/services" onClick={onClose} className="flex items-center gap-4 p-3 rounded-xl hover:bg-cream-50 dark:hover:bg-charcoal-700 transition-colors group">
                        <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center text-gold">
                          <Scissors size={20} />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-sm font-bold text-charcoal dark:text-cream group-hover:text-gold transition-colors">{s.title}</h4>
                          <p className="text-xs text-charcoal-400 dark:text-cream-300/50 line-clamp-1">{s.description}</p>
                        </div>
                        <ArrowRight size={14} className="text-charcoal-300 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {results.blog.length > 0 && (
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4 px-2">Journal</h3>
                  <div className="grid gap-2">
                    {results.blog.map(p => (
                      <Link key={p.id} href="/blog" onClick={onClose} className="flex items-center gap-4 p-3 rounded-xl hover:bg-cream-50 dark:hover:bg-charcoal-700 transition-colors group">
                        <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center text-gold">
                          <FileText size={20} />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-sm font-bold text-charcoal dark:text-cream group-hover:text-gold transition-colors">{p.title}</h4>
                          <p className="text-xs text-charcoal-400 dark:text-cream-300/50 line-clamp-1">{p.excerpt}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="p-4 bg-cream-50 dark:bg-charcoal-900 border-t border-charcoal-100 dark:border-charcoal-700 flex justify-between items-center">
          <p className="text-[10px] text-charcoal-400 uppercase tracking-widest">Esc to close • Perry D Search</p>
          <div className="flex items-center gap-1 text-[10px] text-charcoal-400">
            <kbd className="px-1.5 py-0.5 rounded border border-charcoal-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-800">⌘</kbd>
            <kbd className="px-1.5 py-0.5 rounded border border-charcoal-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-800">K</kbd>
          </div>
        </div>
      </div>
    </div>
  );
}
