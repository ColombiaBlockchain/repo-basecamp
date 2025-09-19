import enTranslations from '@/locales/en.json';
import esTranslations from '@/locales/es.json';

export type Language = 'en' | 'es';

const translations = {
  en: enTranslations,
  es: esTranslations,
};

let currentLanguage: Language = 'en';

export const getCurrentLanguage = (): Language => currentLanguage;

export const setLanguage = (lang: Language): void => {
  currentLanguage = lang;
  localStorage.setItem('eventmetrix-language', lang);
};

export const initializeLanguage = (): void => {
  const stored = localStorage.getItem('eventmetrix-language') as Language;
  if (stored && (stored === 'en' || stored === 'es')) {
    currentLanguage = stored;
  }
};

export const t = (key: string): string => {
  const keys = key.split('.');
  let value: any = translations[currentLanguage];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English
      value = translations.en;
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key; // Return key if translation not found
        }
      }
      break;
    }
  }
  
  return typeof value === 'string' ? value : key;
};