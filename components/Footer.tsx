
'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Video, MapPin, Mail, Phone } from 'lucide-react';
import { useContent } from './LanguageContext';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { content } = useContent();
  const { brand, navLinks } = content;

  return (
    <footer className="bg-charcoal text-white pt-20 pb-10 border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <span className="text-3xl font-serif font-bold text-white">PERRY D</span>
            <p className="text-zinc-400 text-sm leading-relaxed font-light">{brand.tagline}</p>
            <div className="flex space-x-5">
              <a href={brand.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-gold"><Instagram size={22} /></a>
              <a href={brand.socials.tiktok} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-gold"><Video size={22} /></a>
              <a href={brand.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-gold"><Facebook size={22} /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Explore</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="text-zinc-400 hover:text-gold text-sm font-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Contact</h3>
            <ul className="space-y-4 text-sm text-zinc-400 font-light">
              <li className="flex gap-3"><MapPin size={18} className="text-gold" /><span>{brand.address}</span></li>
              <li className="flex gap-3"><Phone size={18} className="text-gold" /><a href={`tel:${brand.phone}`}>{brand.phone}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
