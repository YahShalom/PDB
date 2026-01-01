
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getActiveServices, getComingSoonServices } from '@/lib/services';
import { enContent } from '@/contentConfig';

export const metadata: Metadata = {
  title: "Service Menu | Hair Braiding, Makeup & Skincare",
  description: "Explore Kisumu's best menu of bespoke beauty treatments. We specialize in knotless braids, bridal makeup, and dermatology-grade facials.",
  openGraph: {
    title: "Signature Beauty Services in Kisumu | Perry D Studio",
    description: "Bespoke hair braiding, bridal glam, and skin rejuvenation treatments.",
    images: ['/og-services.jpg'],
  }
};

const fallbackActive = [
  'Hair Plaiting (all styles)',
  'Loc Installation',
  'Loc Styling',
  'Manicure',
  'Pedicure',
  'Eyebrow Shaping',
  'Eyebrow Tinting',
  'Lash Installation',
];

const fallbackComingSoon = ['Makeup', 'Wig Installation'];

export default async function ServicesPage() {
  const [activeServices, comingSoonServices] = await Promise.all([
    getActiveServices(),
    getComingSoonServices(),
  ]);

  const brandPhone = enContent.brand.phone.replace(/[^0-9]/g, '');

  return (
    <div className="pt-32 pb-24 min-h-screen bg-cream dark:bg-charcoal relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <Link href="/" className="inline-flex items-center text-charcoal-500 hover:text-gold dark:text-cream-300 transition-colors text-sm mb-6 font-medium">
            ← {enContent.labels.backHome}
          </Link>
          <h1 className="text-4xl md:text-6xl font-serif font-medium text-charcoal dark:text-cream mb-6">
            {enContent.labels.serviceMenu}
          </h1>
          <p className="text-xl text-charcoal-600 dark:text-cream-200/80 font-light leading-relaxed max-w-2xl">
            Pricing and details for our bespoke beauty treatments. All services include a personalized consultation.
          </p>
        </div>

        <section className="space-y-8 mb-20">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-serif text-charcoal dark:text-cream">Services</h2>
            <div className="h-px bg-charcoal-200 dark:bg-charcoal-700 flex-grow"></div>
          </div>

          {activeServices.length === 0 ? (
            <div className="bg-white dark:bg-charcoal-800 p-8 rounded-2xl border border-charcoal-100 dark:border-charcoal-700">
              <p className="text-sm text-charcoal-600 dark:text-cream-300 mb-4">
                We’re updating our service menu. Here’s what we currently offer:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-charcoal-700 dark:text-cream-200 text-sm">
                {fallbackActive.map((item) => (
                  <li key={item} className="bg-cream-50 dark:bg-charcoal-900 rounded-lg px-4 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activeServices.map((service) => (
                <div
                  key={service.id}
                  className="group bg-white dark:bg-charcoal-800 p-8 rounded-2xl floating-card gold-border-gradient gold-card-text flex flex-col"
                >
                  <div className="relative z-10 flex-grow">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="text-xl font-bold text-charcoal dark:text-cream group-hover:text-gold transition-colors">
                        {service.title}
                      </h3>
                      <span className="inline-block px-4 py-1 bg-cream-100 dark:bg-charcoal-900 text-charcoal-800 dark:text-gold rounded-full text-xs font-bold whitespace-nowrap">
                        {service.price}
                      </span>
                    </div>
                    <p className="text-charcoal-600 dark:text-cream-300/80 text-sm mb-6 font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-charcoal-100 dark:border-charcoal-700 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-2 py-1 rounded-sm">
                      {service.category}
                    </span>
                    <a
                      href={`https://wa.me/${brandPhone}?text=Hi, I would like to book ${service.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold uppercase tracking-widest text-charcoal-500 dark:text-charcoal-300 hover:text-gold transition-colors"
                    >
                      {enContent.labels.bookNow}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-serif text-charcoal dark:text-cream">Coming Soon</h2>
            <div className="h-px bg-charcoal-200 dark:bg-charcoal-700 flex-grow"></div>
          </div>

          {comingSoonServices.length === 0 ? (
            <div className="bg-white dark:bg-charcoal-800 p-8 rounded-2xl border border-charcoal-100 dark:border-charcoal-700">
              <p className="text-sm text-charcoal-600 dark:text-cream-300 mb-4">
                More services are on the way:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-charcoal-700 dark:text-cream-200 text-sm">
                {fallbackComingSoon.map((item) => (
                  <li key={item} className="bg-cream-50 dark:bg-charcoal-900 rounded-lg px-4 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {comingSoonServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white/80 dark:bg-charcoal-800 p-8 rounded-2xl border border-dashed border-charcoal-200 dark:border-charcoal-700 flex flex-col"
                >
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <h3 className="text-xl font-bold text-charcoal dark:text-cream">
                      {service.title}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal-500 dark:text-charcoal-300 border border-charcoal-300 dark:border-charcoal-600 px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-sm text-charcoal-600 dark:text-cream-300/80 font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
