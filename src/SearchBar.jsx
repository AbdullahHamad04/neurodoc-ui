import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({
  onSearch,
  onClear,
  onFileUpload,
  placeholder,
  inputRef,
  lang,
  onToggleFilters
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
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

  const handleFilter = () => {
    if (onToggleFilters) onToggleFilters();
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div
        className="form-row"
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1px',
          flexWrap: 'wrap',
          maxWidth: '700px',
          margin: '20px auto',
          width: '100%',
        }}
      >
        {/* input field */}
        <div
          className="floating-input"
          style={{
            flex: 1,
            maxWidth: '500px',
            position: 'relative',
            marginRight: lang === 'ar' ? '0' : '28px',
            marginLeft: lang === 'ar' ? '28px' : '0',
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
              padding: lang === 'ar' ? '20px 1px 0 14px' : '14px 5px 0 20px',
              textAlign: lang === 'ar' ? 'right' : 'left',
            }}
          />
          <label htmlFor="search-field" className="floating-label">
            {placeholder}
          </label>

          {/* upload icon */}
          <div
            onClick={() => document.getElementById('file-upload').click()}
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-45%)',
              [lang === 'ar' ? 'left' : 'right']: '-13px',
              cursor: 'pointer',
            }}
          >
            <img
              src="/file-lines-regular.svg"
              alt="upload"
              style={{ width: '21px', height: '30px' }}
            />
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* buttons next to input */}
        <button type="submit" className="icon-only-btn">
          <img src="/btn_search.png" alt="search" />
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="icon-only-btn"
        >
          <img src="/btn_clear.png" alt="clear" />
        </button>

        <button
          type="button"
          onClick={handleFilter}
          className="icon-only-btn"
        >
          <img src="/btn_filter.png" alt="filter" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;