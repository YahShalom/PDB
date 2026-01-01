
'use client';
import React from 'react';
import { ArrowLeft, MessageCircle, Loader2, Clock, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import { useContent } from '@/components/LanguageContext';
import ScrollReveal from '@/components/ScrollReveal';
import { useSupabaseServices } from '@/hooks/useSupabaseData';

export default function ServicesClient() {
  const { content } = useContent();
  const { brand, labels } = content;
  const { categories, loading } = useSupabaseServices();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-cream dark:bg-charcoal relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-16">
            <Link href="/" className="inline-flex items-center text-charcoal-500 hover:text-gold dark:text-cream-300 transition-colors text-sm mb-6 font-medium">
              <ArrowLeft size={16} className="mr-2" /> {labels.backHome}
            </Link>
            <h1 className="text-4xl md:text-6xl font-serif font-medium text-charcoal dark:text-cream mb-6">{labels.serviceMenu}</h1>
            <p className="text-xl text-charcoal-600 dark:text-cream-200/80 font-light leading-relaxed max-w-2xl">
              Elevate your appearance with our professional beauty menu. From intricate braiding to dermatology-grade skin care.
            </p>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="flex flex-col items-center py-24">
             <Loader2 className="animate-spin text-gold mb-4" size={48} />
             <p className="text-charcoal-500 font-serif tracking-widest uppercase text-xs">Curating our excellence...</p>
          </div>
        ) : (
          <div className="space-y-24">
            {categories.map((cat, idx) => (
              <ScrollReveal key={cat.id} delay={`${idx * 0.1}s`}>
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="text-3xl font-serif text-charcoal dark:text-cream">{cat.name}</h2>
                  <div className="h-px bg-charcoal-200 dark:bg-charcoal-700 flex-grow"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {cat.services.map(service => {
                    const isActive = service.is_active !== false;
                    const duration = service.duration_mins ?? 0;
                    return (
                    <div 
                      key={service.id} 
                      className={`group bg-white dark:bg-charcoal-800 p-8 rounded-2xl floating-card gold-border-gradient gold-card-text flex flex-col transition-all duration-500 ${!isActive ? 'opacity-80 grayscale-[0.5]' : ''}`}
                    >
                      <div className="relative z-10 flex-grow">
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h3 className="text-xl font-bold text-charcoal dark:text-cream group-hover:text-gold transition-colors flex items-center gap-2">
                            {service.title}
                            {service.is_featured && isActive && (
                               <Sparkles size={16} className="text-gold shrink-0 animate-pulse" />
                            )}
                          </h3>
                          <div className="flex flex-col items-end">
                            <span className="inline-block px-4 py-1 bg-cream-100 dark:bg-charcoal-900 text-charcoal-800 dark:text-gold rounded-full text-xs font-bold whitespace-nowrap shadow-sm">
                              {isActive ? service.price : 'Coming Soon'}
                            </span>
                          </div>
                        </div>

                        {isActive && duration > 0 && (
                          <div className="flex items-center gap-1.5 text-charcoal-400 dark:text-cream-400 text-xs mb-6 font-medium italic">
                            <Clock size={12} className="text-gold/70" />
                            <span>{duration} min session</span>
                          </div>
                        )}

                        <p className="text-charcoal-600 dark:text-cream-300/80 text-sm mb-6 font-light leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      <div className="mt-auto pt-6 border-t border-charcoal-50 dark:border-charcoal-700/50">
                        {isActive ? (
                          <a 
                            href={`https://wa.me/${brand.phone.replace(/[^0-9]/g, '')}?text=Hi, I would like to book ${service.title}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-gold font-bold text-xs uppercase tracking-widest hover:text-gold-600 transition-all group/btn"
                          >
                            {labels.bookNow} <ArrowLeft size={14} className="ml-2 rotate-180 group-hover/btn:translate-x-1 transition-transform" />
                          </a>
                        ) : (
                          <div className="flex items-center gap-2 text-charcoal-400 text-xs font-bold uppercase tracking-widest italic">
                            Launching soon
                          </div>
                        )}
                      </div>
                    </div>
                  );
                  })}
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-8 right-8 z-50">
         <a 
            href={`https://wa.me/${brand.phone.replace(/[^0-9]/g, '')}`}
            className="bg-gold text-charcoal-900 px-6 py-4 rounded-full font-bold shadow-gold-glow flex items-center gap-3 floating-card gold-border-gradient gold-card-text animate-bounce"
         >
            <MessageCircle size={20} />
            {labels.bookViaWhatsapp}
         </a>
      </div>
    </div>
  );
}
