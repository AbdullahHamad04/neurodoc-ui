
import React from 'react';

const Toast = ({ message, visible }) => {
  return visible ? (
    <div className="toast">
      {message}
    </div>
  ) : null;
};

export default Toast;
