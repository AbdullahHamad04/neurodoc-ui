import React, { useRef } from 'react';
import './AdvancedFilters.css';
import clearIcon from './assets/btn_clear.png';
import searchIcon from './assets/btn_search.png';

const AdvancedFilters = ({ visible, onSearch }) => {
  if (!visible) return null;

  const contentRef = useRef();
  const announceFromRef = useRef();
  const announceToRef = useRef();
  const releaseFromRef = useRef();
  const releaseToRef = useRef();
  const signatureRef = useRef();
  const topicsRef = useRef();

  const handleClear = () => {
    contentRef.current.value = '';
    announceFromRef.current.value = '';
    announceToRef.current.value = '';
    releaseFromRef.current.value = '';
    releaseToRef.current.value = '';
    signatureRef.current.value = '';
    topicsRef.current.value = '';
  };

  const handleSearchClick = () => {
    const filters = {
      content: contentRef.current.value,
      announceFrom: announceFromRef.current.value,
      announceTo: announceToRef.current.value,
      releaseFrom: releaseFromRef.current.value,
      releaseTo: releaseToRef.current.value,
      signature: signatureRef.current.value,
      topics: topicsRef.current.value,
    };
    onSearch(filters);
  };

  return (
    <div className="filters-container">
      <div className="filter-group">
        <label><span role="img" aria-label="doc">📄</span> <strong>Document Content:</strong></label>
        <input type="text" ref={contentRef} className="filter-input" placeholder='"keywords" in content' />
      </div>

      <div className="filter-group">
        <label><span role="img" aria-label="calendar">📅</span> <strong>Announcement Date:</strong></label>
        <div className="date-row">
          <input type="date" ref={announceFromRef} className="filter-date" />
          <span>→</span>
          <input type="date" ref={announceToRef} className="filter-date" />
        </div>
      </div>

      <div className="filter-group">
        <label><span role="img" aria-label="calendar">📆</span> <strong>Release Date:</strong></label>
        <div className="date-row">
          <input type="date" ref={releaseFromRef} className="filter-date" />
          <span>→</span>
          <input type="date" ref={releaseToRef} className="filter-date" />
        </div>
      </div>

      <div className="filter-group">
        <label><span role="img" aria-label="pen">✍️</span> <strong>Signature:</strong></label>
        <input type="text" ref={signatureRef} className="filter-input" placeholder="Signature..." />
      </div>

      <div className="filter-group">
        <label><span role="img" aria-label="tag">🏷️</span> <strong>Tags / Topics:</strong></label>
        <input type="text" ref={topicsRef} className="filter-input" placeholder="Tags or keywords..." />
      </div>

      <div className="filter-buttons">
        <button className="btn-clear" onClick={handleClear}>
          <img src={clearIcon} alt="Clear" />
        </button>
        <button className="btn-search" onClick={handleSearchClick}>
          <img src={searchIcon} alt="Search" />
        </button>
      </div>
    </div>
  );
};

export default AdvancedFilters;
