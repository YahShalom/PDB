'use client';

import React, { useState, useEffect } from 'react';
import { X, Shield, Cookie, ChevronRight } from 'lucide-react';
import Button from './Button';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay to show banner after page load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = { essential: true, analytics: true, marketing: true };
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setPreferences(allAccepted);
    setIsVisible(false);
  };

  const handleDeclineAll = () => {
    const onlyEssential = { essential: true, analytics: false, marketing: false };
    localStorage.setItem('cookieConsent', JSON.stringify(onlyEssential));
    setPreferences(onlyEssential);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setIsVisible(false);
    setShowSettings(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return;
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main Banner */}
      {!showSettings && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in-up">
          <div className="max-w-7xl mx-auto bg-white dark:bg-charcoal-900 rounded-2xl shadow-2xl border border-charcoal-100 dark:border-charcoal-700 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
             <div className="flex-shrink-0 bg-gold/10 p-3 rounded-full text-gold hidden md:block">
                <Cookie size={32} />
             </div>
             <div className="flex-grow">
                <h3 className="text-lg font-serif font-bold text-charcoal dark:text-cream mb-2">We value your privacy</h3>
                <p className="text-charcoal-600 dark:text-cream-200/80 text-sm font-light leading-relaxed max-w-2xl">
                   We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                </p>
             </div>
             <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
                <button 
                   onClick={() => setShowSettings(true)}
                   className="text-xs font-bold uppercase tracking-widest text-charcoal-500 dark:text-cream-300 hover:text-gold transition-colors py-3 px-4 underline decoration-charcoal-200 dark:decoration-charcoal-600 hover:decoration-gold"
                >
                   Manage Settings
                </button>
                <Button variant="outline" onClick={handleDeclineAll} className="whitespace-nowrap py-2 px-6 text-xs">
                   Decline
                </Button>
                <Button variant="primary" onClick={handleAcceptAll} className="whitespace-nowrap py-2 px-6 text-xs shadow-none">
                   Accept All
                </Button>
             </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-charcoal-900 w-full max-w-lg rounded-3xl shadow-2xl border border-charcoal-100 dark:border-charcoal-700 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-6 border-b border-charcoal-100 dark:border-charcoal-800 flex justify-between items-center bg-cream-50 dark:bg-charcoal-800">
              <div className="flex items-center gap-3">
                <Shield className="text-gold" size={24} />
                <h3 className="text-xl font-serif font-bold text-charcoal dark:text-cream">Cookie Preferences</h3>
              </div>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-charcoal-400 hover:text-charcoal-900 dark:text-charcoal-500 dark:hover:text-cream transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              <p className="text-sm text-charcoal-600 dark:text-cream-200/70 font-light">
                Manage your cookie settings. Essential cookies are always required for the website to function properly.
              </p>

              {/* Essential */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-charcoal-50 dark:bg-charcoal-800/50">
                <div>
                  <h4 className="font-bold text-charcoal dark:text-cream text-sm mb-1 flex items-center gap-2">
                    Essential
                    <span className="text-[10px] bg-gold text-charcoal-900 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">Required</span>
                  </h4>
                  <p className="text-xs text-charcoal-500 dark:text-cream-300/60 font-light">Necessary for core website functionality like security and accessibility.</p>
                </div>
                <div className="relative inline-flex items-center cursor-not-allowed opacity-50">
                   <input type="checkbox" checked={true} disabled className="sr-only peer" />
                   <div className="w-11 h-6 bg-gold rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-charcoal-100 dark:border-charcoal-700">
                <div>
                  <h4 className="font-bold text-charcoal dark:text-cream text-sm mb-1">Analytics</h4>
                  <p className="text-xs text-charcoal-500 dark:text-cream-300/60 font-light">Help us understand how visitors interact with the website.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                   <input 
                      type="checkbox" 
                      checked={preferences.analytics} 
                      onChange={() => togglePreference('analytics')}
                      className="sr-only peer" 
                   />
                   <div className="w-11 h-6 bg-charcoal-200 dark:bg-charcoal-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                </label>
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-charcoal-100 dark:border-charcoal-700">
                <div>
                  <h4 className="font-bold text-charcoal dark:text-cream text-sm mb-1">Marketing</h4>
                  <p className="text-xs text-charcoal-500 dark:text-cream-300/60 font-light">Used to display relevant advertisements and track efficacy.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                   <input 
                      type="checkbox" 
                      checked={preferences.marketing} 
                      onChange={() => togglePreference('marketing')}
                      className="sr-only peer" 
                   />
                   <div className="w-11 h-6 bg-charcoal-200 dark:bg-charcoal-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-charcoal-100 dark:border-charcoal-800 bg-cream-50 dark:bg-charcoal-800 flex justify-end gap-3">
               <Button variant="outline" onClick={() => setShowSettings(false)} className="text-xs py-2">Cancel</Button>
               <Button variant="primary" onClick={handleSavePreferences} className="text-xs py-2 shadow-none">Save Preferences</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
