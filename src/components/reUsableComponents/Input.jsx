import React from "react";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  isRequired = false,
  className = "",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={isRequired}
        className={`px-4 py-2 w-full rounded-xl border-2 border-neutral focus:border-primary focus:outline-none transition-colors duration-300 shadow-custom-light`}
      />
    </div>
  );
};

export default Input;
