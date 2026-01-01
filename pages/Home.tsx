
import React, { useState } from 'react';
import Link from 'next/link';
import { Star, Shield, Gem, Heart, ArrowRight, Plus, Minus, Phone, Loader2 } from 'lucide-react';
import Hero from '../components/Hero';
import Button from '../components/Button';
import ScrollReveal from '../components/ScrollReveal';
import InstagramFeed from '../components/InstagramFeed';
import VideoSection from '../components/VideoSection';
import { useContent } from '../components/LanguageContext';
import GoldDust from '../components/GoldDust';
import Parallax from '../components/Parallax';
import { useSupabaseServices } from '../hooks/useSupabaseData';

const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const { content } = useContent();
  const { testimonials, faqs, brand, features, premiumCTA, labels } = content;
  const { services: realServices, loading: servicesLoading } = useSupabaseServices();

  // Use real services if available, fallback to content config
  const displayServices = realServices.length > 0 ? realServices : content.services;

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const featureIcons = [Shield, Star, Gem, Heart];

  return (
    <>
      <Hero />

      {/* Why Choose Us */}
      <section className="py-24 bg-cream/50 dark:bg-charcoal relative overflow-hidden">
        <div className="absolute top-0 left-0 pointer-events-none z-0">
          <Parallax speed={-0.15}>
            <div className="w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          </Parallax>
        </div>
        <div className="absolute bottom-0 right-0 pointer-events-none z-0">
          <Parallax speed={0.1}>
            <div className="w-48 h-48 bg-gold/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
          </Parallax>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-gold font-bold tracking-widest text-xs uppercase mb-3 block">{labels.whyChoose}</span>
              <h2 className="text-3xl md:text-5xl font-serif font-medium text-charcoal dark:text-cream mb-6">{labels.elevatingBeauty}</h2>
              <p className="text-charcoal-600 dark:text-cream-200/70 text-lg font-light leading-relaxed">
                {labels.elevatingText}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              const Icon = featureIcons[idx % featureIcons.length];
              return (
                <ScrollReveal key={idx} delay={`${idx * 0.1}s`}>
                  <div className="bg-white dark:bg-charcoal-800 p-8 rounded-2xl floating-card gold-border-gradient h-full">
                    <div className="w-14 h-14 bg-cream dark:bg-charcoal-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <Icon size={26} strokeWidth={1.5} className="text-black dark:text-white" />
                    </div>
                    <h4 className="font-serif text-xl font-medium text-black mb-3">{feature.title}</h4>
                    <p className="text-sm text-black leading-relaxed">{feature.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white dark:bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-serif font-medium text-charcoal dark:text-cream mb-4">{labels.signatureServices}</h2>
              </div>
              <Link href="/services" className="hidden md:flex items-center gap-2 text-gold font-bold hover:text-gold-600 transition-colors uppercase tracking-widest text-xs">
                {labels.viewServices} <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>

          {servicesLoading ? (
            <div className="flex flex-col items-center py-20">
              <Loader2 className="animate-spin text-gold mb-4" size={40} />
              <p className="text-charcoal-500 font-serif">Curating our excellence...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayServices.slice(0, 4).map((service, idx) => (
                <ScrollReveal key={service.id} delay={`${idx * 0.1}s`}>
                  <div className="group relative bg-cream-50 dark:bg-charcoal-800 rounded-2xl overflow-hidden floating-card gold-border-gradient gold-card-text h-full flex flex-col">
                    <div className="p-8 h-full flex flex-col relative z-10">
                      <div className="mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-2 py-1 rounded-sm">{service.category}</span>
                      </div>
                      <h3 className="text-2xl font-serif text-charcoal dark:text-cream mb-3 group-hover:text-gold transition-colors">{service.title}</h3>
                      <p className="text-charcoal-600 dark:text-cream-300/80 text-sm mb-6 flex-grow font-light leading-relaxed">{service.description}</p>
                      
                      <div className="pt-6 border-t border-charcoal-100 dark:border-charcoal-700 flex items-center justify-between mt-auto">
                        <span className="font-medium text-charcoal dark:text-cream-100 text-sm">{service.price}</span>
                        <span className="text-xs font-bold uppercase tracking-wider text-charcoal-400 dark:text-charcoal-500 group-hover:text-gold transition-colors flex items-center gap-1">
                          Details <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center md:hidden">
            <Button variant="outline" to="/services">{labels.viewServices}</Button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <VideoSection />

      {/* Instagram Feed */}
      <InstagramFeed />

      {/* Testimonials */}
      <section className="py-24 bg-cream dark:bg-charcoal-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 pointer-events-none z-0">
           <Parallax speed={-0.05}>
              <div className="w-40 h-40 bg-charcoal-200/20 dark:bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
           </Parallax>
        </div>
        <div className="absolute bottom-0 right-0 pointer-events-none z-0">
          <Parallax speed={0.1}>
             <div className="w-80 h-80 bg-gold/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
          </Parallax>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-medium text-charcoal dark:text-cream mb-4">{labels.clientLove}</h2>
              <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <ScrollReveal key={t.id} delay={`${idx * 0.15}s`}>
                <div className="bg-white dark:bg-charcoal-800 p-10 rounded-2xl floating-card gold-border-gradient gold-card-text h-full">
                  <div className="flex text-gold mb-6 gap-1 relative z-10">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <p className="text-charcoal-700 dark:text-cream-200 text-lg italic mb-8 font-serif leading-relaxed relative z-10">"{t.quote}"</p>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-charcoal-100 dark:bg-charcoal-700 flex items-center justify-center text-charcoal-500 dark:text-cream-300 font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <p className="font-bold text-xs uppercase tracking-widest text-charcoal dark:text-cream">{t.name}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-white dark:bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <ScrollReveal className="lg:w-1/2 relative">
               <div className="aspect-[4/5] rounded-full overflow-hidden border-8 border-cream dark:border-charcoal-800 shadow-2xl max-w-md mx-auto relative z-10 shadow-gold-aura hover:shadow-gold-glow transition-shadow duration-500">
                 <img src={content.about.founder.image} alt="Stylist" className="w-full h-full object-cover" />
               </div>
               <div className="absolute top-10 -left-10 w-32 h-32 bg-gold/10 rounded-full blur-2xl z-0"></div>
               <div className="absolute bottom-10 -right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl z-0"></div>
            </ScrollReveal>
            <ScrollReveal className="lg:w-1/2 text-center lg:text-left" delay="0.2s">
               <span className="text-gold font-bold tracking-widest text-xs uppercase mb-4 block">{content.about.meetFounder}</span>
               <h2 className="text-4xl md:text-5xl font-serif font-medium text-charcoal dark:text-cream mb-6">{content.about.introTitle}</h2>
               <p className="text-lg text-charcoal-600 dark:text-cream-200/80 mb-6 font-light leading-relaxed">
                 "{content.about.founder.bio}"
               </p>
               <div className="bg-cream-50 dark:bg-charcoal-800 p-6 rounded-lg border-l-4 border-gold mb-8 text-left shadow-gold-aura hover:shadow-gold-glow transition-shadow duration-500 gold-card-text floating-card gold-border-gradient">
                  <p className="text-charcoal-800 dark:text-white font-medium italic font-serif relative z-10">
                     "Specialist in bridal styling and soft glam makeup."
                  </p>
               </div>
               <p className="font-serif italic text-charcoal-800 dark:text-gold mb-10 text-xl">— {content.about.founder.name}, {content.about.founder.role}</p>
               <Button variant="outline" to="/about">{labels.ourStory}</Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* PREMIUM CTA SECTION */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-600 via-charcoal-900 to-black"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute inset-0 z-10 pointer-events-none">
          <GoldDust />
        </div>
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
           <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg">{premiumCTA.title}</h2>
              <p className="text-xl md:text-2xl text-cream-100 mb-10 font-light max-w-3xl mx-auto leading-relaxed">
                 {premiumCTA.text}
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                 <a 
                    href={`https://wa.me/${brand.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-10 py-4 bg-white text-charcoal-900 rounded-full font-bold text-lg hover:bg-gold hover:text-white transition-all duration-300 floating-card gold-border-gradient gold-card-text"
                 >
                    {premiumCTA.primaryBtn}
                 </a>
                 <Link href="/services" className="px-10 py-4 border border-white text-white rounded-full font-medium text-lg hover:bg-white/10 transition-all duration-300 floating-card gold-border-gradient">
                    {premiumCTA.secondaryBtn}
                 </Link>
                 <a href={`tel:${brand.phone}`} className="px-10 py-4 flex items-center justify-center gap-2 text-gold hover:text-white transition-all duration-300 transform hover:-translate-y-1">
                    <Phone size={20} />
                    {premiumCTA.tertiaryBtn}
                 </a>
              </div>
           </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-cream-50 dark:bg-charcoal-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-center text-charcoal dark:text-cream mb-12">{labels.faqTitle}</h2>
          </ScrollReveal>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <ScrollReveal key={faq.id} delay={`${idx * 0.1}s`}>
                <div className="bg-white dark:bg-charcoal-800 rounded-xl overflow-hidden floating-card gold-border-gradient gold-card-text">
                  <button 
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-8 py-5 text-left flex justify-between items-center focus:outline-none hover:bg-cream-50 dark:hover:bg-charcoal-700/50 transition-colors relative z-10"
                  >
                    <span className="font-medium text-charcoal-900 dark:text-cream text-lg">{faq.question}</span>
                    {openFaq === faq.id ? <Minus size={20} className="text-gold" /> : <Plus size={20} className="text-charcoal-400 dark:text-charcoal-500" />}
                  </button>
                  <div 
                    className={`px-8 overflow-hidden transition-all duration-300 ease-in-out relative z-10 ${
                      openFaq === faq.id ? 'max-h-48 py-5 opacity-100 border-t border-charcoal-50 dark:border-charcoal-700' : 'max-h-0 py-0 opacity-0'
                    }`}
                  >
                    <p className="text-charcoal-600 dark:text-cream-200/70 font-light leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
