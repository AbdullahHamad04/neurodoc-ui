import React from 'react';

const SearchHistory = ({ items, onSelect }) => {
  if (!items.length) return null;

  return (
    <div className="history">
      <h4>🔁 Recent Searches</h4>
      {items.map((item, index) => (
        <div key={index} className="history-item" onClick={() => onSelect(item)}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default SearchHistory;
