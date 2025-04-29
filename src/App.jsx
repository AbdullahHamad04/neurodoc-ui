// App.jsx
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
    emptyQuery: '⚠️ Please enter a query before searching',
    copy: 'Copy',
    themeLight: 'Light',
    themeDark: 'Dark',
    scrollTop: 'Scroll to top',
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
    emptyQuery: '⚠️ الرجاء كتابة استعلام قبل البحث',
    copy: 'نسخ',
    themeLight: 'فاتح',
    themeDark: 'داكن',
    scrollTop: 'العودة للأعلى',
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
    emptyQuery: '⚠️ Wprowadź zapytanie przed wyszukiwaniem',
    copy: 'Kopiuj',
    themeLight: 'Jasny',
    themeDark: 'Ciemny',
    scrollTop: 'Do góry',
  },
};

function App() {
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('light');
  const [response, setResponse] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [history, setHistory] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const inputRef = useRef();
  const t = translations[lang];

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setToastMessage(t.emptyQuery);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }
    setLoading(true);
    setResponse('');
    setDisplayedText('');
    setUploadedFileName('');
    try {
      const res = await fetch('http://localhost:8000/query/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (data.answer) {
        setResponse(data.answer);
        setHistory((prev) => [query, ...prev]);
      } else {
        setResponse('No answer received from server.');
      }
    } catch {
      setResponse('Error contacting the server.');
    }
    setLoading(false);
  };

  const handleInputClear = () => {
    setResponse('');
    setDisplayedText('');
    setUploadedFileName('');
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setLoading(true);
    setUploadedFileName(file.name);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('http://localhost:8000/upload/', {
        method: 'POST',
        body: formData,
      });
      // ignore response
    } catch {
      // ignore error
    }
    setLoading(false);
  };

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark transition' : 'transition';
    inputRef.current?.focus();
  }, [theme]);

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

  return (
    <div className="container" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <img src="/neuro-logo.svg" alt="NeuroDoc Logo" className="logo" />

      <div className="top-controls">
        <div className="selector-group">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="button">
            <option value="en">🌐 English</option>
            <option value="pl">🇵🇱 Polski</option>
            <option value="ar">🇸🇦 العربية</option>
          </select>
          <select value={theme} onChange={(e) => setTheme(e.target.value)} className="button">
            <option value="light">☀️ {t.themeLight}</option>
            <option value="dark">🌙 {t.themeDark}</option>
          </select>
        </div>

        <SearchBar
          onSearch={handleSearch}
          onClear={handleInputClear}
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
        <div className="file-name">📄 Uploaded File: {uploadedFileName}</div>
      )}

      <div className="button-group horizontal">
        <button
          type="button"
          onClick={() => {
            const text = document.getElementById('response-box')?.innerText;
            if (text) navigator.clipboard.writeText(text);
          }}
          className="button copy"
        >
          📎 {t.copy}
        </button>
        <button onClick={handleInputClear} className="button clear">
          🧹 {t.clearHistory}
        </button>
      </div>

      <SearchHistory items={history} onSelect={handleSearch} />
      <Toast message={toastMessage} visible={showToast} />

      <FloatingButton
        icon="↑"
        label={t.scrollTop}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      <div id="response-box" className="response">
        {response || '...'}
      </div>
    </div>
  );
}

export default App;
