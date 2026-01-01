
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { enContent, swContent } from '../contentConfig';

type ContentType = typeof enContent;

interface LanguageContextType {
  language: 'en' | 'sw';
  toggleLanguage: () => void;
  content: ContentType;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  toggleLanguage: () => {},
  content: enContent,
});

export const useContent = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'sw'>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('perryd_lang') as 'en' | 'sw' | null;
    if (storedLang) {
      setLanguage(storedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'sw' : 'en';
    setLanguage(newLang);
    localStorage.setItem('perryd_lang', newLang);
  };

  const content = language === 'en' ? enContent : swContent;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, content }}>
      {children}
    </LanguageContext.Provider>
  );
};
