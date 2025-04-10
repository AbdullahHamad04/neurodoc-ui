import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import ResponseDisplay from './ResponseDisplay';
import Spinner from './Spinner';
import Toast from './Toast';
import FloatingButton from './FloatingButton';
import SearchHistory from './SearchHistory';

const translations = {
  en: {
    title: 'NeuroDoc', placeholder: 'Ask something...', search: 'Search', clear: 'Clear',
    response: 'Response', loading: 'Searching...', cleared: 'Search cleared', clearHistory: 'Clear History'
  },
  ar: {
    title: 'نيورودوك', placeholder: 'اسأل شيئًا...', search: 'بحث', clear: 'مسح',
    response: 'الإجابة', loading: 'جاري البحث...', cleared: 'تم المسح', clearHistory: 'مسح السجل'
  },
  pl: {
    title: 'NeuroDoc', placeholder: 'Zadaj pytanie...', search: 'Szukaj', clear: 'Wyczyść',
    response: 'Odpowiedź', loading: 'Wyszukiwanie...', cleared: 'Wyczyszczono', clearHistory: 'Wyczyść historię'
  },
};

function App() {
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('light');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [history, setHistory] = useState([]);
  const [displayedText, setDisplayedText] = useState('');
  const inputRef = useRef();
  const t = translations[lang];

  const handleSearch = (query) => {
    if (!query) {
      setResponse('');
      setDisplayedText('');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1500);
      return;
    }

    setLoading(true);
    setDisplayedText('');
    setTimeout(() => {
      setResponse(query);
      setHistory(prev => [query, ...prev]);
      setLoading(false);
    }, 800);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark transition' : 'transition';
    inputRef.current?.focus();
  }, [theme]);

  useEffect(() => {
    let i = 0;
    if (!loading && response) {
      const typing = setInterval(() => {
        setDisplayedText(prev => prev + response[i]);
        i++;
        if (i >= response.length) clearInterval(typing);
      }, 30);
      return () => clearInterval(typing);
    }
  }, [response, loading]);

  return (
    <div className="container animated-bg" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="logo">
        <img src="/neuro-logo.svg" alt="logo" style={{ width: '60px' }} />
        <h1 style={{ fontSize: '1.6rem' }}>neurosoft</h1>
      </div>

      <div className="top-controls responsive-row">
        <select value={lang} onChange={(e) => setLang(e.target.value)} className="button" aria-label="Select language">
          <option value="en">🌐 English</option>
          <option value="pl">🇵🇱 Polski</option>
          <option value="ar">🇸🇦 العربية</option>
        </select>

        <select value={theme} onChange={(e) => setTheme(e.target.value)} className="button" aria-label="Select theme">
          <option value="light">☀️ Light</option>
          <option value="dark">🌙 Dark</option>
        </select>
      </div>

      <SearchBar
        onSearch={handleSearch}
        placeholder={t.placeholder}
        searchLabel={t.search}
        clearLabel={t.clear}
        inputRef={inputRef}
      />

      {loading ? <Spinner /> : <ResponseDisplay response={displayedText} label={t.response} />}

      <div className="button-row responsive-row">
        <button
          type="button"
          onClick={() => {
            const responseText = document.getElementById('response-box')?.innerText;
            if (responseText) {
              navigator.clipboard.writeText(responseText);
              alert('📋 Copied the response!');
            }
          }}
          className="button purple"
        >
          📎 Copy
        </button>

        <button onClick={handleClearHistory} className="button dark">
          🧹 {t.clearHistory}
        </button>
      </div>

      <SearchHistory items={history} onSelect={handleSearch} />

      <Toast message={t.cleared} visible={showToast} />

      <FloatingButton icon="⬆️" label="Scroll Top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

      <div id="response-box" className="response">
        {response || '...'}
      </div>
    </div>
  );
}

export default App;
