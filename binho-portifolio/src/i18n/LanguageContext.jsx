import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('pt');

  useEffect(() => {
    const savedLang = localStorage.getItem('app-language');
    if (savedLang) {
      setLanguage(savedLang);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (['pt', 'en'].includes(browserLang)) {
        setLanguage(browserLang);
      }
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'pt' ? 'en' : 'pt';
    setLanguage(newLang);
    localStorage.setItem('app-language', newLang);
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      if (value[k] === undefined) return key;
      value = value[k];
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
