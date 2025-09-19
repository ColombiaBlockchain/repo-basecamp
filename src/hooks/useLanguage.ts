import { useState, useEffect } from 'react';
import { Language, getCurrentLanguage, setLanguage, initializeLanguage, t } from '@/lib/i18n';

export const useLanguage = () => {
  const [currentLang, setCurrentLang] = useState<Language>(getCurrentLanguage());

  useEffect(() => {
    initializeLanguage();
    setCurrentLang(getCurrentLanguage());
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    setCurrentLang(lang);
    // Force re-render by dispatching a custom event
    window.dispatchEvent(new CustomEvent('languageChanged'));
  };

  return {
    currentLanguage: currentLang,
    changeLanguage,
    t,
  };
};