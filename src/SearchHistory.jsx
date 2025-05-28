import React from 'react';

const cancelIcon = '/cancel.png';

const SearchHistory = ({ items, onSelect, onRemove }) => {
  if (!items.length) return null;

  return (
    <div className="tag-container">
      {items.map((item, index) => (
        <div key={index} className="tag">
          <span className="tag-text" onClick={() => onSelect(item)}>
            {item}
          </span>
          <img
            src={cancelIcon}
            alt="remove"
            className="tag-remove-icon"
            onClick={() => onRemove(item)}
          />
        </div>
      ))}
    </div>
  );
};

export default SearchHistory;
