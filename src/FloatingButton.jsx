// FloatingButton.jsx
import React from 'react';

const FloatingButton = ({ icon, label, onClick }) => {
  return (
    <button className="floating-button" onClick={onClick} aria-label={label} title={label}>
      {icon || '↑'}
    </button>
  );
};

export default FloatingButton;
