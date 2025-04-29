// SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({
  onSearch,
  onClear,
  onFileUpload,
  placeholder,
  searchLabel,
  clearLabel,
  inputRef,
  lang,
}) => {
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
          gap: '30px',
          width: '100%',
        }}
      >
<div
  className="floating-input"
  dir={lang === 'ar' ? 'rtl' : 'ltr'}
  style={{
    width: '100%',
    maxWidth: '600px',
    position: 'relative',
  }}
>

          <input
            id="search-field"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputRef}
            placeholder=" "
            required
            className="floating-text-input"
            style={{
              padding: lang === 'ar' ? '15px 1px 0px 4px' : '15px 1px 0 4px',
              textAlign: lang === 'ar' ? 'right' : 'left',
            }}
          />
          <label htmlFor="search-field" className="floating-label">
            {placeholder}
          </label>

          <div
            onClick={() => document.getElementById('file-upload').click()}
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              [lang === 'ar' ? 'left' : 'right']: '16px',
              cursor: 'pointer',
            }}
          >
            <img
              src="/file-lines-regular.svg"
              alt="upload"
              style={{ width: '26px', height: '30px' }}
            />
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '25px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <button type="submit" className="button red">
            🔍 {searchLabel}
          </button>
          <button type="button" onClick={handleClear} className="button red">
            ❌ {clearLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
