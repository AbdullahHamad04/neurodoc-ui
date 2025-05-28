import React, { useState } from 'react';
import SearchBar from './SearchBar';
import ResponseDisplay from './ResponseDisplay';
import './main.css';

const translations = {
  en: {
    placeholder: 'Ask something...',
    search: 'Search',
    clear: 'Clear',
    resultsFor: 'Search results for',
    searching: 'Searching...'
  },
  ar: {
    placeholder: 'ابحث هنا...',
    search: 'ابحث',
    clear: 'مسح',
    resultsFor: 'نتائج البحث عن',
    searching: 'جاري البحث...'
  },
  pl: {
    placeholder: 'Zadaj pytanie...',
    search: 'Szukaj',
    clear: 'Wyczyść',
    resultsFor: 'Wyniki wyszukiwania dla',
    searching: 'Szukanie...'
  }
};

const supportedLangs = Object.keys(translations);
const getDefaultLang = () => {
  const browserLang = navigator.language.split('-')[0];
  return supportedLangs.includes(browserLang) ? browserLang : 'en';
};

const SearchPage = () => {
  const [selectedLang, setSelectedLang] = useState('all');
  const lang = selectedLang === 'all' ? getDefaultLang() : selectedLang;
  const t = translations[lang];

  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearch = async (q) => {
    setQuery(q);
    setSearching(true);

    try {
      const res = await fetch('http://localhost:9200/ndoc_documents/_search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: {
            multi_match: {
              query: q,
              fields: ['title.ar^2', 'summary.ar', 'title.en^2', 'summary.en'],
              operator: 'and'
            }
          }
        })
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse('حدث خطأ أثناء جلب النتائج');
    } finally {
      setSearching(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setResponse('');
  };

  return (
    <div className="container" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="top-controls" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)} className="button">
          <option value="all">🌍 All Languages (Auto)</option>
          {supportedLangs.map((code) => (
            <option key={code} value={code}>
              {code === 'en' ? 'English' : code === 'ar' ? 'العربية' : 'Polski'}
            </option>
          ))}
        </select>
      </div>

      <SearchBar
        onSearch={handleSearch}
        onClear={handleClear}
        placeholder={t.placeholder}
        searchLabel={t.search}
        clearLabel={t.clear}
        lang={lang}
      />

      {query && (
        <h2 style={{ textAlign: 'center', marginTop: '30px' }}>
          {t.resultsFor}: "{query}"
        </h2>
      )}

      <ResponseDisplay response={searching ? t.searching : response} />
    </div>
  );
};

export default SearchPage;
