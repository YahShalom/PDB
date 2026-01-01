
import React, { useState } from 'react';
import { useContent } from '../components/LanguageContext';
import ScrollReveal from '../components/ScrollReveal';
import { useSupabaseGallery } from '../hooks/useSupabaseData';
import { Loader2 } from 'lucide-react';

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Braids' | 'Bridal' | 'Makeup' | 'Facials'>('All');
  const { content } = useContent();
  const { labels } = content;
  const { images: realImages, loading } = useSupabaseGallery();

  const displayImages = realImages.length > 0 ? realImages : content.galleryImages;

  const filteredImages = filter === 'All' 
    ? displayImages 
    : displayImages.filter(img => img.category === filter);

  const categories = ['All', 'Braids', 'Bridal', 'Makeup', 'Facials'];

  return (
    <div className="pt-32 pb-24 bg-cream dark:bg-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-gold font-bold tracking-widest text-xs uppercase mb-3 block">{labels.portfolio}</span>
            <h1 className="text-4xl md:text-6xl font-serif font-medium text-charcoal dark:text-cream mb-6">{labels.masterpieces}</h1>
            <p className="text-xl text-charcoal-600 dark:text-cream-200/80 font-light max-w-2xl mx-auto">
              Browse our curated collection of transformations. From protective styling to bridal perfection.
            </p>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay="0.1s">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 floating-card gold-border-gradient ${
                  filter === cat
                    ? 'bg-charcoal text-gold dark:bg-gold dark:text-charcoal'
                    : 'bg-white dark:bg-charcoal-800 text-charcoal-600 dark:text-cream-300 hover:bg-cream-100 dark:hover:bg-charcoal-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="flex flex-col items-center py-20">
             <Loader2 className="animate-spin text-gold mb-4" size={48} />
             <p className="text-charcoal-500 font-serif">Displaying our best work...</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((img, idx) => (
              <ScrollReveal key={img.id} delay={`${idx * 0.1}s`}>
                <div className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer floating-card gold-border-gradient gold-card-text">
                  <img 
                    src={img.src} 
                    alt={img.category} 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 relative z-10" 
                  />
                  <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 z-20">
                    <span className="text-gold font-bold text-xs uppercase tracking-widest mb-2">{img.category}</span>
                    <span className="text-white font-serif text-2xl">View Detail</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
            
            {filteredImages.length === 0 && (
              <div className="col-span-full text-center py-20 text-charcoal-400">
                No images found in this category.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
