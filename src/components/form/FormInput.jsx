import React from "react";

const FormInput = ({ name, placeholder, label, inputRef, ...rest }) => {
  return (
    <div className="flex flex-col-reverse">
      <input
        id={name}
        name={name}
        className="bg-transparent rounded border-2 dark:border-dark-subtle border-light-subtle w-full text-lg outline-none dark:focus:border-white focus:border-primary p-1 dark:text-white peer transition"
        placeholder={placeholder}
        {...rest}
        ref={inputRef}
      />
      <label
        htmlFor="email"
        className="font-semibold dark:text-dark-subtle text-light-subtle dark:peer-focus:text-white peer-focus:text-secondary transition self-start"
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
