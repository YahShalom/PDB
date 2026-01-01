'use client';

import React, { useState, useEffect } from 'react';
import Button from './Button';
import { useContent } from './LanguageContext';
import GoldDust from './GoldDust';

const Hero: React.FC = () => {
  const { content } = useContent();
  const { hero, brand } = content;
  
  // 1. Hero Images Array
  // PASTE YOUR DIRECT IMAGE URLS HERE from Instagram, TikTok, or Facebook
  const heroImages = [
    "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=2626&auto=format&fit=crop", // Image 1 (Braids/Hair)
    "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?q=80&w=2574&auto=format&fit=crop", // Image 2 (Salon/Vibe)
    "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2578&auto=format&fit=crop", // Image 3 (Bridal)
    "https://images.unsplash.com/photo-1595959183082-7bce707828ac?q=80&w=800"  // Image 4 (Makeup)
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // 3. Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // 2. Auto-rotate every 5 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Slideshow Background */}
      {heroImages.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={src}
            alt={`Beauty Studio Slide ${index + 1}`} 
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/60 to-transparent dark:from-charcoal/95 dark:via-charcoal/80 dark:to-charcoal/40 z-1"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-90 z-1"></div>

      {/* Gold Dust Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <GoldDust />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl animate-fade-in-up pt-20">
          <div className="inline-flex items-center px-4 py-1.5 mb-8 border border-gold/30 rounded-full bg-charcoal/40 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-gold mr-3 animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest text-gold uppercase font-sans">Kisumu's Premier Beauty Destination</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-white leading-[1.1] mb-8 drop-shadow-lg">
            {hero.title.split(' ').slice(0, 3).join(' ')} <br />
            <span className="text-gold italic">{hero.title.split(' ').slice(3, 5).join(' ')}</span> {hero.title.split(' ').slice(5).join(' ')}
          </h1>
          
          <p className="text-lg md:text-xl text-cream-100/90 mb-10 leading-relaxed font-light max-w-lg drop-shadow-md">
            {hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <a 
              href={`https://wa.me/${brand.phone.replace(/[^0-9]/g, '')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold tracking-wide transition-all duration-300 active:scale-95 text-base bg-gold text-charcoal-900 shadow-gold-aura hover:bg-gradient-to-br hover:from-gold hover:to-[#ffe175] floating-card gold-border-gradient"
            >
              {hero.ctaPrimary}
            </a>
            <Button variant="outline" to="/services" className="border-white text-white hover:bg-white hover:text-charcoal-900 shadow-gold-aura gold-border-gradient">
              {hero.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
