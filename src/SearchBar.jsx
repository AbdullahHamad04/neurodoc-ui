// SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ onSearch, onClear, onFileUpload, placeholder, searchLabel, clearLabel, inputRef, lang }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onClear();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) onFileUpload(file);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div
        className="form-row"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '80px',
          width: '100%',
        }}
      >
        <div
          className="floating-input"
          style={{
            width: '100%',
            direction: lang === 'ar' ? 'rtl' : 'ltr',
            position: 'relative',
            maxWidth: '600px',
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputRef}
            placeholder=" "
            required
          />
          <label>{placeholder}</label>

          <label
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              [lang === 'ar' ? 'left' : 'right']: '-280px',
              cursor: 'pointer',
            }}
          >
            <img
              src="/file-lines-regular.svg"
              alt="upload"
              style={{ width: '22px', height: '25px' }}
            />
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button type="submit" className="button red">🔍 {searchLabel}</button>
          <button type="button" onClick={handleClear} className="button red">❌ {clearLabel}</button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
