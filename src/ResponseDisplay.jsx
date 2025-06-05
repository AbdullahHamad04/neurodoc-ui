import React from 'react';

const ResponseDisplay = ({ response, label }) => {
  return (
    <div className="response">
      <h3>{label}:</h3>
      <div id="response-box" dangerouslySetInnerHTML={{ __html: response || '...' }} />
    </div>
  );
};

export default ResponseDisplay;
