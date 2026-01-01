
'use client';

import React, { useState, useMemo } from 'react';
import { useContent } from '@/components/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';
import { useSupabaseGallery } from '@/hooks/useSupabaseData';
import { Loader2, ImageOff, Sparkles } from 'lucide-react';

type Category = 'All' | 'Braids' | 'Bridal' | 'Makeup' | 'Facials';

export default function GalleryClient() {
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const { content } = useContent();
  const { labels } = content;
  const { images: realImages, loading } = useSupabaseGallery();

  // Use real images from Supabase if available, otherwise use fallback data
  const baseImages = useMemo(() => 
    realImages.length > 0 ? realImages : content.galleryImages
  , [realImages, content.galleryImages]);

  // Dynamically calculate counts for each category badge
  const counts = useMemo(() => {
    const countsMap: Record<string, number> = {
      All: baseImages.length,
      Braids: 0,
      Bridal: 0,
      Makeup: 0,
      Facials: 0,
    };
    baseImages.forEach(img => {
      if (countsMap[img.category] !== undefined) {
        countsMap[img.category]++;
      }
    });
    return countsMap;
  }, [baseImages]);

  // Filter images based on the active selection
  const filteredImages = useMemo(() => 
    activeFilter === 'All' 
      ? baseImages 
      : baseImages.filter(img => img.category === activeFilter)
  , [activeFilter, baseImages]);

  const categories: Category[] = ['All', 'Braids', 'Bridal', 'Makeup', 'Facials'];

  return (
    <div className="pt-32 pb-24 bg-cream dark:bg-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-gold font-bold tracking-widest text-xs uppercase mb-3 block flex items-center justify-center gap-2">
              <Sparkles size={14} /> {labels.portfolio}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-medium text-charcoal dark:text-cream mb-6">
              {labels.masterpieces}
            </h1>
            <p className="text-charcoal-600 dark:text-cream-200/70 text-lg font-light max-w-2xl mx-auto leading-relaxed">
              Witness the art of transformation. Every look is a bespoke creation tailored to celebrate your unique beauty.
            </p>
          </div>
        </ScrollReveal>

        {/* Dynamic Filter Buttons */}
        <ScrollReveal delay="0.1s">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`group flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-500 transform active:scale-95 floating-card ${
                  activeFilter === cat
                    ? 'bg-charcoal text-gold dark:bg-gold dark:text-charcoal gold-border-gradient'
                    : 'bg-white dark:bg-charcoal-800 text-charcoal-600 dark:text-cream-300 hover:text-gold border border-transparent'
                }`}
              >
                <span className="relative z-10">{cat}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full transition-colors ${
                  activeFilter === cat 
                    ? 'bg-gold/20 text-gold dark:bg-charcoal/20 dark:text-charcoal' 
                    : 'bg-cream-100 dark:bg-charcoal-900 text-charcoal-400'
                }`}>
                  {counts[cat] || 0}
                </span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="flex flex-col items-center py-32">
             <Loader2 className="animate-spin text-gold mb-4" size={48} />
             <p className="text-charcoal-500 font-serif tracking-widest uppercase text-xs">Curating our artistry...</p>
          </div>
        ) : filteredImages.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((img, idx) => (
              <ScrollReveal key={img.id} delay={`${(idx % 6) * 0.1}s`}>
                <div className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer floating-card gold-border-gradient gold-card-text">
                  <div className="relative z-10">
                    <img 
                      src={img.src} 
                      alt={img.category} 
                      className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110" 
                      loading="lazy"
                    />
                    {/* Premium Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                      <span className="text-gold font-bold text-[10px] uppercase tracking-[0.2em] mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {img.category}
                      </span>
                      <div className="h-px w-0 group-hover:w-full bg-gold transition-all duration-700 delay-100 mb-4"></div>
                      <span className="text-white font-serif text-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                        Signature Style
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          /* Empty State */
          <ScrollReveal>
            <div className="py-32 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-cream-100 dark:bg-charcoal-800 rounded-full flex items-center justify-center mb-6 text-charcoal-300 dark:text-charcoal-600">
                <ImageOff size={40} />
              </div>
              <h3 className="text-2xl font-serif font-medium text-charcoal dark:text-cream mb-2">No masterpieces yet</h3>
              <p className="text-charcoal-500 dark:text-cream-300/60 font-light max-w-sm">
                We haven't added any images to the <span className="text-gold font-bold">{activeFilter}</span> category yet. Check back soon for new transformations.
              </p>
              <button 
                onClick={() => setActiveFilter('All')}
                className="mt-8 text-gold font-bold uppercase tracking-widest text-xs border-b border-gold pb-1 hover:text-gold-600 transition-colors"
              >
                View all categories
              </button>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
