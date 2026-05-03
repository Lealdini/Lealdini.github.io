import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { translations } from './translations';
import { safeStorage } from '../utils/safeStorage';

const SUPPORTED_LANGUAGES = ['pt', 'en'];
const DEFAULT_LANGUAGE = 'pt';
const STORAGE_KEY = 'app-language';

const isSupported = (lang) => SUPPORTED_LANGUAGES.includes(lang);

const LanguageContext = createContext({
  language: DEFAULT_LANGUAGE,
  toggleLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    const savedLang = safeStorage.get(STORAGE_KEY);
    if (isSupported(savedLang)) {
      setLanguage(savedLang);
      return;
    }

    const browserLang =
      typeof navigator !== 'undefined' && typeof navigator.language === 'string'
        ? navigator.language.split('-')[0]
        : null;

    if (isSupported(browserLang)) {
      setLanguage(browserLang);
    }
  }, []);

  // Keep <html lang> in sync so screen readers and SEO crawlers see the right locale.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    }
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next = prev === 'pt' ? 'en' : 'pt';
      safeStorage.set(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key) => {
      if (typeof key !== 'string' || key.length === 0) return key;

      const dict = translations[language] ?? translations[DEFAULT_LANGUAGE];
      let value = dict;

      for (const k of key.split('.')) {
        if (value == null || typeof value !== 'object' || value[k] === undefined) {
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.warn(`[i18n] missing translation key: "${key}" (lang: ${language})`);
          }
          return key;
        }
        value = value[k];
      }

      return value;
    },
    [language]
  );

  const value = useMemo(
    () => ({ language, toggleLanguage, t }),
    [language, toggleLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
