import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((item, index) => (
        <div key={index} className="result-item">
          <h4 className="result-title">
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              dangerouslySetInnerHTML={{ __html: item.title }}
            />
          </h4>
          {item.meta && <div className="result-meta">{item.meta}</div>}
          {item.snippet && (
            <p
              className="result-snippet"
              dangerouslySetInnerHTML={{ __html: item.snippet }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
