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
      onFileUpload(file); // send file to backend
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="form-row"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          width: '81%',
        }}
      >
        <div
          className="floating-input"
          style={{
            width: '100%',
            direction: lang === 'ar' ? 'rtl' : 'ltr',
            position: 'relative',
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
              paddingRight: lang === 'ar' ? '16px' : '45px',
              paddingLeft: lang === 'ar' ? '45px' : '16px',
            }}
          />
          <label>{placeholder}</label>

          <label
            style={{
              position: 'absolute',
              top: '35%',
              transform: 'translateY(-55%)',
              [lang === 'ar' ? 'left' : 'right']: '-40px',
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

        <div style={{ display: 'flex', gap: '20px' }}>
          <button type="submit" className="button red">🔍 {searchLabel}</button>
          <button type="button" onClick={handleClear} className="button red">❌ {clearLabel}</button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
