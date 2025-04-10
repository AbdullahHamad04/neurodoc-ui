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
<div className="floating-input" style={{ flex: 1, position: 'relative' }}>
  <input
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    ref={inputRef}
    placeholder=" "
    style={{ height: '30px', width: '100%' }}
  />
  <label>{placeholder}</label>

  <label
    style={{
      position: 'absolute',
      right: '1px',
      top: '35%',
      transform: 'translateY(-55%)',
      cursor: 'pointer'
    }}
  >
    <img
      src="/file-lines-regular.svg"
      alt="upload"
      style={{ width: '25px', height: '25px' }}
    />
    <input
      type="file"
      onChange={(e) => console.log('file selected:', e.target.files[0])}
      style={{ display: 'none' }}
    />
  </label>
</div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <button type="submit" className="button red">
            🔍 {searchLabel}
          </button>

          <button type="button" onClick={handleClear} className="button red ">

            ❌ {clearLabel}
          </button>
        </div>
      </div>
      

      {query && <p className="hint">↵ Press Enter to search</p>}
    </form>
    
  );
};

export default SearchBar;