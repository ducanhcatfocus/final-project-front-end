import React from "react";

const FormViewDocument = () => {
  return (
    <form className="mb-0">
      <div class="w-full bg-light-primary border-t-0.5 dark:border-dark-third dark:bg-dark-primary h-full flex justify-between">
        <div class=" m-1 bg-white rounded dark:bg-gray-800 w-full">
          <input
            id="comment"
            class="p-3 w-full text-sm text-gray-900 bg-white dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a comment..."
            required
          ></input>
        </div>
        <div class="flex justify-start gap-4 items-center py-2 px-3">
          <button
            type="submit"
            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Accept
          </button>
          <button
            type="submit"
            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Reject
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormViewDocument;
