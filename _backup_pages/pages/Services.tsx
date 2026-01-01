
import React from 'react';
import { ArrowLeft, MessageCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useContent } from '../components/LanguageContext';
import ScrollReveal from '../components/ScrollReveal';
import { useSupabaseServices } from '../hooks/useSupabaseData';

const Services: React.FC = () => {
  const { content } = useContent();
  const { brand, labels } = content;
  const { services: realServices, loading } = useSupabaseServices();
  
  const displayServices = realServices.length > 0 ? realServices : content.services;

  // Group services by category
  const categories = Array.from(new Set(displayServices.map(s => s.category || 'Other')));

  return (
    <div className="pt-32 pb-24 min-h-screen bg-cream dark:bg-charcoal relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-16">
            <Link href="/" className="inline-flex items-center text-charcoal-500 hover:text-gold dark:text-cream-300 transition-colors text-sm mb-6 font-medium">
              <ArrowLeft size={16} className="mr-2" /> {labels.backHome}
            </Link>
            <h1 className="text-4xl md:text-6xl font-serif font-medium text-charcoal dark:text-cream mb-6">{labels.serviceMenu}</h1>
            <p className="text-xl text-charcoal-600 dark:text-cream-200/80 font-light leading-relaxed">
              Pricing and details for our bespoke beauty treatments. All services include a personalized consultation.
            </p>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="flex flex-col items-center py-20">
             <Loader2 className="animate-spin text-gold mb-4" size={48} />
             <p className="text-charcoal-500 dark:text-cream-300 font-serif">Preparing the salon for you...</p>
          </div>
        ) : (
          <div className="space-y-20">
            {categories.map((category, idx) => (
              <ScrollReveal key={category} delay={`${idx * 0.1}s`}>
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-3xl font-serif text-charcoal dark:text-cream">{category}</h2>
                    <div className="h-px bg-charcoal-200 dark:bg-charcoal-700 flex-grow"></div>
                  </div>
                  
                  <div className="grid gap-6">
                    {displayServices.filter(s => (s.category || 'Other') === category).map(service => (
                      <div key={service.id} className="group bg-white dark:bg-charcoal-800 p-8 rounded-2xl floating-card gold-border-gradient gold-card-text">
                        <div className="relative z-10">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                            <h3 className="text-xl font-bold text-charcoal dark:text-cream group-hover:text-gold transition-colors">{service.title}</h3>
                            <span className="inline-block px-4 py-1 bg-cream-100 dark:bg-charcoal-900 text-charcoal-800 dark:text-gold rounded-full text-sm font-bold whitespace-nowrap">{service.price}</span>
                          </div>
                          <p className="text-charcoal-600 dark:text-cream-300/80 text-sm mb-6 font-light leading-relaxed max-w-2xl">{service.description}</p>
                          <a 
                            href={`https://wa.me/${brand.phone.replace(/[^0-9]/g, '')}?text=Hi, I would like to book ${service.title}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-gold font-bold text-xs uppercase tracking-widest hover:text-gold-600 transition-colors"
                          >
                            {labels.bookNow} &rarr;
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

        <ScrollReveal delay="0.3s">
          <div className="mt-24 p-12 bg-charcoal text-white rounded-3xl text-center relative overflow-hidden floating-card gold-border-gradient">
             <div className="absolute inset-0 bg-gold/5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/20 to-transparent"></div>
            <h3 className="text-3xl font-serif mb-6 relative z-10">{labels.bespokePackages}</h3>
            <p className="text-charcoal-300 mb-8 font-light relative z-10">We offer custom packages for weddings, bridal parties, and special events.</p>
            <a 
               href={`https://wa.me/${brand.phone.replace(/[^0-9]/g, '')}`}
               target="_blank"
               rel="noopener noreferrer"
               className="relative z-10 inline-block bg-white text-charcoal-900 px-8 py-3 rounded-full font-bold transition-all duration-300 transform hover:bg-gold hover:text-charcoal-900 hover:shadow-gold-glow hover:-translate-y-1 shadow-md gold-card-text"
            >
              {labels.requestQuote}
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:bottom-8 md:left-auto md:right-8 z-40 p-4 md:p-0">
         <div className="bg-white dark:bg-charcoal-800 text-charcoal dark:text-white p-4 md:p-6 rounded-xl flex md:flex-col items-center justify-between gap-4 md:gap-2 max-w-full md:max-w-xs animate-fade-in-up backdrop-blur-sm bg-opacity-95 floating-card gold-border-gradient gold-card-text">
            <div className="text-left md:text-center relative z-10">
               <p className="font-serif font-bold text-lg md:text-xl">{labels.readyToBook}</p>
               <p className="text-xs text-charcoal-500 dark:text-cream-300 hidden md:block mt-1">{labels.chatWithUs}</p>
            </div>
            <a 
              href={`https://wa.me/${brand.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-charcoal-900 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 hover:bg-gradient-to-br hover:from-gold hover:to-[#ffe175] hover:shadow-gold-glow hover:-translate-y-1 shadow-md flex items-center gap-2 whitespace-nowrap relative z-10 gold-card-text"
            >
              <MessageCircle size={18} />
              {labels.bookViaWhatsapp}
            </a>
         </div>
      </div>
    </div>
  );
};

export default Services;
