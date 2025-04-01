import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: 'NeuroDoc',
      placeholder: 'Ask something...',
      search: 'Search',
      clear: 'Clear',
      response: 'Response',
      loading: 'Searching...',
    },
  },
  ar: {
    translation: {
      title: 'نيورودوك',
      placeholder: 'اسأل شيئًا...',
      search: 'بحث',
      clear: 'مسح',
      response: 'الإجابة',
      loading: 'جاري البحث...',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
