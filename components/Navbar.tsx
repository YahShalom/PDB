
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Moon, Sun, Instagram, Globe, Video, Search, Facebook } from 'lucide-react';
import { useTheme } from './Providers';
import { useContent } from './LanguageContext';
import SearchModal from './SearchModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const { content, language, toggleLanguage } = useContent();
  const { navLinks: NAV_LINKS, brand: BRAND, labels } = content;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-cream/90 dark:bg-charcoal/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex flex-col group shrink-0">
              <span className="text-2xl font-serif font-bold tracking-tight dark:text-cream text-charcoal">
                PERRY D
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gold font-bold">
                Beauty Studio
              </span>
            </Link>

            <div className="hidden lg:flex items-center space-x-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-medium transition-colors hover:text-gold relative group ${
                    pathname === link.path ? 'text-gold' : 'text-charcoal-800 dark:text-cream-200'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-1 md:gap-3">
              <button 
                onClick={() => setIsSearchOpen(true)} 
                className="p-2 text-charcoal-600 dark:text-cream-300 hover:text-gold transition-colors"
                title="Search (⌘K)"
              >
                <Search size={20} />
              </button>
              
              <div className="hidden md:flex items-center gap-1 mr-2 border-r border-charcoal-200 dark:border-charcoal-700 pr-2">
                <a href={BRAND.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2 text-charcoal-600 dark:text-cream-300 hover:text-gold transition-colors">
                  <Instagram size={18} />
                </a>
                <a href={BRAND.socials.tiktok} target="_blank" rel="noopener noreferrer" className="p-2 text-charcoal-600 dark:text-cream-300 hover:text-gold transition-colors">
                  <Video size={18} />
                </a>
                <a href={BRAND.socials.facebook} target="_blank" rel="noopener noreferrer" className="p-2 text-charcoal-600 dark:text-cream-300 hover:text-gold transition-colors">
                  <Facebook size={18} />
                </a>
              </div>

              <button onClick={toggleLanguage} className="flex items-center gap-1 text-xs font-bold text-charcoal-600 dark:text-cream-300 p-2">
                <Globe size={16} />
                <span className="hidden sm:inline">{language === 'en' ? 'SW' : 'EN'}</span>
              </button>
              <button onClick={toggleTheme} className="p-2 text-charcoal-600 dark:text-cream-300">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-charcoal-800 dark:text-cream">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <div className={`lg:hidden fixed inset-0 z-40 bg-cream dark:bg-charcoal transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} pt-24`}>
          <div className="flex flex-col p-6 space-y-6">
             {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-2xl font-serif ${pathname === link.path ? 'text-gold' : 'text-charcoal dark:text-cream'}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-6 pt-6 border-t border-charcoal-100 dark:border-charcoal-800">
                <a href={BRAND.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-charcoal-600 dark:text-cream-300 hover:text-gold"><Instagram size={24} /></a>
                <a href={BRAND.socials.tiktok} target="_blank" rel="noopener noreferrer" className="text-charcoal-600 dark:text-cream-300 hover:text-gold"><Video size={24} /></a>
                <a href={BRAND.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-charcoal-600 dark:text-cream-300 hover:text-gold"><Facebook size={24} /></a>
              </div>
          </div>
        </div>
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
