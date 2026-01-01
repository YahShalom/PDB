'use client';

import React, { useState, useEffect } from 'react';
import { Instagram, Heart, RefreshCw, Facebook, Video } from 'lucide-react';
import { useContent } from './LanguageContext';
import ScrollReveal from './ScrollReveal';
import Button from './Button';

const InstagramFeed: React.FC = () => {
  const { content } = useContent();
  const { instagramPosts, labels, brand } = content;
  const [posts, setPosts] = useState(instagramPosts);
  const [isLoading, setIsLoading] = useState(false);

  // Sync state if language/content changes
  useEffect(() => {
    setPosts(instagramPosts);
  }, [instagramPosts]);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API fetch from Instagram, TikTok, and Facebook Graph APIs
    setTimeout(() => {
      // Randomize posts to simulate new content appearing
      const newPosts = [...posts].sort(() => Math.random() - 0.5);
      setPosts(newPosts);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <section className="py-24 bg-charcoal text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <ScrollReveal>
             <div className="flex flex-col items-center text-center mb-16">
                <div className="flex gap-6 mb-6">
                    <a href={brand.socials.instagram} target="_blank" rel="noopener noreferrer" className="group p-2 bg-charcoal-800 rounded-full border border-charcoal-700 hover:border-gold transition-all duration-300 floating-card">
                        <Instagram className="text-gold group-hover:scale-110 transition-transform duration-300" size={24} />
                    </a>
                    <a href={brand.socials.tiktok} target="_blank" rel="noopener noreferrer" className="group p-2 bg-charcoal-800 rounded-full border border-charcoal-700 hover:border-gold transition-all duration-300 floating-card">
                        <Video className="text-gold group-hover:scale-110 transition-transform duration-300" size={24} />
                    </a>
                    <a href={brand.socials.facebook} target="_blank" rel="noopener noreferrer" className="group p-2 bg-charcoal-800 rounded-full border border-charcoal-700 hover:border-gold transition-all duration-300 floating-card">
                        <Facebook className="text-gold group-hover:scale-110 transition-transform duration-300" size={24} />
                    </a>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6">{labels.followUs}</h2>
                <p className="text-zinc-400 max-w-xl font-light">
                  @{brand.socials.instagram.split('/').pop()?.split('?')[0]}
                </p>
             </div>
           </ScrollReveal>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {posts.map((post, idx) => (
                <ScrollReveal key={post.id} delay={`${idx * 0.1}s`} className="relative group overflow-hidden rounded-xl aspect-square floating-card gold-border-gradient gold-card-text">
                   <div className="w-full h-full relative z-10">
                     <img 
                        src={post.image} 
                        alt="Social Post" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                     />
                     <a href={post.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center">
                        <Heart 
                          className="text-white fill-white mb-2 transform scale-75 group-hover:scale-110 transition-transform duration-300 ease-out" 
                          size={24} 
                        />
                        <span className="text-white font-bold text-sm mb-2">{post.likes}</span>
                        <p className="text-xs text-white/80 line-clamp-2">{post.caption}</p>
                     </a>
                   </div>
                </ScrollReveal>
             ))}
           </div>
           
           <div className="flex flex-col items-center gap-8 mt-12">
             <Button 
                onClick={handleRefresh} 
                variant="outline"
                className="text-gold border-gold/50 hover:bg-gold hover:text-charcoal-900 group min-w-[200px]"
                type="button"
             >
                <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Updating Feeds...' : 'Refresh Social Feeds'}
             </Button>

             <a 
               href={brand.socials.instagram} 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center text-zinc-500 font-bold text-xs uppercase tracking-widest hover:text-gold transition-colors"
             >
               View Full Gallery &rarr;
             </a>
           </div>
        </div>
      </section>
  );
};

export default InstagramFeed;
