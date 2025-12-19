import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 rounded-xl bg-primary text-white hover:bg-primaryDark transition-colors duration-300 shadow-custom-light hover:shadow-custom-dark focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
