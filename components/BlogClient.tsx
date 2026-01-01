
'use client';

import React from 'react';
import { useContent } from '@/components/LanguageContext';
import { Calendar, ArrowRight, Loader2 } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { useSupabaseBlog } from '@/hooks/useSupabaseData';

export default function BlogClient() {
  const { content } = useContent();
  const { labels } = content;
  const { posts: realPosts, loading } = useSupabaseBlog();

  const displayPosts = realPosts.length > 0 ? realPosts : content.blogPosts;

  return (
    <div className="pt-32 pb-24 bg-cream dark:bg-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
             <span className="text-gold font-bold tracking-widest text-xs uppercase mb-3 block">{labels.journal}</span>
             <h1 className="text-4xl md:text-6xl font-serif font-medium text-charcoal dark:text-cream">{labels.beautyWellness}</h1>
          </div>
        </ScrollReveal>
        
        {loading ? (
          <div className="flex flex-col items-center py-20">
             <Loader2 className="animate-spin text-gold mb-4" size={48} />
             <p className="text-charcoal-500 font-serif">Writing our next chapter...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayPosts.map((post, idx) => (
              <ScrollReveal key={post.id} delay={`${idx * 0.1}s`}>
                <article className="bg-white dark:bg-charcoal-800 rounded-2xl flex flex-col overflow-hidden group h-full floating-card gold-border-gradient gold-card-text">
                  <div className="h-48 bg-charcoal-200 dark:bg-charcoal-700 overflow-hidden relative z-10">
                    <img src={post.image || `https://picsum.photos/600/400?random=${idx + 20}`} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-8 flex-grow flex flex-col relative z-10">
                    <div className="flex items-center text-xs font-bold uppercase tracking-widest text-gold mb-4">
                      <Calendar size={14} className="mr-2" />
                      {post.date}
                    </div>
                    <h2 className="text-2xl font-serif font-medium text-charcoal dark:text-cream mb-4 group-hover:text-gold transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-charcoal-600 dark:text-cream-200/70 mb-6 leading-relaxed font-light">
                      {post.excerpt}
                    </p>
                    <button className="text-charcoal-900 dark:text-white font-bold text-xs uppercase tracking-widest hover:text-gold transition-colors inline-flex items-center mt-auto">
                      {labels.readMore} <ArrowRight size={14} className="ml-2" />
                    </button>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
