import React, { useState } from 'react';

const SearchBar = ({ onSearch, onFileUpload, placeholder, searchLabel, clearLabel, inputRef, lang }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div
        className="form-row"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
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
            style={{
              height: '30px',
              lineHeight: '50px',
              paddingTop: '12px',
              paddingRight: lang === 'ar' ? '16px' : '36px',
              paddingLeft: lang === 'ar' ? '36px' : '16px',
            }}
          />
          <label>{placeholder}</label>

          <label
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-85%)',
              [lang === 'ar' ? 'left' : 'right']: '-35px',
              cursor: 'pointer',
            }}
          >
            <img
              src="/file-lines-regular.svg"
              alt="upload"
              style={{ width: '35px', height: '30px', objectFit: 'contain' }}
            />
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button type="submit" className="button red">🔍 {searchLabel}</button>
          <button type="button" onClick={handleClear} className="button red">❌ {clearLabel}</button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
