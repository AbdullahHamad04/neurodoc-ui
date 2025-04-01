import React, { useState } from 'react';

const SearchBar = ({ onSearch, placeholder, searchLabel, clearLabel, inputRef }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="form-row"
        style={{ display: 'flex', gap: '40px', alignItems: 'center', width: '100%' }}
      >
        <div className="floating-input" style={{ flex: 1 }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputRef}
            placeholder=" "
            style={{ height: '30px' }}
          />
          <label>{placeholder}</label>
        </div>

        <div style={{ display: 'flex', gap: '18px' }}>
          <button type="submit" className="button" style={{ height: '44px' }}>
            🔍 {searchLabel}
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="button"
            style={{ backgroundColor: '#e74c3c', height: '44px' }}
          >
            ❌ {clearLabel}
          </button>
        </div>
      </div>
      

      {query && <p className="hint">↵ Press Enter to search</p>}
    </form>
    
  );
};

export default SearchBar;