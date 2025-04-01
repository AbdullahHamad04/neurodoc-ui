import React from 'react';

const ResponseDisplay = ({ response, label }) => {
  return (
    <div className="response">
      <h3>{label}:</h3>
      <p>{response || '...'}</p>
    </div>
  );
};

export default ResponseDisplay;
