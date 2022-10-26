import React from "react";
import { ImSpinner2 } from "react-icons/im";

const Submit = ({ value, loading }) => {
  return (
    <>
      {!loading ? (
        <button
          type="submit"
          className="w-full rounded dark:bg-dark-subtle bg-third dark:text-secondary dark:hover:bg-white hover:bg-fourth transition font-semibold text-lg h-10 cursor-pointer flex items-center justify-center"
        >
          {value}
        </button>
      ) : (
        <div className="w-full rounded dark:bg-white bg-third  h-10 flex items-center justify-center text-dark-primary">
          <ImSpinner2 className="animate-spin " />
        </div>
      )}
    </>
  );
};

export default Submit;
