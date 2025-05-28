import React, { useRef } from 'react';

const AdvancedFilters = ({ visible, onSearch }) => {
  if (!visible) return null;

  // refs
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
    <div
      id="advancedSearch"
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        borderTop: '1px solid #ddd',
        borderRadius: '12px',
        background: '#fff',
      }}
    >
      {/* Document Content */}
      <div className="mb-3">
        <input
          ref={contentRef}
          type="text"
          className="form-control"
          placeholder='"keywords" in content'
        />
      </div>

      {/* Announcement Date */}
      <label className="form-label text-muted">Announcement Date:</label>
      <div className="row mb-3">
        <div className="col">
          <label className="form-label">From:</label>
          <input type="date" className="form-control" ref={announceFromRef} />
        </div>
        <div className="col">
          <label className="form-label">To:</label>
          <input type="date" className="form-control" ref={announceToRef} />
        </div>
      </div>

      {/* Release Date */}
      <label className="form-label text-muted">Release Date:</label>
      <div className="row mb-3">
        <div className="col">
          <label className="form-label">From:</label>
          <input type="date" className="form-control" ref={releaseFromRef} />
        </div>
        <div className="col">
          <label className="form-label">To:</label>
          <input type="date" className="form-control" ref={releaseToRef} />
        </div>
      </div>

      {/* Signature */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Signature..."
          ref={signatureRef}
        />
      </div>

      {/* Topics */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Tags or keywords..."
          ref={topicsRef}
        />
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-end gap-2">
        <button
          className="btn btn-danger"
          onClick={handleClear}
          style={{ borderRadius: '8px' }}
        >
          Clear
        </button>
        <button
          className="btn btn-primary"
          onClick={handleSearchClick}
          style={{ borderRadius: '8px' }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default AdvancedFilters;
