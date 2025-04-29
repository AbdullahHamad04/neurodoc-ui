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
    title: 'NeuroDoc', placeholder: 'Ask something...', search: 'Search', clear: 'Clear',
    response: 'Response', loading: 'Searching...', cleared: 'Search cleared', clearHistory: 'Clear History', emptyQuery: '⚠️ Please enter a query before searching'
  },
  ar: {
    title: 'نيورودوك', placeholder: 'اسأل شيئًا...', search: 'بحث', clear: 'مسح',
    response: 'الإجابة', loading: 'جاري البحث...', cleared: 'تم المسح', clearHistory: 'مسح السجل', emptyQuery: '⚠️ الرجاء كتابة استعلام قبل البحث'
  },
  pl: {
    title: 'NeuroDoc', placeholder: 'Zadaj pytanie...', search: 'Szukaj', clear: 'Wyczyść',
    response: 'Odpowiedź', loading: 'Wyszukiwanie...', cleared: 'Wyczyszczono', clearHistory: 'Wyczyść historię', emptyQuery: '⚠️ Wprowadź zapytanie przed wyszukiwaniem'
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

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setResponse('');
      setDisplayedText('');
      setUploadedFileName('');
      setToastMessage(t.emptyQuery);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }

    setLoading(true);
    setUploadedFileName('');
    setDisplayedText('');

    try {
      const res = await fetch('http://localhost:8000/query/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query }),
      });

      const data = await res.json();

      if (data.answer) {
        setResponse(data.answer);
        setHistory(prev => [query, ...prev]);
      } else {
        setResponse('No answer received from server.');
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('Error contacting the server.');
    }

    setLoading(false);
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

      const data = await res.json();

      if (res.ok) {
        console.log('✅ File uploaded successfully:', data.message);
      } else {
        console.error('❌ Upload failed:', data.error);
      }
    } catch (error) {
      console.error('❌ Error uploading file:', error);
    }

    setLoading(false);
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
      <img
        src="/neuro-logo.svg"
        alt="NeuroDoc Logo"
        style={{ height: '150px', marginBottom: '80px' }}
      />

      <div className="top-controls">
        <select value={lang} onChange={(e) => setLang(e.target.value)} className="button">
          <option value="en">🌐 English</option>
          <option value="pl">🇵🇱 Polski</option>
          <option value="ar">🇸🇦 العربية</option>
        </select>

        <select value={theme} onChange={(e) => setTheme(e.target.value)} className="button">
          <option value="light">☀️ Light</option>
          <option value="dark">🌙 Dark</option>
        </select>

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

      {loading ? <Spinner /> : <ResponseDisplay response={displayedText} label={t.response} />}

      {uploadedFileName && !loading && (
        <div style={{ marginTop: '20px', fontWeight: 'bold', fontSize: '16px', color: '#4f46e5', textAlign: 'center' }}>
          📄 Uploaded File: {uploadedFileName}
        </div>
      )}

      <div className="button-group horizontal">
        <button
          type="button"
          onClick={() => {
            const responseText = document.getElementById('response-box')?.innerText;
            if (responseText) {
              navigator.clipboard.writeText(responseText);
              alert('📋 Copied the response!');
            }
          }}
          className="button copy"
        >
          📎 {lang === 'ar' ? 'نسخ' : 'Copy'}
        </button>

        <button onClick={handleClearHistory} className="button clear">
          🧹 {t.clearHistory}
        </button>
      </div>

      <SearchHistory items={history} onSelect={handleSearch} />

      <Toast message={toastMessage} visible={showToast} />

      <FloatingButton icon="↑" label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />


      <div id="response-box" className="response">
        {response || '...'}
      </div>
    </div>
  );
}

export default App;