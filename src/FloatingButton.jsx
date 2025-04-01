import React from 'react';


const FloatingButton = ({ icon, label, onClick }) => {
  return (
    <button className="fab" onClick={onClick} aria-label={label}>
      {icon}
    </button>
  );
};

export default FloatingButton;
