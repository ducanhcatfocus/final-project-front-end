import React from "react";

const FormDocument = React.forwardRef(
  ({ name, placeholder, label, ...rest }, inputRef) => {
    return (
      <div className="w-full mb-3">
        <label className="text-sm font-medium text-gray-900 dark:text-gray-400">
          {label}
        </label>
        <input
          rows="4"
          className="p-2 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-third dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id={name}
          name={name}
          placeholder={placeholder}
          ref={inputRef}
          {...rest}
        ></input>
      </div>
    );
  }
);

export default FormDocument;
