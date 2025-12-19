import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`p-6 rounded-xl shadow-custom-light bg-white ${className}`}>
      {children}
    </div>
  );
};

export default Card;
