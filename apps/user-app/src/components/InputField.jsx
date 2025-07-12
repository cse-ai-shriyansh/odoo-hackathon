import React from "react";

export default function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  error = "",
  required = false,
  minLength,
  maxLength,
  ...props
}) {
  return (
    <div className="mb-4">
      {label && <label htmlFor={name} className="block font-medium mb-1">{label}{required && <span className="text-red-500">*</span>}</label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        className={`border px-3 py-2 rounded w-full ${error ? "border-red-500" : "border-gray-300"}`}
        {...props}
      />
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
}
