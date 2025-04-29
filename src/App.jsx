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
    title: 'NeuroDoc',
    placeholder: 'Ask something...',
    search: 'Search',
    clear: 'Clear',
    response: 'Response',
    loading: 'Searching...',
    cleared: 'Search cleared',
    clearHistory: 'Clear History',
    emptyQuery: '⚠️ Please enter a query before searching'
  },
  ar: {
    title: 'نيورودوك',
    placeholder: 'اسأل شيئًا...',
    search: 'بحث',
    clear: 'مسح',
    response: 'الإجابة',
    loading: 'جاري البحث...',
    cleared: 'تم المسح',
    clearHistory: 'مسح السجل',
    emptyQuery: '⚠️ الرجاء كتابة استعلام قبل البحث'
  },
  pl: {
    title: 'NeuroDoc',
    placeholder: 'Zadaj pytanie...',
    search: 'Szukaj',
    clear: 'Wyczyść',
    response: 'Odpowiedź',
    loading: 'Wyszukiwanie...',
    cleared: 'Wyczyszczono',
    clearHistory: 'Wyczyść historię',
    emptyQuery: '⚠️ Wprowadź zapytanie przed wyszukiwaniem'
  },
};

function App() {
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('light');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [history, setHistory] = useState([]);
  const [displayedText, setDisplayedText] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const inputRef = useRef();
  const t = translations[lang];

  // Apply theme class to <body>
  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Animate typing
  useEffect(() => {
    let i = 0;
    if (!loading && response) {
      const timer = setInterval(() => {
        setDisplayedText((prev) => prev + response[i]);
        i++;
        if (i >= response.length) clearInterval(timer);
      }, 30);
      return () => clearInterval(timer);
    }
  }, [response, loading]);

  const handleSearch = async (query, skipToast = false) => {
    if (!query.trim()) {
      setResponse('');
      setDisplayedText('');
      setUploadedFileName('');
      if (!skipToast) {
        setToastMessage(t.emptyQuery);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
      return;
    }
    setLoading(true);
    setResponse(''); setDisplayedText(''); setUploadedFileName('');
    try {
      const res = await fetch('http://localhost:8000/query/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResponse(data.answer || 'No answer received');
      setHistory((h) => [query, ...h]);
    } catch (e) {
      setResponse('Error contacting the server.');
    }
    setLoading(false);
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setLoading(true);
    setUploadedFileName(file.name);
    const fd = new FormData();
    fd.append('file', file);
    try {
      await fetch('http://localhost:8000/upload/', { method: 'POST', body: fd });
    } catch {}
    setLoading(false);
  };

  const handleClearHistory = () => {
    setHistory([]);
    handleSearch('', true);
  };

  return (
    <div className="container" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <img src="/neuro-logo.svg" alt="NeuroDoc Logo" className="logo" />

      <div className="top-controls">
        <div className="dropdown-row">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="button">
            <option value="en">🌐 English</option>
            <option value="pl">🇵🇱 Polski</option>
            <option value="ar">🇸🇦 العربية</option>
          </select>

          <select value={theme} onChange={(e) => setTheme(e.target.value)} className="button">
            <option value="light">☀️ Light</option>
            <option value="dark">🌙 Dark</option>
          </select>
        </div>

        <SearchBar
          onSearch={handleSearch}
          onFileUpload={handleFileUpload}
          placeholder={t.placeholder}
          searchLabel={t.search}
          clearLabel={t.clear}
          inputRef={inputRef}
          lang={lang}
        />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <ResponseDisplay response={displayedText} label={t.response} />
      )}

      {uploadedFileName && !loading && (
        <div className="upload-name">📄 {uploadedFileName}</div>
      )}

      <div className="button-group horizontal">
        <button className="button copy" onClick={() => {
          const txt = document.getElementById('response-box')?.innerText;
          if (txt) navigator.clipboard.writeText(txt);
        }}>
          📎 {lang === 'ar' ? 'نسخ' : 'Copy'}
        </button>
        <button className="button clear" onClick={handleClearHistory}>
          🧹 {t.clearHistory}
        </button>
      </div>

      <SearchHistory items={history} onSelect={(q) => handleSearch(q)} />
      <Toast message={toastMessage} visible={showToast} />
      <FloatingButton
        icon="↑"
        label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      <div id="response-box" className="response-box">
        {response || '...'}
      </div>
    </div>
  );
}

export default App;
