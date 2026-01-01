
'use client';

import React from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { useContent } from '@/components/LanguageContext';
import Button from './Button';

export default function AboutClient() {
  const { content } = useContent();
  const { about, labels } = content;

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <ScrollReveal>
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <span className="text-gold font-bold tracking-widest text-xs uppercase mb-3 block">{labels.ourStory}</span>
            <h1 className="text-4xl md:text-6xl font-serif font-medium text-charcoal dark:text-cream mb-8">{about.introTitle}</h1>
            <p className="text-xl text-charcoal-600 dark:text-cream-200/80 font-light leading-relaxed">
              {about.introText}
            </p>
          </div>
        </ScrollReveal>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
           <ScrollReveal className="bg-cream-50 dark:bg-charcoal-800 p-12 rounded-3xl text-center floating-card gold-border-gradient gold-card-text">
              <div className="relative z-10">
                <h2 className="text-2xl font-serif font-bold text-charcoal dark:text-cream mb-4">{labels.mission}</h2>
                <p className="text-charcoal-600 dark:text-cream-200 leading-relaxed font-light text-lg">"{about.mission}"</p>
              </div>
           </ScrollReveal>
           <ScrollReveal delay="0.1s" className="bg-charcoal-900 p-12 rounded-3xl text-center text-white floating-card gold-border-gradient">
              <div className="relative z-10">
                <h2 className="text-2xl font-serif font-bold mb-4">{labels.vision}</h2>
                <p className="text-cream-200 leading-relaxed font-light text-lg">"{about.vision}"</p>
              </div>
           </ScrollReveal>
        </div>

        {/* Core Values */}
        <div className="mb-24">
           <ScrollReveal>
              <h2 className="text-3xl font-serif text-center mb-12 text-charcoal dark:text-cream">{labels.coreValues}</h2>
           </ScrollReveal>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {about.coreValues.map((value, idx) => (
                 <ScrollReveal key={idx} delay={`${idx * 0.1}s`} className="p-8 rounded-2xl group floating-card gold-border-gradient gold-card-text">
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold font-serif text-charcoal dark:text-cream mb-2 group-hover:text-gold transition-colors">{value.title}</h3>
                      <p className="text-charcoal-500 dark:text-cream-300 font-light text-sm">{value.desc}</p>
                    </div>
                 </ScrollReveal>
              ))}
           </div>
        </div>

        {/* Meet the Founder */}
        <div className="bg-cream dark:bg-charcoal-900 rounded-3xl overflow-hidden floating-card gold-border-gradient gold-card-text">
           <div className="flex flex-col lg:flex-row relative z-10">
              <div className="lg:w-1/2 h-96 lg:h-auto relative">
                 <img src={about.founder.image} alt={about.founder.name} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent"></div>
              </div>
              <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
                 <span className="text-gold font-bold tracking-widest text-xs uppercase mb-4">{about.meetFounder}</span>
                 <h2 className="text-4xl font-serif text-charcoal dark:text-cream mb-2">{about.founder.name}</h2>
                 <p className="text-charcoal-400 dark:text-cream-300 mb-8 font-medium italic">{about.founder.role}</p>
                 <div className="w-20 h-1 bg-gold mb-8"></div>
                 <p className="text-charcoal-600 dark:text-cream-200 font-light text-lg leading-loose mb-10">
                    {about.founder.bio}
                 </p>
                 <div className="flex justify-start">
                    <Button variant="outline" to="/contact" className="gold-border-gradient shadow-none">Collaborate with Belin</Button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
